import { APIApplicationCommandOptionChoice, ApplicationCommandOptionType } from 'discord-api-types/v8';
import ow from 'ow';
import { validateMaxChoicesLength } from '../Assertions';
import type { ToAPIApplicationCommandOptions } from '../SlashCommandBuilder';
import { SlashCommandOptionBase } from './CommandOptionBase';

const stringPredicate = ow.string.minLength(1).maxLength(100);
const integerPredicate = ow.number.finite;

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
			`${this.type === ApplicationCommandOptionType.STRING ? 'string' : 'integer'} choice name`,
			stringPredicate,
		);

		// Validate the value
		if (this.type === ApplicationCommandOptionType.STRING) ow(value, 'string choice value', stringPredicate);
		else ow(value, 'integer choice value', integerPredicate);

		this.choices.push({ name, value });

		return this;
	}

	/**
	 * Adds multiple choices for this option
	 * @param choices The choices to add
	 */
	public addChoices(choices: Record<T, string> | Map<string, T> | [name: string, value: T][]) {
		const finalOptions =
			Array.isArray(choices) || choices instanceof Map
				? choices
				: (Object.entries(choices).map(([k, v]) => [v, k]) as [name: string, value: T][]);

		for (const [name, value] of finalOptions) this.addChoice(name, value);

		return this;
	}

	public override toJSON() {
		return {
			...super.toJSON(),
			choices: this.choices,
		};
	}
}
