import { APIApplicationCommandOptionChoice, ApplicationCommandOptionType } from 'discord-api-types/v9';
import { z } from 'zod';
import { validateMaxChoicesLength } from '../Assertions';
import type { ToAPIApplicationCommandOptions } from '../SlashCommandBuilder';
import { SlashCommandOptionBase } from './CommandOptionBase';

const stringPredicate = z.string().min(1).max(100);
const numberPredicate = z.number().gt(-Infinity).lt(Infinity);
const choicesPredicate = z.tuple([stringPredicate, z.union([stringPredicate, numberPredicate])]).array();

export abstract class ApplicationCommandOptionWithChoicesBase<T extends string | number>
	extends SlashCommandOptionBase
	implements ToAPIApplicationCommandOptions
{
	public choices?: APIApplicationCommandOptionChoice[];
	public autocomplete?: boolean;

	/**
	 * Adds a choice for this option
	 *
	 * @param name The name of the choice
	 * @param value The value of the choice
	 */
	public addChoice(name: string, value: T): Omit<this, 'setAutocomplete'> {
		if (typeof this.autocomplete !== 'undefined') {
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
		if (typeof this.autocomplete !== 'undefined') {
			throw new RangeError('Autocomplete and choices are mutually exclusive to each other.');
		}

		ow(choices, `${ApplicationCommandOptionTypeNames[this.type]} choices`, choicesPredicate);

		for (const [label, value] of choices) this.addChoice(label, value);
		return this;
	}

	/**
	 * Marks the option as autocompletable
	 * @param autocomplete If this option should be autocompletable
	 */
	public setAutocomplete(autocomplete: boolean): Omit<this, 'addChoice' | 'addChoices'> {
		if (typeof this.choices !== 'undefined') {
			throw new RangeError('Autocomplete and choices are mutually exclusive to each other.');
		}

		// Assert that you actually passed a boolean
		ow(autocomplete, 'autocomplete', ow.boolean);

		this.autocomplete = autocomplete;

		return this;
	}

	public override toJSON() {
		if (typeof this.choices !== 'undefined' && typeof this.autocomplete !== 'undefined') {
			throw new RangeError('Autocomplete and choices are mutually exclusive to each other.');
		}

		return {
			...super.toJSON(),
			choices: this.choices,
			autocomplete: this.autocomplete,
		};
	}
}
