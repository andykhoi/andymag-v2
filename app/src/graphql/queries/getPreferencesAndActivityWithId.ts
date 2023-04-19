import * as Types from '../../types/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetPreferencesAndActivityWithIdQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type GetPreferencesAndActivityWithIdQuery = { __typename?: 'query_root', users: Array<{ __typename?: 'users', activity: any, preferences: any }> };


export const GetPreferencesAndActivityWithIdDocument = gql`
    query GetPreferencesAndActivityWithId($id: String!) {
  users(where: {auth_id: {_eq: $id}}) {
    activity
    preferences
  }
}
    `;

/**
 * __useGetPreferencesAndActivityWithIdQuery__
 *
 * To run a query within a React component, call `useGetPreferencesAndActivityWithIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPreferencesAndActivityWithIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPreferencesAndActivityWithIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPreferencesAndActivityWithIdQuery(baseOptions: Apollo.QueryHookOptions<GetPreferencesAndActivityWithIdQuery, GetPreferencesAndActivityWithIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPreferencesAndActivityWithIdQuery, GetPreferencesAndActivityWithIdQueryVariables>(GetPreferencesAndActivityWithIdDocument, options);
      }
export function useGetPreferencesAndActivityWithIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPreferencesAndActivityWithIdQuery, GetPreferencesAndActivityWithIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPreferencesAndActivityWithIdQuery, GetPreferencesAndActivityWithIdQueryVariables>(GetPreferencesAndActivityWithIdDocument, options);
        }
export type GetPreferencesAndActivityWithIdQueryHookResult = ReturnType<typeof useGetPreferencesAndActivityWithIdQuery>;
export type GetPreferencesAndActivityWithIdLazyQueryHookResult = ReturnType<typeof useGetPreferencesAndActivityWithIdLazyQuery>;
export type GetPreferencesAndActivityWithIdQueryResult = Apollo.QueryResult<GetPreferencesAndActivityWithIdQuery, GetPreferencesAndActivityWithIdQueryVariables>;