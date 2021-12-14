import type { APIButtonComponentWithCustomId, ButtonStyle } from 'discord-api-types';
import { BaseButtonComponent } from './BaseButton';

/**
 * Represents the a button that can send interactions whenever clicked.
 */
export class InteractionButtonComponent extends BaseButtonComponent<Exclude<ButtonStyle, ButtonStyle.Link>> {
	public customId!: string;

	/**
	 * Sets the style of this button
	 * @param style The style to use for this button
	 */
	public setStyle(style: Exclude<ButtonStyle, ButtonStyle.Link>) {
		this.style = style;
		return this;
	}

	/**
	 * Sets the custom Id for this button
	 * @param customId The custom ID to use for this button
	 */
	public setCustomId(customId: string) {
		this.customId = customId;
	}

	public override toJSON(): APIButtonComponentWithCustomId {
		return {
			...super.toJSON(),
			custom_id: this.customId,
		};
	}
}
