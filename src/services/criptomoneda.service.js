
import { AppDataSource } from '../config/ormconfig.js';
import { Criptomoneda } from '../models/criptomoneda.model.js';
import { Moneda } from '../models/moneda.model.js';


const criptomonedaRepo = AppDataSource.getRepository(Criptomoneda);
const monedaRepo = AppDataSource.getRepository(Moneda);

export const getAll = async () => {
  const criptomoneda = await criptomonedaRepo.find({
    relations: ['monedas'], // <- esto incluye la relación
  })
  console.log('lista de criptomoneda: ', criptomoneda)
  return {
    message: 'Lista de criptomoneda',
    data: criptomoneda,
  };
};

export const create = async ({ nombre, simbolo, monedaIds }) => {
  const exists = await criptomonedaRepo.createQueryBuilder('criptomoneda')
    .where('criptomoneda.simbolo = :simbolo OR criptomoneda.nombre = :nombre', { simbolo, nombre })
    .getOne();
  
  if (exists) {
    const error = new Error('La criptomoneda ya existe');
    error.code = 'EXISTE_CRYPT'
    throw error
  }
  
  const monedas = await monedaRepo.findByIds(monedaIds);
  if (monedas.length === 0) {
    throw new Error('No se encontraron monedas válidas');
  }

  const newCripto = criptomonedaRepo.create({
    nombre,
    simbolo,
    monedas,
  });

  await criptomonedaRepo.save(newCripto);

  return {
    id: newCripto.id,
    nombre: newCripto.nombre,
    simbolo: newCripto.simbolo,
    monedas: monedas.map((m) => ({ id: m.id, nombre: m.nombre, codigo: m.codigo })),
  };
};

export const getForMoneda = async (monedaParam) => {
  const criptos = await criptomonedaRepo
    .createQueryBuilder('criptomoneda')
    .leftJoinAndSelect('criptomoneda.monedas', 'moneda')
    .where('moneda.nombre = :moneda OR moneda.codigo = :moneda', { moneda: monedaParam })
    .getMany();
    
  return criptos;
};