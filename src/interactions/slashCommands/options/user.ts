import { ApplicationCommandOptionType } from 'discord-api-types/v8';
import { SlashCommandOptionBase } from '../mixins/CommandOptionBase';

export class SlashCommandUserOption extends SlashCommandOptionBase {
	public override readonly type = ApplicationCommandOptionType.USER as const;

	public constructor() {
		super(ApplicationCommandOptionType.USER);
	}
}
