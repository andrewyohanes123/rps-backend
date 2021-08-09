import Sequelize from 'sequelize';
import { UserInstance, UserAttributes } from '../User';
import { TokenInstance, TokenAttributes } from '../Token';
import { ClassRoomAttributes, ClassRoomInstance } from '../ClassRoom';
import { ScheduleAttributes, ScheduleInstance } from '../Schedule';
import { PlanAttributes, PlanInstance } from '../Plan';
import { QuestionerAttributes, QuestionerInstance } from '../Questioner';
import { SubjectAttributes, SubjectInstance } from '../Subject';
import { SettingAttributes, SettingInstance } from '../Setting';
import { SemesterAttributes, SemesterInstance } from '../Semester';

interface Obj {
	[s: string]: any;
}

export default interface ModelFactoryInterface extends Obj {
	sequelize: Sequelize.Sequelize;
	Sequelize: Sequelize.SequelizeStatic;
	User: Sequelize.Model<UserInstance, UserAttributes>;
	Token: Sequelize.Model<TokenInstance, TokenAttributes>;
	ClassRoom: Sequelize.Model<ClassRoomInstance, ClassRoomAttributes>;
	Schedule: Sequelize.Model<ScheduleInstance, ScheduleAttributes>;
	Plan: Sequelize.Model<PlanInstance, PlanAttributes>;
	Questioner: Sequelize.Model<QuestionerInstance, QuestionerAttributes>;
	Subject: Sequelize.Model<SubjectInstance, SubjectAttributes>;
	Setting: Sequelize.Model<SettingInstance, SettingAttributes>;
	Semester: Sequelize.Model<SemesterInstance, SemesterAttributes>;
}
