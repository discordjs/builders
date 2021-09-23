import { APIApplicationCommandOptionChoice, ApplicationCommandOptionType } from 'discord-api-types/v9';
import ow, { Predicate } from 'ow';
import { validateMaxChoicesLength } from '../Assertions';
import type { ToAPIApplicationCommandOptions } from '../SlashCommandBuilder';
import { SlashCommandOptionBase } from './CommandOptionBase';

const stringPredicate = ow.string.minLength(1).maxLength(100);
const integerPredicate = ow.number.finite;

// TODO: See resolution for sindresorhus/ow#217 in relation to this cast
const choicesPredicate = ow.array.ofType<[string, string | number]>(
	ow.array.exactShape([stringPredicate, ow.any(ow.string, integerPredicate) as unknown as Predicate<string | number>]),
);

export abstract class ApplicationCommandOptionWithChoicesBase<T extends string | number>
	extends SlashCommandOptionBase
	implements ToAPIApplicationCommandOptions
{
	public choices?: APIApplicationCommandOptionChoice[];
	public autocomplete?: boolean;

	/**
	 * Adds a choice for this option
	 * @param name The name of the choice
	 * @param value The value of the choice
	 */
	public addChoice(name: string, value: T) {
		this.choices ??= [];

		validateMaxChoicesLength(this.choices);

		// Validate name
		ow(name, `${ApplicationCommandOptionTypeNames[this.type]} choice name`, stringPredicate);

		// Validate the value
		if (this.type === ApplicationCommandOptionType.String) ow(value, 'string choice value', stringPredicate);
		else ow(value, `${ApplicationCommandOptionTypeNames[this.type]} choice value`, integerPredicate);

		this.choices.push({ name, value });

		return this;
	}

	/**
	 * Adds multiple choices for this option
	 * @param choices The choices to add
	 */
	public addChoices(choices: [name: string, value: T][]) {
		ow(choices, `${ApplicationCommandOptionTypeNames[this.type]} choices`, choicesPredicate);

		for (const [label, value] of choices) this.addChoice(label, value);
		return this;
	}

	/**
	 * Marks the option as autocompletable
	 * @param autocomplete If this option should be autocompletable
	 */
	public setAutocomplete(autocomplete: boolean) {
		// Assert that you actually passed a boolean
		ow(autocomplete, 'autocomplete', ow.boolean);

		this.autocomplete = autocomplete;

		return this;
	}

	public override toJSON() {
		return {
			...super.toJSON(),
			choices: this.choices,
			autocomplete: this.autocomplete,
		};
	}
}

const ApplicationCommandOptionTypeNames = {
	[ApplicationCommandOptionType.Subcommand]: 'subcommand',
	[ApplicationCommandOptionType.SubcommandGroup]: 'subcommand group',
	[ApplicationCommandOptionType.String]: 'string',
	[ApplicationCommandOptionType.Integer]: 'integer',
	[ApplicationCommandOptionType.Boolean]: 'boolean',
	[ApplicationCommandOptionType.User]: 'user',
	[ApplicationCommandOptionType.Channel]: 'channel',
	[ApplicationCommandOptionType.Role]: 'role',
	[ApplicationCommandOptionType.Mentionable]: 'mentionable',
	[ApplicationCommandOptionType.Number]: 'number',
} as const;
