import { APIGatewayProxyEvent } from 'aws-lambda'
import { request, gql } from 'graphql-request'
import { Clerk, Users } from '@clerk/clerk-sdk-node'

const insertUserMutation = gql`
	mutation InsertUser($auth_id: String!) {
		insert_users_one(object: { auth_id: $auth_id}) {
			id,
			auth_id
		}
	}
`

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
    const endpoint = process.env.HASURA_ENDPOINT as string;
    const headers = {
      'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET as string,
    };
    await request(endpoint, insertUserMutation, variables, headers);

    // Return a success response
	
	// Add hasura user id to clerk user 

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