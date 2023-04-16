import type { CodegenConfig } from '@graphql-codegen/cli'
// import type { Types } from '@graphql-codegen/plugin-helpers';

const config: CodegenConfig = {
	overwrite: true,
	documents: './src/graphql/**/*.graphql',
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
		'./src/graphql/generated.ts': {
			plugins: [
				// {
				// 	add: {
				// 		content: "import * as SchemaTypes from '../types/schema'"
				// 	}
				// },
				"typescript-operations",
				"typescript-react-apollo"
			],
			config: {
				withHooks: true,
				withHOC: false,
     			withComponent: false,
			}
		},
		'../types/schema.ts': {
			plugins: ["typescript"]
		}
	}
}

export default config