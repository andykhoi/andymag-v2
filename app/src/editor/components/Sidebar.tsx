import {
	Logo,
	// Explore,
	Preferences,
	Share
} from '@/components/icons'
import { FC } from 'react'

const Tools: FC = () => {
	return (
		<div className="tools">
			<div className="button">
				{/* <Share /> */}
			</div>
			<div className="button">
				{/* <Explore /> */}
			</div>
			<div className="button">
				{/* <Preferences /> */}
			</div>
			<style jsx>{`
				.button {
					width: 54px;
					height: 54px;
					display: flex;
					justify-content: center;
					align-items: center;
				}
				.tools {
					display: flex;
					flex-direction: column;
					gap: 40px;
				}
			`}</style>
		</div>
	)
}

export const Sidebar: FC = () => {
	
	return (
		<>
			<div className="sidebar">
				<div className="logoWrapper">
					<Logo />
				</div>
				<div className="toolsWrapper">
					<Tools />
				</div>
				
			</div>
			<style jsx>{`
				.sidebar {
					display: none;
					background-color: #161618;
					width: 76px;
					border-right: 1px solid #313135;
					// transition: width 0.21s ease
				}
				.logoWrapper {
					margin-top: 32px;
				}
				@media screen and (min-width: 1024px) {
					.sidebar {
						display: flex;
						// justify-content: center;
						align-items: center;
						flex-direction: column;
					}
				}
			`}</style>
		</>
	)
}