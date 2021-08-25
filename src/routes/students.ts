
import express from 'express';
import ModelFactoryInterface from '../models/typings/ModelFactoryInterface';
import { Routes } from './typings/RouteInterface';
import a from '../middlewares/wrapper/a';
import { OkResponse } from './typings/BodyBuilderInterface';
import { PaginatedResult } from './typings/QueryInterface';
import sequelize from 'sequelize';
import { Parser } from '../helpers/Parser';
import NotFoundError from '../classes/NotFoundError';
import { StudentInstance, StudentAttributes } from '../models/Student';

const studentsRoutes: Routes = (
    app: express.Application,
    models: ModelFactoryInterface,
): express.Router => {
    const router: express.Router = express.Router();

    router.get(
        '/',
        Parser.validateQ(),
        a(
            async (req: express.Request, res: express.Response): Promise<void> => {
                const parsed: sequelize.FindOptions<StudentInstance> = Parser.parseQuery<StudentInstance>(
                    `${req.query.q}`,
                    models,
                );
                const data: PaginatedResult<StudentInstance> = await models.Student.findAndCountAll(parsed);
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
                const student: StudentInstance | null = await models.Student.findByPk(id);
                if (!student) throw new NotFoundError('Student tidak ditemukan');
                const body: OkResponse = { data: student };

                res.json(body);
            },
        ),
    );

    router.post(
        '/',
        // validation,
        a(
            async (req: express.Request, res: express.Response): Promise<void> => {
                const attributes: StudentAttributes = req.body;
                const student: StudentInstance = await models.Student.create(attributes);
                const body: OkResponse = { data: student };

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
    //             const attributes: StudentAttributes = req.body;
    //             const student: StudentInstance | null = await models.Student.findByPk(id);
    //             if (!student) throw new NotFoundError('Student tidak ditemukan');
    //             const updatedStudent: StudentInstance = await student.update(attributes);
    //             const body: OkResponse = { data: updatedStudent };

    //             res.json(body);
    //         },
    //     ),
    // );

    // router.delete(
    //     '/:id',
    //     a(
    //         async (req: express.Request, res: express.Response): Promise<void> => {
    //             const { id }: any = req.params;
    //             const student: StudentInstance | null = await models.Student.findByPk(id);
    //             if (!student) throw new NotFoundError('Student tidak ditemukan');
    //             await student.destroy();
    //             const body: OkResponse = { data: student };

    //             res.json(body);
    //         },
    //     ),
    // );

    return router;
};

export default studentsRoutes;
    