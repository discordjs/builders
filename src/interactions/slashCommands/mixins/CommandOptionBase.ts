import type { ApplicationCommandOptionType } from 'discord-api-types/v8';
import ow from 'ow';
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
	 * @param required If this option should be required
	 */
	public setRequired(required: boolean) {
		// Assert that you actually passed a boolean
		ow(required, 'required', ow.boolean);

		this.required = required;

		return this;
	}

	public toJSON() {
		validateRequiredParameters(this.name, this.description, []);

		// Assert that you actually passed a boolean
		ow(this.required, 'required', ow.boolean);

		return {
			type: this.type,
			name: this.name,
			description: this.description,
			required: this.required,
		};
	}
}
