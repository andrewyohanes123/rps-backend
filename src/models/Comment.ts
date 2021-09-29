import Sequelize from 'sequelize';
import { SequelizeAttributes } from './typings/SequelizeAttributes';
import { Factory } from './typings/ModelInterface';
import ModelFactoryInterface from './typings/ModelFactoryInterface';

export interface CommentAttributes {
	id?: number;
  name: string;
  nim: string;
  content: string;
  subject_id?: number;
	created_at?: Date;
	updated_at?: Date;
}

export interface CommentInstance extends Sequelize.Instance<CommentAttributes>, CommentAttributes {
}

export interface Associate {
	(models: ModelFactoryInterface): void;
}

export const CommentFactory: Factory<CommentInstance, CommentAttributes> = (
	sequelize: Sequelize.Sequelize,
	DataTypes: Sequelize.DataTypes,
): Sequelize.Model<CommentInstance, CommentAttributes> => {
	const attributes: SequelizeAttributes<CommentAttributes> = {
    name: {
      type: DataTypes.STRING(191),
      allowNull: false
    },
    nim: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
	};
	const Comment: Sequelize.Model<CommentInstance, CommentAttributes> = sequelize.define<
		CommentInstance,
		CommentAttributes
	>('comment', attributes, { underscored: true });

	Comment.associate = (models: ModelFactoryInterface): void => {
		Comment.belongsTo(models.Subject, { onDelete: 'cascade' });
	};

	return Comment;
};
