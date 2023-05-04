import {
	createContext,
	FC,
	ReactNode,
	useCallback,
	useContext,
	useState
} from 'react'
import { Contributors } from '@/types/schema'
// import { Person } from '@/localDatabase/people'

// interface PeopleContextType {
// 	people: Person[]
// 	getPerson: (userId: string) => Person | null
// }

type Person = Contributors 

interface PeopleContextType {
	people: Person[]
	getPerson: (userId: string) => Person | null
}

export type PeopleContextProviderProps = Partial<Pick<PeopleContextType, 'people'>> & { children: ReactNode }

const defaultPeopleContextValue: PeopleContextType = {
	people: [],
	getPerson: () => null
}

export const PeopleContext = createContext<PeopleContextType>(defaultPeopleContextValue)
// export const PeopleContextProvider = PeopleContext.Provider

export const PeopleContextProvider: FC<PeopleContextProviderProps> = ({
	people: overrideDefaultPeople = null,
	children
}) => {
	const [people, ] = useState<Person[]>(overrideDefaultPeople || defaultPeopleContextValue.people)
	
	const getPerson: (userId: string) => Person | null = useCallback((userId) => {
		const person = people.find(p => p.id === userId) || null
		return person
	}, [people])

	const store = {
		people,
		getPerson
	}

	return (
		<PeopleContext.Provider value={store}>
			{ children }
		</PeopleContext.Provider>
	)
}

export const useEditorPeople = () => {
	return useContext(PeopleContext)
}
