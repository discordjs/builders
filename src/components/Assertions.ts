import { z } from 'zod';

export const customIdValidator = z.string().min(1).max(100);

export const emojiValidator = z
	.object({
		id: z.string(),
		name: z.string(),
		animated: z.boolean(),
	})
	.partial()
	.strict();

export const disabledValidator = z.boolean();
