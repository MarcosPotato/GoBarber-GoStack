import { MigrationInterface, QueryRunner, Table } from 'typeorm';

// Vc só pode alterar uma migrations se ele não foi enviada pro git, caso tenha criar uma migration que altere os dados da antiga

export default class CreateAppointments1601752185342
	implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'appointments',
				columns: [
					{
						name: 'id',
						type: 'varchar',
						isPrimary: true,
						generationStrategy: 'uuid',
					},
					{
						name: 'provider',
						type: 'varchar',
						isNullable: false,
					},
					{
						name: 'date',
						type: 'timestamp with time zone', // só funciona no postgres
						isNullable: false,
					},
				],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('appointments');
	}
}
