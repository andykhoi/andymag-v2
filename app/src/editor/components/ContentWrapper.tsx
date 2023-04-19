import { FC, ReactNode } from 'react'
import { Font } from './Font'
import { Grid } from './Grid'

interface ContentWrapperProps {
	children: ReactNode
}

export const ContentWrapper: FC<ContentWrapperProps> = ({
	children
}) => {
	return (
		<>
		<div>
			<Font>
				<Grid>
					{ children }
				</Grid>
			</Font>
		</div>
		<style jsx>{`
			div {
				flex: 1;
				overflow-y: scroll;
			}
		`}</style>
		</>
	)
}