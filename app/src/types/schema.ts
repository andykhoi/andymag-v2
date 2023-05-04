export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  jsonb: any;
  timestamptz: any;
  uuid: any;
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Boolean']>;
  _gt?: InputMaybe<Scalars['Boolean']>;
  _gte?: InputMaybe<Scalars['Boolean']>;
  _in?: InputMaybe<Array<Scalars['Boolean']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Boolean']>;
  _lte?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<Scalars['Boolean']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']>;
  _gt?: InputMaybe<Scalars['String']>;
  _gte?: InputMaybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']>;
  _lt?: InputMaybe<Scalars['String']>;
  _lte?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "contributors" */
export type Contributors = {
  __typename?: 'contributors';
  bio?: Maybe<Scalars['String']>;
  facebook?: Maybe<Scalars['String']>;
  first_name: Scalars['String'];
  id: Scalars['uuid'];
  instagram?: Maybe<Scalars['String']>;
  last_name: Scalars['String'];
  profile_picture?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['String']>;
  tags: Scalars['jsonb'];
  twitter?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
};


/** columns and relationships of "contributors" */
export type ContributorsTagsArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "contributors" */
export type Contributors_Aggregate = {
  __typename?: 'contributors_aggregate';
  aggregate?: Maybe<Contributors_Aggregate_Fields>;
  nodes: Array<Contributors>;
};

/** aggregate fields of "contributors" */
export type Contributors_Aggregate_Fields = {
  __typename?: 'contributors_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Contributors_Max_Fields>;
  min?: Maybe<Contributors_Min_Fields>;
};


/** aggregate fields of "contributors" */
export type Contributors_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Contributors_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Contributors_Append_Input = {
  tags?: InputMaybe<Scalars['jsonb']>;
};

