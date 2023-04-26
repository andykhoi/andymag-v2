// import {
// 	FC,
// 	createContext,
// 	useState,
// 	ReactNode,
// 	Dispatch,
// 	SetStateAction,
// 	useContext,
// 	useEffect,
// 	useCallback
// } from 'react'
// // import { Inter } from '@next/font/google'
// import localFont  from '@next/font/local'
// import { NextFont, NextFontWithVariable } from '@next/font'
// import { useUser } from '@clerk/nextjs'
// import { useGetFormattingLazyQuery, GetFormattingQuery } from '@/graphql/queries/getFormatting'
// // import { useGetFontScaleLazyQuery, GetFontScaleQuery } from '@/graphql/queries/getFontScale'
// import { getAnonData, initAnonData, setAnonData } from '@/utils/localStorage'
// import { Formatting } from '@/types/custom'
// import { useUpdateUserFormattingMutation } from '@/graphql/mutations/updateUserFormatting'

// interface FormattingContextType {
// 	isLoaded: boolean
// 	defaultPadding: string
// 	optimalContentWidth: string
// 	autoCollapseHeader: boolean

// 	sidebarWidth: string
// 	panelWidth: string

// 	breakpoints: { // breakpoint properties should be used with css 'calc' 
// 		optimal: string
// 		sidebar: string
// 	}

// 	fontScale: 'sm' | 'md' | 'lg' | undefined
// 	fontSizingChart: {
// 		sm: string,
// 		md: string,
// 		lg: string,
// 	}
// 	fontFamilies: {
// 		[family: string]: NextFont
// 		// charter: NextFontWithVariable,
// 		// inter: NextFont
// 	}
// 	defaultFont: string

// 	setFontScale: Dispatch<SetStateAction<'sm' | 'md' | 'lg' | undefined>>
// 	// setfontSizingChart: Dispatch<SetStateAction<{
// 	// 	sm: string,
// 	// 	md: string,
// 	// 	lg: string,
// 	// }>>

// 	// setDefaultFont: Dispatch<SetStateAction<string>>
// 	// setDefaultPadding: Dispatch<SetStateAction<string>>
// 	// setOptimalContentWidth: Dispatch<SetStateAction<string>>
// 	setAutoCollapseHeader: Dispatch<SetStateAction<boolean>>

// 	updateFormatting: undefined | ((formatting: Formatting) => void)
// }

// export type FormattingContextProviderProps = Partial<Pick<FormattingContextType, 'autoCollapseHeader' | 'defaultPadding' | 'optimalContentWidth' | 'fontSizingChart' | 'breakpoints' | 'panelWidth' | 'sidebarWidth'>> & { children: ReactNode }

// // const inter = Inter({
// // 	weight: 'variable',
// // 	subsets: ['latin'],
// // 	variable: '--font-inter',
// // })

// const charter = localFont({
// 	src: [
// 		{
// 			path: '../fonts/charter-roman.woff2',
// 			weight: '400',
// 			style: 'normal'
// 		},
// 		{
// 			path: '../fonts/charter-italic.woff2',
// 			weight: '400',
// 			style: 'italic'
// 		},
// 		{
// 			path: '../fonts/charter-bold.woff2',
// 			weight: '700',
// 			style: 'normal'
// 		},
// 		{
// 			path: '../fonts/charter-bolditalic.woff2',
// 			weight: '700',
// 			style: 'italic'
// 		},
// 		{
// 			path: '../fonts/charter-black.woff2',
// 			weight: '900',
// 			style: 'normal',
// 		},
// 		{
// 			path: '../fonts/charter-blackitalic.woff2',
// 			weight: '900',
// 			style: 'italic'
// 		}
// 	],
// 	// variable: '--font-charter'
// })

// const defaultFormattingContextValue: FormattingContextType = {
// 	isLoaded: false,
// 	defaultPadding: '23px',
// 	optimalContentWidth: '723px',
// 	autoCollapseHeader: false,

// 	sidebarWidth: '76px',
// 	panelWidth: '352px',

// 	breakpoints: {
// 		optimal: '',
// 		sidebar: ''
// 	},

// 	fontScale: undefined,
// 	fontSizingChart: {
// 		sm: '18px',
// 		md: '20px',
// 		lg: '22px',
// 	},
// 	fontFamilies: {
// 		charter,
// 	},
// 	defaultFont: 'charter',

