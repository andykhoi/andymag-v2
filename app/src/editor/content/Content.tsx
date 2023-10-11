import { FC, ReactNode, forwardRef } from 'react'
import { useFormatting } from '../context/FormattingContextProvider'

interface ContentProps {
	children: ReactNode
	defaultHeight?: any
	optimalHeight?: any
}

const Content = forwardRef<HTMLDivElement, ContentProps>(({ children, defaultHeight, optimalHeight }, ref) => {
	const { optimalContentWidth, defaultPadding } = useFormatting()

	return (
		<div ref={ref}>
			{ children }
			<style jsx>{`
				div {
					container: content / inline-size;
					// container: content / size;
					display: initial;
				}
				
			`}</style>
		</div>
	)
})

Content.displayName = "Content"

export default Content