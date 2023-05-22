import { FC, ReactNode } from 'react'
import PropTypes from 'prop-types'
// import { EditorItem, EditorItemProps } from '../components/EditorItem'

// interface TextProps extends EditorItemProps {

// }

// export const Text: FC<TextProps> = (props) => {
// 	return (
// 		<EditorItem {...props}>
// 			{ props.children }
			// <style jsx>{`
			// 	@container content (min-width: calc(${optimalContentWidth} + 2 * ${defaultPadding})) {
			// 		.grid-item {
			// 			grid-column: ${breakpointAlignment === 'centered' ? 2 : '1 / -1'}
			// 		}
			// 	}
			// `}</style>
// 		</EditorItem>
// 	)
// }

interface TextProps {
	children: ReactNode
}

export const Text: FC<TextProps> = (props) => {
	return (
		<div>
			{ props.children }	
		</div>
	)
}

Text.propTypes = {
	children: PropTypes.string
}
