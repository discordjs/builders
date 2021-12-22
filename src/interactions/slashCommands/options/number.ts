import { ApplicationCommandOptionType } from 'discord-api-types/v9';
import { ApplicationCommandNumberOptionBase } from '../mixins/CommandNumberOptionBase';
import { z } from 'zod';

const numberValidator = z.number().nonnegative();

export class SlashCommandNumberOption extends ApplicationCommandNumberOptionBase {
	public override readonly type = ApplicationCommandOptionType.Number as const;

	public constructor() {
		super(ApplicationCommandOptionType.Number);
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
