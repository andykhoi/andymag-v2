import { FC, PointerEvent, TouchEvent, useEffect, useMemo, useState, useRef } from 'react'
import ReactPlayer from 'react-player'
import { OnProgressProps } from 'react-player/base'
import { PodcastPlayerContextProvider, usePodcastPlayer } from '../context/PodcastPlayerContextProvider'
import { disableBodyScroll } from 'body-scroll-lock'
// import Slider from 'rc-slider'
// import 'rc-slider/assets/index.css'
import ReactSlider from 'react-slider'
import { Mute, PausePodcast, PlayPodcast, Unmute, Transcript } from '@/components/icons'
import { useFormatting } from '../context/FormattingContextProvider';

export interface PodcastPlayerProps {
	audioUrl: string
	chapters: {
		time: number,
		name: string
	}[]
}

interface SliderProps {
	chapters: {
		time: number,
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
	const { optimalContentWidth, defaultPadding } = useFormatting()
	return (
		<div onClick={() => togglePlay()}>
			{ !play ? <PlayPodcast /> : <PausePodcast /> }
			<style jsx>{`
				div {
					width: 36px;
					height: 36px;
				}
				@container content (min-width: calc(${optimalContentWidth} + 2 * ${defaultPadding})) {
					div {
						width: 40px;
						height: 40px;
					}
				}
			`}</style>
			{/* <button onClick={() => togglePlay()}>{play ? 'pause' : 'play'}</button> */}
		</div>
	)
}

const MuteButton: FC = () => {
	const { mute, toggleMute } = usePodcastPlayer()
	return (
		<div className="mute-button">
			{
				mute ? <button className="unmute" onClick={() => toggleMute()}><Unmute /></button> : <button className="mute" onClick={() => toggleMute()}><Mute /></button>
			}
			<style jsx>{`
				button {
					background: none;
					border: none;
					padding: 0;
					padding-left: 16px;
				}
				// .unmute {
				// 	padding-bottom: 9px;
				// }
				// .mute {
				// 	padding-bottom: 11px;	
				// }
				.mute-button {
					display: flex;
				}
			`}</style>
		</div>
	)
}

const TranscriptButton: FC = () => {
	const { transcriptScrolling, toggleTranscriptScrolling } = usePodcastPlayer()
	return (
		<div className="transcript-button">
			<button onClick={() => toggleTranscriptScrolling()}><Transcript color={transcriptScrolling ? 'white' : '#5A5A5A'}/></button>
			<style jsx>{`
				button {
					background: none;
					border: none;
					padding: 0;
					padding-right: 16px;
					border-right: 1px solid #474747; 
				}
				.transcript-button {
					display: flex;
				}
			`}</style>
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
			<style jsx>{`
				.timer {
					color: #5A5A5A;	
					font-size: 0.6em;
					font-weight: 700;
				}
			`}</style>
		</div>
	)
}

const Chapter: FC<ChapterProps> = ({
	chapters
}) => {
	const { time } = usePodcastPlayer()

	const getChapter = () => {
		if (!time) return null

		const index = chapters.findIndex((chapter => {
			return time ? time <= chapter.time : null 
		}))

		if (index >= 0) {
			return chapters[index - 1]
		} else {
			return chapters[chapters.length - 1]
		}
	}

	const chapter = getChapter()
	return (
		<div>
			<p>{chapter ? chapter.name : ''} / Fleeting But Not Fleeting</p>
			<style jsx>{`
				p {
					color: white;
					font-size: 0.7em;
					font-weight: 500;
					text-overflow: ellipsis;
					white-space: nowrap;
					overflow: hidden;
				}
			`}</style>
		</div>
	)	
}

const Player: FC<PlayerProps> = ({
	url
}) => {
	const { play, setTime, setDuration, mute, setIsReady, seek, seekTo, time, isReady, transcriptParts } = usePodcastPlayer()
	const playerRef = useRef<ReactPlayer>(null)

	const scrollToTranscript = (time: number) => {
		if (transcriptParts.length > 0) {
			const transcriptIndex = transcriptParts.findIndex(part => {
				return time < part.time
			})
			if (transcriptIndex > -1) transcriptParts[transcriptIndex - 1].ref.current?.scrollIntoView({ behavior: 'smooth' })
		}	
	}

	const onReadyHandler = (p: ReactPlayer) => {
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
		if (playerRef.current && seek) {
			playerRef.current.seekTo(seek)
		}	
	}, [seek])

