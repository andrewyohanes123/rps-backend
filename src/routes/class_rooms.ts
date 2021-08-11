
import express from 'express';
import ModelFactoryInterface from '../models/typings/ModelFactoryInterface';
import { Routes } from './typings/RouteInterface';
import a from '../middlewares/wrapper/a';
import { OkResponse } from './typings/BodyBuilderInterface';
import { PaginatedResult } from './typings/QueryInterface';
import sequelize from 'sequelize';
import { Parser } from '../helpers/Parser';
import NotFoundError from '../classes/NotFoundError';
import { ClassRoomInstance, ClassRoomAttributes } from '../models/ClassRoom';

const classroomsRoutes: Routes = (
    app: express.Application,
    models: ModelFactoryInterface,
): express.Router => {
    const router: express.Router = express.Router();

    router.get(
        '/',
        Parser.validateQ(),
        a(
            async (req: express.Request, res: express.Response): Promise<void> => {
                const parsed: sequelize.FindOptions<ClassRoomInstance> = Parser.parseQuery<ClassRoomInstance>(
                    `${req.query.q}`,
                    models,
                );
                const data: PaginatedResult<ClassRoomInstance> = await models.ClassRoom.findAndCountAll(parsed);
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
                const classroom: ClassRoomInstance | null = await models.ClassRoom.findByPk(id);
                if (!classroom) throw new NotFoundError('ClassRoom tidak ditemukan');
                const body: OkResponse = { data: classroom };

                res.json(body);
            },
        ),
    );

    router.post(
        '/',
        // validation,
        a(
            async (req: express.Request, res: express.Response): Promise<void> => {
                const attributes: ClassRoomAttributes = req.body;
                const classroom: ClassRoomInstance = await models.ClassRoom.create(attributes);
                const body: OkResponse = { data: classroom };

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
                const attributes: ClassRoomAttributes = req.body;
                const classroom: ClassRoomInstance | null = await models.ClassRoom.findByPk(id);
                if (!classroom) throw new NotFoundError('ClassRoom tidak ditemukan');
                const updatedClassRoom: ClassRoomInstance = await classroom.update(attributes);
                const body: OkResponse = { data: updatedClassRoom };

                res.json(body);
            },
        ),
    );

    router.delete(
        '/:id',
        a(
            async (req: express.Request, res: express.Response): Promise<void> => {
                const { id }: any = req.params;
                const classroom: ClassRoomInstance | null = await models.ClassRoom.findByPk(id);
                if (!classroom) throw new NotFoundError('ClassRoom tidak ditemukan');
                await classroom.destroy();
                const body: OkResponse = { data: classroom };

                res.json(body);
            },
        ),
    );

    return router;
};

export default classroomsRoutes;
    