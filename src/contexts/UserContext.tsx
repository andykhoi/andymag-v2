import { FC, createContext, useState, useEffect, ReactNode } from 'react'
import { User as FirebaseUser, signInAnonymously, UserCredential } from 'firebase/auth'
import { auth as authInstance } from '../utils/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

interface UserContextWrapperProps {
	children: ReactNode
}

interface User {
	user: FirebaseUser
	preferences: {
		autoCollapseHeader: boolean
		fontScale: 'sm' | 'md' | 'lg'
	}
	recents: {article: string, link: string}[]
}

interface UserContextType {
	user: User | null
	loaded: boolean
}

const UserContextDefaultValue = {
	user: null,
	loaded: false
}

const UserContext = createContext<UserContextType>(UserContextDefaultValue)
const UserContextProvider = UserContext.Provider

export const UserContextWrapper: FC<UserContextWrapperProps> = ({
	children
}) => {
	const [user, setUser] = useState<User | null>(null)
	const [loaded, setLoaded] = useState<boolean>(false)

	const [firebaseUser, loading, error] = useAuthState(authInstance)

	useEffect(() => {
		const loadAnonUser = async () => {
			const firebaseUser = await signInAnonymously(authInstance)
			const user: User = {
				user: firebaseUser
			}
		}
		if (!loading) {
			if (!firebaseUser) {

			}
		}
	}, [loading, firebaseUser])

	const store = {
		user,
		loaded
	}
	console.log(user, loading)
	return (
		<UserContextProvider value={store}>
			{ children }
		</UserContextProvider>
	)
}