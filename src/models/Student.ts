import Sequelize from 'sequelize';
import { SequelizeAttributes } from './typings/SequelizeAttributes';
import { Factory } from './typings/ModelInterface';
import ModelFactoryInterface from './typings/ModelFactoryInterface';

export interface StudentAttributes {
	id?: number;
  name: string;
  nim: string;
	semester_id?: number;
  schedule_id?: number;
  class_room_id?: number;
	created_at?: Date;
	updated_at?: Date;
}

export interface StudentInstance extends Sequelize.Instance<StudentAttributes>, StudentAttributes {
}

export interface Associate {
	(models: ModelFactoryInterface): void;
}

export const StudentFactory: Factory<StudentInstance, StudentAttributes> = (
	sequelize: Sequelize.Sequelize,
	DataTypes: Sequelize.DataTypes,
): Sequelize.Model<StudentInstance, StudentAttributes> => {
	const attributes: SequelizeAttributes<StudentAttributes> = {
    name: {
      type: DataTypes.STRING(191),
      allowNull: false
    },
    nim: {
      type: DataTypes.STRING(8),
      allowNull: false
    },
	};
	const Student: Sequelize.Model<StudentInstance, StudentAttributes> = sequelize.define<
		StudentInstance,
		StudentAttributes
	>('student', attributes, { underscored: true });

	Student.associate = (models: ModelFactoryInterface): void => {
		Student.belongsTo(models.ClassRoom, { onDelete: 'cascade' });
		Student.belongsTo(models.Semester, { onDelete: 'cascade' });
		Student.belongsTo(models.Schedule, { onDelete: 'cascade' });
		Student.hasMany(models.QuestionerResponse, { onDelete: 'cascade' });
	};

	return Student;
};
