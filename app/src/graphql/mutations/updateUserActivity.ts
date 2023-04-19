import * as Types from '../../types/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateUserActivityMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
  activity: Types.Scalars['jsonb'];
}>;


export type UpdateUserActivityMutation = { __typename?: 'mutation_root', update_users?: { __typename?: 'users_mutation_response', returning: Array<{ __typename?: 'users', activity: any }> } | null };


export const UpdateUserActivityDocument = gql`
    mutation UpdateUserActivity($id: String!, $activity: jsonb!) {
  update_users(where: {auth_id: {_eq: $id}}, _append: {activity: $activity}) {
    returning {
      activity
    }
  }
}
    `;
export type UpdateUserActivityMutationFn = Apollo.MutationFunction<UpdateUserActivityMutation, UpdateUserActivityMutationVariables>;

/**
 * __useUpdateUserActivityMutation__
 *
 * To run a mutation, you first call `useUpdateUserActivityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserActivityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserActivityMutation, { data, loading, error }] = useUpdateUserActivityMutation({
 *   variables: {
 *      id: // value for 'id'
 *      activity: // value for 'activity'
 *   },
 * });
 */
export function useUpdateUserActivityMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserActivityMutation, UpdateUserActivityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserActivityMutation, UpdateUserActivityMutationVariables>(UpdateUserActivityDocument, options);
      }
export type UpdateUserActivityMutationHookResult = ReturnType<typeof useUpdateUserActivityMutation>;
export type UpdateUserActivityMutationResult = Apollo.MutationResult<UpdateUserActivityMutation>;
export type UpdateUserActivityMutationOptions = Apollo.BaseMutationOptions<UpdateUserActivityMutation, UpdateUserActivityMutationVariables>;