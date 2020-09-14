import { Router } from 'express';
import { v4 } from 'uuid';

const appointmentsRouter = Router();

const appointments = [];

appointmentsRouter.post('/', (request, response) => {
	const { provider, date } = request.body;

	const appointment = {
		id: v4(),
		provider,
		date,
	};

	appointments.push(appointment);

	return response.status(204).json();
});

export default appointmentsRouter;
