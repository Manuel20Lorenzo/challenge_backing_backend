
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
    error.code = 409 
    throw error
  }
  
  const monedas = await monedaRepo.findByIds(monedaIds);
  if (monedas.length === 0) {
    const error = new Error('No se encontraron monedas válidas');
    error.code = 400 
    throw error
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


export const update = async (id, { nombre, simbolo, monedas }) => {
  const criptomoneda = await criptomonedaRepo.findOne({
    where: { id },
    relations: ['monedas'],
  });

  if (!criptomoneda) {
    const error = new Error('Criptomoneda no encontrada');
    error.code = 400;
    throw error;
  }

  // Actualiza campos
  if (nombre) criptomoneda.nombre = nombre;
  if (simbolo) criptomoneda.simbolo = simbolo;

  // Actualiza relación
  if (Array.isArray(monedas)) {
    const monedasRelacionadas = await monedaRepo.findByIds(monedas);
    criptomoneda.monedas = monedasRelacionadas;
  }

  await criptomonedaRepo.save(criptomoneda);

  return criptomoneda;
};