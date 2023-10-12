import { FC, ReactNode, useEffect, Children, useState, useRef } from 'react'
// import { Font } from './Font'
// import { Grid } from './Grid'
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
		setActiveContentBreakpoint,
		activeContentBreakpoint,
		breakpoints,
	} = useFormatting()

	
	const [isContentLoading, setIsContentLoading] = useState<boolean>(true) // have to wait for saved user formatting and content resizing
	const contentRef = useRef<HTMLDivElement>(null)

	// init activeContentBreakpoint & add resizeObserver to content div 
	useEffect(() => {
		const updateActiveBreakpoint = (el: HTMLDivElement) => {
			if (currentRef) {
				const optimalBreakpointPixelValue = Number(breakpoints['optimal'].replace('px', ''))
				if (currentRef.clientWidth >= optimalBreakpointPixelValue) {
					setActiveContentBreakpoint('optimal')
				} else {
					setActiveContentBreakpoint('default')
				}
			}
		}

		const resizeObserver = new ResizeObserver(([content]) => { 
			updateActiveBreakpoint(content.target as HTMLDivElement)
		})

		const currentRef = contentRef.current

		if (currentRef) {
			updateActiveBreakpoint(currentRef)
			resizeObserver.observe(currentRef)
		}

		return () => {
			if (currentRef) {
				resizeObserver.unobserve(currentRef)
			}
		}
 	}, [setActiveContentBreakpoint, breakpoints])

	// remove loader after all necessary stlying mutations have been painted
	useEffect(() => {
		if (isLoaded && userFormatting && activeContentBreakpoint) {
			setIsContentLoading(false)
		}
	}, [isLoaded, userFormatting, activeContentBreakpoint])

	return (
		<>
			<div className="content" ref={contentRef}>
				<div className={`loader${!isContentLoading ? ' hide' : ''}`}>
					loading ... 
				</div>
				{ children }
				<style jsx>{`
					.content {
						width: 100%;
						overscroll-behavior: contain;
						height: 100%;
						overflow-y: visible;
						position: relative;
					}
					.loader { 
						position: absolute;
						height: 100%;
						width: 100%;
						background-color: blue;
						display: flex; 
						align-items: center;
						justify-content: center;
						z-index: 3;
					}
					.hide {
						display: none;
					}
					@media screen and (min-width: 1024px) {
						.content {
							overflow-y: scroll;
						}
					}
				`}</style>
				<style jsx>{`
					.content {
						font-family: ${fontFamilies[`${defaultFont}`].style.fontFamily};
						font-size: ${ userFormatting ? fontSizingChart[`${userFormatting.fontScale}`] : fontSizingChart['md']};
					}
				`}</style>
			</div>	
		</>
		
	)
}


// import { FC, ReactNode, useEffect, Children } from 'react'
// import { Font } from './Font'
// import { Grid } from './Grid'
// import { useFormatting } from '../context/FormattingContextProvider'
// import { useActivity, useUserFormatting } from '@/contexts/UserContext'
// import { Spinner } from '@/components/Spinner'
// import { useUser } from '@clerk/nextjs'

// interface ContentWrapperProps {
// 	children: ReactNode
// }

// export const ContentWrapper: FC<ContentWrapperProps> = ({
// 	children
// }) => {
// 	const { isLoaded, formatting: userFormatting } = useUserFormatting()
	
// 	const {
// 		fontSizingChart,
// 		defaultFont,
// 		fontFamilies,
// 		optimalContentWidth,
// 		defaultPadding,
// 	} = useFormatting()
// 	const arrayChildren = Children.toArray(children)
// 	return (
// 		<>
// 			{/* probably better loading would be showing loader all the way until the content wrapper content is mounted.
// 				basically something like a loader overlay that sits on top until content is "ready" 
// 				- probably can write some JS event to watch if content above the fold has loaded
// 			*/}
// 			{	(isLoaded && userFormatting) ?
// 				<div className="content">
// 					<div className="font">
// 						<div className="grid">
// 							{ children }
// 						</div>
// 					</div>
// 					<style jsx>{`
// 							.content {
// 								width: 100%;
// 								overscroll-behavior: contain;
// 								container: content / normal;
// 								height: 100%;
// 							}
// 							.grid {
// 								display: grid;
// 								width: 100%;
// 								grid-template-rows: auto;
// 								height: 100%;
// 							}
// 							@media screen and (min-width: 1024px) {
// 								.content {
// 									overflow-y: scroll;
// 								}
// 							}
// 					`}</style>
// 					<style jsx>{`
// 						.grid {
// 							grid-template-columns: 1fr min(${optimalContentWidth}, calc(100% - (2*${defaultPadding}))) 1fr;
// 						}
// 					`}</style>
// 					<style jsx>{`
// 						.font {
// 							font-family: ${fontFamilies[`${defaultFont}`].style.fontFamily};
// 							font-size: ${fontSizingChart[`${userFormatting.fontScale}`]};
// 							height: 100%;
// 						}
// 					`}</style>
// 					<style jsx>{`
// 						@media screen and (min-width: 1024px) {
// 							.content {
// 								container: content / inline-size;
// 							}
// 						}
// 					`}</style>
// 				</div>	
// 				:
// 				<Spinner />
// 			}
// 		</>
		
// 	)
// }

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