// 	setFontScale: () => null,
// 	// setfontSizingChart: () => null,
// 	// setDefaultPadding: () => null,
// 	setAutoCollapseHeader: () => null,
// 	// setOptimalContentWidth: () => null
// 	updateFormatting: undefined
// }

// export const FormattingContext = createContext<FormattingContextType>(defaultFormattingContextValue)
// export const FormattingContextProvider = FormattingContext.Provider
// export const FormattingContextConsumer = FormattingContext.Consumer

// export const FormattingContextProvider: FC<FormattingContextProviderProps> = ({
// 	defaultPadding: overrideDefaultPadding = null,
// 	optimalContentWidth: overrideOptimalContentWidth = null,
// 	autoCollapseHeader: overrideAutoCollapseHeader = null,
// 	// fontScale: overrideFontScale = null,
// 	fontSizingChart: overridefontSizingChart = null,
// 	panelWidth: overridePanelWidth = null,
// 	sidebarWidth: overrideSidebarWidth = null,
// 	children
// }) => {
// 	const {
// 		isLoaded: isClerkLoaded,
// 		user,
// 	} = useUser()
// 	const id = user?.id

// 	const [isLoaded, setIsLoaded] = useState(defaultFormattingContextValue.isLoaded)
// 	const [defaultPadding, setDefaultPadding] = useState(overrideDefaultPadding || defaultFormattingContextValue.defaultPadding)
// 	const [optimalContentWidth, setOptimalContentWidth] = useState(overrideOptimalContentWidth || defaultFormattingContextValue.optimalContentWidth)
// 	const [autoCollapseHeader, setAutoCollapseHeader] = useState(overrideAutoCollapseHeader || defaultFormattingContextValue.autoCollapseHeader)
// 	const [fontScale, setFontScale] = useState(defaultFormattingContextValue.fontScale)
// 	const [fontSizingChart, setfontSizingChart] = useState(overridefontSizingChart || defaultFormattingContextValue.fontSizingChart)
// 	const [fontFamilies, ] = useState(defaultFormattingContextValue.fontFamilies)
// 	const [defaultFont, ] = useState(defaultFormattingContextValue.defaultFont)
// 	const [sidebarWidth, ] = useState(overrideSidebarWidth || defaultFormattingContextValue.sidebarWidth)
// 	const [panelWidth, ] = useState(overridePanelWidth || defaultFormattingContextValue.panelWidth)
// 	const [breakpoints, ] = useState({
// 		optimal: `${optimalContentWidth} + (2 * ${defaultPadding})`,
// 		sidebar: `${sidebarWidth} + ${panelWidth} + (${optimalContentWidth} + (2 * ${defaultPadding}))`,
// 	})

// 	const [getFormatting, ] = useGetFormattingLazyQuery()
// 	const [updateUserFormatting, ] = useUpdateUserFormattingMutation()

// 	const updateFormatting = useCallback(async (formatting: Partial<Formatting>) => {
// 		// prob need to rate limit this function
// 		if (!id) {
// 			// update localStorage
// 			const old = getAnonData()
// 			let updated
// 			if (!old) {
// 				const initialized = initAnonData()
// 				updated = {...initialized, formatting: {...initialized.formatting, ...formatting}}
// 			} else {
// 				updated = { ...old, formatting: {...old.formatting, ...formatting }}
// 			}
			
// 			const didUpdate = setAnonData({ ...updated })
			
// 			if (didUpdate) {
// 				setFontScale(didUpdate.formatting.fontScale)
// 			}
// 		} else {
// 			// update user's hasura data
// 			const updated = {
// 				// include any user configurable formatting properties
// 				fontScale,
// 				...formatting
// 			}
// 			const { data } = await updateUserFormatting({
// 				variables: {
// 					id,
// 					formatting: updated
// 				}
// 			})

// 			const didUpdate = data?.update_users?.returning[0]
// 			if (didUpdate) {
// 				setFontScale(didUpdate.formatting.fontScale)
// 			}
// 		}
// 	}, [id, fontScale, updateUserFormatting])

// 	useEffect(() => {
// 		if (!isClerkLoaded) return

// 		const pollUserData = async (id: string): Promise<GetFormattingQuery> => {
// 			let tries = 0
// 			const maxTries = 5
			
// 			return new Promise(async (resolve, reject) => {
// 				const poll = async () => {
// 					tries++
				