/** Boolean expression to filter rows from the table "contributors". All fields are combined with a logical 'AND'. */
export type Contributors_Bool_Exp = {
  _and?: InputMaybe<Array<Contributors_Bool_Exp>>;
  _not?: InputMaybe<Contributors_Bool_Exp>;
  _or?: InputMaybe<Array<Contributors_Bool_Exp>>;
  bio?: InputMaybe<String_Comparison_Exp>;
  facebook?: InputMaybe<String_Comparison_Exp>;
  first_name?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  instagram?: InputMaybe<String_Comparison_Exp>;
  last_name?: InputMaybe<String_Comparison_Exp>;
  profile_picture?: InputMaybe<String_Comparison_Exp>;
  role?: InputMaybe<String_Comparison_Exp>;
  tags?: InputMaybe<Jsonb_Comparison_Exp>;
  twitter?: InputMaybe<String_Comparison_Exp>;
  website?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "contributors" */
export enum Contributors_Constraint {
  /** unique or primary key constraint on columns "id" */
  ContributorsIdKey = 'contributors_id_key',
  /** unique or primary key constraint on columns "id" */
  ContributorsPkey = 'contributors_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Contributors_Delete_At_Path_Input = {
  tags?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Contributors_Delete_Elem_Input = {
  tags?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Contributors_Delete_Key_Input = {
  tags?: InputMaybe<Scalars['String']>;
};

/** input type for inserting data into table "contributors" */
export type Contributors_Insert_Input = {
  bio?: InputMaybe<Scalars['String']>;
  facebook?: InputMaybe<Scalars['String']>;
  first_name?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  instagram?: InputMaybe<Scalars['String']>;
  last_name?: InputMaybe<Scalars['String']>;
  profile_picture?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Scalars['jsonb']>;
  twitter?: InputMaybe<Scalars['String']>;
  website?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Contributors_Max_Fields = {
  __typename?: 'contributors_max_fields';
  bio?: Maybe<Scalars['String']>;
  facebook?: Maybe<Scalars['String']>;
  first_name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  instagram?: Maybe<Scalars['String']>;
  last_name?: Maybe<Scalars['String']>;
  profile_picture?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['String']>;
  twitter?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Contributors_Min_Fields = {
  __typename?: 'contributors_min_fields';
  bio?: Maybe<Scalars['String']>;
  facebook?: Maybe<Scalars['String']>;
  first_name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  instagram?: Maybe<Scalars['String']>;
  last_name?: Maybe<Scalars['String']>;
  profile_picture?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['String']>;
  twitter?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "contributors" */
export type Contributors_Mutation_Response = {
  __typename?: 'contributors_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Contributors>;
};

/** on_conflict condition type for table "contributors" */
export type Contributors_On_Conflict = {
  constraint: Contributors_Constraint;
  update_columns?: Array<Contributors_Update_Column>;
  where?: InputMaybe<Contributors_Bool_Exp>;
};

/** Ordering options when selecting data from "contributors". */
export type Contributors_Order_By = {
  bio?: InputMaybe<Order_By>;
  facebook?: InputMaybe<Order_By>;
  first_name?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  instagram?: InputMaybe<Order_By>;
  last_name?: InputMaybe<Order_By>;
  profile_picture?: InputMaybe<Order_By>;
  role?: InputMaybe<Order_By>;
  tags?: InputMaybe<Order_By>;
  twitter?: InputMaybe<Order_By>;
  website?: InputMaybe<Order_By>;
};

/** primary key columns input for table: contributors */
export type Contributors_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Contributors_Prepend_Input = {
  tags?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "contributors" */
export enum Contributors_Select_Column {
  /** column name */
  Bio = 'bio',
  /** column name */
  Facebook = 'facebook',
  /** column name */
  FirstName = 'first_name',
  /** column name */
  Id = 'id',
  /** column name */
  Instagram = 'instagram',
  /** column name */
  LastName = 'last_name',
  /** column name */
  ProfilePicture = 'profile_picture',
  /** column name */
  Role = 'role',
  /** column name */
  Tags = 'tags',
  /** column name */
  Twitter = 'twitter',
  /** column name */
  Website = 'website'
}

/** input type for updating data in table "contributors" */
export type Contributors_Set_Input = {
  bio?: InputMaybe<Scalars['String']>;
  facebook?: InputMaybe<Scalars['String']>;
  first_name?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  instagram?: InputMaybe<Scalars['String']>;
  last_name?: InputMaybe<Scalars['String']>;
  profile_picture?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Scalars['jsonb']>;
  twitter?: InputMaybe<Scalars['String']>;
  website?: InputMaybe<Scalars['String']>;
};

/** Streaming cursor of the table "contributors" */
export type Contributors_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Contributors_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Contributors_Stream_Cursor_Value_Input = {
  bio?: InputMaybe<Scalars['String']>;
  facebook?: InputMaybe<Scalars['String']>;
  first_name?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  instagram?: InputMaybe<Scalars['String']>;
  last_name?: InputMaybe<Scalars['String']>;
  profile_picture?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Scalars['jsonb']>;
  twitter?: InputMaybe<Scalars['String']>;
  website?: InputMaybe<Scalars['String']>;
};

/** update columns of table "contributors" */
export enum Contributors_Update_Column {
  /** column name */
  Bio = 'bio',
  /** column name */
  Facebook = 'facebook',
  /** column name */
  FirstName = 'first_name',
  /** column name */
  Id = 'id',
  /** column name */
  Instagram = 'instagram',
  /** column name */
  LastName = 'last_name',
  /** column name */
  ProfilePicture = 'profile_picture',
  /** column name */
  Role = 'role',
  /** column name */
  Tags = 'tags',
  /** column name */
  Twitter = 'twitter',
  /** column name */
  Website = 'website'
}

export type Contributors_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<Contributors_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<Contributors_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<Contributors_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<Contributors_Delete_Key_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<Contributors_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Contributors_Set_Input>;
  /** filter the rows which have to be updated */
  where: Contributors_Bool_Exp;
};

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

export type Jsonb_Cast_Exp = {
  String?: InputMaybe<String_Comparison_Exp>;
};

/** Boolean expression to compare columns of type "jsonb". All fields are combined with logical 'AND'. */
export type Jsonb_Comparison_Exp = {
  _cast?: InputMaybe<Jsonb_Cast_Exp>;
  /** is the column contained in the given json value */
  _contained_in?: InputMaybe<Scalars['jsonb']>;
  /** does the column contain the given json value at the top level */
  _contains?: InputMaybe<Scalars['jsonb']>;
  _eq?: InputMaybe<Scalars['jsonb']>;
  _gt?: InputMaybe<Scalars['jsonb']>;
  _gte?: InputMaybe<Scalars['jsonb']>;
  /** does the string exist as a top-level key in the column */
  _has_key?: InputMaybe<Scalars['String']>;
  /** do all of these strings exist as top-level keys in the column */
  _has_keys_all?: InputMaybe<Array<Scalars['String']>>;
  /** do any of these strings exist as top-level keys in the column */
  _has_keys_any?: InputMaybe<Array<Scalars['String']>>;
  _in?: InputMaybe<Array<Scalars['jsonb']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['jsonb']>;
  _lte?: InputMaybe<Scalars['jsonb']>;
  _neq?: InputMaybe<Scalars['jsonb']>;
  _nin?: InputMaybe<Array<Scalars['jsonb']>>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "contributors" */
  delete_contributors?: Maybe<Contributors_Mutation_Response>;
  /** delete single row from the table: "contributors" */
  delete_contributors_by_pk?: Maybe<Contributors>;
  /** delete data from the table: "users" */
  delete_users?: Maybe<Users_Mutation_Response>;
  /** delete single row from the table: "users" */
  delete_users_by_pk?: Maybe<Users>;
  /** insert data into the table: "contributors" */
  insert_contributors?: Maybe<Contributors_Mutation_Response>;
  /** insert a single row into the table: "contributors" */
  insert_contributors_one?: Maybe<Contributors>;
  /** insert data into the table: "users" */
  insert_users?: Maybe<Users_Mutation_Response>;
  /** insert a single row into the table: "users" */
  insert_users_one?: Maybe<Users>;
  /** update data of the table: "contributors" */
  update_contributors?: Maybe<Contributors_Mutation_Response>;
  /** update single row of the table: "contributors" */
  update_contributors_by_pk?: Maybe<Contributors>;
  /** update multiples rows of table: "contributors" */
  update_contributors_many?: Maybe<Array<Maybe<Contributors_Mutation_Response>>>;
  /** update data of the table: "users" */
  update_users?: Maybe<Users_Mutation_Response>;
  /** update single row of the table: "users" */
  update_users_by_pk?: Maybe<Users>;
  /** update multiples rows of table: "users" */
  update_users_many?: Maybe<Array<Maybe<Users_Mutation_Response>>>;
};


/** mutation root */
export type Mutation_RootDelete_ContributorsArgs = {
  where: Contributors_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Contributors_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_UsersArgs = {
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Users_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootInsert_ContributorsArgs = {
  objects: Array<Contributors_Insert_Input>;
  on_conflict?: InputMaybe<Contributors_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Contributors_OneArgs = {
  object: Contributors_Insert_Input;
  on_conflict?: InputMaybe<Contributors_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_UsersArgs = {
  objects: Array<Users_Insert_Input>;
  on_conflict?: InputMaybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Users_OneArgs = {
  object: Users_Insert_Input;
  on_conflict?: InputMaybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_ContributorsArgs = {
  _append?: InputMaybe<Contributors_Append_Input>;
  _delete_at_path?: InputMaybe<Contributors_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Contributors_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Contributors_Delete_Key_Input>;
  _prepend?: InputMaybe<Contributors_Prepend_Input>;
  _set?: InputMaybe<Contributors_Set_Input>;
  where: Contributors_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Contributors_By_PkArgs = {
  _append?: InputMaybe<Contributors_Append_Input>;
  _delete_at_path?: InputMaybe<Contributors_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Contributors_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Contributors_Delete_Key_Input>;
  _prepend?: InputMaybe<Contributors_Prepend_Input>;
  _set?: InputMaybe<Contributors_Set_Input>;
  pk_columns: Contributors_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Contributors_ManyArgs = {
  updates: Array<Contributors_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_UsersArgs = {
  _append?: InputMaybe<Users_Append_Input>;
  _delete_at_path?: InputMaybe<Users_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Users_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Users_Delete_Key_Input>;
  _prepend?: InputMaybe<Users_Prepend_Input>;
  _set?: InputMaybe<Users_Set_Input>;
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Users_By_PkArgs = {
  _append?: InputMaybe<Users_Append_Input>;
  _delete_at_path?: InputMaybe<Users_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Users_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Users_Delete_Key_Input>;
  _prepend?: InputMaybe<Users_Prepend_Input>;
  _set?: InputMaybe<Users_Set_Input>;
  pk_columns: Users_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Users_ManyArgs = {
  updates: Array<Users_Updates>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "contributors" */
  contributors: Array<Contributors>;
  /** fetch aggregated fields from the table: "contributors" */
  contributors_aggregate: Contributors_Aggregate;
  /** fetch data from the table: "contributors" using primary key columns */
  contributors_by_pk?: Maybe<Contributors>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
};


export type Query_RootContributorsArgs = {
  distinct_on?: InputMaybe<Array<Contributors_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Contributors_Order_By>>;
  where?: InputMaybe<Contributors_Bool_Exp>;
};


export type Query_RootContributors_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contributors_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Contributors_Order_By>>;
  where?: InputMaybe<Contributors_Bool_Exp>;
};


export type Query_RootContributors_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Query_RootUsers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Query_RootUsers_By_PkArgs = {
  id: Scalars['uuid'];
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "contributors" */
  contributors: Array<Contributors>;
  /** fetch aggregated fields from the table: "contributors" */
  contributors_aggregate: Contributors_Aggregate;
  /** fetch data from the table: "contributors" using primary key columns */
  contributors_by_pk?: Maybe<Contributors>;
  /** fetch data from the table in a streaming manner: "contributors" */
  contributors_stream: Array<Contributors>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
  /** fetch data from the table in a streaming manner: "users" */
  users_stream: Array<Users>;
};


export type Subscription_RootContributorsArgs = {
  distinct_on?: InputMaybe<Array<Contributors_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Contributors_Order_By>>;
  where?: InputMaybe<Contributors_Bool_Exp>;
};


export type Subscription_RootContributors_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contributors_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Contributors_Order_By>>;
  where?: InputMaybe<Contributors_Bool_Exp>;
};


export type Subscription_RootContributors_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootContributors_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Contributors_Stream_Cursor_Input>>;
  where?: InputMaybe<Contributors_Bool_Exp>;
};


export type Subscription_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Subscription_RootUsers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Subscription_RootUsers_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootUsers_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Users_Stream_Cursor_Input>>;
  where?: InputMaybe<Users_Bool_Exp>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']>;
  _gt?: InputMaybe<Scalars['timestamptz']>;
  _gte?: InputMaybe<Scalars['timestamptz']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['timestamptz']>;
  _lte?: InputMaybe<Scalars['timestamptz']>;
  _neq?: InputMaybe<Scalars['timestamptz']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']>>;
};

/** dev users table  */
export type Users = {
  __typename?: 'users';
  activity: Scalars['jsonb'];
  auth_id: Scalars['String'];
  auto_collapse_header: Scalars['Boolean'];
  created_at: Scalars['timestamptz'];
  formatting: Scalars['jsonb'];
  id: Scalars['uuid'];
  settings: Scalars['jsonb'];
  updated_at: Scalars['timestamptz'];
};


/** dev users table  */
export type UsersActivityArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** dev users table  */
export type UsersFormattingArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** dev users table  */
export type UsersSettingsArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "users" */
export type Users_Aggregate = {
  __typename?: 'users_aggregate';
  aggregate?: Maybe<Users_Aggregate_Fields>;
  nodes: Array<Users>;
};

/** aggregate fields of "users" */
export type Users_Aggregate_Fields = {
  __typename?: 'users_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Users_Max_Fields>;
  min?: Maybe<Users_Min_Fields>;
};


/** aggregate fields of "users" */
export type Users_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Users_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Users_Append_Input = {
  activity?: InputMaybe<Scalars['jsonb']>;
  formatting?: InputMaybe<Scalars['jsonb']>;
  settings?: InputMaybe<Scalars['jsonb']>;
};

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type Users_Bool_Exp = {
  _and?: InputMaybe<Array<Users_Bool_Exp>>;
  _not?: InputMaybe<Users_Bool_Exp>;
  _or?: InputMaybe<Array<Users_Bool_Exp>>;
  activity?: InputMaybe<Jsonb_Comparison_Exp>;
  auth_id?: InputMaybe<String_Comparison_Exp>;
  auto_collapse_header?: InputMaybe<Boolean_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  formatting?: InputMaybe<Jsonb_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  settings?: InputMaybe<Jsonb_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "users" */
export enum Users_Constraint {
  /** unique or primary key constraint on columns "auth_id" */
  UsersAuthIdKey = 'users_auth_id_key',
  /** unique or primary key constraint on columns "id" */
  UsersPkey = 'users_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Users_Delete_At_Path_Input = {
  activity?: InputMaybe<Array<Scalars['String']>>;
  formatting?: InputMaybe<Array<Scalars['String']>>;
  settings?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Users_Delete_Elem_Input = {
  activity?: InputMaybe<Scalars['Int']>;
  formatting?: InputMaybe<Scalars['Int']>;
  settings?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Users_Delete_Key_Input = {
  activity?: InputMaybe<Scalars['String']>;
  formatting?: InputMaybe<Scalars['String']>;
  settings?: InputMaybe<Scalars['String']>;
};

/** input type for inserting data into table "users" */
export type Users_Insert_Input = {
  activity?: InputMaybe<Scalars['jsonb']>;
  auth_id?: InputMaybe<Scalars['String']>;
  auto_collapse_header?: InputMaybe<Scalars['Boolean']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  formatting?: InputMaybe<Scalars['jsonb']>;
  id?: InputMaybe<Scalars['uuid']>;
  settings?: InputMaybe<Scalars['jsonb']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Users_Max_Fields = {
  __typename?: 'users_max_fields';
  auth_id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type Users_Min_Fields = {
  __typename?: 'users_min_fields';
  auth_id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "users" */
export type Users_Mutation_Response = {
  __typename?: 'users_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Users>;
};

/** on_conflict condition type for table "users" */
export type Users_On_Conflict = {
  constraint: Users_Constraint;
  update_columns?: Array<Users_Update_Column>;
  where?: InputMaybe<Users_Bool_Exp>;
};

/** Ordering options when selecting data from "users". */
export type Users_Order_By = {
  activity?: InputMaybe<Order_By>;
  auth_id?: InputMaybe<Order_By>;
  auto_collapse_header?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  formatting?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  settings?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: users */
export type Users_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Users_Prepend_Input = {
  activity?: InputMaybe<Scalars['jsonb']>;
  formatting?: InputMaybe<Scalars['jsonb']>;
  settings?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "users" */
export enum Users_Select_Column {
  /** column name */
  Activity = 'activity',
  /** column name */
  AuthId = 'auth_id',
  /** column name */
  AutoCollapseHeader = 'auto_collapse_header',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Formatting = 'formatting',
  /** column name */
  Id = 'id',
  /** column name */
  Settings = 'settings',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "users" */
export type Users_Set_Input = {
  activity?: InputMaybe<Scalars['jsonb']>;
  auth_id?: InputMaybe<Scalars['String']>;
  auto_collapse_header?: InputMaybe<Scalars['Boolean']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  formatting?: InputMaybe<Scalars['jsonb']>;
  id?: InputMaybe<Scalars['uuid']>;
  settings?: InputMaybe<Scalars['jsonb']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** Streaming cursor of the table "users" */
export type Users_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Users_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Users_Stream_Cursor_Value_Input = {
  activity?: InputMaybe<Scalars['jsonb']>;
  auth_id?: InputMaybe<Scalars['String']>;
  auto_collapse_header?: InputMaybe<Scalars['Boolean']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  formatting?: InputMaybe<Scalars['jsonb']>;
  id?: InputMaybe<Scalars['uuid']>;
  settings?: InputMaybe<Scalars['jsonb']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** update columns of table "users" */
export enum Users_Update_Column {
  /** column name */
  Activity = 'activity',
  /** column name */
  AuthId = 'auth_id',
  /** column name */
  AutoCollapseHeader = 'auto_collapse_header',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Formatting = 'formatting',
  /** column name */
  Id = 'id',
  /** column name */
  Settings = 'settings',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type Users_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<Users_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<Users_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<Users_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<Users_Delete_Key_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<Users_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Users_Set_Input>;
  /** filter the rows which have to be updated */
  where: Users_Bool_Exp;
};

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['uuid']>;
  _gt?: InputMaybe<Scalars['uuid']>;
  _gte?: InputMaybe<Scalars['uuid']>;
  _in?: InputMaybe<Array<Scalars['uuid']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['uuid']>;
  _lte?: InputMaybe<Scalars['uuid']>;
  _neq?: InputMaybe<Scalars['uuid']>;
  _nin?: InputMaybe<Array<Scalars['uuid']>>;
};
