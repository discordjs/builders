import type { APIButtonComponent, APIMessageComponentEmoji, ButtonStyle, ComponentType } from 'discord-api-types';
import z from 'zod';
import { BaseComponent } from './BaseComponent';

export type BuilderButtonBaseData<T> = Omit<APIButtonComponent, 'url' | 'customId'> & { style: T };

function validateButtonFields(button: BaseButtonComponent<ButtonStyle>) {
	if (button.emoji && button.label) {
		throw new TypeError('Cannot construct a button with both a label and an emoji field present.');
	}
}

const labelValidator = z.string().nonempty().max(80);

const emojiValidator = z
	.object({
		id: z.string(),
		name: z.string(),
		animated: z.boolean(),
	})
	.partial()
	.strict();

const disabledValidator = z.boolean();

export abstract class BaseButtonComponent<T extends ButtonStyle> extends BaseComponent<ComponentType.Button> {
	public style!: T;
	public label?: string;
	public emoji?: APIMessageComponentEmoji;
	public disabled?: boolean;

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
		labelValidator.parse(label);
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
