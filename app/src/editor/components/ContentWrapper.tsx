import { FC, ReactNode, useEffect } from 'react'
import { Font } from './Font'
import { Grid } from './Grid'
import { useFormatting } from '../context/FormattingContextProvider'
import { useActivity, useUserFormatting } from '@/contexts/UserContext'
import { Spinner } from '@/components/Spinner'
import { useUser } from '@clerk/nextjs'

interface ContentWrapperProps {
	children: ReactNode
}

export const ContentWrapper: FC<ContentWrapperProps> = ({
	children
}) => {
	const { isLoaded, formatting: userFormatting } = useUserFormatting()
	
	const {
		fontSizingChart,
		defaultFont,
		fontFamilies,
		optimalContentWidth,
		defaultPadding,
	} = useFormatting()

	return (
		<>
			{	(isLoaded && userFormatting) ?
				<div className="content">
					<div className="font">
						<div className="grid">
							{ children }
						</div>
					</div>
					<style jsx>{`
						.font {
							font-family: ${fontFamilies[`${defaultFont}`].style.fontFamily};
							font-size: ${fontSizingChart[`${userFormatting.fontScale}`]};
						}
						.grid {
							display: grid;
							width: 100%;
							grid-auto-flow: column;
							// min-height: 100%;
						}
						.grid > :global(div) {
							grid-column: 2;
						}
					`}</style>
					<style jsx>{`
						.grid {
							grid-template-columns: 1fr min(${optimalContentWidth}, calc(100% - (2*${defaultPadding}))) 1fr;
						}
					`}</style>
					<style jsx>{`
						.content {
							flex: 1;
							overflow-y: scroll;
						}
					`}</style>
				</div>
				:
				<Spinner />
			}
		</>
		
	)
}

// export const ContentWrapper: FC<ContentWrapperProps> = ({
// 	children
// }) => {
// 	const {
// 		isLoaded,
// 		fontScale,
// 		fontSizingChart,
// 		defaultFont,
// 		fontFamilies,
// 		optimalContentWidth,
// 		defaultPadding,
// 		updateFormatting
// 	} = useFormatting()

// 	return (
// 		<>
// 			{	(isLoaded && fontScale) ?
// 				<div className="content">
// 					<div className="font">
// 						<div className="grid">
// 							<button onClick={() => isLoaded && updateFormatting && updateFormatting({ fontScale: 'lg'})}>update font scale to large</button>
// 							{ children }
// 						</div>
// 					</div>
// 					<style jsx>{`
// 						.font {
// 							font-family: ${fontFamilies[`${defaultFont}`].style.fontFamily};
// 							font-size: ${fontSizingChart[`${fontScale}`]};
// 						}
// 						.grid {
// 							display: grid;
// 							width: 100%;
// 							grid-auto-flow: column;
// 							// min-height: 100%;
// 						}
// 						.grid > :global(div) {
// 							grid-column: 2;
// 						}
// 					`}</style>
// 					<style jsx>{`
// 						.grid {
// 							grid-template-columns: 1fr min(${optimalContentWidth}, calc(100% - (2*${defaultPadding}))) 1fr;
// 						}
// 					`}</style>
// 					<style jsx>{`
// 						.content {
// 							flex: 1;
// 							overflow-y: scroll;
// 						}
// 					`}</style>
// 				</div>
// 				:
// 				<Spinner />
// 			}
// 		</>
		
// 	)

// 	// const getEditorFontFamily = () => {
// 	// 	const family = fontFamilies[`${defaultFont}`]
// 	// 	return family.style.fontFamily
// 	// }

// 	// const getEditorFontSize = () => {
// 	// 	const fontSize = fontSizingChart[`${fontScale}`]
// 	// 	return fontSize
// 	// }

// 	// return (
// 	// 	<>
// 	// 		<div>
// 	// 			<Font>
// 	// 				<Grid>
// 	// 					{ children }
// 	// 				</Grid>
// 	// 			</Font>
// 	// 		</div>
// 	// 		<style jsx>{`
// 	// 			div {
// 	// 				flex: 1;
// 	// 				overflow-y: scroll;
// 	// 			}
// 	// 		`}</style>
// 	// 	</>
// 	// )
// }

// import { FC, ReactNode } from 'react'
// import { Font } from './Font'
// import { Grid } from './Grid'

// interface ContentWrapperProps {
// 	children: ReactNode
// }

// export const ContentWrapper: FC<ContentWrapperProps> = ({
// 	children
// }) => {
// 	return (
// 		<>
// 			<div>
// 				<Font>
// 					<Grid>
// 						{ children }
// 					</Grid>
// 				</Font>
// 			</div>
			// <style jsx>{`
			// 	div {
			// 		flex: 1;
			// 		overflow-y: scroll;
			// 	}
			// `}</style>
// 		</>
// 	)
// }