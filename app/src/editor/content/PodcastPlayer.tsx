import { FC, PointerEvent, TouchEvent, useEffect, useMemo, useState, useRef } from 'react'
import ReactPlayer from 'react-player'
import { OnProgressProps } from 'react-player/base'
import { PodcastPlayerContextProvider, usePodcastPlayer } from '../context/PodcastPlayerContextProvider'
// import Slider from 'rc-slider'
// import 'rc-slider/assets/index.css'
import ReactSlider from 'react-slider'

interface PodcastPlayerProps {
	url: string
	chapters: {
		time: string,
		name: string
	}[]
}

type PlayerProps = Pick<PodcastPlayerProps, 'url'>
type ChapterProps = Pick<PodcastPlayerProps, 'chapters'>

function convertTimeFormatToSeconds(time: string): number {
    let segments = time.split(':').reverse();

    let seconds = parseInt(segments[0], 10); // Seconds
    let minutes = segments[1] ? parseInt(segments[1], 10) : 0; // Minutes
    let hours = segments[2] ? parseInt(segments[2], 10) : 0; // Hours

    // Convert it all to seconds
    return seconds + minutes * 60 + hours * 3600;
}

function convertSecondsToTimeFormat(seconds: number | null): string {
    // Calculate hours, minutes, and seconds
	if (!seconds) return '00:00'
	
	seconds = Math.floor(seconds);

    let hrs = Math.floor(seconds / 3600);
    let mins = Math.floor((seconds % 3600) / 60);
    let secs = seconds % 60;

    // Format time as 2-digit strings
    let minsStr = (mins < 10 ? '0' : '') + mins;
    let secsStr = (secs < 10 ? '0' : '') + secs;

    // Combine the hours, minutes, and seconds
    let timeString = hrs > 0 ? `${hrs}:${minsStr}:${secsStr}` : `${minsStr}:${secsStr}`;

    return timeString;
}

const Play: FC = () => {
	const { togglePlay, play } = usePodcastPlayer()
	return (
		<div>
			<button onClick={() => togglePlay()}>{play ? 'pause' : 'play'}</button>
		</div>
	)
}

const Mute: FC = () => {
	const { mute, toggleMute } = usePodcastPlayer()
	return (
		<div>
			<button onClick={() => toggleMute()}>{mute ? 'unmute' : 'mute'}</button>
		</div>
	)
}

const Timer: FC = () => {
	const { time, duration, play } = usePodcastPlayer()
	const converttedTime = convertSecondsToTimeFormat(time)

	const converttedDuration = useMemo(() => {
		return convertSecondsToTimeFormat(duration)
	}, [duration])

	return (
		<div className="timer">
			<p>{ converttedTime } / { converttedDuration }</p>
		</div>
	)
}

const Chapter: FC<ChapterProps> = ({
	chapters
}) => {
	const { time } = usePodcastPlayer()

	const getChapter = () => {
		const index = chapters.findIndex((chapter => {
			const chapterTimeInSeconds = convertTimeFormatToSeconds(chapter.time)
			return time ? time >= chapterTimeInSeconds : null
		}))
		
		if (index >= 0) {
			return chapters[index]
		}

		return null
	}

	const chapter = getChapter()
	return (
		<div>
			<p>{chapter ? chapter.name : '-------'}</p>
		</div>
	)	
}

