import { FC, ReactNode } from 'react'
import { useFormatting } from '../context/FormattingContextWrapper'

interface GridProps {
	children: ReactNode
}

export const Grid: FC<GridProps> = ({
	children
}) => {
	const {
		optimalContentWidth,
		defaultPadding,
		breakpoints: {
			optimal,
			sidebar
		}
	} = useFormatting()

	const getTWDefaultClassNames = () => {
		return ['grid', 'w-screen', `grid-cols-[${defaultPadding}_1fr_${defaultPadding}] col-start-2 col-span-1`].join(' ')
	}

	const getTWOptimalBreakpointClassNames = () => {
		const optimalBreakpoint = `min-[calc(${optimal})]`
		return [`${optimalBreakpoint}:grid-cols-[1fr_${optimalContentWidth}_1fr]`]
	}

	const getTWSidebarBreakpointClassNames = () => {
		const sidebarBreakpoint = `min-[calc(${sidebar})]`
		return [`${sidebarBreakpoint}:w-[calc]`]
	}

	return (
		<div>
			{ children }
		</div>
	)
}