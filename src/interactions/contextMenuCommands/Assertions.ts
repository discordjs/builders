import ow from 'ow';
import { ApplicationCommandType } from 'discord-api-types/v9';
import type { ContextMenuCommandType } from './ContextMenuCommandBuilder';

export function validateRequiredParameters(name: string, type: number) {
	// Assert name matches all conditions
	validateName(name);

	// Assert type is valid
	validateType(type);
}

const namePredicate = ow.string
	.minLength(1)
	.maxLength(32)
	.matches(/^( *[\p{L}\p{N}_-]+ *)+$/u);

export function validateName(name: unknown): asserts name is string {
	ow(name, 'name', namePredicate);
}

const typePredicate = ow.number.oneOf([ApplicationCommandType.User, ApplicationCommandType.Message]);

export function validateType(type: unknown): asserts type is ContextMenuCommandType {
	ow(type, 'type', typePredicate);
}

const defaultPermissionPredicate = ow.boolean;

export function validateDefaultPermission(value: unknown): asserts value is boolean {
	ow(value, 'default_permission', defaultPermissionPredicate);
}
