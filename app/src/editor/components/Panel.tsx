import { FC } from 'react'

export const Panel: FC = () => {
	
	return (
		<div className="panel">
			{/* <div className="test">

			</div> */}
			<style jsx>{`
				.panel {
					height: calc(100% - 53px - 57px);
					width: 100%;
					background-color: var(--main-black);
					position: fixed;
					bottom: 53px;
					padding: 0px 1rem;
					overflow: scroll;
				}

				@media screen and (min-height: 400px) {
					.panel {
						max-height: calc(100% - 45% - 53px - 57px);
					}
				}

				@media screen and (min-width: 1024px) {
					.panel {
						height: 100vh;
						max-height: 100vh;
						width: 355px;
						position: initial;
						display: inline-block;
					}
				}
			`}</style>
		</div>
	)
}