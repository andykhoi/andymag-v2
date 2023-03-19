import { useState } from 'react'

export const Sidebar = () => {
	const [open, setOpen] = useState(false)
	
	return (
		<>
			<div>
				sidebar
				<button onClick={() => setOpen((open) => !open)}>
					click
				</button>
			</div>
			<style jsx>{`
				div {
					display: none;
					width: ${open ? 'calc(76px + 352px)' : '76px'};
					background-color: blue;
					transition: width 0.21s ease
				}
				@media screen and (min-width: 1024px) {
					div {
						display: block;
					}
				}
			`}</style>
		</>
	)
}