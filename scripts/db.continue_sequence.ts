import createModels from '../src/models';
import dotenv from 'dotenv';

dotenv.config();

(async () => {
  const models = createModels();
  const modelNames = Object.keys(models);
  for (let i = 0; i < modelNames.length; i++) {
    const modelName = modelNames[i];
    if (modelName.toLowerCase() === 'sequelize') continue;
    const model = models[modelName];
    const table = model.getTableName();
    // console.log(table);
    try {
      const res = await models.sequelize.query(`
      SELECT setval('${table}_id_seq', max(id)) FROM ${table};
    `, { type: models.sequelize.QueryTypes.SELECT });
      console.log(res);
    } catch(e) {
      console.log(e.message);
    }
  }
})()
  .then(() => {
    console.log('(db:continue_sequence) done');
    process.exit(0);
  })
  .catch((err: Error) => {
    console.warn('(db:continue_sequence) error : ' + err.message);
    process.exit(0);
  });