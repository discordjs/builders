import { ApplicationCommandOptionType } from 'discord-api-types/v9';
import { ApplicationCommandNumberOptionBase } from '../mixins/CommandNumberOptionBase';

import ow from 'ow';

const numberPredicate = ow.number;

export class SlashCommandNumberOption extends ApplicationCommandNumberOptionBase {
	public override readonly type = ApplicationCommandOptionType.Number as const;

	public constructor() {
		super(ApplicationCommandOptionType.Number);
	}

	public setMaxValue(max: number): this {
		ow(max, numberPredicate);
		this.maxValue = max;
		return this;
	}

	public setMinValue(min: number): this {
		ow(min, numberPredicate);
		this.minValue = min;
		return this;
	}
}
