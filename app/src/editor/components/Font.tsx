import { FC, ReactNode, useContext } from 'react'
import { FormattingContext, useFormatting } from '../context/FormattingContextProvider'

interface FontProps {
	children: ReactNode
}

export const Font: FC<FontProps> = ({
	children
}) => {
	const {
		// fontScale,
		fontSizingChart,
		defaultFont,
		fontFamilies
	} = useFormatting()
	
	// const getEditorFontFamily = () => {
	// 	const family = fontFamilies[`${defaultFont}`]
	// 	return family.style.fontFamily
	// }

	// const getEditorFontSize = () => {
	// 	const fontSize = fontSizingChart[`${fontScale}`]
	// 	return fontSize
	// }

	return (
		<div
		>
			{ children }
			{/* <style jsx>{`
				div {
					font-family: ${getEditorFontFamily()};
					font-size: ${getEditorFontSize()};
				}
			`}</style> */}
		</div>
	)
}