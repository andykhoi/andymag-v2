import Image from 'next/image'
import { FC } from 'react'
import { useFormatting } from '../../context/FormattingContextProvider'
import Content from '../Content'
export interface PodcastCoverProps {
	coverSrc: string,
	coverAlt: string
}

export const PodcastCover: FC<PodcastCoverProps> = ({
	coverSrc,
	coverAlt
}) => {
	const { fontFamilies } = useFormatting()

	return (
		<Content>
			<div className="cover">
				{/* think about how to make this customizable */}
				<div className="dafna-title">
					<span>
						FLEETING
					</span>
					<span>
						BUT NOT
					</span>
					<span>
						FLEETING
					</span>
				</div>
				<Image src={coverSrc} alt={coverAlt} fill style={{ objectFit: 'cover'}}/>
				<div className="cover-gradient" />
			</div>
			<style jsx>{`
					.cover {
						--default-height: calc(100% - var(--mobile-toolbar-height) - 104px);
						--optimal-height: calc(100% - 142px);
						position: relative;
						width: 100%;
						height: var(--default-height);
						// container: content / inline-size;
					}
					.dafna-title {
						position: absolute;
						color: #F32585;
						z-index: 10;
						top: 10em;
						display: flex;
						flex-direction: column;
						font-family: ${fontFamilies[`londrina_solid`].style.fontFamily};
					}
					.cover-gradient {
						position: absolute;
						bottom: 0;
						height: 80px;
						background: linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, #000 100%);
						width: 100%;
					}

					@container content (min-width: 1px) {
						.cover {
							// height: 10%;
							height: var(--optimal-height);
						}
					}
				`}
			</style>
		</Content>
	)
}