// import { isEqual } from 'date-fns';
import { EntityRepository, Repository } from 'typeorm';
import Appointment from '../models/Appointment';

// Data Transfer Object
/*
interface CreateAppointmentDTO {
	provider: string;
	date: Date;
} */
@EntityRepository(Appointment)
class AppointmentsRpository extends Repository<Appointment> {
	public async findByDate(date: Date): Promise<Appointment | null> {
		/* const findAppointment = this.appointments.find(appointment =>
			isEqual(date, appointment.date),
		); */

		const findAppointment = await this.findOne({
			where: { date },
		});
		return findAppointment || null;
	}
}

export default AppointmentsRpository;
