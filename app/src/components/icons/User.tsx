import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import { FC } from 'react'

interface UserProps {
	width: number;
	height: number;
}

export const User: FC<UserProps> = ({
	width,
	height
}) => {
	const { isLoaded, user } = useUser()
	
	return (
		<div className="user">
			{
				isLoaded && user &&
				<>			
					{ user.profileImageUrl ? 
						<Image src={user.profileImageUrl} alt={`Profile picture for ${user?.firstName} ${user?.lastName}`} width={width} height={height} /> 
						: 
						<div>
							{ user.firstName?.charAt(0) }
						</div>
					}
				</>
			}
			<style jsx>{`
				.user {
					overflow: hidden;
					border-radius: 100px;
				}
			`}</style>
		</div>
	)
}