// src/services/auth.service.js
import bcrypt from 'bcryptjs';
import { AppDataSource } from '../config/ormconfig.js';
import { User } from '../models/user.model.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';
const userRepo = AppDataSource.getRepository(User);
const EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';
export const registerUser = async ({ email, password }) => {

  const existingUser = await userRepo.findOneBy({ email });
  if (existingUser) {
    const error = new Error('El usuario ya existe');
    error.code = 'USER_EXISTS';
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = userRepo.create({
    email,
    password: hashedPassword,
  });

  await userRepo.save(newUser);

  return {
    id: newUser.id,
    email: newUser.email,
  };
};

export const loginUser = async ({ email, password }) => {
  console.log({ email, password })
  const emailValidate = await userRepo.findOneBy({ email })
  console.log('emailValidate:', emailValidate)
  if (!emailValidate) {
    console.error('CORREO INVALIDO')
    const error = new Error('Usuario o contraseña incorrectos');
    error.code = 'INVALID_CREDENTIALS';
    throw new error
  }
  console.log('User Validate Email:', emailValidate, password)
  const user = emailValidate
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    console.error('CONTRASEÑA INVALIDA')
    const error = new Error('Usuario o contraseña incorrectos');
    error.code = 'INVALID_CREDENTIALS';
    throw error;
  }
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  return {
    message: 'Session creada con exito',
    token
  }
}