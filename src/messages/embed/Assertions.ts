import type { APIEmbedField } from 'discord-api-types/v9';
import Joi from 'joi';

export const fieldNamePredicate = Joi.string().min(1).max(256).required();

export const fieldValuePredicate = Joi.string().min(1).max(1024).required();

export const fieldInlinePredicate = Joi.boolean();

export const embedFieldPredicate = Joi.object({
	name: fieldNamePredicate,
	value: fieldValuePredicate,
	inline: fieldInlinePredicate,
});

export const embedFieldsArrayPredicate = Joi.array().items(embedFieldPredicate);

export function validateFieldLength(fields: APIEmbedField[], amountAdding: number): void {
	const predicate = Joi.number().max(25).required();
	Joi.assert(fields.length + amountAdding, predicate);
}

export const authorNamePredicate = fieldNamePredicate.allow(null).required();

export const urlPredicate = Joi.string().uri().allow(null).required();

export const colorPredicate = Joi.number().min(0).max(0xffffff).allow(null).required();

export const descriptionPredicate = Joi.string().min(1).max(4096).allow(null).required();

export const footerTextPredicate = Joi.string().min(1).max(2048).allow(null).required();

export const timestampPredicate = Joi.alternatives(Joi.number(), Joi.date(), null).required();

export const titlePredicate = fieldNamePredicate.allow(null).required();
