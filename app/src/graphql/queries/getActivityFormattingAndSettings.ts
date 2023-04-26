import * as Types from '../../types/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetActivityFormattingAndSettingsQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type GetActivityFormattingAndSettingsQuery = { __typename?: 'query_root', users: Array<{ __typename?: 'users', activity: any, formatting: any, settings: any }> };


export const GetActivityFormattingAndSettingsDocument = gql`
    query GetActivityFormattingAndSettings($id: String!) {
  users(where: {auth_id: {_eq: $id}}) {
    activity
    formatting
    settings
  }
}
    `;

/**
 * __useGetActivityFormattingAndSettingsQuery__
 *
 * To run a query within a React component, call `useGetActivityFormattingAndSettingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetActivityFormattingAndSettingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetActivityFormattingAndSettingsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetActivityFormattingAndSettingsQuery(baseOptions: Apollo.QueryHookOptions<GetActivityFormattingAndSettingsQuery, GetActivityFormattingAndSettingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetActivityFormattingAndSettingsQuery, GetActivityFormattingAndSettingsQueryVariables>(GetActivityFormattingAndSettingsDocument, options);
      }
export function useGetActivityFormattingAndSettingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetActivityFormattingAndSettingsQuery, GetActivityFormattingAndSettingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetActivityFormattingAndSettingsQuery, GetActivityFormattingAndSettingsQueryVariables>(GetActivityFormattingAndSettingsDocument, options);
        }
export type GetActivityFormattingAndSettingsQueryHookResult = ReturnType<typeof useGetActivityFormattingAndSettingsQuery>;
export type GetActivityFormattingAndSettingsLazyQueryHookResult = ReturnType<typeof useGetActivityFormattingAndSettingsLazyQuery>;
export type GetActivityFormattingAndSettingsQueryResult = Apollo.QueryResult<GetActivityFormattingAndSettingsQuery, GetActivityFormattingAndSettingsQueryVariables>;