import { ApplicationCommandOptionType } from 'discord-api-types/v9';
import { ApplicationCommandOptionWithAutocompleteBase } from '../mixins/CommandOptionsWithAutocomplete';

export class SlashCommandAutocompleteNumberOption extends ApplicationCommandOptionWithAutocompleteBase {
	public override readonly type = ApplicationCommandOptionType.Number as const;

	public constructor() {
		super(ApplicationCommandOptionType.Number);
	}
}
