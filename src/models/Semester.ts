import Sequelize from 'sequelize';
import { SequelizeAttributes } from './typings/SequelizeAttributes';
import { Factory } from './typings/ModelInterface';
import ModelFactoryInterface from './typings/ModelFactoryInterface';

export interface SemesterAttributes {
	id?: number;
  name: string;
  year: string;
	created_at?: Date;
	updated_at?: Date;
}

export interface SemesterInstance extends Sequelize.Instance<SemesterAttributes>, SemesterAttributes {
}

export interface Associate {
	(models: ModelFactoryInterface): void;
}

export const SemesterFactory: Factory<SemesterInstance, SemesterAttributes> = (
	sequelize: Sequelize.Sequelize,
	DataTypes: Sequelize.DataTypes,
): Sequelize.Model<SemesterInstance, SemesterAttributes> => {
	const attributes: SequelizeAttributes<SemesterAttributes> = {
    name: {
      type: DataTypes.STRING(191),
      allowNull: false
    },
    year: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
	};
	const Semester: Sequelize.Model<SemesterInstance, SemesterAttributes> = sequelize.define<
		SemesterInstance,
		SemesterAttributes
	>('semester', attributes, { underscored: true });

	Semester.associate = (models: ModelFactoryInterface): void => {
		Semester.hasMany(models.ClassRoom, { onDelete: 'cascade' });
	};

	return Semester;
};
