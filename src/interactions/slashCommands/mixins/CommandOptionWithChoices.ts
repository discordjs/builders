import { APIApplicationCommandOptionChoice, ApplicationCommandOptionType } from 'discord-api-types/v9';
import { z } from 'zod';
import { validateMaxChoicesLength } from '../Assertions';
import type { ToAPIApplicationCommandOptions } from '../SlashCommandBuilder';
import { SlashCommandOptionBase } from './CommandOptionBase';

const stringPredicate = z.string().min(1).max(100);
const numberPredicate = z.number().gt(-Infinity).lt(Infinity);
const choicesPredicate = z.tuple([stringPredicate, z.union([stringPredicate, numberPredicate])]).array();
const booleanPredicate = z.boolean();

export abstract class ApplicationCommandOptionWithChoicesBase<T extends string | number>
	extends SlashCommandOptionBase<
		ApplicationCommandOptionType.String | ApplicationCommandOptionType.Number | ApplicationCommandOptionType.Integer
	>
	implements ToAPIApplicationCommandOptions
{
	public choices?: APIApplicationCommandOptionChoice[];
	public readonly autocomplete?: boolean;

	/**
	 * Adds a choice for this option
	 *
	 * @param name The name of the choice
	 * @param value The value of the choice
	 */
	public addChoice(name: string, value: T): Omit<this, 'setAutocomplete'> {
		if (this.autocomplete) {
			throw new RangeError('Autocomplete and choices are mutually exclusive to each other.');
		}

		this.choices ??= [];

		validateMaxChoicesLength(this.choices);

		// Validate name
		stringPredicate.parse(name);

		// Validate the value
		if (this.type === ApplicationCommandOptionType.String) stringPredicate.parse(value);
		else numberPredicate.parse(value);

		this.choices.push({ name, value });

		return this;
	}

	/**
	 * Adds multiple choices for this option
	 *
	 * @param choices The choices to add
	 */
	public addChoices(choices: [name: string, value: T][]): Omit<this, 'setAutocomplete'> {
		if (this.autocomplete) {
			throw new RangeError('Autocomplete and choices are mutually exclusive to each other.');
		}

		choicesPredicate.parse(choices);

		for (const [label, value] of choices) this.addChoice(label, value);
		return this;
	}

	/**
	 * Marks the option as autocompletable
	 * @param autocomplete If this option should be autocompletable
	 */
	public setAutocomplete<U extends boolean>(
		autocomplete: U,
	): U extends true
		? Omit<this, 'addChoice' | 'addChoices'>
		: this & Pick<ApplicationCommandOptionWithChoicesBase<T>, 'addChoice' | 'addChoices'> {
		// Assert that you actually passed a boolean
		booleanPredicate.parse(autocomplete);

		if (autocomplete && Array.isArray(this.choices) && this.choices.length > 0) {
			throw new RangeError('Autocomplete and choices are mutually exclusive to each other.');
		}

		Reflect.set(this, 'autocomplete', autocomplete);

		return this;
	}

	public override toJSON() {
		if (this.autocomplete && Array.isArray(this.choices) && this.choices.length > 0) {
			throw new RangeError('Autocomplete and choices are mutually exclusive to each other.');
		}

		return {
			...super.toJSON(),
			choices: this.choices,
			autocomplete: this.autocomplete,
		};
	}
}