// 					try {
// 						const { data } = await getFormatting({ variables: { id }, fetchPolicy: 'network-only' })
// 						if (data?.users[0]) {
// 							resolve(data)
// 							return true
// 						} else if (tries >= maxTries) {
// 							// need better error handling
// 							reject(new Error(`Polling stopped after ${maxTries} tries.`))
// 							return false
// 						}
// 					} catch (error) {
// 						reject(error)
// 						return false
// 					}
					
// 					return false
// 				}
			
// 				const attemptPolling = async () => {
// 					const result = await poll()
// 					if (!result && tries < maxTries) {
// 						setTimeout(attemptPolling, 1500)
// 					}
// 				}
			
// 				attemptPolling()
// 			})
// 		}
		
// 		const getData = async () => {
// 			let data: Pick<FormattingContextType, 'fontScale'> = {
// 				fontScale: 'md'
// 			}

// 			if (id) {
// 				const userData = await pollUserData(id)

// 				data.fontScale = userData?.users[0].formatting.fontScale
// 			} else {
// 				const anonData = getAnonData()
// 				data.fontScale = anonData ? anonData.formatting.fontScale : initAnonData().formatting.fontScale
// 			}

// 			return data
// 		}

// 		const init = async () => {			
// 			const userData = await getData()

// 			setFontScale(() => userData.fontScale)
// 			setIsLoaded(() => true)
// 		}

// 		init()

// 	}, [isClerkLoaded, id, getFormatting])

// 	const store = {
// 		isLoaded,
// 		updateFormatting: isClerkLoaded ? updateFormatting : undefined,
// 		defaultPadding,
// 		// setDefaultPadding,

// 		optimalContentWidth,
// 		// setOptimalContentWidth,

// 		autoCollapseHeader,
// 		setAutoCollapseHeader,

// 		fontScale,
// 		setFontScale,

// 		fontSizingChart,
// 		// setfontSizingChart,

// 		fontFamilies,
// 		defaultFont,

// 		breakpoints,
// 		panelWidth,
// 		sidebarWidth
// 	}

// 	return (
// 		<FormattingContextProvider value={store}>
// 			{ children }
// 		</FormattingContextProvider>
// 	)
// }

// export const useFormatting = () => {
// 	return useContext(FormattingContext)
// }


// import {
// 	FC,
// 	createContext,
// 	useState,
// 	ReactNode,
// 	Dispatch,
// 	SetStateAction,
// 	useContext,
// 	useEffect
// } from 'react'
// // import { Inter } from '@next/font/google'
// import localFont  from '@next/font/local'
// import { NextFont, NextFontWithVariable } from '@next/font'
// import { useUser } from '@clerk/nextjs'
// import { useGetFormattingLazyQuery, GetFormattingQuery } from '@/graphql/queries/getFormatting'
// // import { useGetFontScaleLazyQuery, GetFontScaleQuery } from '@/graphql/queries/getFontScale'

// interface FormattingContextType {
// 	isLoaded: boolean
// 	defaultPadding: string
// 	optimalContentWidth: string
// 	autoCollapseHeader: boolean

// 	sidebarWidth: string
// 	panelWidth: string

// 	breakpoints: { // breakpoint properties should be used with css 'calc' 
// 		optimal: string
// 		sidebar: string
// 	}

// 	fontScale: 'sm' | 'md' | 'lg' | undefined
// 	fontSizingChart: {
// 		sm: string,
// 		md: string,
// 		lg: string,
// 	}
// 	fontFamilies: {
// 		[family: string]: NextFont
// 		// charter: NextFontWithVariable,
// 		// inter: NextFont
// 	}
// 	defaultFont: string

// 	setFontScale: Dispatch<SetStateAction<'sm' | 'md' | 'lg'>>
// 	// setfontSizingChart: Dispatch<SetStateAction<{
// 	// 	sm: string,
// 	// 	md: string,
// 	// 	lg: string,
// 	// }>>

// 	// setDefaultFont: Dispatch<SetStateAction<string>>
// 	// setDefaultPadding: Dispatch<SetStateAction<string>>
// 	// setOptimalContentWidth: Dispatch<SetStateAction<string>>
// 	setAutoCollapseHeader: Dispatch<SetStateAction<boolean>>
// }

// export type FormattingContextProviderProps = Partial<Pick<FormattingContextType, 'autoCollapseHeader' | 'defaultPadding' | 'optimalContentWidth' | 'fontSizingChart' | 'breakpoints' | 'panelWidth' | 'sidebarWidth'>> & { children: ReactNode }

