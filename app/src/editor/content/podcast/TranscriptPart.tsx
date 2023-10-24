import { FC, ReactNode, useEffect, useRef } from 'react'
import { usePodcastPlayer } from '../../context/PodcastPlayerContextProvider'
import { useFormatting } from '../../context/FormattingContextProvider'
import { Text } from '../Text'

interface TranscriptPartProps {
	time: number
	children: ReactNode
}

export const TranscriptPart: FC<TranscriptPartProps> = ({
	time,
	children
}) => {
	const transcriptRef = useRef<HTMLDivElement>(null)
	const {
		addTranscriptPart,
		transcriptParts,
		removeTranscriptPart
	} = usePodcastPlayer()
	const { activeContentBreakpoint } = useFormatting()

	useEffect(() => {
		if (transcriptRef.current) {
			addTranscriptPart({ 
				ref: transcriptRef,
				time
			})
		}
		return () => {
			removeTranscriptPart(transcriptRef)
		}
	}, [addTranscriptPart, time, removeTranscriptPart])

	return (
		<div className={`transcript-part${activeContentBreakpoint === 'optimal' ? ' optimal' : ''}`}ref={transcriptRef}>
			<Text>
				{ children }
			</Text>
			<style jsx>{`
				.transcript-part {
					--default-scroll-margin-top: calc(103px + 48px);
					--optimal-scroll-margin-top: calc(142px + 68px);
					scroll-margin-top: var(--default-scroll-margin-top);
				}

				.transcript-part.optimal {
					--optimal-scroll-margin-top: calc(142px + 68px);
				}
			`}</style>
		</div>
	)
}