import { FC } from 'react'

export const MobileHeader: FC = () => {
	return (
		<div>
			<style jsx>{`
				div {
					height: 57px;
					width: 100%;
					background: hsla(240, 4%, 9%, 0.83);
					position: fixed;
					backdrop-filter: blur(13px);
					box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.39);
				}
				@media screen and (min-width: 1024px) {
					div {
						display: none;
					}
				}
			`}</style>
		</div>
	)
}