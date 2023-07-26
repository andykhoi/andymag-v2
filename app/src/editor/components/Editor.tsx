import { FC, ReactNode } from 'react'

import { FormattingContextProvider } from '../context/FormattingContextProvider'
import { PeopleContextProvider } from '../context/PeopleContextProvider'
import { ContentWrapper } from './ContentWrapper'

import { FormattingContextProviderProps } from '../context/FormattingContextProvider'
import { PeopleContextProviderProps } from '../context/PeopleContextProvider'
import { Sidebar } from './Sidebar'
import { Panel } from './Panel'
import { SettingsContextProvider } from '../context/SettingsContextProvider'
import { Toolbar } from './Toolbar'
import { MobileHeader } from '@/components/MobileHeader'

type EditorProps = FormattingContextProviderProps & PeopleContextProviderProps & {
	children: ReactNode
}

export const Editor: FC<EditorProps> = ({
	defaultPadding,
	fontFamilies,
	optimalContentWidth,
	fontSizingChart,
	people,
	children
}) => {
	const formattingOptions = {
		fontFamilies,
		defaultPadding,
		optimalContentWidth,
		fontSizingChart,
	}
	const peopleOptions = {
		people
	}
	return (
		<div className="editor">
			<FormattingContextProvider {...formattingOptions}>
				<PeopleContextProvider {...peopleOptions}>
					<SettingsContextProvider>
						<MobileHeader logo authentication user scrollIndicator />
						<Toolbar />
						<Panel />
						<ContentWrapper>
							{ children }
						</ContentWrapper>
					</SettingsContextProvider>
				</PeopleContextProvider>
			</FormattingContextProvider>
			<style jsx>{`
				.editor {
					height: 100%;
				}
				@media screen and (min-width: 1024px) {
					.editor {
						display: flex;
					}
				}
			`}</style>
		</div>
	)
}