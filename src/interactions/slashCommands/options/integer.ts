import { ApplicationCommandOptionType } from 'discord-api-types/v8';
import { ApplicationCommandOptionWithChoicesBase } from '../mixins/CommandOptionWithChoices';

export class SlashCommandIntegerOption extends ApplicationCommandOptionWithChoicesBase<number> {
	public override readonly type = ApplicationCommandOptionType.INTEGER as const;

	public constructor() {
		super(ApplicationCommandOptionType.INTEGER);
	}
}
