import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
	provider: string;
	date: Date;
}

class CreateAppointmentService {
	/* private appointmentsRepository;

	constructor(appointmentsRepository: AppointmentsRepository) {
		this.appointmentsRepository = appointmentsRepository;
	} */

	public async execute({ provider, date }: Request): Promise<Appointment> {
		const appointmentsRepository = getCustomRepository(AppointmentsRepository);
		const alteredDate = startOfHour(date);

		if (appointmentsRepository.findByDate(alteredDate)) {
			throw Error('This appointments is already booked');
		}

		const appointment = appointmentsRepository.create({
			provider,
			date: alteredDate,
		});

		await appointmentsRepository.save(appointment);

		return appointment;
	}
}

export default CreateAppointmentService;
