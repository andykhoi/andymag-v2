import type { CodegenConfig } from '@graphql-codegen/cli'
// import type { Types } from '@graphql-codegen/plugin-helpers';

const config: CodegenConfig = {
	overwrite: true,
	documents: './graphql/**/*.graphql',
	//   schema: './graphql/**/*.graphql',
	schema: [
	{
		[`${process.env.HASURA_GRAPHQL_API}`]: {
			headers: {
				'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET as string,
			}
		}
	}
	],
	generates: {
		"../types/schema.ts": {
			plugins: ["typescript"]
		},
		// "../../types/functions/operations.ts": {
		// 	plugins: ["typescript-operations"],
		// 	config: {
		// 		skipTypename: true
		// 	}
		// }
		// "../../types/functions/mutations.ts": {
		// 	plugins: ["typescript", "typescript-operations"]	
		// }
		"../types/": {
			// documents: './graphql/mutations/*.graphql',
			plugins: ["typescript-operations"],
			preset: "near-operation-file",
			presetConfig: {
				extension: '.gql.d.ts',
				baseTypesPath: 'schema.ts'
			},
			config: {
				addOperationExport: true
			}
		}
	}
}

export default config