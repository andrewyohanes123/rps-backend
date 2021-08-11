
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
                    req.query.q,
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
                const subject: SubjectInstance | null = await models.Subject.findByPk(id);
                if (!subject) throw new NotFoundError('Subject tidak ditemukan');
                const body: OkResponse = { data: subject };

                res.json(body);
            },
        ),
    );

    router.post(
        '/',
        // validation,
        a(
            async (req: express.Request, res: express.Response): Promise<void> => {
                const attributes: SubjectAttributes = req.body;
                const subject: SubjectInstance = await models.Subject.create(attributes);
                const body: OkResponse = { data: subject };

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
                const attributes: SubjectAttributes = req.body;
                const subject: SubjectInstance | null = await models.Subject.findByPk(id);
                if (!subject) throw new NotFoundError('Subject tidak ditemukan');
                const updatedSubject: SubjectInstance = await subject.update(attributes);
                const body: OkResponse = { data: updatedSubject };

                res.json(body);
            },
        ),
    );

    router.delete(
        '/:id',
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
    