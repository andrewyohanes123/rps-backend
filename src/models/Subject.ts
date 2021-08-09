import Sequelize from 'sequelize';
import { SequelizeAttributes } from './typings/SequelizeAttributes';
import { Factory } from './typings/ModelInterface';
import ModelFactoryInterface from './typings/ModelFactoryInterface';

export interface SubjectAttributes {
	id?: number;
  name: string;
	created_at?: Date;
	updated_at?: Date;
}

export interface SubjectInstance extends Sequelize.Instance<SubjectAttributes>, SubjectAttributes {
}

export interface Associate {
	(models: ModelFactoryInterface): void;
}

export const SubjectFactory: Factory<SubjectInstance, SubjectAttributes> = (
	sequelize: Sequelize.Sequelize,
	DataTypes: Sequelize.DataTypes,
): Sequelize.Model<SubjectInstance, SubjectAttributes> => {
	const attributes: SequelizeAttributes<SubjectAttributes> = {
    name: {
      type: DataTypes.STRING(191),
      allowNull: false
    }
	};
	const Subject: Sequelize.Model<SubjectInstance, SubjectAttributes> = sequelize.define<
		SubjectInstance,
		SubjectAttributes
	>('subject', attributes, { underscored: true });

	Subject.associate = (models: ModelFactoryInterface): void => {
		Subject.hasMany(models.Schedule, { onDelete: 'cascade' });
	};

	return Subject;
};
