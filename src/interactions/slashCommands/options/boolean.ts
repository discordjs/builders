import { ApplicationCommandOptionType } from 'discord-api-types/v8';
import { SlashCommandOptionBase } from '../mixins/CommandOptionBase';

export class SlashCommandBooleanOption extends SlashCommandOptionBase {
	public override readonly type = ApplicationCommandOptionType.BOOLEAN as const;

	public constructor() {
		super(ApplicationCommandOptionType.BOOLEAN);
	}
}
