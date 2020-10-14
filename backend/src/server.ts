import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import Routes from './routes';
import uploadConfig from './config/upload';

import AppError from './errors/AppError';

import './database';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(Routes);

app.use(
	(err: Error, request: Request, response: Response, next: NextFunction) => {
		if (err instanceof AppError) {
			return response.status(err.statusCode).json({
				status: 'Error',
				message: err.message,
			});
		}

		console.log(err);

		return response.status(500).json({
			status: 'Error',
			messsage: 'Internal server error',
		});
	},
);

app.listen(9999, () => {
	console.log('Server started !!');
});
