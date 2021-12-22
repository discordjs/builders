import { ApplicationCommandOptionType } from 'discord-api-types/v9';
import { ApplicationCommandNumberOptionBase } from '../mixins/CommandNumberOptionBase';
import ow from 'ow';

const numberPredicate = ow.number.integer;

export class SlashCommandIntegerOption extends ApplicationCommandNumberOptionBase {
	public override readonly type = ApplicationCommandOptionType.Integer as const;

	public constructor() {
		super(ApplicationCommandOptionType.Integer);
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