// // const inter = Inter({
// // 	weight: 'variable',
// // 	subsets: ['latin'],
// // 	variable: '--font-inter',
// // })

// const charter = localFont({
// 	src: [
// 		{
// 			path: '../fonts/charter-roman.woff2',
// 			weight: '400',
// 			style: 'normal'
// 		},
// 		{
// 			path: '../fonts/charter-italic.woff2',
// 			weight: '400',
// 			style: 'italic'
// 		},
// 		{
// 			path: '../fonts/charter-bold.woff2',
// 			weight: '700',
// 			style: 'normal'
// 		},
// 		{
// 			path: '../fonts/charter-bolditalic.woff2',
// 			weight: '700',
// 			style: 'italic'
// 		},
// 		{
// 			path: '../fonts/charter-black.woff2',
// 			weight: '900',
// 			style: 'normal',
// 		},
// 		{
// 			path: '../fonts/charter-blackitalic.woff2',
// 			weight: '900',
// 			style: 'italic'
// 		}
// 	],
// 	// variable: '--font-charter'
// })

// const defaultFormattingContextValue: FormattingContextType = {
// 	isLoaded: false,
// 	defaultPadding: '23px',
// 	optimalContentWidth: '723px',
// 	autoCollapseHeader: false,

// 	sidebarWidth: '76px',
// 	panelWidth: '352px',

// 	breakpoints: {
// 		optimal: '',
// 		sidebar: ''
// 	},

// 	fontScale: undefined,
// 	fontSizingChart: {
// 		sm: '18px',
// 		md: '20px',
// 		lg: '22px',
// 	},
// 	fontFamilies: {
// 		charter,
// 	},
// 	defaultFont: 'charter',

// 	setFontScale: () => null,
// 	// setfontSizingChart: () => null,
// 	// setDefaultPadding: () => null,
// 	setAutoCollapseHeader: () => null,
// 	// setOptimalContentWidth: () => null
// }

// export const FormattingContext = createContext<FormattingContextType>(defaultFormattingContextValue)
// export const FormattingContextProvider = FormattingContext.Provider
// export const FormattingContextConsumer = FormattingContext.Consumer

// export const FormattingContextProvider: FC<FormattingContextProviderProps> = ({
// 	defaultPadding: overrideDefaultPadding = null,
// 	optimalContentWidth: overrideOptimalContentWidth = null,
// 	autoCollapseHeader: overrideAutoCollapseHeader = null,
// 	// fontScale: overrideFontScale = null,
// 	fontSizingChart: overridefontSizingChart = null,
// 	panelWidth: overridePanelWidth = null,
// 	sidebarWidth: overrideSidebarWidth = null,
// 	children
// }) => {
// 	const {
// 		isLoaded: isClerkLoaded,
// 		user,
// 	} = useUser()
// 	const id = user?.id

// 	const [isLoaded, setIsLoaded] = useState(defaultFormattingContextValue.isLoaded)
// 	const [defaultPadding, setDefaultPadding] = useState(overrideDefaultPadding || defaultFormattingContextValue.defaultPadding)
// 	const [optimalContentWidth, setOptimalContentWidth] = useState(overrideOptimalContentWidth || defaultFormattingContextValue.optimalContentWidth)
// 	const [autoCollapseHeader, setAutoCollapseHeader] = useState(overrideAutoCollapseHeader || defaultFormattingContextValue.autoCollapseHeader)
// 	const [fontScale, setFontScale] = useState(defaultFormattingContextValue.fontScale)
// 	const [fontSizingChart, setfontSizingChart] = useState(overridefontSizingChart || defaultFormattingContextValue.fontSizingChart)
// 	const [fontFamilies, ] = useState(defaultFormattingContextValue.fontFamilies)
// 	const [defaultFont, ] = useState(defaultFormattingContextValue.defaultFont)
// 	const [sidebarWidth, ] = useState(overrideSidebarWidth || defaultFormattingContextValue.sidebarWidth)
// 	const [panelWidth, ] = useState(overridePanelWidth || defaultFormattingContextValue.panelWidth)
// 	const [breakpoints, ] = useState({
// 		optimal: `${optimalContentWidth} + (2 * ${defaultPadding})`,
// 		sidebar: `${sidebarWidth} + ${panelWidth} + (${optimalContentWidth} + (2 * ${defaultPadding}))`,
// 	})

