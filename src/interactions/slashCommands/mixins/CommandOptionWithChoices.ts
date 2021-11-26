import { APIApplicationCommandOptionChoice, ApplicationCommandOptionType } from 'discord-api-types/v9';
import { z } from 'zod';
import { validateMaxChoicesLength } from '../Assertions';
import type { ToAPIApplicationCommandOptions } from '../SlashCommandBuilder';
import { SlashCommandOptionBase } from './CommandOptionBase';

const stringPredicate = z.string().min(1).max(100);
const integerPredicate = z.number().gt(-Infinity).lt(Infinity);
const choicesPredicate = z.tuple([stringPredicate, z.union([stringPredicate, integerPredicate])]).array();

export abstract class ApplicationCommandOptionWithChoicesBase<T extends string | number>
	extends SlashCommandOptionBase
	implements ToAPIApplicationCommandOptions
{
	public choices?: APIApplicationCommandOptionChoice[];

	/**
	 * Adds a choice for this option
	 *
	 * @param name The name of the choice
	 * @param value The value of the choice
	 */
	public addChoice(name: string, value: T) {
		this.choices ??= [];

		validateMaxChoicesLength(this.choices);

		// Validate name
		stringPredicate.parse(name);

		// Validate the value
		if (this.type === ApplicationCommandOptionType.String) stringPredicate.parse(value);
		else integerPredicate.parse(value);

		this.choices.push({ name, value });

		return this;
	}

	/**
	 * Adds multiple choices for this option
	 *
	 * @param choices The choices to add
	 */
	public addChoices(choices: [name: string, value: T][]) {
		choicesPredicate.parse(choices);

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
