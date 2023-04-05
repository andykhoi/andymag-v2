import { request, RequestDocument } from 'graphql-request';

interface Variables {
  [key: string]: any;
}

export const sendMutation = async (query: RequestDocument, variables: Variables): Promise<any> => {
  const endpoint = process.env.HASURA_GRAPHQL_ENDPOINT
  const headers = {
    'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET
  };

  try {
    const response = await request(endpoint, query, variables, headers);
    return response;
  } catch (error) {
    console.error('Error sending mutation:', error);
    throw error;
  }
};