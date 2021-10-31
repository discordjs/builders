import { APIApplicationCommandOptionChoice, ApplicationCommandOptionType } from 'discord-api-types/v9';
import Joi from 'joi';
import { validateMaxChoicesLength } from '../Assertions';
import type { ToAPIApplicationCommandOptions } from '../SlashCommandBuilder';
import { SlashCommandOptionBase } from './CommandOptionBase';

const stringPredicate = Joi.string().min(1).max(100).required();
const integerPredicate = Joi.number().required();

const choicesPredicate = Joi.array().items(
	Joi.array().items(stringPredicate, Joi.alternatives(Joi.string(), integerPredicate)),
);

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
		Joi.assert(name, stringPredicate);

		// Validate the value
		if (this.type === ApplicationCommandOptionType.String) Joi.assert(value, stringPredicate);
		else Joi.assert(value, integerPredicate);

		this.choices.push({ name, value });

		return this;
	}

	/**
	 * Adds multiple choices for this option
	 *
	 * @param choices The choices to add
	 */
	public addChoices(choices: [name: string, value: T][]) {
		Joi.assert(choices, choicesPredicate);

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
