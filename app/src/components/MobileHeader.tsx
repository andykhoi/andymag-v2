import { FC, ReactNode, useState, useEffect } from 'react'
import { Logo as LogoIcon } from './icons'
import { Menu as MenuIcon } from './icons/Menu'
import { Login } from './icons'
import Link from 'next/link'
import { SignedOut, SignedIn } from '@clerk/nextjs'
import { User } from './icons/User'
import { useUserSettings } from '@/contexts/UserContext'
interface MobileHeaderProps {
	logo?: boolean
	menu?: boolean
	authentication?: boolean
	user?: boolean
	scrollIndicator?: boolean
	collapsible?: boolean
}

interface IconProps {
	icon: ReactNode
	width?: number
}

const Icon: FC<IconProps> = ({
	icon,
	width
}) => {
	return (
		<div>
			{ icon }
			<style jsx>{`
				div {
					width: ${ width ? `${width}px` : 'auto' };
				}
			`}</style>
		</div>
	)
}

export const MobileHeader: FC<MobileHeaderProps> = ({
	logo = false,
	menu = false,
	authentication = false,
	user = false,
	scrollIndicator = false,
	collapsible = false
}) => {
	const { settings } = useUserSettings()
	const [prevScrollPos, setPrevScrollPos] = useState(0);
	const [visible, setVisible] = useState(true);
  
	useEffect(() => {
		const handleScroll = () => {
			const currentScrollPos = window.pageYOffset;
			const isVisible = prevScrollPos > currentScrollPos || currentScrollPos < 10;
			setPrevScrollPos(currentScrollPos);
			setVisible(isVisible);
		};
	
	  	if (settings?.autoCollapseHeader) {
			window.addEventListener('scroll', handleScroll);
		} else {
			setVisible(true);
		}
  
	  	return () => window.removeEventListener('scroll', handleScroll);
	}, [prevScrollPos, settings?.autoCollapseHeader]);

	return (
		<div className={`header ${visible ? '' : 'header--collapsed'}`}>
			<div className="group">
				{ logo && 
					<Link href="/">
						<Icon icon={<LogoIcon />} width={22} /> 
					</Link>
				}
			</div>
			<div className="group">
				{ menu && 
					<Link href="#" shallow>
						<Icon icon={<MenuIcon />} /> 
					</Link>
				}
				<SignedOut>
					{ authentication && 
						<Link href="?a=sign-in" shallow>
							<Icon icon={<Login />} width={19} /> 
						</Link>
					}
				</SignedOut>
				<SignedIn>
					{ user && 
						<Link href="#" shallow>
							<User width={25} height={25} />
						</Link>
					}
				</SignedIn>
			</div>
			<style jsx>{`
				.header {
					display: flex;
					align-items: center;
					height: 53px;
					width: 100%;
					background: hsla(240, 4%, 9%, 0.83);
					position: fixed;
					z-index: 10;
					top: 0;
					backdrop-filter: blur(13px);
					box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.39);
					padding: 0px 23px;
					justify-content: space-between;
					border-bottom: 1px solid #313135;
					transition: top 0.15s ease;
				}
				.header--collapsed {
					top: -53px;
				}
				.group {
					display: flex;
					align-items: center;
					gap: 36px;
				}

				@media screen and (min-width: 1024px) {
					.header {
						display: none;
					}
				}
			`}</style>
		</div>
	)
}