import Joi from 'joi';
import { ApplicationCommandType } from 'discord-api-types/v9';
import type { ContextMenuCommandType } from './ContextMenuCommandBuilder';

export function validateRequiredParameters(name: string, type: number) {
	// Assert name matches all conditions
	validateName(name);

	// Assert type is valid
	validateType(type);
}

const namePredicate = Joi.string()
	.lowercase()
	.min(1)
	.max(32)
	.pattern(/^( *[\p{L}\p{N}_-]+ *)+$/u)
	.required();

export function validateName(name: unknown): asserts name is string {
	Joi.assert(name, namePredicate);
}

const typePredicate = Joi.number().valid(ApplicationCommandType.User, ApplicationCommandType.Message).required();

export function validateType(type: unknown): asserts type is ContextMenuCommandType {
	Joi.assert(type, typePredicate);
}

const defaultPermissionPredicate = Joi.boolean().required();

export function validateDefaultPermission(value: unknown): asserts value is boolean {
	Joi.assert(value, defaultPermissionPredicate);
}