	return (
		<ReactPlayer
			url={url}
			ref={playerRef}
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

const Slider: FC<SliderProps> = ({
	chapters
}) => {
	const { isReady, time, duration, seekTo, setTime } = usePodcastPlayer()
	const [seekPercentage, setSeekPercentage] = useState<null | number>(null)
	const [dragging, setDragging] = useState<boolean>(false)
	const sliderRef = useRef<HTMLDivElement>(null)
	
	const onPointerDownHandler = (e: PointerEvent<HTMLDivElement>) => {
		if (sliderRef.current) {
			setDragging(true)
			// console.log('test')
			// disableBodyScroll(sliderRef.current)
			document.body.style.overflow = 'hidden'
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
		document.body.style.overflow = 'auto'
		if (duration && seekPercentage) {
			setTime(seekPercentage * duration)
			seekTo(seekPercentage * duration) 
		}
		setDragging(false)
	}

	useEffect(() => {
		const handleWindowPointerMove = (e: globalThis.PointerEvent) => {
			if (!dragging) return

			if (sliderRef.current) {
				const pointerPercentage = (e.clientX - sliderRef.current.getBoundingClientRect().left) / sliderRef.current.offsetWidth
				setSeekPercentage(pointerPercentage)
			}
		}

		const handleWindowPointerUp = () => {
			if (!dragging) return 

			document.body.style.overflow = 'auto'
			if (duration && seekPercentage) {
				setTime(seekPercentage * duration)
				seekTo(seekPercentage * duration)
			}
			setDragging(false)
		}

		window.addEventListener('pointermove', handleWindowPointerMove)
		window.addEventListener('pointerup', handleWindowPointerUp)

		return () => {
			window.removeEventListener('pointermove', handleWindowPointerMove)
			window.removeEventListener('pointerup', handleWindowPointerUp)
		}

	}, [dragging, duration, seekTo, seekPercentage, setTime])

	return (
		<div
			className="slider"
			ref={sliderRef}
			onPointerDown={e => onPointerDownHandler(e)}
			onPointerMove={e => onPointerMoveHandler(e)}
			onPointerUp={e => onPointerUpHandler(e)}
		>
			<div className="slider-track" />
			<div className="time" />
			<div className="seek" />
			{
				chapters.map((c, i) => {
					// part 1 will usually start at 0:00, don't need a divider at the very start of the track
					if (i > 0) {
						return (
							<div key={`divider_${c.name}`} className="chapter-divider" style={{ position: 'absolute', left: duration ? `${(c.time / duration) * 100}%` : 0}}/>
						)
					}
				}) 
			}
			<style jsx>{`
				.slider {
					position: relative;
					height: 10px;
					display: flex;
					align-items: center;
				}
				.slider-track {
					height: 6px;
					background-color: #5A5A5A;
					border-radius: 1px;
					cursor: pointer;
					position: absolute;
					width: 100%;
				}
			`}</style>
			<style jsx>{`
				.time {
					visibility: ${ dragging ? 'hidden' : 'visible'};
					width: ${(time && duration) ? `${(time / duration) * 100}%;` : '0;' }
					height: 6px;
					background-color: #FFFFFF;
					border-radius: 1px 0px 0px 1px;
					position: absolute;
				}
			`}</style>
			<style jsx>{`
				.chapter-divider {
					width: 4px;
					background-color: black;
					height: 6px;
				}
				.chapter-labels {
					padding-top: 8px;
				}
				.chapter-label {
					display: flex;
					color: white;
					font-size: 0.75rem;
					background-color: black;
					padding: 8px;
					border-radius: 4px;
				}
				.chapter-part {
					font-weight: 900;
					color: #535353;
					padding-right: 12px;
				}
				.chapter-name {
					font-weight: 700;
				}
			`}</style>
			<style jsx>{`
				.seek {
					width: ${ seekPercentage ? `${seekPercentage * 100}%` : 0};
					height: 6px;
					background-color: #FFFFFF;
					border-radius: 1px 0px 0px 1px;
					position: absolute;
				}
			`}</style>
		</div>
	)
}

export const PodcastPlayer: FC<PodcastPlayerProps> = ({
	audioUrl,
	chapters
}) => {
	const { optimalContentWidth, defaultPadding } = useFormatting()
	return (
		<div className="podcast-player">
				<div className="screen">
					<Play />
					<div className="info">
						<Chapter chapters={chapters}/>
						<Timer />
					</div>
					<div className="controls">
						<TranscriptButton />
						<MuteButton />
					</div>
				</div>
				<div className="slider-wrap">
					<Slider chapters={chapters} />
					<Player url={audioUrl}/>
				</div>
			<style jsx>{`
				.podcast-player {
					--default-padding: 16px;
					--default-margin: 0px;
					--optimal-padding: 32px 0px;
					--optimal-margin: 0px 52px;
					--default-screen-margin: 0px 0px 22px 0px;
					--optimal-screen-margin: 0px 0px 28px 0px;
					grid-column: 1 / -1;
					background-color: #000000;
					border-bottom: 1px solid #212121;
					padding: var(--default-padding);
					font-family: Inter;
					transition: padding 165ms ease-in-out;
					position: sticky;
					top: 0;
				}
				.screen {
					display: flex;
					align-items: center;
					margin-bottom: 22px;
				}
				.info {
					flex: 2;
					padding: 0px 28px;	
					min-width: 0px;
				}
				.controls {
					display: flex;
					align-items: center;
				}
			`}</style>
			<style jsx>{`
				@media screen and (min-width: calc(${optimalContentWidth} + 2 * ${defaultPadding})) {
					.podcast-player {
						padding: var(--optimal-padding);
						margin: var(--optimal-margin);
					}
					.screen {
						margin: var(--optimal-screen-margin);
					}
				}
			`}</style>
			{/* on sidebar layout monitor the content container and resize the component accordingly (revert to default styling if container < optimal) */}
			<style jsx>{`
				@container content (max-width: calc(${optimalContentWidth} + 2 * ${defaultPadding} - 1px)) {
					.podcast-player {
						padding: var(--default-padding);
						margin: var(--default-margin)
					}
					.screen {
						margin: var(--default-screen-margin);
					}
				}
			`}</style>
			{/* <style jsx>{`
				@container content (min-width: calc(${optimalContentWidth} + 2 * ${defaultPadding})) {
					.podcast-player {
						padding: 32px 52px;
						// background: linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, #000 11.28%);
					}
					.screen {
						padding: 0px;
						margin-bottom: 28px;
					}
				}
			`}</style> */}
		</div>
		
	)
}