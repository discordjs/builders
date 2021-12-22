import { ApplicationCommandOptionType } from 'discord-api-types/v9';
import { ApplicationCommandNumberOptionBase } from '../mixins/CommandNumberOptionBase';
import { z } from 'zod';

const numberValidator = z.number().int().nonnegative();

export class SlashCommandIntegerOption extends ApplicationCommandNumberOptionBase {
	public override readonly type = ApplicationCommandOptionType.Integer as const;

	public constructor() {
		super(ApplicationCommandOptionType.Integer);
	}

	public setMaxValue(max: number): this {
		numberValidator.parse(max);
		this.maxValue = max;
		return this;
	}

	public setMinValue(min: number): this {
		numberValidator.parse(min);
		this.minValue = min;
		return this;
	}
}
