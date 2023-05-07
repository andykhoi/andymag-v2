import { ChangeEvent, FC, ReactNode, useRef, useState } from 'react'
import { useEditorSettings } from '../context/SettingsContextProvider'
import { useEditorPeople } from '../context/PeopleContextProvider'
import Image from 'next/image'
import { Info } from '@/components/icons/Info'
import { LocationPin } from '@/components/icons/LocationPin'
import Draggable, { DraggableEventHandler } from 'react-draggable'
import { Back, Facebook, Twitter, Whatsapp, Link as LinkIcon } from '@/components/icons'
import { SmallClose } from '@/components/icons/SmallClose'
import { useUserFormatting, useUserSettings } from '@/contexts/UserContext'
import { useFormatting } from '../context/FormattingContextProvider'
import { Formatting } from '@/types/custom'
import { useRouter } from 'next/router'
import Link from 'next/link'

interface TwitterShareButtonProps {
	text: string
	url: string
	hashtags: string[]
}

interface SharebuttonProps {
	icon: ReactNode
	url: string
	copy: string
}

const ShareButton: FC<SharebuttonProps> = ({
	icon,
	copy,
	url,
}) => {
	return (
		<Link
			href={url}
			target="_blank"
			rel="noopener noreferrer"
			style={{
				textDecoration: 'none',
				color: 'white'
			}}
		>
			<div className="container">
				<div className="icon">{ icon }</div>
				<p>{ copy }</p>
			</div>
			<style jsx>{`
				.container {
					width: 100%;
					display: flex;
					align-items: center;
					border-bottom: 1px solid var(--accent-black);
					padding: 20px 24px;
				}
				// .container:hover {
				// 	background-color: var(--hover-black);
				// }
				.icon {
					margin-right: 20px;
					width: 20px;
					height: 20px;
					display: flex;
					justify-content: center;
				}
			`}</style>
	  </Link>
	)
}
  
const CopyButton: FC = () => {
	const [copy, setCopy] = useState('Copy Article URL')
	return (
		<div
			className="container"
			onClick={() => {
				navigator.clipboard.writeText(window.location.href)
				setCopy('Copied!')
				setTimeout(() => setCopy('Copy Article URL'), 2000)
			}}
		>
			<div className="icon"><LinkIcon /></div>
			<p>{ copy }</p>

			<style jsx>{`
			.container {
				width: 100%;
				display: flex;
				align-items: center;
				border-bottom: 1px solid var(--accent-black);
				padding: 20px 24px;
				cursor: pointer;
			}
			.icon {
				margin-right: 20px;
				width: 20px;
				height: 20px;
				display: flex;
				justify-content: center;
			}
			p {
				color: #848484;
			}
		`}</style>
		</div>
		
	)
}

