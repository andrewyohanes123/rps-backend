import Sequelize from 'sequelize';
import { SequelizeAttributes } from './typings/SequelizeAttributes';
import { Factory } from './typings/ModelInterface';
import ModelFactoryInterface from './typings/ModelFactoryInterface';

export interface ClassRoomAttributes {
	id?: number;
  name: string;
	semester_id?: number;
	created_at?: Date;
	updated_at?: Date;
}

export interface ClassRoomInstance extends Sequelize.Instance<ClassRoomAttributes>, ClassRoomAttributes {
}

export interface Associate {
	(models: ModelFactoryInterface): void;
}

export const ClassRoomFactory: Factory<ClassRoomInstance, ClassRoomAttributes> = (
	sequelize: Sequelize.Sequelize,
	DataTypes: Sequelize.DataTypes,
): Sequelize.Model<ClassRoomInstance, ClassRoomAttributes> => {
	const attributes: SequelizeAttributes<ClassRoomAttributes> = {
    name: {
      type: DataTypes.STRING(191),
      allowNull: false
    }
	};
	const ClassRoom: Sequelize.Model<ClassRoomInstance, ClassRoomAttributes> = sequelize.define<
		ClassRoomInstance,
		ClassRoomAttributes
	>('class_room', attributes, { underscored: true });

	ClassRoom.associate = (models: ModelFactoryInterface): void => {
		ClassRoom.hasMany(models.Schedule, { onDelete: 'cascade' });
		ClassRoom.belongsTo(models.Semester, { onDelete: 'cascade' });
	};

	return ClassRoom;
};
