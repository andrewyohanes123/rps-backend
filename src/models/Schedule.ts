import Sequelize from 'sequelize';
import { SequelizeAttributes } from './typings/SequelizeAttributes';
import { Factory } from './typings/ModelInterface';
import ModelFactoryInterface from './typings/ModelFactoryInterface';

export interface ScheduleAttributes {
	id?: number;
	week_count: number;
	capabilities?: string;
	study_material?: string;
	study_method?: string;
	indicator?: string;
	scoring_format_criteria?: string;
	description?: string;
	value: number;
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
		week_count: {
			type: DataTypes.INTEGER(32),
			allowNull: false,
			defaultValue: 1
		},
		capabilities: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		indicator: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		scoring_format_criteria: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		study_material: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		study_method: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		value: {
			type: DataTypes.TEXT,
			allowNull: false
		},
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
