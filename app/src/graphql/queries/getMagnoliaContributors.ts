import * as Types from '../../types/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetMagnoliaContributorsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetMagnoliaContributorsQuery = { __typename?: 'query_root', contributors: Array<{ __typename?: 'contributors', first_name: string, bio?: string | null, facebook?: string | null, instagram?: string | null, id: any, profile_picture?: string | null, last_name: string, role?: string | null, tags: any, twitter?: string | null, website?: string | null, location?: string | null }> };


export const GetMagnoliaContributorsDocument = gql`
    query GetMagnoliaContributors {
  contributors(where: {tags: {_contains: "issue:magnolia"}}) {
    first_name
    bio
    facebook
    instagram
    id
    profile_picture
    last_name
    role
    tags
    twitter
    website
    location
  }
}
    `;

/**
 * __useGetMagnoliaContributorsQuery__
 *
 * To run a query within a React component, call `useGetMagnoliaContributorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMagnoliaContributorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMagnoliaContributorsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMagnoliaContributorsQuery(baseOptions?: Apollo.QueryHookOptions<GetMagnoliaContributorsQuery, GetMagnoliaContributorsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMagnoliaContributorsQuery, GetMagnoliaContributorsQueryVariables>(GetMagnoliaContributorsDocument, options);
      }
export function useGetMagnoliaContributorsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMagnoliaContributorsQuery, GetMagnoliaContributorsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMagnoliaContributorsQuery, GetMagnoliaContributorsQueryVariables>(GetMagnoliaContributorsDocument, options);
        }
export type GetMagnoliaContributorsQueryHookResult = ReturnType<typeof useGetMagnoliaContributorsQuery>;
export type GetMagnoliaContributorsLazyQueryHookResult = ReturnType<typeof useGetMagnoliaContributorsLazyQuery>;
export type GetMagnoliaContributorsQueryResult = Apollo.QueryResult<GetMagnoliaContributorsQuery, GetMagnoliaContributorsQueryVariables>;