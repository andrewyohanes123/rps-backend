
import express from 'express';
import ModelFactoryInterface from '../models/typings/ModelFactoryInterface';
import { Routes } from './typings/RouteInterface';
import a from '../middlewares/wrapper/a';
import { OkResponse } from './typings/BodyBuilderInterface';
import { PaginatedResult } from './typings/QueryInterface';
import sequelize from 'sequelize';
import { Parser } from '../helpers/Parser';
import NotFoundError from '../classes/NotFoundError';
import { ClassRoomSubjectInstance, ClassRoomSubjectAttributes } from '../models/ClassRoomSubject';

const classroomsubjectsRoutes: Routes = (
    app: express.Application,
    models: ModelFactoryInterface,
): express.Router => {
    const router: express.Router = express.Router();

    router.get(
        '/',
        Parser.validateQ(),
        a(
            async (req: express.Request, res: express.Response): Promise<void> => {
                const parsed: sequelize.FindOptions<ClassRoomSubjectInstance> = Parser.parseQuery<ClassRoomSubjectInstance>(
                    `${req.query.q}`,
                    models,
                );
                const data: PaginatedResult<ClassRoomSubjectInstance> = await models.ClassRoomSubject.findAndCountAll(parsed);
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
                const classroomsubject: ClassRoomSubjectInstance | null = await models.ClassRoomSubject.findByPk(id);
                if (!classroomsubject) throw new NotFoundError('ClassRoomSubject tidak ditemukan');
                const body: OkResponse = { data: classroomsubject };

                res.json(body);
            },
        ),
    );

    router.post(
        '/',
        // validation,
        a(
            async (req: express.Request, res: express.Response): Promise<void> => {
                const attributes: ClassRoomSubjectAttributes = req.body;
                const classroomsubject: ClassRoomSubjectInstance = await models.ClassRoomSubject.create(attributes);
                const body: OkResponse = { data: classroomsubject };

                res.json(body);
            },
        ),
    );

    router.put(
        '/:id',
        // validation,
        a(
            async (req: express.Request, res: express.Response): Promise<void> => {
                const { id }: any = req.params;
                const attributes: ClassRoomSubjectAttributes = req.body;
                const classroomsubject: ClassRoomSubjectInstance | null = await models.ClassRoomSubject.findByPk(id);
                if (!classroomsubject) throw new NotFoundError('ClassRoomSubject tidak ditemukan');
                const updatedClassRoomSubject: ClassRoomSubjectInstance = await classroomsubject.update(attributes);
                const body: OkResponse = { data: updatedClassRoomSubject };

                res.json(body);
            },
        ),
    );

    router.delete(
        '/:id',
        a(
            async (req: express.Request, res: express.Response): Promise<void> => {
                const { id }: any = req.params;
                const classroomsubject: ClassRoomSubjectInstance | null = await models.ClassRoomSubject.findByPk(id);
                if (!classroomsubject) throw new NotFoundError('ClassRoomSubject tidak ditemukan');
                await classroomsubject.destroy();
                const body: OkResponse = { data: classroomsubject };

                res.json(body);
            },
        ),
    );

    return router;
};

export default classroomsubjectsRoutes;
    