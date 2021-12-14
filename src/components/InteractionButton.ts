import type { APIButtonComponentWithCustomId, ButtonStyle } from 'discord-api-types';
import z from 'zod';
import { customIdValidator } from './Assertions';
import { BaseButtonComponent } from './BaseButton';

const styleValidator = z.union([z.string(), z.number()]);

/**
 * Represents the a button that can send interactions whenever clicked.
 */
export class InteractionButtonComponent extends BaseButtonComponent<Exclude<ButtonStyle, ButtonStyle.Link>> {
	public customId!: string;

	public constructor(
		data?: BaseButtonComponent<Exclude<ButtonStyle, ButtonStyle.Link>> | APIButtonComponentWithCustomId,
	) {
		super(data);

		if (!(data instanceof BaseButtonComponent) && data !== undefined) {
			this.customId = data.custom_id;
		}
	}

	/**
	 * Sets the style of this button
	 * @param style The style to use for this button
	 */
	public setStyle(style: Exclude<ButtonStyle, ButtonStyle.Link>) {
		styleValidator.parse(style);
		this.style = style;
		return this;
	}

	/**
	 * Sets the custom Id for this button
	 * @param customId The custom ID to use for this button
	 */
	public setCustomId(customId: string) {
		customIdValidator.parse(customId);
		this.customId = customId;
	}

	public override toJSON(): APIButtonComponentWithCustomId {
		return {
			...super.toJSON(),
			custom_id: this.customId,
		};
	}
}
