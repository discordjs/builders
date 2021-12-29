import type { APIButtonComponentWithCustomId } from 'discord-api-types/v9';
import { customIdValidator, buttonStyleValidator } from '../Assertions';
import { BaseButtonComponent } from './BaseButton';

export type InteractionButtonStyle = APIButtonComponentWithCustomId['style'];

/**
 * Represents the a button that can send interactions whenever clicked.
 */
export class InteractionButtonComponent extends BaseButtonComponent {
	public readonly customId?: string;
	public readonly style?: InteractionButtonStyle;

	public constructor(data?: APIButtonComponentWithCustomId) {
		super(data);
		this.customId = data?.custom_id;
		this.style = data?.style;
	}

	/**
	 * Sets the style of this button
	 * @param style The style to use for this button
	 */
	public setStyle(style: InteractionButtonStyle) {
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

	public toJSON(): APIButtonComponentWithCustomId {
		// Style is required
		buttonStyleValidator.parse(this.style);
		return {
			...this,
			style: this.style!,
			custom_id: this.customId!,
		};
	}
}
