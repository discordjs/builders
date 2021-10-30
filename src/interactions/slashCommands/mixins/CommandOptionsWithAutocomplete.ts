import type { ToAPIApplicationCommandOptions } from '../SlashCommandBuilder';
import { SlashCommandOptionBase } from './CommandOptionBase';

export abstract class ApplicationCommandOptionWithAutocompleteBase
	extends SlashCommandOptionBase
	implements ToAPIApplicationCommandOptions
{
	public override toJSON() {
		return {
			...super.toJSON(),
			autocomplete: true,
		};
	}
}
