import { FC, ReactNode } from 'react'

import { FormattingContextProvider } from '../context/FormattingContextProvider'
import { PeopleContextProvider } from '../context/PeopleContextProvider'
import { ContentWrapper } from './ContentWrapper'

import { FormattingContextProviderProps } from '../context/FormattingContextProvider'
import { PeopleContextProviderProps } from '../context/PeopleContextProvider'
import { Sidebar } from './Sidebar'
import { SettingsContextProvider } from '../context/SettingsContextProvider'
import { Toolbar } from './Toolbar'

type EditorProps = FormattingContextProviderProps & PeopleContextProviderProps & {
	children: ReactNode
}

export const Editor: FC<EditorProps> = ({
	defaultPadding,
	optimalContentWidth,
	fontSizingChart,
	people,
	children
}) => {
	const formattingOptions = {
		defaultPadding,
		optimalContentWidth,
		fontSizingChart,
	}
	const peopleOptions = {
		people
	}
	return (
		<>
			<FormattingContextProvider {...formattingOptions}>
				<PeopleContextProvider {...peopleOptions}>
					<SettingsContextProvider>
					{/* <div> */}
						{/* Mobile header component here */}
						{/* <Sidebar /> */}
						<Toolbar />
						{/* <Panel /> */}
						<ContentWrapper>
							{ children }
						</ContentWrapper>
						{/* toolbar component here */}
					{/* </div> */}
					</SettingsContextProvider>
				</PeopleContextProvider>
			</FormattingContextProvider>
			<style jsx>{`
				// div {
				// 	display: flex;
				// 	height: 100%;
				// }
			`}</style>
		</>
	)
}