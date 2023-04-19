import { FC, createContext, useState, useCallback, useEffect, useRef, ReactNode, useContext } from 'react'
import { UserResource } from '@clerk/types'
import { useUser } from '@clerk/nextjs'
import { Users } from '../types/schema'
import { getAnonData, setAnonData, initAnonData } from '@/utils/localStorage'
import { Activity, Preferences } from '../types/custom'
import { useGetPreferencesAndActivityWithIdLazyQuery, GetPreferencesAndActivityWithIdQuery } from '@/graphql/queries/getPreferencesAndActivityWithId'
import { useUpdateUserActivityMutation } from '@/graphql/mutations/updateUserActivity'
import { useUpdateUserPreferencesMutation } from '@/graphql/mutations/updateUserPreferences'

export interface EnrichedUserData {
	activity: Activity[]
	preferences: Preferences
}

interface UserContextProviderProps {
	children: ReactNode
}

interface UserContextType {
	activity: Activity[] | null
	preferences: Preferences | null
	isLoading: boolean

	updateActivity: (activity: Activity) => void
	updatePreferences: (preference: Partial<Preferences>) => void
}

const defaultUserContextValue: UserContextType = {
	activity: null,
	preferences: null,
	isLoading: false,

	updateActivity: () => null,
	updatePreferences: () => null
}

const UserContext = createContext<UserContextType>(defaultUserContextValue)

export const UserContextProvider: FC<UserContextProviderProps> = ({
	children
}) => {
	const {
		isLoaded,
		user,
	} = useUser()
	const id = user?.id

	const [activity, setActivity] = useState<Activity[] | null>(defaultUserContextValue.activity)
	const [preferences, setPreferences] = useState<Preferences | null>(defaultUserContextValue.preferences)
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const [ getUserData, ] = useGetPreferencesAndActivityWithIdLazyQuery()
	const [ updateUserActivity, ] = useUpdateUserActivityMutation()
	const [ updateUserPreferences, ] = useUpdateUserPreferencesMutation()

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

	const updatePreferences = useCallback(async (preference: Partial<Preferences>) => {
		if (!id) {
			// update localStorage
			const old = getAnonData()
			let updated
			if (!old) {
				const initialized = initAnonData()
				updated = {...initialized, preferences: {...initialized.preferences, ...preference}}
			} else {
				updated = { ...old, preferences: {...old.preferences, ...preference }}
			}
			
			const didUpdate = setAnonData({ ...updated })
			
			if (didUpdate) {
				setPreferences(didUpdate.preferences)
			}
		} else {
			// update user's hasura data
			const updated = {
				...preferences,
				...preference
			}
			const { data } = await updateUserPreferences({
				variables: {
					id,
					preferences: updated
				}
			})

			const didUpdate = data?.update_users?.returning[0]
			if (didUpdate) {
				setPreferences(didUpdate.preferences)
			}
		}
	}, [id, preferences, updateUserPreferences])

	useEffect(() => {
		if (!isLoaded) return

		const pollUserData = async (id: string): Promise<GetPreferencesAndActivityWithIdQuery> => {
			let tries = 0
			const maxTries = 5
			
			return new Promise(async (resolve, reject) => {
				const poll = async () => {
					tries++
				
					try {
						const { data } = await getUserData({ variables: { id }, fetchPolicy: 'network-only' })
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
			let data: EnrichedUserData = {
				activity: [],
				preferences: {
					autoCollapseHeader: false,
					fontSize: 'md'
				}
			}
			
			if (!id) {
				const anonData = getAnonData()
				data = anonData ? anonData : initAnonData()
			} else {
				// if the user is new it will take some time for the webhook to populate hasura with the new user data
				const userData = await pollUserData(id)

				data.activity = userData?.users[0].activity
				data.preferences = userData?.users[0].preferences
			}

			return data
		}
	
		const init = async () => {
			setIsLoading(() => true)
			
			const userData = await getData()
			
			setPreferences(() => userData.preferences)
			setActivity(() => userData.activity)
			setIsLoading(() => false)
		}

		init()

	}, [isLoaded, id, getUserData])

	const store = {
		activity,
		preferences,
		isLoading,

		updateActivity,
		updatePreferences
	}

	return (
		<UserContext.Provider value={store}>
			{ children }
		</UserContext.Provider>
	)
}

export const usePreferences = () => {
	const { isLoading, preferences, updatePreferences } = useContext(UserContext)
	return { isLoading, preferences, updatePreferences }
}

export const useActivity = () => {
	const { isLoading, activity, updateActivity } = useContext(UserContext)
	return { isLoading, activity, updateActivity }
}

































// import { FC, createContext, useState, useEffect, ReactNode } from 'react'
// import { User as FirebaseUser, signInAnonymously, UserCredential } from 'firebase/auth'
// import { auth as authInstance } from '../utils/firebase'
// import { useAuthState } from 'react-firebase-hooks/auth'

// interface UserContextWrapperProps {
// 	children: ReactNode
// }

// interface User {
// 	user: FirebaseUser
// 	preferences: {
// 		autoCollapseHeader: boolean
// 		fontScale: 'sm' | 'md' | 'lg'
// 	}
// 	recents: {article: string, link: string}[]
// }

// interface UserContextType {
// 	user: User | null
// 	loaded: boolean
// }

// const UserContextDefaultValue = {
// 	user: null,
// 	loaded: false
// }

// const UserContext = createContext<UserContextType>(UserContextDefaultValue)
// const UserContextProvider = UserContext.Provider

// export const UserContextWrapper: FC<UserContextWrapperProps> = ({
// 	children
// }) => {
// 	const [user, setUser] = useState<User | null>(null)
// 	const [loaded, setLoaded] = useState<boolean>(false)

// 	const [firebaseUser, loading, error] = useAuthState(authInstance)

// 	useEffect(() => {
// 		const loadAnonUser = async () => {
// 			const firebaseUser = await signInAnonymously(authInstance)
// 			const user: User = {
// 				user: firebaseUser
// 			}
// 		}
// 		if (!loading) {
// 			if (!firebaseUser) {

// 			}
// 		}
// 	}, [loading, firebaseUser])

// 	const store = {
// 		user,
// 		loaded
// 	}
// 	console.log(user, loading)
// 	return (
// 		<UserContextProvider value={store}>
// 			{ children }
// 		</UserContextProvider>
// 	)
// }