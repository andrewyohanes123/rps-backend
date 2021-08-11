
import express from 'express';
import ModelFactoryInterface from '../models/typings/ModelFactoryInterface';
import { Routes } from './typings/RouteInterface';
import a from '../middlewares/wrapper/a';
import { OkResponse } from './typings/BodyBuilderInterface';
import { PaginatedResult } from './typings/QueryInterface';
import sequelize from 'sequelize';
import { Parser } from '../helpers/Parser';
import NotFoundError from '../classes/NotFoundError';
import { ReportInstance, ReportAttributes } from '../models/Report';

const reportsRoutes: Routes = (
    app: express.Application,
    models: ModelFactoryInterface,
): express.Router => {
    const router: express.Router = express.Router();

    router.get(
        '/',
        Parser.validateQ(),
        a(
            async (req: express.Request, res: express.Response): Promise<void> => {
                const parsed: sequelize.FindOptions<ReportInstance> = Parser.parseQuery<ReportInstance>(
                    req.query.q,
                    models,
                );
                const data: PaginatedResult<ReportInstance> = await models.Report.findAndCountAll(parsed);
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
                const report: ReportInstance | null = await models.Report.findByPk(id);
                if (!report) throw new NotFoundError('Report tidak ditemukan');
                const body: OkResponse = { data: report };

                res.json(body);
            },
        ),
    );

    router.post(
        '/',
        // validation,
        a(
            async (req: express.Request, res: express.Response): Promise<void> => {
                const attributes: ReportAttributes = req.body;
                const report: ReportInstance = await models.Report.create(attributes);
                const body: OkResponse = { data: report };

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
                const attributes: ReportAttributes = req.body;
                const report: ReportInstance | null = await models.Report.findByPk(id);
                if (!report) throw new NotFoundError('Report tidak ditemukan');
                const updatedReport: ReportInstance = await report.update(attributes);
                const body: OkResponse = { data: updatedReport };

                res.json(body);
            },
        ),
    );

    router.delete(
        '/:id',
        a(
            async (req: express.Request, res: express.Response): Promise<void> => {
                const { id }: any = req.params;
                const report: ReportInstance | null = await models.Report.findByPk(id);
                if (!report) throw new NotFoundError('Report tidak ditemukan');
                await report.destroy();
                const body: OkResponse = { data: report };

                res.json(body);
            },
        ),
    );

    return router;
};

export default reportsRoutes;
    