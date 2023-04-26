import { FC, ReactNode } from 'react'
import { useFormatting } from '../context/FormattingContextProvider'

interface GridProps {
	children: ReactNode
}

export const Grid: FC<GridProps> = ({
	children
}) => {
	const {
		optimalContentWidth,
		defaultPadding,
		sidebarWidth,
		breakpoints: {
			optimal,
			sidebar
		}
	} = useFormatting()
	
	return (
		<>
		<div>
			{ children }
			
			{/* styles */}
			<style jsx>{`
				div {
					display: grid;
					width: 100%;
					grid-auto-flow: column;
					// min-height: 100%;
				}
				div > :global(div) {
					grid-column: 2;
				}
			`}</style>
			<style jsx>{`
				div {
					grid-template-columns: 1fr min(${optimalContentWidth}, calc(100% - (2*${defaultPadding}))) 1fr;
				}
			`}</style>
			{/* <style jsx>{`
				@media screen and (min-width: calc(${optimal})) {
					div {
						grid-template-columns: 1fr ${optimalContentWidth} 1fr;
					}
				}
			`}</style> */}

			{/* margin styling when sidebar is present */}
			{/* <style jsx>{`
				@media screen and (min-width: calc(${sidebar})) {
					div {
						margin-left: auto;
					}
				}
			`}</style> */}

			{/* width styling when sidebar present - two states: open or closed */}
			{/* <style jsx>{`
				@media screen and (min-width: calc(${sidebar})) {
					div {
						width: calc(100% - ${sidebarWidth});
					}
				}
			`}</style> */}
		</div>
		</>

	)
}