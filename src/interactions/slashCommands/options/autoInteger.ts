import { ApplicationCommandOptionType } from 'discord-api-types/v9';
import { ApplicationCommandOptionWithAutocompleteBase } from '../mixins/CommandOptionsWithAutocomplete';

export class SlashCommandAutocompleteIntegerOption extends ApplicationCommandOptionWithAutocompleteBase {
	public override readonly type = ApplicationCommandOptionType.Integer as const;

	public constructor() {
		super(ApplicationCommandOptionType.Integer);
	}
}
