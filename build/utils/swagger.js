"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
// import { version } from '../../package.json';
const options = {
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
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
function swaggerDocs(app) {
    // swagger page
    app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
    // docs in JSON format
    app.get('docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
}
exports.default = swaggerDocs;