// 	// const [getFontScale, ] = useGetFontScaleLazyQuery()
// 	const [getFormatting, ] = useGetFormattingLazyQuery()


// 	useEffect(() => {
// 		if (!isClerkLoaded) return

// 		const pollUserData = async (id: string): Promise<GetFormattingQuery> => {
// 			let tries = 0
// 			const maxTries = 5
			
// 			return new Promise(async (resolve, reject) => {
// 				const poll = async () => {
// 					tries++
				
// 					try {
// 						const { data } = await getFormatting({ variables: { id }, fetchPolicy: 'network-only' })
// 						if (data?.users[0]) {
// 							resolve(data)
// 							return true
// 						} else if (tries >= maxTries) {
// 							// need better error handling
// 							reject(new Error(`Polling stopped after ${maxTries} tries.`))
// 							return false
// 						}
// 					} catch (error) {
// 						reject(error)
// 						return false
// 					}
					
// 					return false
// 				}
			
// 				const attemptPolling = async () => {
// 					const result = await poll()
// 					if (!result && tries < maxTries) {
// 						setTimeout(attemptPolling, 1500)
// 					}
// 				}
			
// 				attemptPolling()
// 			})
// 		}
		
// 		const getData = async () => {
// 			let data: Pick<FormattingContextType, 'fontScale'> = {
// 				fontScale: 'md'
// 			}

// 			if (id) {
// 				const userData = await pollUserData(id)

// 				data.fontScale = userData?.users[0].formatting.fontScale
// 			}

// 			// if (!id) {
// 			// 	const anonData = getAnonData()
// 			// 	data = anonData ? anonData : initAnonData()
// 			// } else {
// 			// 	// if the user is new it will take some time for the webhook to populate hasura with the new user data
// 			// 	const userData = await pollUserData(id)

// 			// 	data.activity = userData?.users[0].activity
// 			// 	data.preferences = userData?.users[0].preferences
// 			// }

// 			return data
// 		}
	
// 		const init = async () => {			
// 			const userData = await getData()

// 			setFontScale(() => userData.fontScale)
// 			setIsLoaded(() => true)
// 		}

// 		init()

// 	}, [isClerkLoaded, id, getFormatting])

// 	const store = {
// 		isLoaded,
// 		defaultPadding,
// 		// setDefaultPadding,

// 		optimalContentWidth,
// 		// setOptimalContentWidth,

// 		autoCollapseHeader,
// 		setAutoCollapseHeader,

// 		fontScale,
// 		setFontScale,

// 		fontSizingChart,
// 		// setfontSizingChart,

// 		fontFamilies,
// 		defaultFont,

// 		breakpoints,
// 		panelWidth,
// 		sidebarWidth
// 	}
// 	return (
// 		<FormattingContextProvider value={store}>
// 			{ children }
// 		</FormattingContextProvider>
// 	)
// }

// export const useFormatting = () => {
// 	return useContext(FormattingContext)
// }

import {
	FC,
	createContext,
	useState,
	ReactNode,
	Dispatch,
	SetStateAction,
	useContext
} from 'react'
// import { Inter } from '@next/font/google'
import localFont  from '@next/font/local'
import { NextFont, NextFontWithVariable } from '@next/font'

interface FormattingContextType {
	defaultPadding: string
	optimalContentWidth: string
	// autoCollapseHeader: boolean

	sidebarWidth: string
	panelWidth: string

	breakpoints: { // breakpoint properties should be used with css 'calc' 
		optimal: string
		sidebar: string
	}

	// fontScale: 'sm' | 'md' | 'lg'
	fontSizingChart: {
		sm: string,
		md: string,
		lg: string,
	}
	fontFamilies: {
		[family: string]: NextFont
		// charter: NextFontWithVariable,
		// inter: NextFont
	}
	defaultFont: string

	// setFontScale: Dispatch<SetStateAction<'sm' | 'md' | 'lg'>>
	// setfontSizingChart: Dispatch<SetStateAction<{
	// 	sm: string,
	// 	md: string,
	// 	lg: string,
	// }>>

	// setDefaultFont: Dispatch<SetStateAction<string>>
	// setDefaultPadding: Dispatch<SetStateAction<string>>
	// setOptimalContentWidth: Dispatch<SetStateAction<string>>
	// setAutoCollapseHeader: Dispatch<SetStateAction<boolean>>
}

export type FormattingContextProviderProps = Partial<Pick<FormattingContextType, 'defaultPadding' | 'optimalContentWidth' | 'fontSizingChart' | 'breakpoints' | 'panelWidth' | 'sidebarWidth'>> & { children: ReactNode }

