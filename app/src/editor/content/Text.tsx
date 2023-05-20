import { FC } from 'react'
import PropTypes from 'prop-types'
import { EditorItem, EditorItemProps } from '../components/EditorItem'

interface TextProps extends EditorItemProps {

}

export const Text: FC<TextProps> = (props) => {
	return (
		<EditorItem {...props}>
			{ props.children }
		</EditorItem>
	)
}

Text.propTypes = {
	children: PropTypes.string
}
