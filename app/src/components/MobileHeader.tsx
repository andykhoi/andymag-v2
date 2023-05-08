import { FC, ReactNode } from 'react'
import { Logo as LogoIcon } from './icons'
import { Menu as MenuIcon } from './icons/Menu'
import { Login } from './icons'
import Link from 'next/link'
import { SignedOut, SignedIn } from '@clerk/nextjs'
import { User } from './icons/User'
interface MobileHeaderProps {
	logo: boolean
	menu: boolean
	authentication: boolean
	user: boolean
	scrollIndicator: boolean
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

// const Logo: FC = () => {
// 	return (
// 		<div>
// 			<LogoIcon />
// 			<style jsx>{`
// 				div {
// 					width: 22px;
// 				}
// 			`}</style>
// 		</div>
// 	)
// }

// const Menu: FC = () => {
// 	return (
// 		<div>
// 			<MenuIcon />
// 		</div>
// 	)
// }



export const MobileHeader: FC<MobileHeaderProps> = ({
	logo,
	menu,
	authentication,
	user,
	scrollIndicator
}) => {
	return (
		<div className="header">
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
					backdrop-filter: blur(13px);
					box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.39);
					padding: 0px 23px;
					justify-content: space-between;
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