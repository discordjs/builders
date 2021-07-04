import type { APIPartialEmoji, Snowflake } from 'discord-api-types/v8';
import ow from 'ow';
import { APIBaseComponent, ComponentType } from './BaseComponent';

/**
 * Builds a button-type message component
 */
export class MessageButton {
	/**
	 * The text to be displayed on this button
	 * @type {?string}
	 */
	public customID?: string;

	/**
	 * Whether this button is currently disabled
	 * @type {boolean}
	 */
	public disabled?: boolean;

	/**
	 * Emoji for this button
	 * @type {?RawEmoji}
	 */
	public emoji?: APIPartialEmoji;

	/**
	 * The text to be displayed on this button
	 * @type {?string}
	 */
	public label?: string;

	/**
	 * The style of this button
	 * @type {?MessageButtonStyle}
	 */
	public style?: MessageButtonStyle;

	/**
	 * The URL this button links to, if it is a Link style button
	 * @type {?string}
	 */
	public url?: string;

	/**
	 * @param {MessageButtonData|APIButtonComponent} [data] MessageButton to clone or raw data
	 */
	public constructor(data?: MessageButtonData | APIButtonComponent) {
		if (!data) return;

		this.style = MessageButton.resolveStyle(data.style);

		if ('custom_id' in data && typeof data.custom_id !== 'undefined') {
			this.setCustomID(data.custom_id);
		} else if ('customID' in data && typeof data.customID !== 'undefined') {
			this.setCustomID(data.customID);
		}

		if (typeof data.label !== 'undefined') {
			this.setLabel(data.label);
		}

		if (typeof data.emoji !== 'undefined') {
			this.setEmoji(data.emoji);
		}

		if (typeof data.url !== 'undefined') {
			this.setURL(data.url);
		}

		this.setDisabled(data.disabled ?? false);
	}

	/**
	 * Sets the custom ID of this button
	 * @param {string} customID A unique string to be sent in the interaction when clicked
	 * @returns {MessageButton}
	 */
	public setCustomID(customID: string): this {
		ow(customID, ow.string.nonEmpty.maxLength(100));
		ow(this.style, ow.optional.number.inRange(1, 4).message('Cannot set customID on a button that is Link style.'));
		this.customID = customID;
		return this;
	}

	/**
	 * Sets the interactive status of the button
	 * @param {boolean} disabled Whether this button should be disabled
	 * @returns {MessageButton}
	 */
	public setDisabled(disabled: boolean): this {
		ow(disabled, ow.boolean);
		this.disabled = disabled;
		return this;
	}

	/**
	 * Set the emoji of this button
	 * @param {EmojiResolvable} emoji The emoji to be displayed on this button
	 * @returns {MessageButton}
	 */
	public setEmoji(emoji: EmojiResolvable): this {
		const _emoji = MessageButton.resolveEmoji(emoji);
		ow(_emoji, ow.object.hasAnyKeys('id', 'name'));
		this.emoji = _emoji;
		return this;
	}

	/**
	 * Sets the label of this button
	 * @param {string} label The text to be displayed on this button
	 * @returns {MessageButton}
	 */
	public setLabel(label: string): this {
		ow(label, ow.string.nonEmpty.maxLength(80));
		this.label = label;
		return this;
	}

	/**
	 * Sets the style of this button
	 * @param {MessageButtonStyleResolvable} style The style of this button
	 * @returns {MessageButton}
	 */
	public setStyle(style: MessageButtonStyleResolveable): this {
		this.style = MessageButton.resolveStyle(style);
		return this;
	}

	/**
	 * Sets the URL of this button.
	 * <note>MessageButton#style must be LINK when setting a URL</note>
	 * @param {string} url The URL of this button
	 * @returns {MessageButton}
	 */
	public setURL(url: string) {
		ow(url, ow.string.nonEmpty);
		ow(this.style, ow.optional.number.equal(5).message('Cannot set URL on a button that is not Link style.'));
		this.url = url;
		return this;
	}

