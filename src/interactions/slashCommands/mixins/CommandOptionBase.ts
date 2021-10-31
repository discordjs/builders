import type { APIApplicationCommandOption, ApplicationCommandOptionType } from 'discord-api-types/v9';
import Joi from 'joi';
import { validateRequiredParameters } from '../Assertions';
import type { ToAPIApplicationCommandOptions } from '../SlashCommandBuilder';
import { SharedNameAndDescription } from './NameAndDescription';

export class SlashCommandOptionBase extends SharedNameAndDescription implements ToAPIApplicationCommandOptions {
	public required = false;
	public readonly type: ApplicationCommandOptionType;

	public constructor(type: ApplicationCommandOptionType) {
		super();
		this.type = type;
	}

	/**
	 * Marks the option as required
	 *
	 * @param required If this option should be required
	 */
	public setRequired(required: boolean) {
		// Assert that you actually passed a boolean
		Joi.assert(required, Joi.boolean().required());

		this.required = required;

		return this;
	}

	public toJSON(): APIApplicationCommandOption {
		validateRequiredParameters(this.name, this.description, []);

		// Assert that you actually passed a boolean
		Joi.assert(this.required, Joi.boolean().required());

		return {
			type: this.type,
			name: this.name,
			description: this.description,
			required: this.required,
		};
	}
}
