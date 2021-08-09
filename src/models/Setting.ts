import Sequelize from 'sequelize';
import { SequelizeAttributes } from './typings/SequelizeAttributes';
import { Factory } from './typings/ModelInterface';
import ModelFactoryInterface from './typings/ModelFactoryInterface';

export interface SettingAttributes {
	id?: number;
  tolerance: number;
	created_at?: Date;
	updated_at?: Date;
}

export interface SettingInstance extends Sequelize.Instance<SettingAttributes>, SettingAttributes {
}

export interface Associate {
	(models: ModelFactoryInterface): void;
}

export const SettingFactory: Factory<SettingInstance, SettingAttributes> = (
	sequelize: Sequelize.Sequelize,
	DataTypes: Sequelize.DataTypes,
): Sequelize.Model<SettingInstance, SettingAttributes> => {
	const attributes: SequelizeAttributes<SettingAttributes> = {
    tolerance: {
      type: DataTypes.INTEGER(32),
      allowNull: false,
      defaultValue: 2
    }
	};
	const Setting: Sequelize.Model<SettingInstance, SettingAttributes> = sequelize.define<
		SettingInstance,
		SettingAttributes
	>('setting', attributes, { underscored: true });

	Setting.associate = (models: ModelFactoryInterface): void => {
		// Setting.hasMany(models.Schedule, { onDelete: 'cascade' });
	};

	return Setting;
};
