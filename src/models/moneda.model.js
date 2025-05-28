// src/models/moneda.model.js
import { EntitySchema } from 'typeorm';

export const Moneda = new EntitySchema({
  name: 'Moneda',
  tableName: 'monedas',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    nombre: {
      type: 'varchar',
      unique: true,
    },
    codigo: {
      type: 'varchar',
      unique: true,
    },
  },
  relations: {
    criptomonedas: {
      type: 'many-to-many',
      target: 'Criptomoneda',
      inverseSide: 'monedas',
    },
  },
});
