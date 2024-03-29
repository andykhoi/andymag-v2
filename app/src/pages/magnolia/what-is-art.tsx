import { Editor } from '@/editor/components/Editor'
import { FC, useEffect } from 'react'
import { useClerk } from '@clerk/nextjs'
import { useActivity, useUserFormatting } from '@/contexts/UserContext'
import { initializeApollo } from '@/utils/apollo'
import { gql } from '@apollo/client'
import { GetMagnoliaContributorsQuery, GetMagnoliaContributorsDocument } from '@/graphql/queries/getMagnoliaContributors'
import { Contributors } from '@/types/schema'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { Text } from '@/editor/content/Text'
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
			updateActivity({ type: 'navigation', tags: [`path:${router.pathname}`, 'article:what-is-art'], timestamp: Date.now().toString() })
		}
	}, [updateActivity, isLoaded, router.pathname])

	return (
		<Editor
			people={contributors}
		>
			<Text>I get up from under Kabu, having cleaned her wound, and stare into her honey-colored eyes. Although she is one hundred times my size, I&apos;ve never felt so connected to an animal in my entire life. This moment seems ethereal.</Text>
			<Text>Kabu is the child of a logging elephant. When she was a calf, Kabu followed her mom as she pulled logs. At the age of two, a rolling log hit Kabu and broke her front left wrist. Since then, Kabu has been disabled. Her right paw has also been infected from the pressure of her weight it has taken her entire life.</Text>
			<Text>Despite her injury, Kabu was forced back into the logging industry, as well as the breeding program. Both of her children were taken away from her. Her daughter was forced into the show industry. Her son died during the phajaan process, where elephants&apos; spirits are broken so they can work.</Text>
			<Text>Kabu&apos;s story is painful, but her story gets to be told. Unlike most of her similars, she is recognized as an inTextidual subject and not only as a specimen.</Text>
			<Text>In Art History, the way animals are represented constitutes a reliable indicator of human societies&apos; approach to nature and nonhuman diversity. Animal-related imagery of all times and places can be read in many different ways: as symbols and metaphors for the Good and the Evil; in terms of a nature-related spirituality (early human civilizations, tribal cultures, eastern cultures); as scientific phenomena.</Text>
			<Text>The archetype of man-vs-animal-duel is one of the most successful narratives and iconographic schemes of all times, just think of the numerous St. Georges and St. Michaels fighting dragons all over art history.</Text>
			<Text>Of course, there are also animal fiction genres based on interspecies friendship and love. But in these cases, the animals&apos; intelligence is usually measured by their ability to behave like humans. In other words: we want animals to be the losers, or we want them to be like us.</Text>
			<Text>Despite her injury, Kabu was forced back into the logging industry, as well as the breeding program. Both of her children were taken away from her. Her daughter was forced into the show industry. Her son died during the phajaan process, where elephants&apos; spirits are broken so they can work.</Text>
			<Text>Kabu&apos;s story is painful, but her story gets to be told. Unlike most of her similars, she is recognized as an inTextidual subject and not only as a specimen.</Text>
			<Text>In Art History, the way animals are represented constitutes a reliable indicator of human societies&apos; approach to nature and nonhuman diversity. Animal-related imagery of all times and places can be read in many different ways: as symbols and metaphors for the Good and the Evil; in terms of a nature-related spirituality (early human civilizations, tribal cultures, eastern cultures); as scientific phenomena.</Text>
			<Text>The archetype of man-vs-animal-duel is one of the most successful narratives and iconographic schemes of all times, just think of the numerous St. Georges and St. Michaels fighting dragons all over art history.</Text>
			<Text>Of course, there are also animal fiction genres based on interspecies friendship and love. But in these cases, the animals&apos; intelligence is usually measured by their ability to behave like humans. In other words: we want animals to be the losers, or we want them to be like us.</Text>
		</Editor>
	)
}

// this is blocking...fonts from being loaded when a url query param is added -- this isn't a problem when building for production - think there's a weird dev env bug in next. 
export const getStaticProps: GetStaticProps = async () => {
	const apollo = initializeApollo()

	const { data } = await apollo.query<GetMagnoliaContributorsQuery>({
		query: GetMagnoliaContributorsDocument
	})

	return {
		props: {
			contributors: data.contributors
		}
	}
}

export default WhatIsArt