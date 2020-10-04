import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentsService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();

appointmentsRouter.post('/', async (request, response) => {
	try {
		const { provider, date, provider_id } = request.body;

		const parseDate = parseISO(date);

		const createAppointment = new CreateAppointmentsService();

		const appointment = await createAppointment.execute({
			provider_id,
			provider,
			date: parseDate,
		});

		return response.json(appointment);
	} catch (err) {
		return response.status(400).json({ error: err.message });
	}
});

appointmentsRouter.get('/', async (request, response) => {
	const appointmentsRepository = getCustomRepository(AppointmentsRepository);

	return response.status(200).json(await appointmentsRepository.find());
});

export default appointmentsRouter;
