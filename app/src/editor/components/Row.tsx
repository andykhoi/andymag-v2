import { FC, ReactNode } from 'react'
import { useFormatting } from '../context/FormattingContextProvider'

interface RowProps {
	height: string
	children: ReactNode
}

export const Row: FC<RowProps> = ({
	height,
	children
}) => {
	const { 
		optimalContentWidth,
		defaultPadding,
	} = useFormatting()

	return (
		<div className="row">
			{ children }
			<style jsx>{`
				.row {
					display: grid;
					grid-template-columns: 1fr min(${optimalContentWidth}, calc(100% - (2*${defaultPadding}))) 1fr;
					grid-auto-rows: auto;
					height: ${ height };
				}
			`}</style>
		</div>
	)
}