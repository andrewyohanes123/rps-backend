import Sequelize from 'sequelize';
import { SequelizeAttributes } from './typings/SequelizeAttributes';
import { Factory } from './typings/ModelInterface';
import ModelFactoryInterface from './typings/ModelFactoryInterface';

export interface QuestionerResponseAttributes {
	id?: number;
  answer: string;
	semester_id?: number;
	created_at?: Date;
	updated_at?: Date;
}

export interface QuestionerResponseInstance extends Sequelize.Instance<QuestionerResponseAttributes>, QuestionerResponseAttributes {
}

export interface Associate {
	(models: ModelFactoryInterface): void;
}

export const QuestionerResponseFactory: Factory<QuestionerResponseInstance, QuestionerResponseAttributes> = (
	sequelize: Sequelize.Sequelize,
	DataTypes: Sequelize.DataTypes,
): Sequelize.Model<QuestionerResponseInstance, QuestionerResponseAttributes> => {
	const attributes: SequelizeAttributes<QuestionerResponseAttributes> = {
    answer: {
      type: DataTypes.STRING(191),
      allowNull: false
    },
	};
	const QuestionerResponse: Sequelize.Model<QuestionerResponseInstance, QuestionerResponseAttributes> = sequelize.define<
		QuestionerResponseInstance,
		QuestionerResponseAttributes
	>('questioner_response', attributes, { underscored: true });

	QuestionerResponse.associate = (models: ModelFactoryInterface): void => {
		QuestionerResponse.belongsTo(models.Questioner, { onDelete: 'cascade' });
		QuestionerResponse.belongsTo(models.Student, { onDelete: 'cascade' });
	};

	return QuestionerResponse;
};
