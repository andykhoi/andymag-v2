import { Editor } from '@/editor/components/Editor'
import { FC, useEffect } from 'react'
// import { useClerk } from '@clerk/nextjs'
import { useActivity, useUserFormatting } from '@/contexts/UserContext'
// import { initializeApollo } from '@/utils/apollo'
// import { gql } from '@apollo/client'
// import { GetMagnoliaContributorsQuery, GetMagnoliaContributorsDocument } from '@/graphql/queries/getMagnoliaContributors'
import { Contributors } from '@/types/schema'
// import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { PodcastPlayer } from '@/editor/content/PodcastPlayer'
// import { Text } from '@/editor/content/Text'
// import Draggable from 'react-draggable'

interface WhatIsArtProps {
	contributors: Contributors[]
}

const WhatIsArt: FC<WhatIsArtProps> = ({
	contributors
}) => {
	const { updateActivity, isLoaded } = useActivity()

	const router = useRouter()

	// potensh stick this into _app.js
	useEffect(() => {
		if (isLoaded && updateActivity) {
			updateActivity({ type: 'navigation', tags: [`path:${router.pathname}`, 'article:fleeting-but-not-fleeting'], timestamp: Date.now().toString() })
		}
	}, [updateActivity, isLoaded, router.pathname])

	return (
		<Editor
			people={contributors}
		>
			<PodcastPlayer url={'/audio/dafna.webm'} chapters={[{ time: '00:00', name: 'Introduction'}]}/>
		</Editor>
	)
}

// this is blocking...fonts from being loaded when a url query param is added -- this isn't a problem when building for production - think there's a weird dev env bug in next. 
// export const getStaticProps: GetStaticProps = async () => {
// 	const apollo = initializeApollo()

// 	const { data } = await apollo.query<GetMagnoliaContributorsQuery>({
// 		query: GetMagnoliaContributorsDocument
// 	})

// 	return {
// 		props: {
// 			contributors: data.contributors
// 		}
// 	}
// }

export default WhatIsArt