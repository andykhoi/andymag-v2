import { FC, ReactNode, useEffect } from 'react'
import { PodcastCover, PodcastCoverProps } from './PodcastCover'
import { PodcastPlayerProps } from './PodcastPlayer'
import { PodcastPlayer } from './PodcastPlayer'
import { PodcastPlayerContextProvider } from '../../context/PodcastPlayerContextProvider' 
import { useFormatting } from '../../context/FormattingContextProvider'
import { Row } from '../../components/Row'
import { Text } from '../Text'

type PodcastProps = PodcastPlayerProps & PodcastCoverProps & {
	children?: ReactNode
}

export const Podcast: FC<PodcastProps> = ({
	coverSrc,
	coverAlt,
	audioUrl,
	chapters,
	children
}) => {
	const { optimalContentWidth, defaultPadding } = useFormatting()
	// useEffect(() => console.log('podcast'), [])
	return (
		<PodcastPlayerContextProvider>
			<div className="podcast-landing">
				<PodcastCover coverAlt={coverAlt} coverSrc={coverSrc}/>
				<PodcastPlayer audioUrl={audioUrl} chapters={chapters}/>
			</div>
			<div className="transcript-wrap">
				{ children }
			</div>

			<style jsx>{`
				.podcast-landing {
					display: flex;
					flex-direction: column;
					height: calc(100% - 53px - env(safe-area-inset-bottom));	
				}

				.podcast {	
					height: 100%;
					background-color: #000000;
				}

				.transcript-wrap {
					--default-transcript-padding: 48px 0px 68px 0px;
					--optimal-transcript-padding: 68px 0px;
					color: #B0B0B0;
					// padding-top: 24px;
					// padding-bottom: 68px;
					padding: var(--default-transcript-padding);
					display: flex;
					flex-direction: column;
					gap: 24px;
					background-color: #000000;
				}

				@media screen and (min-width: 1024px) {
					.podcast-landing {
						height: 100%;
					}
				}
			`}</style>
			{/* <style jsx>{`
				@media screen and (min-width: calc(${optimalContentWidth} + 2 * ${defaultPadding})) {
					.transcript-wrap {
						padding: var(--optimal-transcript-padding);
					}
				}
			`}</style>
			<style jsx>{`
				@container content (max-width: calc(${optimalContentWidth} + 2 * ${defaultPadding} - 1px)) {
					.transcript-wrap {
						padding: var(--default-transcript-padding);
					}
				}
			`}</style> */}
		</PodcastPlayerContextProvider>
		
	)
}

// import { FC, ReactNode, useEffect } from 'react'
// import { PodcastCover, PodcastCoverProps } from './PodcastCover'
// import { PodcastPlayerProps } from './PodcastPlayer'
// import { PodcastPlayer } from './PodcastPlayer'
// import { PodcastPlayerContextProvider } from '../../context/PodcastPlayerContextProvider' 
// import { useFormatting } from '../../context/FormattingContextProvider'
// import { Row } from '../../components/Row'
// import { Text } from '../Text'

// type PodcastProps = PodcastPlayerProps & PodcastCoverProps & {
// 	children?: ReactNode
// }

// export const Podcast: FC<PodcastProps> = ({
// 	coverSrc,
// 	coverAlt,
// 	audioUrl,
// 	chapters,
// 	children
// }) => {
// 	const { optimalContentWidth, defaultPadding } = useFormatting()
// 	// useEffect(() => console.log('podcast'), [])
// 	return (
// 		<PodcastPlayerContextProvider>
// 			<div className="podcast">
// 				<div className="cover-wrap">
// 					{/* <Row height="100%"> */}
// 							<div className="flex">
// 								<PodcastCover coverAlt={coverAlt} coverSrc={coverSrc}/>
// 								<PodcastPlayer audioUrl={audioUrl} chapters={chapters}/>
// 							</div>
// 					{/* </Row> */}
// 				</div>
// 				{ 
// 					children && 
// 					<div className="transcript-wrap">
// 						{ children }
// 					</div>
// 				}
// 			</div>
// 			<style jsx>{`
// 				.podcast {	
// 					--default-transcript-padding: 48px 0px 68px 0px;
// 					--optimal-transcript-padding: 68px 0px;
// 					height: 100%;
// 					background-color: #000000;
// 				}

// 				.cover-wrap {
// 					height: calc(100% - 53px - env(safe-area-inset-bottom));	
// 				}

// 				.transcript-wrap {
// 					color: #B0B0B0;
// 					// padding-top: 24px;
// 					// padding-bottom: 68px;
// 					padding: var(--default-transcript-padding);
// 					display: flex;
// 					flex-direction: column;
// 					gap: 24px;
// 					background-color: #000000;
// 				}

// 				.flex {
// 					grid-column: -1 / 1;
// 					display: flex;
// 					flex-direction: column;
// 				}

// 				@media screen and (min-width: 1024px) {
// 					.cover-wrap {
// 						height: 100%;
// 					}
// 				}
// 			`}</style>
// 			<style jsx>{`
// 				@media screen and (min-width: calc(${optimalContentWidth} + 2 * ${defaultPadding})) {
// 					.transcript-wrap {
// 						padding: var(--optimal-transcript-padding);
// 					}
// 				}
// 			`}</style>
// 			<style jsx>{`
// 				@container content (max-width: calc(${optimalContentWidth} + 2 * ${defaultPadding} - 1px)) {
// 					.transcript-wrap {
// 						padding: var(--default-transcript-padding);
// 					}
// 				}
// 			`}</style>
// 		</PodcastPlayerContextProvider>
		
// 	)
// }

