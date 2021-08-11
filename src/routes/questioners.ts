
import express from 'express';
import ModelFactoryInterface from '../models/typings/ModelFactoryInterface';
import { Routes } from './typings/RouteInterface';
import a from '../middlewares/wrapper/a';
import { OkResponse } from './typings/BodyBuilderInterface';
import { PaginatedResult } from './typings/QueryInterface';
import sequelize from 'sequelize';
import { Parser } from '../helpers/Parser';
import NotFoundError from '../classes/NotFoundError';
import { QuestionerInstance, QuestionerAttributes } from '../models/Questioner';

const questionersRoutes: Routes = (
    app: express.Application,
    models: ModelFactoryInterface,
): express.Router => {
    const router: express.Router = express.Router();

    router.get(
        '/',
        Parser.validateQ(),
        a(
            async (req: express.Request, res: express.Response): Promise<void> => {
                const parsed: sequelize.FindOptions<QuestionerInstance> = Parser.parseQuery<QuestionerInstance>(
                    req.query.q,
                    models,
                );
                const data: PaginatedResult<QuestionerInstance> = await models.Questioner.findAndCountAll(parsed);
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
                const questioner: QuestionerInstance | null = await models.Questioner.findByPk(id);
                if (!questioner) throw new NotFoundError('Questioner tidak ditemukan');
                const body: OkResponse = { data: questioner };

                res.json(body);
            },
        ),
    );

    router.post(
        '/',
        // validation,
        a(
            async (req: express.Request, res: express.Response): Promise<void> => {
                const attributes: QuestionerAttributes = req.body;
                const questioner: QuestionerInstance = await models.Questioner.create(attributes);
                const body: OkResponse = { data: questioner };

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
                const attributes: QuestionerAttributes = req.body;
                const questioner: QuestionerInstance | null = await models.Questioner.findByPk(id);
                if (!questioner) throw new NotFoundError('Questioner tidak ditemukan');
                const updatedQuestioner: QuestionerInstance = await questioner.update(attributes);
                const body: OkResponse = { data: updatedQuestioner };

                res.json(body);
            },
        ),
    );

    router.delete(
        '/:id',
        a(
            async (req: express.Request, res: express.Response): Promise<void> => {
                const { id }: any = req.params;
                const questioner: QuestionerInstance | null = await models.Questioner.findByPk(id);
                if (!questioner) throw new NotFoundError('Questioner tidak ditemukan');
                await questioner.destroy();
                const body: OkResponse = { data: questioner };

                res.json(body);
            },
        ),
    );

    return router;
};

export default questionersRoutes;
    