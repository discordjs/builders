import type { APIButtonComponent, APIMessageComponentEmoji, ButtonStyle, ComponentType } from 'discord-api-types';
import { BaseComponent } from './BaseComponent';

export type BuilderButtonBaseData<T> = Omit<APIButtonComponent, 'url' | 'customId'> & { style: T };

export abstract class BaseButtonComponent<T extends ButtonStyle> extends BaseComponent<ComponentType.Button> {
	public style!: T;
	public label?: string;
	public emoji?: APIMessageComponentEmoji;
	public disabled?: boolean;

	public constructor(data?: APIButtonComponent | BaseButtonComponent<T>) {
		super(data);
	}

	/**
	 * Sets the emoji to display on this button
	 * @param emoji The emoji to display on this button
	 */
	public setEmoji(emoji: APIMessageComponentEmoji) {
		this.emoji = emoji;
		return this;
	}

	/**
	 * Sets whether this button is disable or not
	 * @param disabled Whether or not to disable this button or not
	 */
	public setDisabled(disabled: boolean) {
		this.disabled = disabled;
		return this;
	}

	/**
	 * Sets the label for this button
	 * @param label The label to display on this button
	 */
	public setLabel(label: string) {
		this.label = label;
		return this;
	}

	public override toJSON(): BuilderButtonBaseData<T> {
		return {
			...super.toJSON(),
			style: this.style,
			label: this.label,
			emoji: this.emoji,
			disabled: this.disabled,
		};
	}
}
