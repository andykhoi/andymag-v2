import { FC, createContext, ReactNode, useState, Dispatch, SetStateAction } from 'react'

interface SettingsContextType {
	panel: 'search' | 'share' | 'preferences' | null
	setPanel: Dispatch<SetStateAction<'search' | 'share' | 'preferences' | null>>
}

interface SettingsContextProviderProps {
	children: ReactNode
}

const defaultSettingsContextValue: SettingsContextType = {
	panel: null,
	setPanel: () => null
}

const SettingsContext = createContext<SettingsContextType>(defaultSettingsContextValue)

export const SettingsContextProvider: FC<SettingsContextProviderProps> = ({ children }) => {
	const [panel, setPanel] = useState<SettingsContextType['panel']>(null)
	
	const store = {
		panel,
		setPanel
	}

	return (
		<SettingsContext.Provider value={store}>
			{ children }
		</SettingsContext.Provider>
	)
}