import { ApplicationCommandOptionType } from 'discord-api-types/v9';
import { ApplicationCommandOptionWithAutocompleteBase } from '../mixins/CommandOptionsWithAutocomplete';

export class SlashCommandAutocompleteStringOption extends ApplicationCommandOptionWithAutocompleteBase {
	public override readonly type = ApplicationCommandOptionType.String as const;

	public constructor() {
		super(ApplicationCommandOptionType.String);
	}
}
