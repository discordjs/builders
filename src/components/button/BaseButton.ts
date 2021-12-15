import { APIButtonComponent, APIMessageComponentEmoji, ButtonStyle, ComponentType } from 'discord-api-types';
import { z } from 'zod';
import { disabledValidator, emojiValidator } from '../Assertions';
import { Component } from '../Component';

export type BuilderButtonBaseData<T> = Omit<APIButtonComponent, 'url' | 'customId'> & { style: T };

export function validateButtonFields(button: BaseButtonComponent<ButtonStyle>) {
	if (button.emoji && button.label) {
		throw new TypeError('Cannot construct a button with both a label and an emoji field present.');
	}
}

export const buttonLabelValidator = z.string().nonempty().max(80);

export abstract class BaseButtonComponent<T extends ButtonStyle> extends Component<ComponentType.Button> {
	public style!: T;
	public label?: string;
	public emoji?: APIMessageComponentEmoji;
	public disabled?: boolean;

	public constructor(data?: APIButtonComponent) {
		super(ComponentType.Button);

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
		this.emoji = emoji;
		return this;
	}

	/**
	 * Sets whether this button is disable or not
	 * @param disabled Whether or not to disable this button or not
	 */
	public setDisabled(disabled: boolean) {
		disabledValidator.parse(disabled);
		this.disabled = disabled;
		return this;
	}

	/**
	 * Sets the label for this button
	 * @param label The label to display on this button
	 */
	public setLabel(label: string): Omit<this, 'setEmoji'> {
		buttonLabelValidator.parse(label);
		this.label = label;
		return this;
	}

	public override toJSON(): BuilderButtonBaseData<T> {
		validateButtonFields(this);
		return {
			...super.toJSON(),
			style: this.style,
			label: this.label,
			emoji: this.emoji,
			disabled: this.disabled,
		};
	}
}
