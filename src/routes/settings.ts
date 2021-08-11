
import express from 'express';
import ModelFactoryInterface from '../models/typings/ModelFactoryInterface';
import { Routes } from './typings/RouteInterface';
import a from '../middlewares/wrapper/a';
import { OkResponse } from './typings/BodyBuilderInterface';
import { PaginatedResult } from './typings/QueryInterface';
import sequelize from 'sequelize';
import { Parser } from '../helpers/Parser';
import NotFoundError from '../classes/NotFoundError';
import { SettingInstance, SettingAttributes } from '../models/Setting';

const settingsRoutes: Routes = (
    app: express.Application,
    models: ModelFactoryInterface,
): express.Router => {
    const router: express.Router = express.Router();

    router.get(
        '/',
        Parser.validateQ(),
        a(
            async (req: express.Request, res: express.Response): Promise<void> => {
                const parsed: sequelize.FindOptions<SettingInstance> = Parser.parseQuery<SettingInstance>(
                    req.query.q,
                    models,
                );
                const data: PaginatedResult<SettingInstance> = await models.Setting.findAndCountAll(parsed);
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
                const setting: SettingInstance | null = await models.Setting.findByPk(id);
                if (!setting) throw new NotFoundError('Setting tidak ditemukan');
                const body: OkResponse = { data: setting };

                res.json(body);
            },
        ),
    );

    router.post(
        '/',
        // validation,
        a(
            async (req: express.Request, res: express.Response): Promise<void> => {
                const attributes: SettingAttributes = req.body;
                const setting: SettingInstance = await models.Setting.create(attributes);
                const body: OkResponse = { data: setting };

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
                const attributes: SettingAttributes = req.body;
                const setting: SettingInstance | null = await models.Setting.findByPk(id);
                if (!setting) throw new NotFoundError('Setting tidak ditemukan');
                const updatedSetting: SettingInstance = await setting.update(attributes);
                const body: OkResponse = { data: updatedSetting };

                res.json(body);
            },
        ),
    );

    router.delete(
        '/:id',
        a(
            async (req: express.Request, res: express.Response): Promise<void> => {
                const { id }: any = req.params;
                const setting: SettingInstance | null = await models.Setting.findByPk(id);
                if (!setting) throw new NotFoundError('Setting tidak ditemukan');
                await setting.destroy();
                const body: OkResponse = { data: setting };

                res.json(body);
            },
        ),
    );

    return router;
};

export default settingsRoutes;
    