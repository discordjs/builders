import { ApplicationCommandOptionType } from 'discord-api-types/v8';
import { ApplicationCommandOptionWithChoicesBase } from '../mixins/CommandOptionWithChoices';

export class SlashCommandStringOption extends ApplicationCommandOptionWithChoicesBase<string> {
	public override readonly type = ApplicationCommandOptionType.STRING as const;

	public constructor() {
		super(ApplicationCommandOptionType.STRING);
	}
}
