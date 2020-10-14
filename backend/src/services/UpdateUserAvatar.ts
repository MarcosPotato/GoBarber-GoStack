import path from 'path';
import fs from 'fs';
import { getRepository } from 'typeorm';

import User from '../models/Users';

import UploadConfig from '../config/upload';

interface Request {
	user_id: string;
	avatarFilename: string;
}

export default class UpdateUserAvatarService {
	public async execute({ user_id, avatarFilename }: Request): Promise<User> {
		const userRepository = getRepository(User);

		const user = await userRepository.findOne(user_id);

		if (!user) {
			throw new Error('Only authenticated user can be change avatar');
		}

		if (user.avatar) {
			const userAvatarFilePath = path.join(UploadConfig.directory, user.avatar);
			const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

			if (userAvatarFileExists) {
				await fs.promises.unlink(userAvatarFilePath);
			}
		}

		user.avatar = avatarFilename;
		delete user.password;

		await userRepository.save(user);

		return user;
	}
}