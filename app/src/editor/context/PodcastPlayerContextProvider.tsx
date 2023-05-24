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
	toggleMute: () => null
}

const PodcastPlayerContext = createContext<PodcastPlayerContextType>(defaultPocdastPlayerContextValue)

export const PodcastPlayerContextProvider: FC<PodcastPlayerContextProviderProps> = ({
	children
}) => {
	const [play, setPlay] = useState<boolean>(defaultPocdastPlayerContextValue.play)
	const [time, setTime] = useState<number | null>(defaultPocdastPlayerContextValue.time)
	const [duration, setDuration] = useState<number | null>(defaultPocdastPlayerContextValue.duration)
	const [mute, setMute] = useState<boolean>(defaultPocdastPlayerContextValue.mute)

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
		toggleMute
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