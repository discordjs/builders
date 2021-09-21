import is from '@sindresorhus/is';
import type { APIApplicationCommandOptionChoice } from 'discord-api-types/v9';
import ow from 'ow';
import type { SlashCommandOptionBase } from './mixins/CommandOptionBase';
import type { ToAPIApplicationCommandOptions } from './SlashCommandBuilder';
import type { SlashCommandSubcommandBuilder, SlashCommandSubcommandGroupBuilder } from './SlashCommandSubcommands';

export function validateRequiredParameters(
	name: string,
	description: string,
	options: ToAPIApplicationCommandOptions[],
) {
	// Assert name matches all conditions
	validateName(name);

	// Assert description conditions
	validateDescription(description);

	// Assert options conditions
	validateMaxOptionsLength(options);
}

const namePredicate = ow.string.lowercase
	.minLength(1)
	.maxLength(32)
	.addValidator({
		message: (value, label) => `Expected ${label!} to match "^[\\p{L}\\p{N}_-]+$", got ${value} instead`,
		validator: (value) => /^[\p{L}\p{N}_-]+$/u.test(value),
	});

export function validateName(name: unknown): asserts name is string {
	ow(name, 'name', namePredicate);
}

const descriptionPredicate = ow.string.minLength(1).maxLength(100);

export function validateDescription(description: unknown): asserts description is string {
	ow(description, 'description', descriptionPredicate);
}

const defaultPermissionPredicate = ow.boolean;

export function validateDefaultPermission(value: unknown): asserts value is boolean {
	ow(value, 'default_permission', defaultPermissionPredicate);
}

const maxArrayLengthPredicate = ow.array.maxLength(25);

export function validateMaxOptionsLength(options: unknown): asserts options is ToAPIApplicationCommandOptions[] {
	ow(options, 'options', maxArrayLengthPredicate);
}

export function validateMaxChoicesLength(choices: APIApplicationCommandOptionChoice[]) {
	ow(choices, 'choices', maxArrayLengthPredicate);
}

export function assertReturnOfBuilder<
	T extends SlashCommandOptionBase | SlashCommandSubcommandBuilder | SlashCommandSubcommandGroupBuilder,
>(input: unknown, ExpectedInstanceOf: new () => T): asserts input is T {
	const instanceName = ExpectedInstanceOf.name;

	if (is.nullOrUndefined(input)) {
		throw new TypeError(
			`Expected to receive a ${instanceName} builder, got ${input === null ? 'null' : 'undefined'} instead.`,
		);
	}

	if (is.primitive(input)) {
		throw new TypeError(`Expected to receive a ${instanceName} builder, got a primitive (${typeof input}) instead.`);
	}

	if (!(input instanceof ExpectedInstanceOf)) {
		const casted = input as Record<PropertyKey, unknown>;

		const constructorName = is.function_(input) ? input.name : casted.constructor.name;
		const stringTag = Reflect.get(casted, Symbol.toStringTag) as string | undefined;

		const fullResultName = stringTag ? `${constructorName} [${stringTag}]` : constructorName;

		throw new TypeError(`Expected to receive a ${instanceName} builder, got ${fullResultName} instead.`);
	}
}
