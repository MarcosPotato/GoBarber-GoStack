import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.post('/', (request, response) => {
	const { provider, date } = request.body;

	const alteredDate = startOfHour(parseISO(date));

	const appointment = appointmentsRepository.createAppointment({
		provider,
		date: alteredDate,
	});

	if (appointmentsRepository.findByDate(alteredDate) !== null) {
		return response.status(200).json(appointment);
	}

	return response
		.status(400)
		.json({ error: 'This appointments is already booked' });
});

appointmentsRouter.get('/', (request, response) => {
	return response.status(200).json(appointmentsRepository.getAppointments());
});

export default appointmentsRouter;
