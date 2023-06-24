import { createContext, FC, ReactNode, useState, Dispatch, SetStateAction, useContext } from 'react'

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
	setIsReady: () => null
}

const PodcastPlayerContext = createContext<PodcastPlayerContextType>(defaultPocdastPlayerContextValue)

export const PodcastPlayerContextProvider: FC<PodcastPlayerContextProviderProps> = ({
	children
}) => {
	const [play, setPlay] = useState<boolean>(defaultPocdastPlayerContextValue.play)
	const [time, setTime] = useState<number | null>(defaultPocdastPlayerContextValue.time)
	const [duration, setDuration] = useState<number | null>(defaultPocdastPlayerContextValue.duration)
	const [mute, setMute] = useState<boolean>(defaultPocdastPlayerContextValue.mute)
	const [seek, setSeek] = useState<null | number>(defaultPocdastPlayerContextValue.seek)
	const [isReady, setIsReady] = useState<boolean>(defaultPocdastPlayerContextValue.isReady)

	const seekTo = (seek: number | null) => {
		setSeek(() => seek ? seek : null)
	}

	const togglePlay = () => {
		setPlay(prev => !prev)
	}

	const toggleMute = () => {
		setMute(prev => !prev)
	}

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
		setIsReady
	}

	return (
		<PodcastPlayerContext.Provider value={store}>
			{ children }
		</PodcastPlayerContext.Provider>
	)
}

export const usePodcastPlayer = () => {
	return useContext(PodcastPlayerContext)
}