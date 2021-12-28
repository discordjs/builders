import { APIApplicationCommandChannelOption, ApplicationCommandOptionType } from 'discord-api-types/v9';
import { mix } from 'ts-mixer';
import { ApplicationCommandOptionBase } from '../mixins/ApplicationCommandOptionBase';
import { ApplicationCommandOptionChannelTypesMixin } from '../mixins/ApplicationCommandOptionChannelTypesMixin';

@mix(ApplicationCommandOptionChannelTypesMixin)
export class SlashCommandChannelOption extends ApplicationCommandOptionBase {
	public override readonly type = ApplicationCommandOptionType.Channel as const;

	public toJSON(): APIApplicationCommandChannelOption {
		this.runRequiredValidations();

		return { ...this };
	}
}

export interface SlashCommandChannelOption extends ApplicationCommandOptionChannelTypesMixin {}
