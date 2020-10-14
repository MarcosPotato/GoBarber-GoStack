import 'reflect-metadata';

import express from 'express';
import Routes from './routes';
import uploadConfig from './config/upload';

import './database';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(Routes);

app.listen(9999, () => {
	console.log('Server started !!');
});
