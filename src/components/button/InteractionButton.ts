import { APIButtonComponentWithCustomId, ButtonStyle } from 'discord-api-types';
import { z } from 'zod';
import { customIdValidator } from '../Assertions';
import { BaseButtonComponent } from './BaseButton';

export const styleValidator = z.number().min(ButtonStyle.Primary).max(ButtonStyle.Danger);

/**
 * Represents the a button that can send interactions whenever clicked.
 */
export class InteractionButtonComponent extends BaseButtonComponent {
	public readonly customId!: string;
	public readonly style!: APIButtonComponentWithCustomId['style'];

	public constructor(data?: APIButtonComponentWithCustomId) {
		super(data);

		if (!data) {
			return;
		}

		this.customId = data.custom_id;
		this.style = data.style;
	}

	/**
	 * Sets the style of this button
	 * @param style The style to use for this button
	 */
	public setStyle(style: Exclude<ButtonStyle, ButtonStyle.Link>) {
		Reflect.set(this, 'style', style);
		return this;
	}

	/**
	 * Sets the custom Id for this button
	 * @param customId The custom ID to use for this button
	 */
	public setCustomId(customId: string) {
		customIdValidator.parse(customId);
		Reflect.set(this, 'customId', customId);
		return this;
	}

	public override toJSON(): APIButtonComponentWithCustomId {
		// Style is required
		styleValidator.parse(this.style);
		return {
			...super.toPartialJSON(),
			style: this.style,
			custom_id: this.customId,
		};
	}
}
