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

	/**
	 * Adds a choice for this option
	 * @param name The name of the choice
	 * @param value The value of the choice
	 */
	public addChoice(name: string, value: T) {
		this.choices ??= [];

		validateMaxChoicesLength(this.choices);

		// Validate name
		ow(
			name,
			`${
				this.type === ApplicationCommandOptionType.String
					? 'string'
					: this.type === ApplicationCommandOptionType.Integer
					? 'integer'
					: 'number'
			} choice name`,
			stringPredicate,
		);

		// Validate the value
		if (this.type === ApplicationCommandOptionType.String) ow(value, 'string choice value', stringPredicate);
		else
			ow(
				value,
				`${this.type === ApplicationCommandOptionType.Integer ? 'integer' : 'number'} choice value`,
				integerPredicate,
			);

		this.choices.push({ name, value });

		return this;
	}

	/**
	 * Adds multiple choices for this option
	 * @param choices The choices to add
	 */
	public addChoices(choices: [name: string, value: T][]) {
		ow(
			choices,
			`${
				this.type === ApplicationCommandOptionType.String
					? 'string'
					: this.type === ApplicationCommandOptionType.Integer
					? 'integer'
					: 'number'
			} choices`,
			choicesPredicate,
		);

		for (const [label, value] of choices) this.addChoice(label, value);
		return this;
	}

	public override toJSON() {
		return {
			...super.toJSON(),
			choices: this.choices,
		};
	}
}
