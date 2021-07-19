import { ApplicationCommandOptionType } from 'discord-api-types/v9';
import { SlashCommandOptionBase } from '../mixins/CommandOptionBase';

export class SlashCommandUserOption extends SlashCommandOptionBase {
	public override readonly type = ApplicationCommandOptionType.User as const;

	public constructor() {
		super(ApplicationCommandOptionType.User);
	}
}
