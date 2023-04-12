import { APIGatewayProxyEvent } from 'aws-lambda'
import { request, gql } from 'graphql-request'
import { Clerk } from '@clerk/clerk-sdk-node'
import { readFileSync } from 'fs'
import { InsertUserMutation } from '../graphql/mutations/insertUserMutation.gql'

const insertUserMutation = gql`${readFileSync(require.resolve('../graphql/mutations/insertUserMutation.graphql')).toString('utf-8')}`

export const handleClerkNewUser = async (event: APIGatewayProxyEvent) => {
	try {
		// Initialize Clerk instance
		const secretKey = process.env.CLERK_SECRET_KEY as string;
		const clerk = Clerk({ secretKey });

		// Parse the webhook payload from the event body
		const payload = JSON.parse(event.body || '{}');
		const userId = payload.data.id;

		// Define the variables for the mutation
		const variables = {
			auth_id: userId,
		};

		// Send the mutation to the Hasura GraphQL endpoint
		const endpoint = process.env.HASURA_GRAPHQL_API as string;
		const headers = {
			'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET as string,
		};
		const res = await request<InsertUserMutation>(endpoint, insertUserMutation, variables, headers);

		// Extract the Hasura user ID from the response
		const hasuraUserId = res?.insert_users_one?.id;

		// Update the Clerk user's public metadata with the Hasura user ID
		await clerk.users.updateUser(userId, {
			publicMetadata: { hasuraUserId },
		});

		return {
			statusCode: 200,
			body: JSON.stringify({ message: 'User added to Hasura successfully.' }),
		};
	} catch (error) {
		console.error('Error in Lambda function:', error);
		return {
			statusCode: 500,
			body: JSON.stringify({ message: 'An error occurred while processing the webhook.' }),
		};
	}
};