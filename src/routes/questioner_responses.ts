
import express from 'express';
import ModelFactoryInterface from '../models/typings/ModelFactoryInterface';
import { Routes } from './typings/RouteInterface';
import a from '../middlewares/wrapper/a';
import { OkResponse } from './typings/BodyBuilderInterface';
import { PaginatedResult } from './typings/QueryInterface';
import sequelize from 'sequelize';
import { Parser } from '../helpers/Parser';
import NotFoundError from '../classes/NotFoundError';
import { QuestionerResponseInstance, QuestionerResponseAttributes } from '../models/QuestionerResponse';

const questionerresponsesRoutes: Routes = (
    app: express.Application,
    models: ModelFactoryInterface,
): express.Router => {
    const router: express.Router = express.Router();

    router.get(
        '/',
        Parser.validateQ(),
        a(
            async (req: express.Request, res: express.Response): Promise<void> => {
                const parsed: sequelize.FindOptions<QuestionerResponseInstance> = Parser.parseQuery<QuestionerResponseInstance>(
                    `${req.query.q}`,
                    models,
                );
                const data: PaginatedResult<QuestionerResponseInstance> = await models.QuestionerResponse.findAndCountAll(parsed);
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
                const questionerresponse: QuestionerResponseInstance | null = await models.QuestionerResponse.findByPk(id);
                if (!questionerresponse) throw new NotFoundError('QuestionerResponse tidak ditemukan');
                const body: OkResponse = { data: questionerresponse };

                res.json(body);
            },
        ),
    );

    router.post(
        '/',
        // validation,
        a(
            async (req: express.Request, res: express.Response): Promise<void> => {
                const attributes: QuestionerResponseAttributes = req.body;
                const questionerresponse: QuestionerResponseInstance = await models.QuestionerResponse.create(attributes);
                const body: OkResponse = { data: questionerresponse };

                res.json(body);
            },
        ),
    );

    // router.put(
    //     '/:id',
    //     // validation,
    //     a(
    //         async (req: express.Request, res: express.Response): Promise<void> => {
    //             const { id }: any = req.params;
    //             const attributes: QuestionerResponseAttributes = req.body;
    //             const questionerresponse: QuestionerResponseInstance | null = await models.QuestionerResponse.findByPk(id);
    //             if (!questionerresponse) throw new NotFoundError('QuestionerResponse tidak ditemukan');
    //             const updatedQuestionerResponse: QuestionerResponseInstance = await questionerresponse.update(attributes);
    //             const body: OkResponse = { data: updatedQuestionerResponse };

    //             res.json(body);
    //         },
    //     ),
    // );

    // router.delete(
    //     '/:id',
    //     a(
    //         async (req: express.Request, res: express.Response): Promise<void> => {
    //             const { id }: any = req.params;
    //             const questionerresponse: QuestionerResponseInstance | null = await models.QuestionerResponse.findByPk(id);
    //             if (!questionerresponse) throw new NotFoundError('QuestionerResponse tidak ditemukan');
    //             await questionerresponse.destroy();
    //             const body: OkResponse = { data: questionerresponse };

    //             res.json(body);
    //         },
    //     ),
    // );

    return router;
};

export default questionerresponsesRoutes;
    