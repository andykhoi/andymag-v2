import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
	overwrite: true,
	documents: './src/graphql/**/*.graphql',
	schema: [
	{
		[`${process.env.NEXT_PUBLIC_HASURA_GRAPHQL_API}`]: {
			headers: {
				'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET as string,
			}
		}
	}
	],
	generates: {
		'./src/types/schema.ts': {
			plugins: [
				"typescript",
			],
		},
		"./src/types/": {
			plugins: ["typescript-operations", "typescript-react-apollo"],
			preset: "near-operation-file",
			presetConfig: {
				extension: '.ts',
				baseTypesPath: 'schema.ts'
			},
		}
	}
}

export default config

// import type { CodegenConfig } from '@graphql-codegen/cli'

// const config: CodegenConfig = {
// 	overwrite: true,
// 	documents: './src/graphql/**/*.graphql',
// 	schema: [
// 	{
// 		[`${process.env.HASURA_GRAPHQL_API}`]: {
// 			headers: {
// 				'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET as string,
// 			}
// 		}
// 	}
// 	],
// 	generates: {
// 		'./src/graphql/generated.ts': {
// 			plugins: [
// 				// {
// 				// 	add: {
// 				// 		content: "import * as SchemaTypes from '../types/schema'"
// 				// 	}
// 				// },
// 				"typescript-operations",
// 				"typescript-react-apollo"
// 			],
// 			config: {
// 				withHooks: true,
// 				withHOC: false,
//      			withComponent: false,
// 			}
// 		},
// 		'../types/schema.ts': {
// 			plugins: ["typescript"]
// 		}
// 	}
// }

// export default config