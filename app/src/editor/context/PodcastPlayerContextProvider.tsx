import { createContext, FC, ReactNode, useState, Dispatch, SetStateAction, useContext, RefObject, useCallback, useRef } from 'react'
import { TranscriptPart } from '../content/TranscriptPart'

type TranscriptPart = {
	ref: RefObject<HTMLDivElement>
	time: number
}

interface PodcastPlayerContextType {
	play: boolean
	time: number | null
	togglePlay: () => void
	setTime: Dispatch<SetStateAction<number | null>>
	duration: number | null
	setDuration: Dispatch<SetStateAction<number | null>>
	mute: boolean
	toggleMute: () => void
	seek: number | null // could simplify by attaching player ref to context and making seekTo a helper function that wraps the player's seekTo method
	seekTo: (seek: number | null) => void
	isReady: boolean
	setIsReady:  Dispatch<SetStateAction<boolean>>
	toggleTranscriptScrolling: () => void
	transcriptScrolling: boolean
	transcriptParts: TranscriptPart[]
	// setTranscriptParts: Dispatch<SetStateAction<TranscriptPart[]>>
	addTranscriptPart: (part: TranscriptPart) => void
	removeTranscriptPart: (ref: RefObject<HTMLDivElement>) => void
}

interface PodcastPlayerContextProviderProps {
	children: ReactNode
}

const defaultPocdastPlayerContextValue = {
	play: false,
	time: null,
	togglePlay: () => null,
	setTime: () => null,
	setDuration: () => null,
	duration: null,
	mute: false,
	toggleMute: () => null,
	seekTo: () => null,
	seek: null,
	isReady: false,
	setIsReady: () => null,
	toggleTranscriptScrolling: () => null,
	transcriptScrolling: true,
	transcriptParts: [],
	addTranscriptPart: () => null,
	// setTranscriptParts: () => null,
	removeTranscriptPart: () => null
}

const PodcastPlayerContext = createContext<PodcastPlayerContextType>(defaultPocdastPlayerContextValue)

export const PodcastPlayerContextProvider: FC<PodcastPlayerContextProviderProps> = ({
	children
}) => {
	const [play, setPlay] = useState<boolean>(defaultPocdastPlayerContextValue.play)
	const [transcriptScrolling, setTranscriptScrolling] = useState<boolean>(defaultPocdastPlayerContextValue.transcriptScrolling)
	// const [transcriptParts, setTranscriptParts] = useState<TranscriptPart[]>(defaultPocdastPlayerContextValue.transcriptParts)
	const [time, setTime] = useState<number | null>(defaultPocdastPlayerContextValue.time)
	const [duration, setDuration] = useState<number | null>(defaultPocdastPlayerContextValue.duration)
	const [mute, setMute] = useState<boolean>(defaultPocdastPlayerContextValue.mute)
	const [seek, setSeek] = useState<null | number>(defaultPocdastPlayerContextValue.seek)
	const [isReady, setIsReady] = useState<boolean>(defaultPocdastPlayerContextValue.isReady)

	const transcriptParts = useRef<TranscriptPart[]>(defaultPocdastPlayerContextValue.transcriptParts)

	const seekTo = (seek: number | null) => {
		setSeek(() => seek ? seek : null)
	}

	const togglePlay = () => {
		setPlay(prev => !prev)
	}

	const toggleMute = () => {
		setMute(prev => !prev)
	}

	const toggleTranscriptScrolling = () => {
		setTranscriptScrolling(prev => !prev)
	}

	const addTranscriptPart = useCallback((part: TranscriptPart) => {
		transcriptParts.current = [...transcriptParts.current, part]
	}, [])

	const removeTranscriptPart = useCallback((ref: RefObject<HTMLDivElement>) => {
		const matchIndex = transcriptParts.current.findIndex(part => {
			return part.ref.current === ref.current
		})

		if (matchIndex > -1) {
			transcriptParts.current.splice(matchIndex, 1)
		}
	}, [])

	// const addTranscriptPart = useCallback((part: TranscriptPart) => {
	// 	console.log('add', part)
	// 	setTranscriptParts(prev => [...prev, part])
	// }, [])
	
	// const removeTranscriptPart = useCallback((ref: RefObject<HTMLDivElement>) => {
	// 	console.log('remove', ref.current)
	// 	setTranscriptParts(parts => {
	// 		const matchIndex = parts.findIndex(part => {
	// 			// console.log(part.ref.current === ref.current)
	// 			return part.ref.current === ref.current
	// 		})
	// 		// console.log(matchIndex)
	// 		if (matchIndex > -1) {
	// 			const update = parts.splice(matchIndex, 1)
	// 			return update
	// 		}
	// 		return parts
	// 	})
	// }, [])

	const store = {
		play,
		time,
		togglePlay,
		setTime,
		duration,
		setDuration,
		mute,
		toggleMute,
		seekTo,
		seek,
		isReady,
		setIsReady,
		toggleTranscriptScrolling,
		transcriptScrolling,
		transcriptParts: transcriptParts.current,
		// transcriptParts,
		// setTranscriptParts
		addTranscriptPart,
		removeTranscriptPart
	}
	// console.log(transcriptParts)
	return (
		<PodcastPlayerContext.Provider value={store}>
			{ children }
		</PodcastPlayerContext.Provider>
	)
}

export const usePodcastPlayer = () => {
	return useContext(PodcastPlayerContext)
}