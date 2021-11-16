import type { APIEmbedField } from 'discord-api-types/v9';
import { z } from 'zod';

export const fieldNamePredicate = z.string().min(1).max(256);

export const fieldValuePredicate = z.string().min(1).max(1024);

export const fieldInlinePredicate = z.boolean().optional();

export const embedFieldPredicate = z.object({
	name: fieldNamePredicate,
	value: fieldValuePredicate,
	inline: fieldInlinePredicate,
});

export const embedFieldsArrayPredicate = embedFieldPredicate.array();

export function validateFieldLength(fields: APIEmbedField[], amountAdding: number): void {
	z.number()
		.lte(25)
		.parse(fields.length + amountAdding);
}

export const authorNamePredicate = fieldNamePredicate.nullable();

export const urlPredicate = z.string().url().nullish();

export const colorPredicate = z.number().gte(0).lte(0xffffff).nullable();

export const descriptionPredicate = z.string().min(1).max(4096).nullable();

export const footerTextPredicate = z.string().min(1).max(2048).nullable();

export const timestampPredicate = z.union([z.number(), z.date()]).nullable();

export const titlePredicate = fieldNamePredicate.nullable();
