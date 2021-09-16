
import express from 'express';
import ModelFactoryInterface from '../models/typings/ModelFactoryInterface';
import { Routes } from './typings/RouteInterface';
import a from '../middlewares/wrapper/a';
import { OkResponse } from './typings/BodyBuilderInterface';
import { PaginatedResult } from './typings/QueryInterface';
import sequelize from 'sequelize';
import { Parser } from '../helpers/Parser';
import NotFoundError from '../classes/NotFoundError';
import { SubjectInstance, SubjectAttributes } from '../models/Subject';
import onlyAuth from '../middlewares/protector/auth';
import { SupportLecturerInstance } from '../models/SupportLecturer';

interface subjectPost extends SubjectAttributes {
    support_lecturers: number[];
}

const subjectsRoutes: Routes = (
    app: express.Application,
    models: ModelFactoryInterface,
): express.Router => {
    const router: express.Router = express.Router();

    router.get(
        '/',
        Parser.validateQ(),
        a(
            async (req: express.Request, res: express.Response): Promise<void> => {
                const parsed: sequelize.FindOptions<SubjectInstance> = Parser.parseQuery<SubjectInstance>(
                    `${req.query.q}`,
                    models,
                );
                const data: PaginatedResult<SubjectInstance> = await models.Subject.findAndCountAll(parsed);
                const body: OkResponse = { data };

                res.json(body);
            },
        ),
    );

    router.get(
        '/:id',
        a(
            async (req: express.Request, res: express.Response): Promise<void> => {
                const { id }: any = req.params;
                const subject: SubjectInstance | null = await models.Subject.findByPk(id, {
                    include: [
                        { model: models.User, as: 'Coordinator' },
                        { model: models.User, as: 'Creator' },
                        { model: models.User, as: 'ProgramChief' },
                        {
                            model: models.SupportLecturer, include: [{
                                model: models.User
                            }]
                        },
                    ]
                });
                if (!subject) throw new NotFoundError('Subject tidak ditemukan');
                const body: OkResponse = { data: subject };

                res.json(body);
            },
        ),
    );

    router.post(
        '/',
        // validation,
        onlyAuth(),
        a(
            async (req: express.Request, res: express.Response): Promise<void> => {
                const attributes: subjectPost = req.body;
                const { support_lecturers } = attributes;
                const subject: SubjectInstance = await models.Subject.create(attributes);
                support_lecturers.forEach(async lecturer => {
                    await models.SupportLecturer.create({ user_id: lecturer, subject_id: subject.id });
                })
                const body: OkResponse = { data: subject };

                res.json(body);
            },
        ),
    );

    router.put(
        '/:id',
        // validation,
        onlyAuth(),
        a(
            async (req: express.Request, res: express.Response): Promise<void> => {
                const { id }: any = req.params;
                const attributes: subjectPost = req.body;
                const { support_lecturers: supports } = attributes;
                const subject: SubjectInstance | null = await models.Subject.findByPk(id);
                const supportLecturers: SupportLecturerInstance[] = await models.SupportLecturer.findAll({
                    where: {
                        subject_id: id
                    }
                });
                supportLecturers.forEach(async lecturer => {
                    await lecturer.destroy();
                });
                supports.forEach(async lecturer => {
                    await models.SupportLecturer.create({
                        user_id: lecturer,
                        subject_id: id
                    });
                });
                if (!subject) throw new NotFoundError('Subject tidak ditemukan');
                const updatedSubject: SubjectInstance = await subject.update(attributes);
                const body: OkResponse = { data: updatedSubject };

                res.json(body);
            },
        ),
    );

    router.delete(
        '/:id',
        onlyAuth(),
        a(
            async (req: express.Request, res: express.Response): Promise<void> => {
                const { id }: any = req.params;
                const subject: SubjectInstance | null = await models.Subject.findByPk(id);
                if (!subject) throw new NotFoundError('Subject tidak ditemukan');
                await subject.destroy();
                const body: OkResponse = { data: subject };

                res.json(body);
            },
        ),
    );

    return router;
};

export default subjectsRoutes;
