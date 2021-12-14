import { APIButtonComponentWithURL, ButtonStyle } from 'discord-api-types';
import { BaseButtonComponent } from './BaseButton';
import z from 'zod';

const urlValidator = z.string().url();

/**
 * Represents a button that opens a specified URL when clicked.
 */
export class LinkButtonComponent extends BaseButtonComponent<ButtonStyle.Link> {
	public url!: string;

	public constructor() {
		super();
		this.style = ButtonStyle.Link;
	}

	/**
	 * Sets the URL for this button
	 * @param url The URL to open when this button is clicked
	 */
	public setURL(url: string) {
		this.url = url;
		return this;
	}

	public override toJSON(): APIButtonComponentWithURL {
		// url is required.
		urlValidator.parse(this.url);
		return {
			...super.toJSON(),
			url: this.url,
		};
	}
}
