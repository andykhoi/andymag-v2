import * as Types from '../../types/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetFormattingQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type GetFormattingQuery = { __typename?: 'query_root', users: Array<{ __typename?: 'users', formatting: any }> };


export const GetFormattingDocument = gql`
    query GetFormatting($id: String!) {
  users(where: {auth_id: {_eq: $id}}) {
    formatting
  }
}
    `;

/**
 * __useGetFormattingQuery__
 *
 * To run a query within a React component, call `useGetFormattingQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFormattingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFormattingQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetFormattingQuery(baseOptions: Apollo.QueryHookOptions<GetFormattingQuery, GetFormattingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFormattingQuery, GetFormattingQueryVariables>(GetFormattingDocument, options);
      }
export function useGetFormattingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFormattingQuery, GetFormattingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFormattingQuery, GetFormattingQueryVariables>(GetFormattingDocument, options);
        }
export type GetFormattingQueryHookResult = ReturnType<typeof useGetFormattingQuery>;
export type GetFormattingLazyQueryHookResult = ReturnType<typeof useGetFormattingLazyQuery>;
export type GetFormattingQueryResult = Apollo.QueryResult<GetFormattingQuery, GetFormattingQueryVariables>;