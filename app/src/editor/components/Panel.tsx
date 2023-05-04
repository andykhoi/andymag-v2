import { FC } from 'react'
import { useEditorSettings } from '../context/SettingsContextProvider'
import { useEditorPeople } from '../context/PeopleContextProvider'
import Image from 'next/image'

const SharePanel: FC = () => {
	return (
		<div>

		</div>
	)
}

const SpotlightPanel: FC = () => {
	const { people } = useEditorPeople()

	return (
		<>
			{ people.map(p => 
				<div key={p.id}>
					{
						p.profile_picture && <Image src={p.profile_picture} alt={`Image of ${p.first_name} ${p.last_name}`} width={100} height={100} />
					}
				</div>
			)}
		</>
	)
}

export const Panel: FC = () => {
	const { panel, setPanel } = useEditorSettings()

	return (
		<div className="panel">
			<button onClick={() => setPanel(null)}>close</button>
			{
				panel === 'spotlight' && <SpotlightPanel />
			}
			<style jsx>{`
				.panel {
					overscroll-behavior: contain;
					height: calc(100% - 53px - 57px);
					box-shadow: 0px 0px 3px rgba(12, 12, 13, 0.39);
					width: 100%;
					background-color: var(--main-black);
					position: fixed;
					transition: bottom 0.15s ease;
					padding: 0px 1rem;
					overflow: scroll;
				}

				// this might change to be dynamic to the height of content?
				@media screen and (min-height: 400px) {
					.panel {
						max-height: calc(100% - 45% - 53px - 57px);
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
					}
				}
			`}</style>
			<style jsx>{`
				.panel {
					bottom: ${ panel ? '53px' : 'calc(-100% + 53px + 57px)' };
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
	)
}