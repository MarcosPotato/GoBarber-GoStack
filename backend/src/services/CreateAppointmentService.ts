import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
	date: Date;
	provider_id: string;
}

class CreateAppointmentService {
	/* private appointmentsRepository;

	constructor(appointmentsRepository: AppointmentsRepository) {
		this.appointmentsRepository = appointmentsRepository;
	} */

	public async execute({ date, provider_id }: Request): Promise<Appointment> {
		const appointmentsRepository = getCustomRepository(AppointmentsRepository);
		const alteredDate = startOfHour(date);

		const findRespository = await appointmentsRepository.findByDate(
			alteredDate,
		);
		if (findRespository) {
			throw new AppError('This appointments is already booked');
		}

		const appointment = appointmentsRepository.create({
			provider_id,
			date: alteredDate,
		});

		await appointmentsRepository.save(appointment);

		return appointment;
	}
}

export default CreateAppointmentService;
