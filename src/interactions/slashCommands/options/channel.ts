import { ApplicationCommandOptionType } from 'discord-api-types/v9';
import { ApplicationCommandOptionWithChannelTypesBase } from '../mixins/CommandChannelOptionBase';

export class SlashCommandChannelOption extends ApplicationCommandOptionWithChannelTypesBase {
	public override readonly type = ApplicationCommandOptionType.Channel as const;

	public constructor() {
		super(ApplicationCommandOptionType.Channel);
	}
}
