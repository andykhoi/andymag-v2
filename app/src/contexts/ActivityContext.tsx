import { FC, createContext, useState, useCallback, useEffect, useRef, ReactNode, useContext } from 'react'
import { useUser } from '@clerk/nextjs'
import { Users } from '../types/schema'
import { getAnonData, setAnonData, initAnonData } from '@/utils/localStorage'
import { Activity } from '../types/custom'
import { useUpdateUserActivityMutation } from '@/graphql/mutations/updateUserActivity'
import { useGetActivityLazyQuery, GetActivityQuery } from '@/graphql/queries/getActivity'

interface ActivityContextProviderProps {
	children: ReactNode
}

interface ActivityContextType {
	activity: Activity[] | undefined
	isLoaded: boolean

	updateActivity: ((activity: Activity) => void) | undefined
}

const defaultActivityContextValue: ActivityContextType = {
	activity: undefined,
	isLoaded: false,

	updateActivity: undefined,
}

const ActivityContext = createContext<ActivityContextType>(defaultActivityContextValue)

export const ActivityContextProvider: FC<ActivityContextProviderProps> = ({
	children
}) => {
	const {
		isLoaded: isClerkLoaded,
		user,
	} = useUser()
	const id = user?.id

	const [activity, setActivity] = useState<Activity[] | undefined>(defaultActivityContextValue.activity)
	const [isLoaded, setIsLoaded] = useState<boolean>(false)

	const [ getUserActivity, ] = useGetActivityLazyQuery()
	const [ updateUserActivity, ] = useUpdateUserActivityMutation()

	const updateActivity = useCallback(async (activity: Activity) => {
		if (!id) {
			// update localStorage
			const old = getAnonData()
			let updated
			if (!old) {
				const initialized = initAnonData()
				updated = {...initialized, activity: [activity] }
			} else {
				const concatActivities = old.activity.push(activity)
				updated = { ...old }
			}
			
			const didUpdate = setAnonData({ ...updated })
			
			if (didUpdate) {
				setActivity(didUpdate.activity)
			}
		} else {
			// update user's hasura data
			const { data } = await updateUserActivity({ variables: {
				id,
				activity
			}})

			const didUpdate = data?.update_users?.returning[0]
			if (didUpdate) {
				setActivity(didUpdate.activity)
			}
		}
	}, [id, updateUserActivity])

	useEffect(() => {
		if (!isClerkLoaded) return

		const pollUserData = async (id: string): Promise<GetActivityQuery> => {
			let tries = 0
			const maxTries = 5
			
			return new Promise(async (resolve, reject) => {
				const poll = async () => {
					tries++
				
					try {
						const { data } = await getUserActivity({ variables: { id }, fetchPolicy: 'network-only' })
						if (data?.users[0]) {
							resolve(data)
							return true
						} else if (tries >= maxTries) {
							// need better error handling
							reject(new Error(`Polling stopped after ${maxTries} tries.`))
							return false
						}
					} catch (error) {
						reject(error)
						return false
					}
					
					return false
				}
			
				const attemptPolling = async () => {
					const result = await poll()
					if (!result && tries < maxTries) {
						setTimeout(attemptPolling, 1500)
					}
				}
			
				attemptPolling()
			})
		}
		
		const getData = async () => {
			let data: Pick<Users, 'activity'> = {
				activity: [],
			}
			
			if (!id) {
				const anonData = getAnonData()?.activity
				data = anonData ? anonData : initAnonData().activity
			} else {
				const userData = await pollUserData(id)
				data.activity = userData?.users[0].activity
			}

			return data
		}
	
		const init = async () => {
			setIsLoaded(() => false)
			
			const userData = await getData()
			
			setActivity(() => userData.activity)
			setIsLoaded(() => true)
		}

		init()

	}, [isClerkLoaded, id, getUserActivity])

	const store = {
		activity,
		isLoaded,

		updateActivity: isClerkLoaded ? updateActivity : undefined
	}

	return (
		<ActivityContext.Provider value={store}>
			{ children }
		</ActivityContext.Provider>
	)
}

export const useActivity = () => {
	const { isLoaded, activity, updateActivity } = useContext(ActivityContext)
	return { isLoaded, activity, updateActivity }
}