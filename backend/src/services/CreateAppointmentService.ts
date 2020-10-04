import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
	provider: string;
	date: Date;
	provider_id: string;
}

class CreateAppointmentService {
	/* private appointmentsRepository;

	constructor(appointmentsRepository: AppointmentsRepository) {
		this.appointmentsRepository = appointmentsRepository;
	} */

	public async execute({
		provider,
		date,
		provider_id,
	}: Request): Promise<Appointment> {
		const appointmentsRepository = getCustomRepository(AppointmentsRepository);
		const alteredDate = startOfHour(date);

		const findRespository = await appointmentsRepository.findByDate(
			alteredDate,
		);
		if (findRespository) {
			throw Error('This appointments is already booked');
		}

		const appointment = appointmentsRepository.create({
			provider_id,
			provider,
			date: alteredDate,
		});

		await appointmentsRepository.save(appointment);

		return appointment;
	}
}

export default CreateAppointmentService;
