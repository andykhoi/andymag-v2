import { APIGatewayProxyEvent } from 'aws-lambda';

export const initUser = async (event: APIGatewayProxyEvent) => {
	try {
		const response = {
			statusCode: 200,
			body: JSON.stringify({ message: 'Hello from Lambda!' }),
		};
		return response;
	} catch (error) {
		console.error('Error in Lambda function:', error);
		throw error;
	}
}