import * as Types from '../../../types/schema';

export type InsertUserMutationVariables = Types.Exact<{
  auth_id: Types.Scalars['String'];
}>;


export type InsertUserMutation = { __typename?: 'mutation_root', insert_users_one?: { __typename?: 'users', id: any, auth_id: string } | null };

export declare const InsertUser: import("graphql").DocumentNode;