import { APIButtonComponentWithURL, ButtonStyle } from 'discord-api-types/v9';
import { urlValidator } from '../Assertions';
import { BaseButtonComponent } from './BaseButton';

/**
 * Represents a button that opens a specified URL when clicked.
 */
export class LinkButtonComponent extends BaseButtonComponent {
	public readonly url?: string;
	public readonly style = ButtonStyle.Link as const;

	public constructor(data?: APIButtonComponentWithURL) {
		super(data);
		this.style = ButtonStyle.Link;
		this.url = data?.url;
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

	public toJSON(): APIButtonComponentWithURL {
		// url is required.
		urlValidator.parse(this.url);
		return {
			...this,
			style: this.style,
			url: this.url!,
		};
	}
}
