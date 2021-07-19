import { ApplicationCommandOptionType } from 'discord-api-types/v9';
import { ApplicationCommandOptionWithChoicesBase } from '../mixins/CommandOptionWithChoices';

export class SlashCommandIntegerOption extends ApplicationCommandOptionWithChoicesBase<number> {
	public override readonly type = ApplicationCommandOptionType.Integer as const;

	public constructor() {
		super(ApplicationCommandOptionType.Integer);
	}
}
