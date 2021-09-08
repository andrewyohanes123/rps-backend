import Sequelize from 'sequelize';
import { SequelizeAttributes } from './typings/SequelizeAttributes';
import { Factory } from './typings/ModelInterface';
import ModelFactoryInterface from './typings/ModelFactoryInterface';

export interface SubjectAttributes {
	id?: number;
  name: string;
	code: number;
	type: "Praktek" | "Teori";
	program_study_achievement: string;
	subject_achievement: string;
	subject_weight: number;
	semester_id?: number;
	creator_id?: number;
	coordinator_id?: number;
	program_chief?: number;
	software: string;
	hardware: string;
	guide: string;
	journal: string;
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
    },
		code: {
			type: DataTypes.INTEGER(12),
			allowNull: false
		},
		type: {
			type: DataTypes.ENUM(['Praktek', "Teori"]),
			allowNull: false
		},
		subject_weight: {
			type: DataTypes.INTEGER(8),
			allowNull: false
		},
		subject_achievement: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		program_study_achievement: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		software: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		hardware: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		guide: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		journal: {
			type: DataTypes.TEXT,
			allowNull: false
		},
	};
	const Subject: Sequelize.Model<SubjectInstance, SubjectAttributes> = sequelize.define<
		SubjectInstance,
		SubjectAttributes
	>('subject', attributes, { underscored: true });

	Subject.associate = (models: ModelFactoryInterface): void => {
		Subject.hasMany(models.Schedule, { onDelete: 'cascade' });
		Subject.belongsTo(models.Semester, { onDelete: 'cascade' });
		Subject.belongsTo(models.User, { onDelete: 'cascade', as: 'Creator' });
		Subject.belongsTo(models.User, { onDelete: 'cascade', as: 'Coordinator' });
		Subject.belongsTo(models.User, { onDelete: 'cascade', as: 'ProgramChief' });
	};

	return Subject;
};
