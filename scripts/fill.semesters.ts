import createModels from '../src/models';
import dotenv from 'dotenv';
import chalk from 'chalk';
import ModelFactoryInterface from '../src/models/typings/ModelFactoryInterface';

dotenv.config();

const semesters: string[] = [
  'I',
  'II',
  'III',
  'IV',
  'V',
  'VI',
  'VII',
  'VIII'
];

(() => {
  const models: ModelFactoryInterface = createModels();
  console.log('start')
  const currentYear = new Date().getFullYear();
  semesters.forEach((semester: string, index: number) => {
    models.Semester.create({
      name: semester,
      year: `${currentYear}-01-01`,      
    }).then(result => {
      console.log(semester)
      console.log(`Semester ${chalk.green(result.name)} tahun ${chalk.yellow(result.year.toString())}`)
      if (semesters.length === (index + 1)) process.exit(0);
    }).catch(e => {
      console.log(`[Errno]: ${chalk.red(e)}`)
      if (semesters.length === (index + 1)) process.exit(0);
    })
  })
})();