import { ApolloClient, InMemoryCache, HttpLink, NormalizedCacheObject, from } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { GetToken } from '@clerk/types'

const isServer = typeof window === 'undefined'

export const initializeApollo: (
	options?: 
	{
		// getToken?: GetToken,
		// withAuth?: boolean
		auth?: {
			getToken: GetToken
		}
	}
) => ApolloClient<NormalizedCacheObject> = (options) => {
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
	let authLink;
	if (isServer) {
		authLink = setContext(async (_, { headers }) => {
			return {
				headers: {
					...headers,
					'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
				}
			}
		})
	} else {
		authLink = setContext(async (_, { headers }) => {
			const token = options?.auth?.getToken ? await options?.auth?.getToken({ template: 'hasura' }) : null
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
	}
	
	// new ApolloClient
	// if (!options?.auth) {
	// 	return new ApolloClient({
	// 		uri: process.env.NEXT_PUBLIC_HASURA_GRAPHQL_API,
	// 		cache: new InMemoryCache(),
	// 		link: from([errorLink, httpLink])
	// 	})
	// }

	return new ApolloClient({
		uri: process.env.NEXT_PUBLIC_HASURA_GRAPHQL_API,
		cache: new InMemoryCache(),
		link: from([errorLink, authLink, httpLink])
	})
}