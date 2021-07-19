import { ApplicationCommandOptionType } from 'discord-api-types/v9';
import { ApplicationCommandOptionWithChoicesBase } from '../mixins/CommandOptionWithChoices';

export class SlashCommandStringOption extends ApplicationCommandOptionWithChoicesBase<string> {
	public override readonly type = ApplicationCommandOptionType.String as const;

	public constructor() {
		super(ApplicationCommandOptionType.String);
	}
}
