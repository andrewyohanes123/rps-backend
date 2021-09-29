
import express from 'express';
import ModelFactoryInterface from '../models/typings/ModelFactoryInterface';
import { Routes } from './typings/RouteInterface';
import a from '../middlewares/wrapper/a';
import { OkResponse } from './typings/BodyBuilderInterface';
import { PaginatedResult } from './typings/QueryInterface';
import sequelize from 'sequelize';
import { Parser } from '../helpers/Parser';
import NotFoundError from '../classes/NotFoundError';
import { CommentInstance, CommentAttributes } from '../models/Comment';

const commentsRoutes: Routes = (
    app: express.Application,
    models: ModelFactoryInterface,
): express.Router => {
    const router: express.Router = express.Router();

    router.get(
        '/',
        Parser.validateQ(),
        a(
            async (req: express.Request, res: express.Response): Promise<void> => {
                const parsed: sequelize.FindOptions<CommentInstance> = Parser.parseQuery<CommentInstance>(
                    `${req.query.q}`,
                    models,
                );
                const data: PaginatedResult<CommentInstance> = await models.Comment.findAndCountAll(parsed);
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
                const comment: CommentInstance | null = await models.Comment.findByPk(id);
                if (!comment) throw new NotFoundError('Comment tidak ditemukan');
                const body: OkResponse = { data: comment };

                res.json(body);
            },
        ),
    );

    router.post(
        '/',
        // validation,
        a(
            async (req: express.Request, res: express.Response): Promise<void> => {
                const attributes: CommentAttributes = req.body;
                const comment: CommentInstance = await models.Comment.create(attributes);
                const body: OkResponse = { data: comment };

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
                const attributes: CommentAttributes = req.body;
                const comment: CommentInstance | null = await models.Comment.findByPk(id);
                if (!comment) throw new NotFoundError('Comment tidak ditemukan');
                const updatedComment: CommentInstance = await comment.update(attributes);
                const body: OkResponse = { data: updatedComment };

                res.json(body);
            },
        ),
    );

    router.delete(
        '/:id',
        a(
            async (req: express.Request, res: express.Response): Promise<void> => {
                const { id }: any = req.params;
                const comment: CommentInstance | null = await models.Comment.findByPk(id);
                if (!comment) throw new NotFoundError('Comment tidak ditemukan');
                await comment.destroy();
                const body: OkResponse = { data: comment };

                res.json(body);
            },
        ),
    );

    return router;
};

export default commentsRoutes;
    