const Player: FC<PlayerProps> = ({
	url
}) => {
	const { play, setTime, setDuration, mute, setIsReady, seek, seekTo } = usePodcastPlayer()
	const playerRef = useRef<ReactPlayer>(null)

	const onReadyHandler = (p: ReactPlayer) => {
		setDuration(p.getDuration())
		setTime(p.getCurrentTime())
	}

	const onProgressHandler = (e: OnProgressProps) => {
		setIsReady(true)
		if (play) setTime(e.playedSeconds)
	}

	const onSeekHandler = () => {
		seekTo(null)
	}

	useEffect(() => {
		if (playerRef.current && seek) {
			playerRef.current.seekTo(seek)
		}	
	}, [seek])

	return (
		<ReactPlayer
			url={url}
			ref={playerRef}
			onSeek={onSeekHandler}
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

// function ChapterTrack({ chapters, duration, ...props }) {
// 	return (
// 	  <div {...props}>
// 		{chapters.map(chapter => {
// 		  const positionPercent = (chapter.time / duration) * 100;
// 		  return (
// 			<div
// 			  key={chapter.name}
// 			  style={{
// 				position: 'absolute',
// 				left: `${positionPercent}%`,
// 				width: '2px',
// 				height: '100%',
// 				background: 'blue',
// 			  }}
// 			/>
// 		  );
// 		})}
// 	  </div>
// 	);
//   }

// const Progress: FC = () => {
// 	const { time, duration } = usePodcastPlayer()
// 	return (
// 		<div>
// 			<ReactSlider
// 				value={time ? time : 0} 
// 				marks={[0, 230, 344, 440]} // chapter timestamps 
// 				markClassName="podcastTimestamp"
// 				max={duration ? duration : 0}
// 				className="podcastAudioSlider"
// 				trackClassName="podcastAudioTrack"				
// 			/>
// 			<style jsx>{`
// 				:global(.podcastAudioSlider) {
// 					height: 16px;
// 				}
// 				:global(.podcastAudioTrack) {
// 					height: 16px;
// 				}
// 				:global(.podcastAudioTrack-0) {
// 					height: 16px;
// 					background-color: #5A5A5A;
// 				}
// 				:global(.podcastAudioTrack-1) {
// 					height: 16px;
// 					background-color: #FFFFFF;
// 				}
// 				:global(.podcastTimestamp) {
// 					height: 100%;
// 					width: 2px;
// 					background-color: black;
// 				}
// 			`}</style>
// 		</div>
		
// 	)
// }

const Slider: FC = () => {
	const { isReady, time, duration, seekTo } = usePodcastPlayer()
	const [seekPercentage, setSeekPercentage] = useState<null | number>(null)
	const [dragging, setDragging] = useState<boolean>(false)
	const sliderRef = useRef<HTMLDivElement>(null)

	const onPointerDownHandler = (e: PointerEvent<HTMLDivElement>) => {
		if (sliderRef.current) {
			setDragging(true)
			const pointerPercentage = (e.clientX - sliderRef.current.getBoundingClientRect().left) / sliderRef.current.offsetWidth
			setSeekPercentage(pointerPercentage)
		}	
	}

	const onPointerMoveHandler = (e: PointerEvent<HTMLDivElement>) => {
		if (dragging && sliderRef.current) {
			const pointerPercentage = (e.clientX - sliderRef.current.getBoundingClientRect().left) / sliderRef.current.offsetWidth
			setSeekPercentage(pointerPercentage)
		}
	}

	const onPointerUpHandler = (e: PointerEvent<HTMLDivElement>) => {
		if (duration && seekPercentage) {
			seekTo(seekPercentage * duration)
		}
		// setSeekPercentage(null)
		setDragging(false)
	}

	// const calculateProgressWidth = () => {
	// 	if (dragging) {
	// 		// it's flashing back to this position
	// 		if (seekPercentage) {
	// 			return `${seekPercentage * 100}%`
	// 		}
	// 	} else {
	// 		if (time && duration) {
	// 			return `${(time / duration) * 100}%;`
	// 		}
	// 	}

	// 	return '0%'
	// }

	useEffect(() => {
		const handleWindowPointerMove = (e: globalThis.PointerEvent) => {
			if (dragging && sliderRef.current) {
				const pointerPercentage = (e.clientX - sliderRef.current.getBoundingClientRect().left) / sliderRef.current.offsetWidth
				setSeekPercentage(pointerPercentage)
			}
		}

		const handleWindowPointerUp = () => {
			if (duration && seekPercentage) {
				seekTo(seekPercentage * duration)
			}
			// setSeekPercentage(null)
			setDragging(false)
		}

		window.addEventListener('pointermove', handleWindowPointerMove)
		window.addEventListener('pointerup', handleWindowPointerUp)

		return () => {
			window.removeEventListener('pointermove', handleWindowPointerMove)
			window.removeEventListener('pointerup', handleWindowPointerUp)
		}

	}, [dragging, duration, seekTo, seekPercentage])

	return (
		<div
			className="slider"
			ref={sliderRef}
			onPointerDown={e => onPointerDownHandler(e)}
			onPointerMove={e => onPointerMoveHandler(e)}
			onPointerUp={e => onPointerUpHandler(e)}
		>
			<div className="seek" />
			<div className="time" />
			{/* <div className="progress" /> */}
			<style jsx>{`
				.slider {
					height: 4px;
					background-color: #5A5A5A;
					border-radius: 1px;
					cursor: pointer;
					position: relative;
				}
			`}</style>
			{/* <style jsx>{`
				.progress {
					width: ${ calculateProgressWidth() };
					height: 4px;
					background-color: #FFFFFF;
					border-radius: 1px 0px 0px 1px;
					position: absolute;
				}
			`}</style> */}
			<style jsx>{`
				.time {
					visibility: ${ dragging ? 'hidden' : 'visible'};
					width: ${(time && duration) ? `${(time / duration) * 100}%;` : '0;' }
					height: 4px;
					background-color: #FFFFFF;
					border-radius: 1px 0px 0px 1px;
					position: absolute;
				}
			`}</style>
			<style jsx>{`
				.seek {
					width: ${ seekPercentage ? `${seekPercentage * 100}%` : 0};
					height: 4px;
					background-color: #FFFFFF;
					border-radius: 1px 0px 0px 1px;
					position: absolute;
				}
			`}</style>
		</div>
	)
}

export const PodcastPlayer: FC<PodcastPlayerProps> = ({
	url,
	chapters
}) => {
	return (
		<div className="podcast-player">
			<PodcastPlayerContextProvider>
				<Play />
				<Timer />
				<Mute />
				<Chapter chapters={chapters}/>
				<Player url={url}/>
				<Slider />
				{/* <Progress /> */}
			</PodcastPlayerContextProvider>
			<style jsx>{`
				.podcast-player {
					grid-column: 1 / -1;
					background-color: #000000;
					padding: 8px;
				}
			`}</style>
		</div>
		
	)
}