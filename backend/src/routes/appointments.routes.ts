import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentsService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.post('/', (request, response) => {
	try {
		const { provider, date } = request.body;

		const parseDate = parseISO(date);

		const createAppointment = new CreateAppointmentsService(
			appointmentsRepository,
		);

		const appointment = createAppointment.execute({
			provider,
			date: parseDate,
		});

		return response.json(appointment);
	} catch (err) {
		return response.status(400).json({ error: err.message });
	}
});

appointmentsRouter.get('/', (request, response) => {
	return response.status(200).json(appointmentsRepository.getAppointments());
});

export default appointmentsRouter;
