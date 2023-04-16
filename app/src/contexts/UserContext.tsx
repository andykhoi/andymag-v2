import { FC, createContext, useState, useCallback, useEffect, useRef, ReactNode, useContext } from 'react'
import { UserResource } from '@clerk/types'
import { useUser } from '@clerk/nextjs'
import { Users } from '../../../types/types'
import { getAnonData, setAnonData, initAnonData } from '@/utils/localStorage'
import { Activity, Preferences } from '../../../types/custom'
// import { GraphQLClient, gql } from 'graphql-request'


export interface EnrichedUserData {
	activity: Activity[]
	preferences: Preferences
}

interface UserContextProviderProps {
	children: ReactNode
}

interface UserContextType {
	// activity: Pick<Users, 'activity'> | null
	// preferences: Pick<Users, 'preferences'> | null
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

	// const [activity, setActivity] = useState<Pick<Users, 'activity'> | null>(defaultUserContextValue.activity)
	// const [preferences, setPreferences] = useState<Pick<Users, 'preferences'> | null>(defaultUserContextValue.preferences)
	const [activity, setActivity] = useState<Activity[] | null>(defaultUserContextValue.activity)
	const [preferences, setPreferences] = useState<Preferences | null>(defaultUserContextValue.preferences)
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const updateActivity = useCallback((activity: Activity) => {
		if (!id) {
			// update localStorage
			const old = getAnonData()
			let updated;
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
		}
		// update user's hasura data
	}, [id])

	const updatePreferences = useCallback((preference: Partial<Preferences>) => {
		if (!id) {
			// update localStorage
			const old = getAnonData()
			let updated;
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
		}
		// update user's hasura data
	}, [id])

	useEffect(() => {
		if (!isLoaded) return
		
		setIsLoading(() => true)
		let data: EnrichedUserData;

		if (!id) {
			// data = getAnonData() ? getAnonData() : initAnonData()
			const anonData = getAnonData()
			data = anonData ? anonData : initAnonData()
		} else {
			// data = await getUserData()
		}

		setPreferences(() => data.preferences)
		setActivity(() => data.activity)
		setIsLoading(() => false)
	}, [isLoaded, id])

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