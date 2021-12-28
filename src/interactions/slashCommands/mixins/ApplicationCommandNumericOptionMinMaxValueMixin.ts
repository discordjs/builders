export abstract class ApplicationCommandNumericOptionMinMaxValueMixin {
	protected readonly maxValue?: number;
	protected readonly minValue?: number;

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
}
