import type { APIEmbedField } from 'discord-api-types';
import ow from 'ow';

export const embedFieldPredicate = ow.object.exactShape({
	name: ow.string.minLength(1).maxLength(256),
	value: ow.string.minLength(1).maxLength(1024),
	inline: ow.optional.boolean,
});

export const embedFieldsArrayPredicate = ow.array.ofType(embedFieldPredicate);

export function validateFieldLength(fields: APIEmbedField[], amountAdding: number): void {
	ow(fields.length + amountAdding, 'field amount', ow.number.lessThanOrEqual(25));
}

export const fieldNamePredicate = ow.string.minLength(1).maxLength(256);

export const authorNamePredicate = ow.any(fieldNamePredicate, ow.null);

export const urlPredicate = ow.any(ow.string.url, ow.nullOrUndefined);

export const colorPredicate = ow.any(ow.number, ow.null);

export const descriptionPredicate = ow.any(ow.string.minLength(1).maxLength(4096), ow.null);

export const footerTextPredicate = ow.any(ow.string.minLength(1).maxLength(2048), ow.null);

export const timestampPredicate = ow.any(ow.number, ow.date, ow.null);

export const titlePredicate = ow.any(fieldNamePredicate, ow.null);

export const fieldValuePredicate = ow.string.minLength(1).maxLength(1024);

export const fieldInlinePredicate = ow.optional.boolean;
