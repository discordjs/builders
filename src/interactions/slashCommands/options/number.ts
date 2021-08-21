import { ApplicationCommandOptionType } from 'discord-api-types/v9';
import { ApplicationCommandOptionWithChoicesBase } from '../mixins/CommandOptionWithChoices';

export class SlashCommandNumberOption extends ApplicationCommandOptionWithChoicesBase<number> {
	public override readonly type = ApplicationCommandOptionType.Number as const;

	public constructor() {
		super(ApplicationCommandOptionType.Number);
	}
}
