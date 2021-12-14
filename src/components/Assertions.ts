import z from 'zod';

export const customIdValidator = z.string().max(100);
