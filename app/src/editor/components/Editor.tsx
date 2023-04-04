import { FC, ReactNode } from 'react'

import { FormattingContextWrapper } from '../context/FormattingContextWrapper'
import { PeopleContextWrapper } from '../context/PeopleContextWrapper'
import { ContentWrapper } from './ContentWrapper'

import { FormattingContextWrapperProps } from '../context/FormattingContextWrapper'
import { PeopleContextWrapperProps } from '../context/PeopleContextWrapper'
import { Sidebar } from './Sidebar'

type EditorProps = FormattingContextWrapperProps & PeopleContextWrapperProps & {
	children: ReactNode
}

export const Editor: FC<EditorProps> = ({
	autoCollapseHeader,
	defaultPadding,
	optimalContentWidth,
	fontScale,
	fontSizingChart,
	people,
	children
}) => {
	const formattingOptions = {
		autoCollapseHeader,
		defaultPadding,
		optimalContentWidth,
		fontScale,
		fontSizingChart,
	}
	const peopleOptions = {
		people
	}
	return (
		<>
			<FormattingContextWrapper {...formattingOptions}>
				<PeopleContextWrapper {...peopleOptions}>
					{/* <Header component here */}
					<div>
						<Sidebar />
						<ContentWrapper>
							{ children }
						</ContentWrapper>
					</div>
					{/* toolbar component here */}
				</PeopleContextWrapper>
			</FormattingContextWrapper>
			<style jsx>{`
				div {
					display: flex;
					height: 100%;
				}
			`}</style>
		</>
	)
}