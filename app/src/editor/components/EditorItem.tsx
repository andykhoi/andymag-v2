import { FC, ReactNode } from 'react'
import { useFormatting } from '../context/FormattingContextProvider'

export interface EditorItemProps {
	baselineAlignment?: 'full-bleed' | 'centered',
	breakpointAlignment?: 'full-bleed' | 'centered',
	children: ReactNode
}

export const EditorItem: FC<EditorItemProps> = ({
	children,
	baselineAlignment = 'centered',
	breakpointAlignment = baselineAlignment
}) => {
	const {		
		optimalContentWidth,
		defaultPadding,
	} = useFormatting()

	return (
		<div className="grid-item">
			{ children }
			<style jsx>{`
				.grid-item {
					grid-column: ${baselineAlignment === 'centered' ? 2 : '1 / -1'}
				}

				@container content (min-width: calc(${optimalContentWidth} + 2 * ${defaultPadding})) {
					.grid-item {
						grid-column: ${breakpointAlignment === 'centered' ? 2 : '1 / -1'}
					}
				}
			`}</style>
		</div>
	)
}