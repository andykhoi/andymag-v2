import * as Types from '../../types/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAutoCollapseHeaderQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type GetAutoCollapseHeaderQuery = { __typename?: 'query_root', users: Array<{ __typename?: 'users', auto_collapse_header: boolean }> };


export const GetAutoCollapseHeaderDocument = gql`
    query GetAutoCollapseHeader($id: String!) {
  users(where: {auth_id: {_eq: $id}}) {
    auto_collapse_header
  }
}
    `;

/**
 * __useGetAutoCollapseHeaderQuery__
 *
 * To run a query within a React component, call `useGetAutoCollapseHeaderQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAutoCollapseHeaderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAutoCollapseHeaderQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetAutoCollapseHeaderQuery(baseOptions: Apollo.QueryHookOptions<GetAutoCollapseHeaderQuery, GetAutoCollapseHeaderQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAutoCollapseHeaderQuery, GetAutoCollapseHeaderQueryVariables>(GetAutoCollapseHeaderDocument, options);
      }
export function useGetAutoCollapseHeaderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAutoCollapseHeaderQuery, GetAutoCollapseHeaderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAutoCollapseHeaderQuery, GetAutoCollapseHeaderQueryVariables>(GetAutoCollapseHeaderDocument, options);
        }
export type GetAutoCollapseHeaderQueryHookResult = ReturnType<typeof useGetAutoCollapseHeaderQuery>;
export type GetAutoCollapseHeaderLazyQueryHookResult = ReturnType<typeof useGetAutoCollapseHeaderLazyQuery>;
export type GetAutoCollapseHeaderQueryResult = Apollo.QueryResult<GetAutoCollapseHeaderQuery, GetAutoCollapseHeaderQueryVariables>;