	/**
	 * Transforms the button to a plain object.
	 * @returns {APIButtonComponent} The raw data of this button
	 */
	public toJSON() {
		ow(this.style, ow.number);
		return {
			custom_id: this.customID,
			disabled: this.disabled,
			emoji: this.emoji,
			label: this.label,
			style: this.style,
			type: ComponentType.Button,
			url: this.url,
		};
	}

	/**
	 * Resolves the style of a button
	 * @param {MessageButtonStyleResolvable} style The style to resolve
	 * @returns {MessageButtonStyle}
	 * @private
	 */
	private static resolveStyle(style: MessageButtonStyleResolveable): MessageButtonStyle {
		ow(
			style,
			ow.any(
				ow.number.inRange(1, 5),
				ow.string.is((value) => ['primary', 'secondary', 'success', 'danger', 'link'].includes(value.toLowerCase())),
			),
		);
		return typeof style === 'number' ? style : MessageButtonStyle[style];
	}

	/**
	 * Resolves a partial emoji from a variety of inputs
	 * @param {EmojiResolvable} emoji The data to resolve
	 * @returns {APIPartialEmoji}
	 * @private
	 */
	private static resolveEmoji(emoji: EmojiResolvable): APIPartialEmoji | null {
		if (!emoji) return null;
		if (typeof emoji === 'string') {
			if (/^\d{17,19}$/.test(emoji)) return { id: `${BigInt(emoji)}`, name: null };
			if (!emoji.includes(':')) return { animated: false, name: emoji, id: null };
			const match = /<?(?:(a):)?(\w{2,32}):(\d{17,19})?>?/.exec(emoji);
			return match && { animated: Boolean(match[1]), name: match[2], id: match[3] ? `${BigInt(match[3])}` : null };
		}
		const { id, name, animated } = emoji;
		if (!id && !name) return null;
		return { id, name, animated };
	}
}

/**
 * Data that can be resolved to an APIPartialEmoji
 */
export type EmojiResolvable = string | Snowflake | APIPartialEmoji;

/**
 * Data for a Message Button
 */
export interface MessageButtonData {
	/**
	 * The custom_id to be sent in the interaction when clicked
	 */
	customID?: string;
	/**
	 * The status of the button
	 */
	disabled?: boolean;
	/**
	 * The emoji to display to the left of the text
	 */
	emoji?: EmojiResolvable;
	/**
	 * The label to be displayed on the button
	 */
	label?: string;
	/**
	 * The style of the button
	 */
	style: MessageButtonStyleResolveable;

	/**
	 * The URL to direct users to when clicked for Link buttons
	 */
	url?: string;
}

/**
 * https://discord.com/developers/docs/interactions/message-components#buttons-button-object
 */
export interface APIButtonComponent extends APIBaseComponent {
	/**
	 * The type of the component
	 */
	type: ComponentType.Button;
	/**
	 * The label to be displayed on the button
	 */
	label?: string;
	/**
	 * The custom_id to be sent in the interaction when clicked
	 */
	custom_id?: string;
	/**
	 * The style of the button
	 */
	style: MessageButtonStyle;
	/**
	 * The emoji to display to the left of the text
	 */
	emoji?: APIPartialEmoji;
	/**
	 * The URL to direct users to when clicked for Link buttons
	 */
	url?: string;
	/**
	 * The status of the button
	 */
	disabled?: boolean;
}

/**
 * https://discord.com/developers/docs/interactions/message-components#buttons-button-styles
 */
export enum MessageButtonStyle {
	Primary = 1,
	Secondary,
	Success,
	Danger,
	Link,
}

/**
 * Data that can be resolved to s ButtonStyle
 */
export type MessageButtonStyleResolveable = keyof typeof MessageButtonStyle | MessageButtonStyle;
