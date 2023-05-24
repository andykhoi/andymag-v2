import { FC, useMemo } from 'react'
import ReactPlayer from 'react-player'
import { OnProgressProps } from 'react-player/base'
import { PodcastPlayerContextProvider, usePodcastPlayer } from '../context/PodcastPlayerContextProvider'
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
	// console.log(chapter)
	return (
		<div>
			<p>{chapter ? chapter.name : '-------'}</p>
		</div>
	)	
}

const Player: FC<PlayerProps> = ({
	url
}) => {
	const { play, setTime, setDuration, mute } = usePodcastPlayer()
	
	const onReadyHandler = (p: ReactPlayer) => {
		setDuration(p.getDuration())
		setTime(p.getCurrentTime())
	}

	const onProgressHandler = (e: OnProgressProps) => {
		if (play) setTime(e.playedSeconds)
	}

	return (
		<ReactPlayer
			url={url}
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

export const PodcastPlayer: FC<PodcastPlayerProps> = ({
	url,
	chapters
}) => {
	return (
		<PodcastPlayerContextProvider>
			<Play />
			<Timer />
			<Mute />
			<Chapter chapters={chapters}/>
			<Player url={url}/>
		</PodcastPlayerContextProvider>
	)
}