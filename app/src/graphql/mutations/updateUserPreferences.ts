import * as Types from '../../types/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateUserPreferencesMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
  preferences: Types.Scalars['jsonb'];
}>;


export type UpdateUserPreferencesMutation = { __typename?: 'mutation_root', update_users?: { __typename?: 'users_mutation_response', returning: Array<{ __typename?: 'users', preferences: any }> } | null };


export const UpdateUserPreferencesDocument = gql`
    mutation UpdateUserPreferences($id: String!, $preferences: jsonb!) {
  update_users(where: {auth_id: {_eq: $id}}, _set: {preferences: $preferences}) {
    returning {
      preferences
    }
  }
}
    `;
export type UpdateUserPreferencesMutationFn = Apollo.MutationFunction<UpdateUserPreferencesMutation, UpdateUserPreferencesMutationVariables>;

/**
 * __useUpdateUserPreferencesMutation__
 *
 * To run a mutation, you first call `useUpdateUserPreferencesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserPreferencesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserPreferencesMutation, { data, loading, error }] = useUpdateUserPreferencesMutation({
 *   variables: {
 *      id: // value for 'id'
 *      preferences: // value for 'preferences'
 *   },
 * });
 */
export function useUpdateUserPreferencesMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserPreferencesMutation, UpdateUserPreferencesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserPreferencesMutation, UpdateUserPreferencesMutationVariables>(UpdateUserPreferencesDocument, options);
      }
export type UpdateUserPreferencesMutationHookResult = ReturnType<typeof useUpdateUserPreferencesMutation>;
export type UpdateUserPreferencesMutationResult = Apollo.MutationResult<UpdateUserPreferencesMutation>;
export type UpdateUserPreferencesMutationOptions = Apollo.BaseMutationOptions<UpdateUserPreferencesMutation, UpdateUserPreferencesMutationVariables>;