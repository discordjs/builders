import {
	APIButtonComponent,
	APIMessageComponent,
	APIMessageComponentEmoji,
	ButtonStyle,
	ComponentType,
} from 'discord-api-types/v9';
import { z } from 'zod';
import { disabledValidator, emojiValidator } from '../Assertions';
import type { Component } from '../Component';

export function validateButtonFields(button: BaseButtonComponent) {
	if (button.emoji && button.label) {
		throw new TypeError('Cannot construct a button with both a label and an emoji field present.');
	}
}

export const buttonLabelValidator = z.string().nonempty().max(80);

export abstract class BaseButtonComponent implements Component {
	public readonly type: ComponentType.Button = ComponentType.Button;
	public abstract readonly style: ButtonStyle;
	public readonly label?: string;
	public readonly emoji?: APIMessageComponentEmoji;
	public readonly disabled?: boolean;

	public constructor(data?: APIButtonComponent) {
		if (!data) {
			return;
		}

		this.label = data.label;
		this.emoji = data.emoji;
		this.disabled = data.disabled;
	}

	/**
	 * Sets the emoji to display on this button
	 * @param emoji The emoji to display on this button
	 */
	public setEmoji(emoji: APIMessageComponentEmoji): Omit<this, 'setLabel'> {
		emojiValidator.parse(emoji);
		Reflect.set(this, 'emoji', emoji);
		return this;
	}

	/**
	 * Sets whether this button is disable or not
	 * @param disabled Whether or not to disable this button or not
	 */
	public setDisabled(disabled: boolean) {
		disabledValidator.parse(disabled);
		Reflect.set(this, 'disabled', disabled);
		return this;
	}

	/**
	 * Sets the label for this button
	 * @param label The label to display on this button
	 */
	public setLabel(label: string): Omit<this, 'setEmoji'> {
		buttonLabelValidator.parse(label);
		Reflect.set(this, 'label', label);
		return this;
	}

	public toPartialJSON() {
		validateButtonFields(this);
		return {
			type: this.type,
			label: this.label,
			emoji: this.emoji,
			disabled: this.disabled,
		};
	}

	public abstract toJSON(): APIMessageComponent;
}
