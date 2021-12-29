import {
	APIButtonComponent,
	APIMessageComponent,
	APIMessageComponentEmoji,
	ButtonStyle,
	ComponentType,
} from 'discord-api-types/v9';
import { buttonLabelValidator, disabledValidator, emojiValidator } from '../Assertions';
import type { Component } from '../Component';

export abstract class BaseButtonComponent implements Component {
	public readonly type = ComponentType.Button as const;
	public abstract readonly style?: ButtonStyle;
	public readonly label?: string;
	public readonly emoji?: APIMessageComponentEmoji;
	public readonly disabled?: boolean;

	public constructor(data?: APIButtonComponent) {
		this.label = data?.label;
		this.emoji = data?.emoji;
		this.disabled = data?.disabled;
	}

	/**
	 * Sets the emoji to display on this button
	 * @param emoji The emoji to display on this button
	 */
	public setEmoji(emoji: APIMessageComponentEmoji) {
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

	public abstract toJSON(): APIMessageComponent;
}
