import { APIButtonComponentWithURL, ButtonStyle } from 'discord-api-types';
import { BaseButtonComponent } from './BaseButton';
import { z } from 'zod';

export const urlValidator = z.string().url();

/**
 * Represents a button that opens a specified URL when clicked.
 */
export class LinkButtonComponent extends BaseButtonComponent {
	public readonly url!: string;
	public readonly style: ButtonStyle.Link = ButtonStyle.Link;

	public constructor(data?: APIButtonComponentWithURL) {
		super(data);
		this.style = ButtonStyle.Link;

		if (!data) {
			return;
		}

		this.url = data.url;
	}

	/**
	 * Sets the URL for this button
	 * @param url The URL to open when this button is clicked
	 */
	public setURL(url: string) {
		urlValidator.parse(url);
		Reflect.set(this, 'url', url);
		return this;
	}

	public override toJSON(): APIButtonComponentWithURL {
		// url is required.
		urlValidator.parse(this.url);
		return {
			...super.toPartialJSON(),
			style: this.style,
			url: this.url,
		};
	}
}