const ShareContent: FC = () => {
	const textForPost = 'Check out this article!'
	const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(textForPost)}&url=${encodeURIComponent(window.location.href)}`
	const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('theandymag.com')}`;
	const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(textForPost)}%20${encodeURIComponent(window.location.href)}`
	return (
		<div>
			<ShareButton icon={<Twitter />} copy='Tweet it' url={twitterShareUrl}/>
			<ShareButton icon={<Facebook />} copy='Post to Facebook' url={facebookShareUrl} />
			<ShareButton icon={<Whatsapp />} copy='Share on WhatsApp' url={whatsappShareUrl} />
			<CopyButton /> 
			<style jsx>{`	
				div {
					height: 260px;
					width: 100%;
					border: 1px solid var(--accent-black);
					border-radius: 8px;
				}
			`}</style>
		</div>
	)
}

const SpotlightContent: FC = () => {
	const { people } = useEditorPeople()

	return (
		<div className="spotlight-content">
			{ people.map(p => 
				<label htmlFor={`${p.id}-seeBio`} key={p.id}>
					<div className="contributor">
						
						{
							// if no profile picture show placeholder avatar
							<div className="profilePicture">
								<Image src={p.profile_picture ? p.profile_picture : '/profile_pictures/avatar.png'} alt={`Image of ${p.first_name} ${p.last_name}`} width={70} height={70} />
							</div>
							
						}
						<div className="info">
							<p>{p.first_name} {p.last_name}</p>
							{ p.role && <p className="role">{`${p.role.charAt(0).toUpperCase()}${p.role.substring(1)}`}</p> }
						</div>
						{
							(p.bio || p.location) && 
							<>
								<input id={`${p.id}-seeBio`} type="checkbox" style={{ display: 'none'}}/>
								<div className="seeBioWrapper">
									{/* <label htmlFor={`${p.id}-seeBio`}> */}
										<div className="seeBio open">
												<Info />
										</div>
										<div className="seeBio close">
												<SmallClose />
										</div>
									{/* </label> */}
								</div>
								<div className="bio">
									{ p.location && 
										<div className="location">
											<LocationPin />
											<p>
												{ p.location } 
											</p>
										</div>
									}
									<p>
										{ p.bio }
									</p>
								</div>
							</>
						}
					</div>
				</label>		
			)}	
			<style jsx>{`
				label {
					cursor: pointer
				}

				.spotlight-content {
					max-width: 600px;
				}

				.info {
					display: flex;
					flex-direction: column;
					justify-content: center;
					margin-left: 1.5rem;
					color: white;
				}

				.role {
					color: var(--subtext-grey);
					margin-top: 4px;
				}

				input[type=checkbox]:checked ~ .bio {
					max-height: 1000px;
				}

				input[type=checkbox]:checked + .seeBioWrapper .close {
					display: flex;
				}

				input[type=checkbox]:not(:checked) + .seeBioWrapper .open {
					display: flex;
				}

				.seeBioWrapper {
					display: flex;
					margin-left: auto;
					align-items: center;
				}

				.seeBio {
					display: none;
					// display: flex;
					align-items: center;
					justify-content: center;
					width: 24px;
					height: 24px;
					border-radius: 1rem;
					background-color: var(--accent-black);
				}

				.profilePicture {
					border-radius: 12px;
					overflow: hidden;
				}

				.location {
					display: flex;
					color: white;
					align-items: center;
					margin: 16px 0px 8px 0px;
				}

				.location p {
					margin-left: 8px;
				}

				.bio {
					width: 100%;
					max-height: 0px;
					color: white;
					font-size: var(--subtext-1);
					overflow: hidden;
					cursor: initial;
				}
			
				.contributor {
					display: flex;
					width: 100%;
					flex-wrap: wrap;
					margin-bottom: 32px;
				}
			`}</style>
		</div>
	)
}

const PreferencesContent: FC = () => {
	const { isLoaded: isFormattingLoaded, formatting: userFormatting, updateFormatting: updateUserFormatting } = useUserFormatting()
	const {
		fontSizingChart,
		defaultFont,
		fontFamilies,
	} = useFormatting()
	const { isLoaded: isSettingsLoaded, settings: userSettings, updateSettings: updateUserSettings } = useUserSettings()
	console.log(userSettings, userFormatting)

	const onFontSizeChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		if (isFormattingLoaded && updateUserFormatting) updateUserFormatting({ fontScale: e.target.value as Formatting['fontScale'] })
	}

	const onAutoHeaderCollapseChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		if (isSettingsLoaded && updateUserSettings) updateUserSettings({ autoCollapseHeader: !userSettings?.autoCollapseHeader })
	}

	return (
		<div className="preferences">
			<div className="option">
				<p className="option-title">Font Size</p>
				<div className="choose">
					<input type="radio" name="font-size" value='sm' id="sm" checked={userFormatting?.fontScale === 'sm'} onChange={(e) => onFontSizeChangeHandler(e)} />
					<label htmlFor="sm" className="fontSizeLabel choiceLabel">
						<div className="choice" />
						<p style={{
							fontSize: `${fontSizingChart['sm']}`,
							fontFamily: `${fontFamilies[`${defaultFont}`].style.fontFamily}`
						}}>Aa</p>
					</label>
					<input type="radio" name="font-size" id="md" value={'md'} checked={userFormatting?.fontScale === 'md'} onChange={(e) => onFontSizeChangeHandler(e)}/>
					<label htmlFor="md" className="fontSizeLabel choiceLabel">
						<div className="choice" />
						<p style={{
							fontSize: `${fontSizingChart['md']}`,
							fontFamily: `${fontFamilies[`${defaultFont}`].style.fontFamily}`
						}}>Aa</p>
					</label>
					<input type="radio" name="font-size" id="lg" value={'lg'} checked={userFormatting?.fontScale === 'lg'} onChange={(e) => onFontSizeChangeHandler(e)}/>
					<label htmlFor="lg" className="fontSizeLabel choiceLabel">
						<div className="choice" />
						<p style={{
							fontSize: `${fontSizingChart['lg']}`,
							fontFamily: `${fontFamilies[`${defaultFont}`].style.fontFamily}`
						}}>Aa</p>
					</label>
				</div>
			</div>
			<div className="option">
				<p className="option-title">Mobile Header</p>
				<div className="choose">
					<input type="checkbox" name="autoCollapseHeader" value={'lg'} id="autoCollapseHeader" checked={userSettings?.autoCollapseHeader} onChange={(e) => onAutoHeaderCollapseChangeHandler(e)}/>
					<label htmlFor="autoCollapseHeader" className="choiceLabel">
						<div className="choice" />
						<p>Auto collapse on scroll</p>
					</label>
				</div>
			</div>
			<style jsx>{`
				.option {
					color: white;
					margin-bottom: 36px;
				}
				.option-title {
					margin-bottom: 12px;
					font-weight: 500;
				}
				.preferences {
					width: 100%;
				}
				input[type=radio], input[type=checkbox] {
					display: none;
				}
				
				.choice::after {
					content: " ";
					height: 12px;
					width: 12px;
					border-radius: 3px;
					background-color: #db9033;
					display: none;	
					top: 4px;
					margin: 0 auto;
					position: relative;
				}
				
				
				input[type=radio]:checked + .choiceLabel .choice::after,
				input[type=checkbox]:checked + .choiceLabel .choice::after {
					display: block;
				}

				.choose {
					display: flex;
					max-width: 290px;
					justify-content: space-between;
				}

				.choice {
					height: 20px;
					width: 20px;
					background-color: #3B3B40;
					// margin-bottom: 6px;
					border-radius: 4px;
					margin-right: 16px;
				}
			`}</style>
			<style jsx>{`
				.choiceLabel {
					color: white;
					display: flex;
					align-items: center;
					cursor: pointer;
				}

				.fontSizeLabel {
					align-items: flex-end;
				}
				.fontSizeLabel .choice {
					margin-bottom: 6px;
				}
			`}</style>
		</div>
	)
}

const PanelContent: FC = () => {
	const { panel } = useEditorSettings()

	return (
		<div>
			{ panel === 'spotlight' && <SpotlightContent /> }
			{ panel === 'preferences' && <PreferencesContent /> }
			{ panel === 'share' && <ShareContent /> }

			<style jsx>{`
				div {
					display: flex;
					// justify-content: center;
					overflow: scroll;
					padding: 0px 24px 24px 24px;
				}

				@media screen and (min-width: 1024px) {
					div {
						padding: 28px 24px 0px 24px;
					}
				}
			`}</style>
		</div>
	)
}

const PanelHeader: FC = () => {
	const { panel, setPanel } = useEditorSettings()

	return (
		<>
			<div className="mobile-panel-header panel-header">
				<div className="drag-area">
					<div className="drag-bar" />
				</div>
				<div className="header">
					<span>{panel?.charAt(0).toUpperCase()}{panel?.substring(1)}</span>
				</div>
			</div>
			<div className="desktop-panel-header panel-header">
			<div className="header">
					<span>{panel?.charAt(0).toUpperCase()}{panel?.substring(1)}</span>
					<div className="back" onClick={() => setPanel(null)}>
						<Back />
					</div>
				</div>
				<div className="divider" />
			</div>
			<style jsx>{`
					.mobile-panel-header {
						display: flex;
					}
					.desktop-panel-header {
						display: none;
					}
					.panel-header {
						// display: flex;
						flex-direction: column;
						width: 100%;
						padding: 0px 24px;
					}

					.header {
						font-size: 1.25rem;
						font-weight: 600;
						color: white;
						text-align: center;
						margin: 4px 0px 20px 0px;
					}

					.divider {
						display: none;
						width: 100%;
						height: 1px;
						background-color: var(--accent-black);
					}
					
					.drag-area {
						display: flex;
						height: 26px;
						width: 100%;
						justify-content: center;
						align-content: center;
					}	

					.back {
						display: none;
						height: 32px;
						width: 32px;
						position: absolute;
						justify-content: center;
						align-items: center;
						right: 20px;
						top: 26px;
						border-radius: 20px;
						border: 1px solid #262626;
						cursor: pointer;
						
					}

					.back:hover {
						background-color: var(--hover-black);
					}
					
					.drag-bar {
						align-self: center;
						height: 2px;
						width: 88px;
						background-color: #3D3D3D;
					}

					@media screen and (min-width: 1024px) {
						.mobile-panel-header {
							display: none;
						}
						.desktop-panel-header {
							display: flex;
						}
						.drag-area {
							display: none;
						}

						.header {
							margin: 28px 0px 28px 0px;
						}

						.back {
							display: flex;
						}

						.divider {
							display: block;
						}
					}
				`}</style>
		</>
	)
}


export const Panel: FC = () => {
	const { panel, setPanel } = useEditorSettings()
	const panelRef = useRef<HTMLDivElement>(null)

	const threshold = 100;

	const bounds = {
		top: 0,
		left: 0,
		right: 0,
		bottom: Infinity,
	};

	const onStop: DraggableEventHandler = (_, position) => {
		if (position.y >= threshold) {
			setPanel(null);
		}
	};

	return (
		<Draggable
			axis='y'
			position={{ x: 0, y: 0 }}
			bounds={bounds}
			handle='.mobile-panel-header'
			onStop={onStop}
		>
			<div className="panel" ref={panelRef}>
				<PanelHeader />
				<PanelContent />
				<style jsx>{`
					.panel {
						bottom:  ${ panel ? 'var(--mobile-toolbar-height)' : '-100%' };
						transition: ${panel ? 'bottom 0.04s cubic-bezier(0.390, 0.575, 0.565, 1.000), transform 0.05s ease, margin 0.11s cubic-bezier(0.390, 0.575, 0.565, 1.000)' : ''};
					}
				`}</style>
				<style jsx>{`
					.panel {
						overscroll-behavior: contain;
						height: calc(100% - var(--mobile-toolbar-height) - var(--mobile-header-height));
						box-shadow: 0px 0px 3px rgba(12, 12, 13, 0.39);
						width: 100%;
						background-color: var(--main-black);
						position: fixed;
						display: flex;
						flex-direction: column;
						overflow: hidden;
					}

					@media screen and (min-height: 420px) {
						.panel {
							max-height: calc(0.55 * (100% - var(--mobile-toolbar-height) - var(--mobile-header-height)));
							border-radius: 12px 12px 0px 0px;
						}
					}

					@media screen and (min-height: 912px) {
						.panel {
							max-height: calc(0.45 * (100% - var(--mobile-toolbar-height) - var(--mobile-header-height)));
							border-radius: 12px 12px 0px 0px;
						}
					}

					@media screen and (min-width: 1024px) {
						.panel {
							height: 100%;
							max-height: 100%;
							max-width: 355px;
							min-width: 355px;
							position: initial;
							transition: margin 0.11s cubic-bezier(0.390, 0.575, 0.565, 1.000);
							border-radius: 0px;

						}
					}
				`}</style>
				<style jsx>{`
					@media screen and (min-width: 1024px) {
						.panel {
							box-shadow: none;
							border-radius: 0px;
							border-right: 1px solid var(--accent-black);
							margin-left: ${ panel ? '0px;' : '-355px;' }
						}
					}
				`}</style>
			</div>
		</Draggable>
	)
}

// export const Panel: FC = () => {
// 	const { panel, setPanel } = useEditorSettings()
// 	const panelRef = useRef<HTMLDivElement>(null)

// 	const threshold = 100;

// 	const bounds = {
// 		top: 0,
// 		left: 0,
// 		right: 0,
// 		bottom: Infinity,
// 	};

// 	const onStop: DraggableEventHandler = (_, position) => {
// 		if (position.y >= threshold) {
// 			setPanel(null);
// 		}
// 	};

// 	return (
// 		<Draggable
// 		axis='y'
// 		position={{ x: 0, y: 0 }}
// 		bounds={bounds}
// 		handle='.drag-area'
// 		onStop={onStop}
// 		>
// 			<div className="panel" ref={panelRef}>
// 				<div className="drag-area">
// 					<div className="drag-bar" />
// 				</div>
// 				<div className="panelContentWrapper">
// 					{
// 						panel === 'spotlight' && <SpotlightPanel />
// 					}
// 				</div>
// 				<style jsx>{`
// 					.panel {
// 						top: ${ !panel ? 'calc(100% - 53px)' : 'calc(57px)' };
// 					}
// 				`}</style>
// 				<style jsx>{`
// 					.panel {
// 						overscroll-behavior: contain;
// 						height: calc(100% - 53px - 57px);
// 						box-shadow: 0px 0px 3px rgba(12, 12, 13, 0.39);
// 						width: 100%;
// 						background-color: var(--main-black);
// 						position: fixed;
// 						transition: ${panel ? 'top 0.04s cubic-bezier(0.390, 0.575, 0.565, 1.000), transform 0.05s ease' : ''};
// 						// padding: 0px 20px;
// 						overflow: hidden;
// 					}

