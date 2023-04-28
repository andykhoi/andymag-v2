import { FC } from 'react'

interface SpotlightProps {
	bold: boolean
}

export const Spotlight: FC<SpotlightProps> = ({
	bold
}) => {
	if (bold) {
		return (
			<svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M20.375 20.875L14.9583 15.4583M9.4375 17.75C13.7522 17.75 17.25 14.2522 17.25 9.9375C17.25 5.62278 13.7522 2.125 9.4375 2.125C5.12278 2.125 1.625 5.62278 1.625 9.9375C1.625 14.2522 5.12278 17.75 9.4375 17.75Z" stroke="white" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round"/>
			</svg>
		)
	}
	
	return (
		<svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M19.3749 19.8752L13.9583 14.4585M8.4375 16.75C12.7522 16.75 16.25 13.2522 16.25 8.9375C16.25 4.62278 12.7522 1.125 8.4375 1.125C4.12278 1.125 0.625 4.62278 0.625 8.9375C0.625 13.2522 4.12278 16.75 8.4375 16.75Z" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
		</svg>
	)
}