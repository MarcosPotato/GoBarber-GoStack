import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
	provider: string;
	date: Date;
}

class CreateAppointmentService {
	private appointmentsRepository;

	constructor(appointmentsRepository: AppointmentsRepository) {
		this.appointmentsRepository = appointmentsRepository;
	}

	public execute({ provider, date }: Request): Appointment {
		const alteredDate = startOfHour(date);

		if (this.appointmentsRepository.findByDate(alteredDate)) {
			throw Error('This appointments is already booked');
		}

		const appointment = this.appointmentsRepository.createAppointment({
			provider,
			date: alteredDate,
		});

		return appointment;
	}
}

export default CreateAppointmentService;
