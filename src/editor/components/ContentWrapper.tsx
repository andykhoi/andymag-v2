import { FC, ReactNode } from 'react'
import { Font } from './Font'

interface ContentWrapperProps {
	children: ReactNode
}

export const ContentWrapper: FC<ContentWrapperProps> = ({
	children
}) => {
	return (
		<Font>
			{ children }
		</Font>
	)
}