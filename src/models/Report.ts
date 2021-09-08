import Sequelize from 'sequelize';
import { SequelizeAttributes } from './typings/SequelizeAttributes';
import { Factory } from './typings/ModelInterface';
import ModelFactoryInterface from './typings/ModelFactoryInterface';

export interface ReportAttributes {
	id?: number;
  check: boolean;
  user_id?: number;
  schedule_id?: number;
	class_room_id?: number;
	created_at?: Date;
	updated_at?: Date;
}

export interface ReportInstance extends Sequelize.Instance<ReportAttributes>, ReportAttributes {
}

export interface Associate {
	(models: ModelFactoryInterface): void;
}

export const ReportFactory: Factory<ReportInstance, ReportAttributes> = (
	sequelize: Sequelize.Sequelize,
	DataTypes: Sequelize.DataTypes,
): Sequelize.Model<ReportInstance, ReportAttributes> => {
	const attributes: SequelizeAttributes<ReportAttributes> = {
    check: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		}
	};
	const Report: Sequelize.Model<ReportInstance, ReportAttributes> = sequelize.define<
		ReportInstance,
		ReportAttributes
	>('report', attributes, { underscored: true });

	Report.associate = (models: ModelFactoryInterface): void => {
		Report.belongsTo(models.Schedule, { onDelete: 'cascade' });
		Report.belongsTo(models.ClassRoom, { onDelete: 'cascade' });
		Report.belongsTo(models.User, { onDelete: 'cascade' });
	};

	return Report;
};
