
import express from 'express';
import ModelFactoryInterface from '../models/typings/ModelFactoryInterface';
import { Routes } from './typings/RouteInterface';
import a from '../middlewares/wrapper/a';
import { OkResponse } from './typings/BodyBuilderInterface';
import { PaginatedResult } from './typings/QueryInterface';
import sequelize from 'sequelize';
import { Parser } from '../helpers/Parser';
import NotFoundError from '../classes/NotFoundError';
import { SemesterInstance, SemesterAttributes } from '../models/Semester';

const semestersRoutes: Routes = (
    app: express.Application,
    models: ModelFactoryInterface,
): express.Router => {
    const router: express.Router = express.Router();

    router.get(
        '/',
        Parser.validateQ(),
        a(
            async (req: express.Request, res: express.Response): Promise<void> => {
                const parsed: sequelize.FindOptions<SemesterInstance> = Parser.parseQuery<SemesterInstance>(
                    req.query.q,
                    models,
                );
                const data: PaginatedResult<SemesterInstance> = await models.Semester.findAndCountAll(parsed);
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
                const semester: SemesterInstance | null = await models.Semester.findByPk(id);
                if (!semester) throw new NotFoundError('Semester tidak ditemukan');
                const body: OkResponse = { data: semester };

                res.json(body);
            },
        ),
    );

    router.post(
        '/',
        // validation,
        a(
            async (req: express.Request, res: express.Response): Promise<void> => {
                const attributes: SemesterAttributes = req.body;
                const semester: SemesterInstance = await models.Semester.create(attributes);
                const body: OkResponse = { data: semester };

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
                const attributes: SemesterAttributes = req.body;
                const semester: SemesterInstance | null = await models.Semester.findByPk(id);
                if (!semester) throw new NotFoundError('Semester tidak ditemukan');
                const updatedSemester: SemesterInstance = await semester.update(attributes);
                const body: OkResponse = { data: updatedSemester };

                res.json(body);
            },
        ),
    );

    router.delete(
        '/:id',
        a(
            async (req: express.Request, res: express.Response): Promise<void> => {
                const { id }: any = req.params;
                const semester: SemesterInstance | null = await models.Semester.findByPk(id);
                if (!semester) throw new NotFoundError('Semester tidak ditemukan');
                await semester.destroy();
                const body: OkResponse = { data: semester };

                res.json(body);
            },
        ),
    );

    return router;
};

export default semestersRoutes;
    