// src/models/criptomoneda.model.js
import { EntitySchema } from 'typeorm';

export const Criptomoneda = new EntitySchema({
  name: 'Criptomoneda',
  tableName: 'criptomonedas',
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
    simbolo: {
      type: 'varchar',
      unique: true,
    },
  },
  relations: {
    monedas: {
      type: 'many-to-many',
      target: 'Moneda',
      joinTable: true,
      inverseSide: 'criptomonedas',
    },
  },
});