// 					// .panelContentWrapper {
// 					// 	overflow: scroll;
// 					// 	height: calc(100% - 26px);
// 					// 	padding: 0px 20px;
// 					// }

// 					.drag-area {
// 						display: flex;
// 						height: 26px;
// 						width: 100%;
// 						justify-content: center;
// 						align-content: center;
// 					}	
					
// 					.drag-bar {
// 						align-self: center;
// 						height: 2px;
// 						width: 88px;
// 						background-color: #3D3D3D;
// 					}
// 					.header {
// 						font-size: 1.25rem;
// 						font-weight: 600;
// 						color: white;
// 						text-align: center;
// 						margin: 4px 0px 32px 0px;
// 					}

// 					@media screen and (min-height: 400px) {
// 						.panel {
// 							max-height: calc(100% - 45% - 53px - 57px);
// 							top: ${ !panel ? 'calc(100% - 53px)' : 'calc(45% + 57px)' };
// 							border-radius: 12px 12px 0px 0px;
// 						}
// 					}

// 					@media screen and (min-width: 1024px) {
// 						.panel {
// 							height: 100%;
// 							max-height: 100%;
// 							max-width: 355px;
// 							min-width: 355px;
// 							position: initial;
// 							transition: margin 0.11s cubic-bezier(0.390, 0.575, 0.565, 1.000);
// 							border-radius: 0px;

// 						}
// 						.drag-area {
// 							display: none;
// 						}
// 					}
// 				`}</style>
// 				<style jsx>{`
// 					@media screen and (min-width: 1024px) {
// 						.panel {
// 							box-shadow: none;
// 							border-radius: 0px;
// 							border-right: 1px solid var(--accent-black);
// 							margin-left: ${ panel ? '0px;' : '-355px;' }
// 						}
// 					}
// 				`}</style>
// 			</div>
// 		</Draggable>
// 	)
// }