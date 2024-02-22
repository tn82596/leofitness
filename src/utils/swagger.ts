import { Express, Request, Response } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
// import { version } from '../../package.json';

const options: swaggerJsdoc.Options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'LeoFiness API Docs',
			version: '1.0.0',
		},
		// add security Scheme later after we figure out user authentication
		// components: {
		// 	bearerAuth: {
		// 		type: 'http',
		// 		scheme: 'bearer',
		// 		bearerFormat: 'JWT',
		// 	},
		// },
		// security: [
		// 	{
		// 		bearerAuth: [],
		// 	},
		// ],
	},
	apis: ['./src/index.ts', './src/routes/*.ts', './src/models/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Express) {
	// swagger page
	app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
	// docs in JSON format
	app.get('docs.json', (req: Request, res: Response) => {
		res.setHeader('Content-Type', 'application/json');
		res.send(swaggerSpec);
	});
}

export default swaggerDocs;
