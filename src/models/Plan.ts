import Sequelize from 'sequelize';
import { SequelizeAttributes } from './typings/SequelizeAttributes';
import { Factory } from './typings/ModelInterface';
import ModelFactoryInterface from './typings/ModelFactoryInterface';

export interface PlanAttributes {
	id?: number;
  file: string;
  description: {[any: string]: any}[];
  user_id?: number;
  schedule_id?: number;
	created_at?: Date;
	updated_at?: Date;
}

export interface PlanInstance extends Sequelize.Instance<PlanAttributes>, PlanAttributes {
}

export interface Associate {
	(models: ModelFactoryInterface): void;
}

export const PlanFactory: Factory<PlanInstance, PlanAttributes> = (
	sequelize: Sequelize.Sequelize,
	DataTypes: Sequelize.DataTypes,
): Sequelize.Model<PlanInstance, PlanAttributes> => {
	const attributes: SequelizeAttributes<PlanAttributes> = {
    file: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    description: {
      type: DataTypes.JSONB,
      allowNull: false
    }
	};
	const Plan: Sequelize.Model<PlanInstance, PlanAttributes> = sequelize.define<
		PlanInstance,
		PlanAttributes
	>('plan', attributes, { underscored: true });

	Plan.associate = (models: ModelFactoryInterface): void => {
		Plan.belongsTo(models.Schedule, { onDelete: 'cascade' });
		Plan.belongsTo(models.User, { onDelete: 'cascade' });
	};

	return Plan;
};
