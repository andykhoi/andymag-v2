import { FC, useRef, useEffect, RefObject } from 'react'
import { PodcastPlayerProps } from './PodcastPlayer'
import ReactPlayer from 'react-player'
import ReactPlayerType from 'react-player/types'
import { OnProgressProps } from 'react-player/base'

import { usePodcastPlayer } from '@/editor/context/PodcastPlayerContextProvider'

type HiddenPlayerProps = Pick<PodcastPlayerProps, 'audioUrl'> & { 
	hiddenPlayerRef: RefObject<ReactPlayerType>
}

const HiddenPlayer: FC<HiddenPlayerProps> = ({
	audioUrl,
	hiddenPlayerRef
}) => {
	const { play, setTime, setDuration, mute, setIsReady, seek, seekTo, time, isReady, transcriptParts } = usePodcastPlayer()
	// const playerRef = useRef<ReactPlayerType>(null)
	const scrollToTranscript = (time: number) => {
		if (transcriptParts.length > 0) {
			const transcriptIndex = transcriptParts.findIndex(part => {
				return time < part.time
			})
			if (transcriptIndex > -1) transcriptParts[transcriptIndex - 1].ref.current?.scrollIntoView({ behavior: 'smooth' })
		}	
	}	

	const onReadyHandler = (p: ReactPlayerType) => {
		if (isReady) return
		
		setIsReady(true)
		setDuration(p.getDuration())
		setTime(p.getCurrentTime())
	}

	const onProgressHandler = (e: OnProgressProps) => {
		// if (play) setTime(e.playedSeconds)
		setTime(e.playedSeconds)
		scrollToTranscript(e.playedSeconds)
	}

	const onSeekHandler = (e: number) => {
		// setTime(e)
		seekTo(null)
	}

	useEffect(() => {
		if (hiddenPlayerRef.current && seek) {
			hiddenPlayerRef.current.seekTo(seek)
		}	
	}, [hiddenPlayerRef, seek])

	return (
		<ReactPlayer
			url={audioUrl}
			ref={hiddenPlayerRef}
			onSeek={e => onSeekHandler(e)}
			config={{file:{forceAudio: true}}}
			playing={play}
			height={0}
			width={0}
			muted={mute}
			onReady={p => onReadyHandler(p)}
			onProgress={(e) => onProgressHandler(e)}
		/>
	)
}

export default HiddenPlayer