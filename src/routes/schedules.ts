
import express from 'express';
import ModelFactoryInterface from '../models/typings/ModelFactoryInterface';
import { Routes } from './typings/RouteInterface';
import a from '../middlewares/wrapper/a';
import { OkResponse } from './typings/BodyBuilderInterface';
import { PaginatedResult } from './typings/QueryInterface';
import sequelize from 'sequelize';
import { Parser } from '../helpers/Parser';
import NotFoundError from '../classes/NotFoundError';
import { ScheduleInstance, ScheduleAttributes } from '../models/Schedule';

const schedulesRoutes: Routes = (
    app: express.Application,
    models: ModelFactoryInterface,
): express.Router => {
    const router: express.Router = express.Router();

    router.get(
        '/',
        Parser.validateQ(),
        a(
            async (req: express.Request, res: express.Response): Promise<void> => {
                const parsed: sequelize.FindOptions<ScheduleInstance> = Parser.parseQuery<ScheduleInstance>(
                    `${req.query.q}`,
                    models,
                );
                const data: PaginatedResult<ScheduleInstance> = await models.Schedule.findAndCountAll(parsed);
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
                const schedule: ScheduleInstance | null = await models.Schedule.findByPk(id);
                if (!schedule) throw new NotFoundError('Schedule tidak ditemukan');
                const body: OkResponse = { data: schedule };

                res.json(body);
            },
        ),
    );

    router.post(
        '/',
        // validation,
        a(
            async (req: express.Request, res: express.Response): Promise<void> => {
                const attributes: ScheduleAttributes = req.body;
                const schedule: ScheduleInstance = await models.Schedule.create(attributes);
                const body: OkResponse = { data: schedule };

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
                const attributes: ScheduleAttributes = req.body;
                const schedule: ScheduleInstance | null = await models.Schedule.findByPk(id);
                if (!schedule) throw new NotFoundError('Schedule tidak ditemukan');
                const updatedSchedule: ScheduleInstance = await schedule.update(attributes);
                const body: OkResponse = { data: updatedSchedule };

                res.json(body);
            },
        ),
    );

    router.delete(
        '/:id',
        a(
            async (req: express.Request, res: express.Response): Promise<void> => {
                const { id }: any = req.params;
                const schedule: ScheduleInstance | null = await models.Schedule.findByPk(id);
                if (!schedule) throw new NotFoundError('Schedule tidak ditemukan');
                await schedule.destroy();
                const body: OkResponse = { data: schedule };

                res.json(body);
            },
        ),
    );

    return router;
};

export default schedulesRoutes;
    