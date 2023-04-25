import * as Types from '../../types/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateUserFormattingMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
  formatting: Types.Scalars['jsonb'];
}>;


export type UpdateUserFormattingMutation = { __typename?: 'mutation_root', update_users?: { __typename?: 'users_mutation_response', returning: Array<{ __typename?: 'users', formatting: any }> } | null };


export const UpdateUserFormattingDocument = gql`
    mutation UpdateUserFormatting($id: String!, $formatting: jsonb!) {
  update_users(where: {auth_id: {_eq: $id}}, _set: {formatting: $formatting}) {
    returning {
      formatting
    }
  }
}
    `;
export type UpdateUserFormattingMutationFn = Apollo.MutationFunction<UpdateUserFormattingMutation, UpdateUserFormattingMutationVariables>;

/**
 * __useUpdateUserFormattingMutation__
 *
 * To run a mutation, you first call `useUpdateUserFormattingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserFormattingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserFormattingMutation, { data, loading, error }] = useUpdateUserFormattingMutation({
 *   variables: {
 *      id: // value for 'id'
 *      formatting: // value for 'formatting'
 *   },
 * });
 */
export function useUpdateUserFormattingMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserFormattingMutation, UpdateUserFormattingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserFormattingMutation, UpdateUserFormattingMutationVariables>(UpdateUserFormattingDocument, options);
      }
export type UpdateUserFormattingMutationHookResult = ReturnType<typeof useUpdateUserFormattingMutation>;
export type UpdateUserFormattingMutationResult = Apollo.MutationResult<UpdateUserFormattingMutation>;
export type UpdateUserFormattingMutationOptions = Apollo.BaseMutationOptions<UpdateUserFormattingMutation, UpdateUserFormattingMutationVariables>;