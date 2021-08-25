import Sequelize from 'sequelize';
import { SequelizeAttributes } from './typings/SequelizeAttributes';
import { Factory } from './typings/ModelInterface';
import ModelFactoryInterface from './typings/ModelFactoryInterface';

export interface QuestionerAttributes {
	id?: number;
  question: string;
  user_id?: number;
	created_at?: Date;
	updated_at?: Date;
}

export interface QuestionerInstance extends Sequelize.Instance<QuestionerAttributes>, QuestionerAttributes {
}

export interface Associate {
	(models: ModelFactoryInterface): void;
}

export const QuestionerFactory: Factory<QuestionerInstance, QuestionerAttributes> = (
	sequelize: Sequelize.Sequelize,
	DataTypes: Sequelize.DataTypes,
): Sequelize.Model<QuestionerInstance, QuestionerAttributes> => {
	const attributes: SequelizeAttributes<QuestionerAttributes> = {
    question: {
      type: DataTypes.STRING(191),
      allowNull: false
    }
	};
	const Questioner: Sequelize.Model<QuestionerInstance, QuestionerAttributes> = sequelize.define<
		QuestionerInstance,
		QuestionerAttributes
	>('questioner', attributes, { underscored: true });

	Questioner.associate = (models: ModelFactoryInterface): void => {
		Questioner.hasMany(models.Student, { onDelete: 'cascade' });
		Questioner.belongsTo(models.User, { onDelete: 'cascade' });
	};

	return Questioner;
};
