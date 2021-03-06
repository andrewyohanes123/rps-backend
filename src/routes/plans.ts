
import express from 'express';
import multer from 'multer'
import path from 'path'
import ModelFactoryInterface from '../models/typings/ModelFactoryInterface';
import { Routes } from './typings/RouteInterface';
import a from '../middlewares/wrapper/a';
import { OkResponse } from './typings/BodyBuilderInterface';
import { PaginatedResult } from './typings/QueryInterface';
import sequelize from 'sequelize';
import { Parser } from '../helpers/Parser';
import NotFoundError from '../classes/NotFoundError';
import { PlanInstance, PlanAttributes } from '../models/Plan';

const multerStorage: multer.StorageEngine = multer.diskStorage({
    filename: (req, file, cb) => {
        const date = new Date().toISOString().replace(/\:/g, "");
        cb(null, `${date}.${file.originalname}`);
    },
    destination: path.resolve(__dirname, '..', '..', 'uploads')
})

export type multerFiles = { [fieldname: string]: Express.Multer.File[] };

export const upload: multer.Multer = multer({ storage: multerStorage })

const plansRoutes: Routes = (
    app: express.Application,
    models: ModelFactoryInterface,
): express.Router => {
    const router: express.Router = express.Router();

    router.get(
        '/',
        Parser.validateQ(),
        a(
            async (req: express.Request, res: express.Response): Promise<void> => {
                const parsed: sequelize.FindOptions<PlanInstance> = Parser.parseQuery<PlanInstance>(
                    `${req.query.q}`,
                    models,
                );
                const data: PaginatedResult<PlanInstance> = await models.Plan.findAndCountAll(parsed);
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
                const plan: PlanInstance | null = await models.Plan.findByPk(id);
                if (!plan) throw new NotFoundError('Plan tidak ditemukan');
                const body: OkResponse = { data: plan };

                res.json(body);
            },
        ),
    );

    router.post(
        '/',
        // validation,
        upload.single('plan'),
        a(
            async (req: express.Request, res: express.Response): Promise<void> => {
                const attributes: PlanAttributes = req.body;
                const file = req.file;
                const plan: PlanInstance = await models.Plan.create({ ...attributes, file: file?.filename ?? '' });
                const body: OkResponse = { data: plan };

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
                const attributes: PlanAttributes = req.body;
                const plan: PlanInstance | null = await models.Plan.findByPk(id);
                if (!plan) throw new NotFoundError('Plan tidak ditemukan');
                const updatedPlan: PlanInstance = await plan.update(attributes);
                const body: OkResponse = { data: updatedPlan };

                res.json(body);
            },
        ),
    );

    router.delete(
        '/:id',
        a(
            async (req: express.Request, res: express.Response): Promise<void> => {
                const { id }: any = req.params;
                const plan: PlanInstance | null = await models.Plan.findByPk(id);
                if (!plan) throw new NotFoundError('Plan tidak ditemukan');
                await plan.destroy();
                const body: OkResponse = { data: plan };

                res.json(body);
            },
        ),
    );

    return router;
};

export default plansRoutes;
