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
	autoCollapseHeader: boolean

	sidebarWidth: string
	panelWidth: string

	breakpoints: { // breakpoint properties should be used with css 'calc' 
		optimal: string
		sidebar: string
	}

	fontScale: 'sm' | 'md' | 'lg'
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

	setFontScale: Dispatch<SetStateAction<'sm' | 'md' | 'lg'>>
	// setfontSizingChart: Dispatch<SetStateAction<{
	// 	sm: string,
	// 	md: string,
	// 	lg: string,
	// }>>

	// setDefaultFont: Dispatch<SetStateAction<string>>
	// setDefaultPadding: Dispatch<SetStateAction<string>>
	// setOptimalContentWidth: Dispatch<SetStateAction<string>>
	setAutoCollapseHeader: Dispatch<SetStateAction<boolean>>
}

export type FormattingContextWrapperProps = Partial<Pick<FormattingContextType, 'autoCollapseHeader' | 'defaultPadding' | 'optimalContentWidth'  | 'fontScale' | 'fontSizingChart' | 'breakpoints' | 'panelWidth' | 'sidebarWidth'>> & { children: ReactNode }

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
	autoCollapseHeader: false,

	sidebarWidth: '76px',
	panelWidth: '352px',

	breakpoints: {
		optimal: '',
		sidebar: ''
	},

	fontScale: 'md',
	fontSizingChart: {
		sm: '18px',
		md: '20px',
		lg: '22px',
	},
	fontFamilies: {
		charter,
	},
	defaultFont: 'charter',

	setFontScale: () => null,
	// setfontSizingChart: () => null,
	// setDefaultPadding: () => null,
	setAutoCollapseHeader: () => null,
	// setOptimalContentWidth: () => null
}

export const FormattingContext = createContext<FormattingContextType>(defaultFormattingContextValue)
export const FormattingContextProvider = FormattingContext.Provider
export const FormattingContextConsumer = FormattingContext.Consumer

export const FormattingContextWrapper: FC<FormattingContextWrapperProps> = ({
	defaultPadding: overrideDefaultPadding = null,
	optimalContentWidth: overrideOptimalContentWidth = null,
	autoCollapseHeader: overrideAutoCollapseHeader = null,
	fontScale: overrideFontScale = null,
	fontSizingChart: overridefontSizingChart = null,
	panelWidth: overridePanelWidth = null,
	sidebarWidth: overrideSidebarWidth = null,
	children
}) => {
	const [defaultPadding, setDefaultPadding] = useState(overrideDefaultPadding || defaultFormattingContextValue.defaultPadding)
	const [optimalContentWidth, setOptimalContentWidth] = useState(overrideOptimalContentWidth || defaultFormattingContextValue.optimalContentWidth)
	const [autoCollapseHeader, setAutoCollapseHeader] = useState(overrideAutoCollapseHeader || defaultFormattingContextValue.autoCollapseHeader)
	const [fontScale, setFontScale] = useState(overrideFontScale || defaultFormattingContextValue.fontScale)
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

		autoCollapseHeader,
		setAutoCollapseHeader,

		fontScale,
		setFontScale,

		fontSizingChart,
		// setfontSizingChart,

		fontFamilies,
		defaultFont,

		breakpoints,
		panelWidth,
		sidebarWidth
	}
	return (
		<FormattingContextProvider value={store}>
			{ children }
		</FormattingContextProvider>
	)
}

export const useFormatting = () => {
	return useContext(FormattingContext)
}