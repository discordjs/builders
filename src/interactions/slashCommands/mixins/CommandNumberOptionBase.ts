import { APIApplicationCommandNumberArgumentOptions, ApplicationCommandOptionType } from 'discord-api-types';
import { ApplicationCommandOptionWithChoicesBase } from './CommandOptionWithChoices';

export abstract class ApplicationCommandNumberOptionBase extends ApplicationCommandOptionWithChoicesBase<number> {
	protected maxValue?: number;
	protected minValue?: number;

	/**
	 * Sets the maximum number value of this option
	 * @param max The maximum value this option can be
	 */
	public abstract setMaxValue(max: number): this;

	/**
	 * Sets the minimum number value of this option
	 * @param min The minimum value this option can be
	 */
	public abstract setMinValue(min: number): this;

	// TODO: Update return type when discord-api-types is updated
	public override toJSON(): APIApplicationCommandNumberArgumentOptions {
		return {
			...super.toJSON(),
			type: ApplicationCommandOptionType.Integer,
			min_value: this.minValue,
			max_value: this.maxValue,
			autocomplete: false,
		};
	}
}
