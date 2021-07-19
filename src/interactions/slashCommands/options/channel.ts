import { ApplicationCommandOptionType } from 'discord-api-types/v9';
import { SlashCommandOptionBase } from '../mixins/CommandOptionBase';

export class SlashCommandChannelOption extends SlashCommandOptionBase {
	public override readonly type = ApplicationCommandOptionType.Channel as const;

	public constructor() {
		super(ApplicationCommandOptionType.Channel);
	}
}
