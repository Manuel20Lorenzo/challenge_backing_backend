// src/services/auth.service.js
import bcrypt from 'bcryptjs';
import { AppDataSource } from '../config/ormconfig.js';
import { Moneda } from '../models/moneda.model.js';
import jwt from 'jsonwebtoken';


const monedaRepo = AppDataSource.getRepository(Moneda);

export const getAll = async () => {
  const moneda = await monedaRepo.find()
  console.log('lista de monedas: ', moneda)
  return {
    message: 'Lista de monedas',
    data: moneda,
  };
};

export const create = async ({ nombre, codigo }) => {

  const monedaExistente = await monedaRepo
    .createQueryBuilder('moneda')
    .where('moneda.codigo = :codigo OR moneda.nombre = :nombre', { codigo, nombre })
    .getOne();

  if (monedaExistente) {
    const error = new Error('Codigo o moneda ya existe ');
    error.code = 'MONEDA_EXISTS';
    throw error;
  }

  const nuevaMoneda = monedaRepo.create({
    nombre,
    codigo,
  });

  await monedaRepo.save(nuevaMoneda);
  return nuevaMoneda;
};