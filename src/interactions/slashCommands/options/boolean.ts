import { ApplicationCommandOptionType } from 'discord-api-types/v9';
import { SlashCommandOptionBase } from '../mixins/CommandOptionBase';

export class SlashCommandBooleanOption extends SlashCommandOptionBase {
	public override readonly type = ApplicationCommandOptionType.Boolean as const;

	public constructor() {
		super(ApplicationCommandOptionType.Boolean);
	}
}
