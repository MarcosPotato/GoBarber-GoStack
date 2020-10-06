import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '../models/Users';

interface Request {
	email: string;
	password: string;
}

interface Response {
	user: User;
	token: string;
}

export default class AutheticateUserService {
	public async execute({ email, password }: Request): Promise<Response> {
		const userRepository = getRepository(User);

		const user = await userRepository.findOne({
			where: { email },
		});

		if (!user) {
			throw new Error('Incorrect email/password combination');
		}

		const passworMatched = await compare(password, user.password); // bool

		if (!passworMatched) {
			throw new Error('Incorrect email/password combination');
		}

		const token = sign({}, 'e7143e7e478f192a3ac723cf561b45f0', {
			subject: user.id,
			expiresIn: '1d',
		});

		return { user, token };
	}
}
