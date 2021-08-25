import Sequelize from 'sequelize';
import { SequelizeAttributes } from './typings/SequelizeAttributes';
import { Factory } from './typings/ModelInterface';
import ModelFactoryInterface from './typings/ModelFactoryInterface';

export interface ScheduleAttributes {
	id?: number;
	daytime: string;
	user_id?: number;
	class_room_id?: number;
	subject_id?: number;
	created_at?: Date;
	updated_at?: Date;
}

export interface ScheduleInstance extends Sequelize.Instance<ScheduleAttributes>, ScheduleAttributes {
}

export interface Associate {
	(models: ModelFactoryInterface): void;
}

export const ScheduleFactory: Factory<ScheduleInstance, ScheduleAttributes> = (
	sequelize: Sequelize.Sequelize,
	DataTypes: Sequelize.DataTypes,
): Sequelize.Model<ScheduleInstance, ScheduleAttributes> => {
	const attributes: SequelizeAttributes<ScheduleAttributes> = {		
		daytime: {
			type: DataTypes.DATE,
			allowNull: false
		}
	};
	const Schedule: Sequelize.Model<ScheduleInstance, ScheduleAttributes> = sequelize.define<
		ScheduleInstance,
		ScheduleAttributes
	>('schedule', attributes, { underscored: true });

	Schedule.associate = (models: ModelFactoryInterface): void => {
		Schedule.belongsTo(models.ClassRoom, { onDelete: 'cascade' });
		Schedule.belongsTo(models.Subject, { onDelete: 'cascade' });
		Schedule.belongsTo(models.User, { onDelete: 'cascade' });
	};

	return Schedule;
};
