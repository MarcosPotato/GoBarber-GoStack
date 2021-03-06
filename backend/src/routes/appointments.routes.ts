import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentsService from '../services/CreateAppointmentService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post('/', async (request, response) => {
	const { provider_id, date } = request.body;

	const parseDate = parseISO(date);

	const createAppointment = new CreateAppointmentsService();

	const appointment = await createAppointment.execute({
		provider_id,
		date: parseDate,
	});

	return response.json(appointment);
});

appointmentsRouter.get('/', async (request, response) => {
	const appointmentsRepository = getCustomRepository(AppointmentsRepository);

	return response.status(200).json(await appointmentsRepository.find());
});

export default appointmentsRouter;
