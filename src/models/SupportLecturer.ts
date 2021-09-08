import Sequelize from 'sequelize';
import { SequelizeAttributes } from './typings/SequelizeAttributes';
import { Factory } from './typings/ModelInterface';
import ModelFactoryInterface from './typings/ModelFactoryInterface';

export interface SupportLecturerAttributes {
	id?: number;
  user_id?:number;
  subject_id?:number;
	created_at?: Date;
	updated_at?: Date;
}

export interface SupportLecturerInstance extends Sequelize.Instance<SupportLecturerAttributes>, SupportLecturerAttributes {
}

export interface Associate {
	(models: ModelFactoryInterface): void;
}

export const SupportLecturerFactory: Factory<SupportLecturerInstance, SupportLecturerAttributes> = (
	sequelize: Sequelize.Sequelize,
	DataTypes: Sequelize.DataTypes,
): Sequelize.Model<SupportLecturerInstance, SupportLecturerAttributes> => {
	const attributes: SequelizeAttributes<SupportLecturerAttributes> = {
		
	};
	const SupportLecturer: Sequelize.Model<SupportLecturerInstance, SupportLecturerAttributes> = sequelize.define<
		SupportLecturerInstance,
		SupportLecturerAttributes
	>('support_lecturer', attributes, { underscored: true });

	SupportLecturer.associate = (models: ModelFactoryInterface): void => {
		SupportLecturer.belongsTo(models.Subject, { onDelete: 'cascade' });
		SupportLecturer.belongsTo(models.User, { onDelete: 'cascade' });
	};

	return SupportLecturer;
};
