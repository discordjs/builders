import { APIApplicationCommandUserOption, ApplicationCommandOptionType } from 'discord-api-types/v9';
import { ApplicationCommandOptionBase } from '../mixins/ApplicationCommandOptionBase';

export class SlashCommandUserOption extends ApplicationCommandOptionBase<ApplicationCommandOptionType.User> {
	public readonly type = ApplicationCommandOptionType.User as const;

	public toJSON(): APIApplicationCommandUserOption {
		this.runRequiredValidations();

		return { ...this };
	}
}
