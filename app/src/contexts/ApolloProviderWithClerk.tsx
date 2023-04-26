import { FC, ReactNode, useState, useEffect, useMemo } from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, NormalizedCacheObject, from } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { useAuth, useUser } from '@clerk/nextjs'
import { GetToken } from '@clerk/types'

interface ApolloProviderWithClerkProps {
	children: ReactNode
}

const initializeApollo: ({ getToken }: { getToken?: GetToken}) => ApolloClient<NormalizedCacheObject> = ({
	getToken
}) => {
	// errorlink
	const errorLink = onError(({ graphQLErrors, networkError }) => {
		if (graphQLErrors)
			graphQLErrors.forEach(({ message, locations, path }) =>
				console.log(
					`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
				)
			)
		if (networkError) console.log(`[Network error]: ${networkError}`)
	})

	// httplink
	const httpLink = new HttpLink({
		uri: process.env.NEXT_PUBLIC_HASURA_GRAPHQL_API,
		credentials: 'same-origin'
	});

	// authLink
	const authLink = setContext(async (_, { headers }) => {
		const token = getToken ? await getToken({ template: 'hasura' }) : null
		if (!token) {
			return {
				headers: {
					...headers,
				}
			}
		}

		return {
			headers: {
				...headers,
				authorization: token ? `Bearer ${token}` : null
			}
		}
	})

	// new ApolloClient
	return new ApolloClient({
		uri: process.env.NEXT_PUBLIC_HASURA_GRAPHQL_API,
		cache: new InMemoryCache(),
		link: from([errorLink, authLink, httpLink])
	})
}

export const ApolloProviderWithClerk: FC<ApolloProviderWithClerkProps> = ({
	children
}) => {
	const { getToken } = useAuth()

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const client = useMemo(() => initializeApollo({ getToken }), [])
	
	return (
		<ApolloProvider client={client}>
			{ children }
		</ApolloProvider>
	)
}