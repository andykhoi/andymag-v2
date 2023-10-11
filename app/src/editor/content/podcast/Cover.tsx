import { FC } from 'react'
import { Row } from '@/editor/components/Row'
import Image from 'next/image'

export interface CoverProps {
	coverSrc: string,
	coverAlt: string
}

export const Cover: FC<CoverProps> = ({
	coverAlt,
	coverSrc
}) => {
	return (
		<div>
			<Row height='auto'>
				<div className="dafna-title">
					<span>
						FLEETING
					</span>
					<span>
						BUT NOT
					</span>
					<span>
						FLEETING
					</span>
				</div>
				<Image src={coverSrc} alt={coverAlt} fill style={{ objectFit: 'cover'}}/>
				<div className="cover-gradient" />
			</Row>
			<style jsx>{`
				div {
					container: content / inline-size
				}
			`}</style>
		</div>
	)
}