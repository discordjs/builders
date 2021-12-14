import type { APIMessageComponentEmoji, APISelectMenuOption } from 'discord-api-types';
import z from 'zod';
import { emojiValidator } from './Assertions';

const labelValueValidator = z.string().min(1).max(100);
const defaultValidator = z.boolean();

export function validateRequiredParameters(label: string, value: string) {
	labelValueValidator.parse(label);
	labelValueValidator.parse(value);
}

/**
 * Represents an option within a select menu component
 */
export class SelectMenuOption {
	public label!: string;
	public value!: string;
	public description?: string;
	public emoji?: APIMessageComponentEmoji;
	public default?: boolean;

	/**
	 * Sets the label of this option
	 * @param label The label to show on this option
	 */
	public setLabel(label: string) {
		this.label = label;
		return this;
	}

	/**
	 * Sets the value of this option
	 * @param value The value of this option
	 */
	public setValue(value: string) {
		this.value = value;
		return this;
	}

	/**
	 * Sets the description of this option.
	 * @param description The description of this option
	 */
	public setDescription(description: string) {
		labelValueValidator.parse(description);
		this.description = description;
		return this;
	}

	/**
	 * Sets whether this option is selected by default
	 * @param isDefault Whether or not this option is selected by default
	 */
	public setDefault(isDefault: boolean) {
		defaultValidator.parse(isDefault);
		this.default = isDefault;
		return this;
	}

	/**
	 * Sets the emoji to display on this button
	 * @param emoji The emoji to display on this button
	 */
	public setEmoji(emoji: APIMessageComponentEmoji) {
		emojiValidator.parse(emoji);
		this.emoji = emoji;
		return this;
	}

	public toJSON(): APISelectMenuOption {
		validateRequiredParameters(this.label, this.value);
		return {
			label: this.label,
			value: this.value,
			description: this.description,
			emoji: this.emoji,
			default: this.default,
		};
	}
}