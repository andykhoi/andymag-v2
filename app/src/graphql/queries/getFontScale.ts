import * as Types from '../../types/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetFontScaleQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type GetFontScaleQuery = { __typename?: 'query_root', users: Array<{ __typename?: 'users', font_scale: string }> };


export const GetFontScaleDocument = gql`
    query GetFontScale($id: String!) {
  users(where: {auth_id: {_eq: $id}}) {
    font_scale
  }
}
    `;

/**
 * __useGetFontScaleQuery__
 *
 * To run a query within a React component, call `useGetFontScaleQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFontScaleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFontScaleQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetFontScaleQuery(baseOptions: Apollo.QueryHookOptions<GetFontScaleQuery, GetFontScaleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFontScaleQuery, GetFontScaleQueryVariables>(GetFontScaleDocument, options);
      }
export function useGetFontScaleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFontScaleQuery, GetFontScaleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFontScaleQuery, GetFontScaleQueryVariables>(GetFontScaleDocument, options);
        }
export type GetFontScaleQueryHookResult = ReturnType<typeof useGetFontScaleQuery>;
export type GetFontScaleLazyQueryHookResult = ReturnType<typeof useGetFontScaleLazyQuery>;
export type GetFontScaleQueryResult = Apollo.QueryResult<GetFontScaleQuery, GetFontScaleQueryVariables>;