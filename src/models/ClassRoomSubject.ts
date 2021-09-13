import Sequelize from 'sequelize';
import { SequelizeAttributes } from './typings/SequelizeAttributes';
import { Factory } from './typings/ModelInterface';
import ModelFactoryInterface from './typings/ModelFactoryInterface';

export interface ClassRoomSubjectAttributes {
	id?: number;
	semester_id?: number;
  subject_id?: number;
  class_room_id?: number;
	created_at?: Date;
	updated_at?: Date;
}

export interface ClassRoomSubjectInstance extends Sequelize.Instance<ClassRoomSubjectAttributes>, ClassRoomSubjectAttributes {
}

export interface Associate {
	(models: ModelFactoryInterface): void;
}

export const ClassRoomSubjectFactory: Factory<ClassRoomSubjectInstance, ClassRoomSubjectAttributes> = (
	sequelize: Sequelize.Sequelize,
	DataTypes: Sequelize.DataTypes,
): Sequelize.Model<ClassRoomSubjectInstance, ClassRoomSubjectAttributes> => {
	const attributes: SequelizeAttributes<ClassRoomSubjectAttributes> = {
    
	};
	const ClassRoomSubject: Sequelize.Model<ClassRoomSubjectInstance, ClassRoomSubjectAttributes> = sequelize.define<
		ClassRoomSubjectInstance,
		ClassRoomSubjectAttributes
	>('class_room_subject', attributes, { underscored: true });

	ClassRoomSubject.associate = (models: ModelFactoryInterface): void => {
		ClassRoomSubject.belongsTo(models.Semester, { onDelete: 'cascade' });
		ClassRoomSubject.belongsTo(models.Subject, { onDelete: 'cascade' });
		ClassRoomSubject.belongsTo(models.ClassRoomSubject, { onDelete: 'cascade' });
	};

	return ClassRoomSubject;
};