// const inter = Inter({
// 	weight: 'variable',
// 	subsets: ['latin'],
// 	variable: '--font-inter',
// })

const charter = localFont({
	src: [
		{
			path: '../fonts/charter-roman.woff2',
			weight: '400',
			style: 'normal'
		},
		{
			path: '../fonts/charter-italic.woff2',
			weight: '400',
			style: 'italic'
		},
		{
			path: '../fonts/charter-bold.woff2',
			weight: '700',
			style: 'normal'
		},
		{
			path: '../fonts/charter-bolditalic.woff2',
			weight: '700',
			style: 'italic'
		},
		{
			path: '../fonts/charter-black.woff2',
			weight: '900',
			style: 'normal',
		},
		{
			path: '../fonts/charter-blackitalic.woff2',
			weight: '900',
			style: 'italic'
		}
	],
	// variable: '--font-charter'
})

const defaultFormattingContextValue: FormattingContextType = {
	defaultPadding: '23px',
	optimalContentWidth: '723px',
	// autoCollapseHeader: false,

	sidebarWidth: '76px',
	panelWidth: '352px',

	breakpoints: {
		optimal: '',
		sidebar: ''
	},

	// fontScale: 'md',
	fontSizingChart: {
		sm: '18px',
		md: '20px',
		lg: '22px',
	},
	fontFamilies: {
		charter,
	},
	defaultFont: 'charter',

	// setFontScale: () => null,
	// setfontSizingChart: () => null,
	// setDefaultPadding: () => null,
	// setAutoCollapseHeader: () => null,
	// setOptimalContentWidth: () => null
}

export const FormattingContext = createContext<FormattingContextType>(defaultFormattingContextValue)
// export const FormattingContextProvider = FormattingContext.Provider
// export const FormattingContextConsumer = FormattingContext.Consumer

export const FormattingContextProvider: FC<FormattingContextProviderProps> = ({
	defaultPadding: overrideDefaultPadding = null,
	optimalContentWidth: overrideOptimalContentWidth = null,
	// autoCollapseHeader: overrideAutoCollapseHeader = null,
	// fontScale: overrideFontScale = null,
	fontSizingChart: overridefontSizingChart = null,
	panelWidth: overridePanelWidth = null,
	sidebarWidth: overrideSidebarWidth = null,
	children
}) => {
	const [defaultPadding, setDefaultPadding] = useState(overrideDefaultPadding || defaultFormattingContextValue.defaultPadding)
	const [optimalContentWidth, setOptimalContentWidth] = useState(overrideOptimalContentWidth || defaultFormattingContextValue.optimalContentWidth)
	// const [autoCollapseHeader, setAutoCollapseHeader] = useState(overrideAutoCollapseHeader || defaultFormattingContextValue.autoCollapseHeader)
	// const [fontScale, setFontScale] = useState(overrideFontScale || defaultFormattingContextValue.fontScale)
	const [fontSizingChart, setfontSizingChart] = useState(overridefontSizingChart || defaultFormattingContextValue.fontSizingChart)
	const [fontFamilies, ] = useState(defaultFormattingContextValue.fontFamilies)
	const [defaultFont, ] = useState(defaultFormattingContextValue.defaultFont)
	const [sidebarWidth, ] = useState(overrideSidebarWidth || defaultFormattingContextValue.sidebarWidth)
	const [panelWidth, ] = useState(overridePanelWidth || defaultFormattingContextValue.panelWidth)
	const [breakpoints, ] = useState({
		optimal: `${optimalContentWidth} + (2 * ${defaultPadding})`,
		sidebar: `${sidebarWidth} + ${panelWidth} + (${optimalContentWidth} + (2 * ${defaultPadding}))`,
	})

	const store = {
		defaultPadding,
		// setDefaultPadding,

		optimalContentWidth,
		// setOptimalContentWidth,

		// autoCollapseHeader,
		// setAutoCollapseHeader,

		// fontScale,
		// setFontScale,

		fontSizingChart,
		// setfontSizingChart,

		fontFamilies,
		defaultFont,

		breakpoints,
		panelWidth,
		sidebarWidth
	}
	return (
		<FormattingContext.Provider value={store}>
			{ children }
		</FormattingContext.Provider>
	)
}

export const useFormatting = () => {
	return useContext(FormattingContext)
}