import { FC, ReactNode, useContext } from 'react'
import { FormattingContext } from '../context/FormattingContextWrapper'

interface FontProps {
	children: ReactNode
}

export const Font: FC<FontProps> = ({
	children
}) => {
	const {
		fontScale,
		fontSizingChart,
		defaultFont,
		fontFamilies
	} = useContext(FormattingContext)
	
	const getTWDefaultFontFamily = () => {
		return `font-${defaultFont}`
	}

	const getTWFontSize = () => {
		const fontSize = fontSizingChart[fontScale]
		return `font-[${fontSize}]`
	}

	const getCSSVariableFontClasses = () => {
		const variables = []
		for (const family in fontFamilies) {
			variables.push(fontFamilies[family].variable)
		}
		return variables.join(' ')
	}

	const generateClassNames = () => {
		const classNames = `${getCSSVariableFontClasses()} ${getTWDefaultFontFamily()} ${getTWFontSize()}`
		return classNames
	}

	return (
		<div className={generateClassNames()}>
			{ children }
		</div>
	)
}