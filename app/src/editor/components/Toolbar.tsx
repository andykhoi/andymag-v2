import { FC } from 'react'
import { Logo, Spotlight, Preferences, Share, Login } from '@/components/icons'
import { SignedIn, SignedOut } from '@clerk/nextjs'
import { useEditorSettings } from '../context/SettingsContextProvider'
import Link from 'next/link'

const Tools: FC = () => {
	const { panel, setPanel } = useEditorSettings()

	return (
		<div className="tools">
			{/* share button prob won't bold on mobile - instead will just open the native share menu, desktop should bold though */}
			<div onClick={
				() => {
					if (navigator.canShare && navigator.canShare({ url: window.location.href })) {
						navigator.share({ url: window.location.href })
					} else {
						setPanel('share')
					}
				}
			} className="button">
				<Share fill={panel === 'share'}/>
			</div>
			<div onClick={() => setPanel('spotlight')} className="button">
				<Spotlight bold={panel === 'spotlight'}/>
			</div>
			<div onClick={() => setPanel('preferences')} className="button">
				<Preferences bold={panel === 'preferences'} />
			</div>
			<style jsx>{`
				.tools {
					display: flex;
					justify-content: space-between;
					width: 100%;
					max-width: 600px;
				}

				.button {
					flex: 1;
					display: flex;
					justify-content: center;
					align-items: center;
					height: 52px;
				}

				@media screen and (min-width: 1024px) {
					.tools {
						flex-direction: column;
						margin-bottom: 4rem;
						align-items: center;
						gap: 40px;
					}

					.button {
						width: 54px;
						height: 54px;
						flex: auto;
						padding: 0;
						border-radius: 7px;
					}

					.button:hover {
						background-color: var(--hover-black);
						cursor: pointer;
					}
				}
			`}</style>
		</div>
	)
}

export const Toolbar: FC = () => {
	return (
		<div className="toolbar">
			<div className="logo">
				<Logo />
			</div>
			<Tools />
			<div className="profile">
				<SignedIn>
					{/* view profile button */}
				</SignedIn>
				<SignedOut>
						<Link href={'?a=sign-in'} shallow>
							<Login />
						</Link>
				</SignedOut>
			</div>
			
			<style jsx>{`
				.toolbar {
					display: flex;
					justify-content: center;
					width: 100%;
					position: fixed;
					bottom: 0;
					z-index: 100;
					background: var(--main-black);
					border-top: 1px solid var(--accent-black);
					padding-bottom: env(safe-area-inset-bottom);
					align-items: center;
				}

				.logo, .profile {
					display: none;
				}
				
				@media screen and (min-width: 1024px) {
					.toolbar {
						position: initial;
						height: 100%;
						min-width: 72px;
						max-width: 72px;
						flex-direction: column;
						justify-content: space-between;
						border-top: none;
						border-right: 1px solid var(--accent-black);
					}

					.logo, .profile {
						display: flex;
						justify-content: center;
					}

					.logo {
						padding-top: 2rem;
					}

					.profile {
						display: flex;
						height: 54px;
						width: 54px;
						justify-content: center;
						align-items: center;
						margin-bottom: 1rem;
						border-radius: 7px;
					}

					.profile:hover {
						background-color: var(--hover-black);
						cursor: pointer;
					}
				}
			`}</style>
		</div>
	)
}