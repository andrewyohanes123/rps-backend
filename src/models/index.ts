import Sequelize from 'sequelize';
import ModelFactoryInterface from './typings/ModelFactoryInterface';
import { UserFactory } from './User';
import { TokenFactory } from './Token';
import { ClassRoomFactory } from './ClassRoom';
import { ScheduleFactory } from './Schedule';
import { SettingFactory } from './Setting';
import { QuestionerFactory } from './Questioner';
import { PlanFactory } from './Plan';
import { SubjectFactory } from './Subject';
import { SemesterFactory } from './Semester';
import { ReportFactory } from './Report';
import { StudentFactory } from './Student';
import { QuestionerResponseFactory } from './QuestionerResponse';
import { SupportLecturerFactory } from './SupportLecturer';

const createModels: Function = (): ModelFactoryInterface => {
	const {
		DB_HOST,
		DB_DIALECT,
		DB_DATABASE = 'sirius',
		DB_USER = 'sirius',
		DB_PASS = 'sirius',
	}: NodeJS.ProcessEnv = process.env;
	const sequelize: Sequelize.Sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASS, {
		host: DB_HOST,
		dialect: DB_DIALECT,
		dialectOptions: {
			useUTC: true,
		},
		timezone: '+08:00',
		operatorsAliases: true,
		logging: process.env.SYSTEM_LOGGING === 'true' ? console.log : (msg: string) => { },
	});
	const db: ModelFactoryInterface = {
		sequelize,
		Sequelize,
		User: UserFactory(sequelize, Sequelize),
		Token: TokenFactory(sequelize, Sequelize),
		ClassRoom: ClassRoomFactory(sequelize, Sequelize),
		Schedule: ScheduleFactory(sequelize, Sequelize),
		Setting: SettingFactory(sequelize, Sequelize),
		Questioner: QuestionerFactory(sequelize, Sequelize),
		Plan: PlanFactory(sequelize, Sequelize),
		Subject: SubjectFactory(sequelize, Sequelize),
		Semester: SemesterFactory(sequelize, Sequelize),
		Report: ReportFactory(sequelize, Sequelize),
		Student: StudentFactory(sequelize, Sequelize),
		QuestionerResponse: QuestionerResponseFactory(sequelize, Sequelize),
		SupportLecturer: SupportLecturerFactory(sequelize, Sequelize)
	};

	Object.keys(db).forEach(
		(model: string): void => {
			if (db[model].associate) {
				db[model].associate(db);
			}
		},
	);

	return db;
};

export default createModels;
