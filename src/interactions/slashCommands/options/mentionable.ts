import { ApplicationCommandOptionType } from 'discord-api-types/v9';
import { SlashCommandOptionBase } from '../mixins/CommandOptionBase';

export class SlashCommandMentionableOption extends SlashCommandOptionBase {
	public override readonly type = ApplicationCommandOptionType.Mentionable as const;

	public constructor() {
		super(ApplicationCommandOptionType.Mentionable);
	}
}
