import { ApplicationCommandOptionType } from 'discord-api-types/v9';
import { SlashCommandOptionBase } from '../mixins/CommandOptionBase';

export class SlashCommandRoleOption extends SlashCommandOptionBase {
	public override readonly type = ApplicationCommandOptionType.Role as const;

	public constructor() {
		super(ApplicationCommandOptionType.Role);
	}
}
