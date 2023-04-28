import { FC, createContext, ReactNode, useState, Dispatch, SetStateAction, useContext } from 'react'

interface SettingsContextType {
	panel: 'spotlight' | 'share' | 'preferences' | null
	setPanel: Dispatch<SetStateAction<'spotlight' | 'share' | 'preferences' | null>>
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

export const useEditorSettings = () => {
	return useContext(SettingsContext)
}