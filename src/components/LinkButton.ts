import { APIButtonComponentWithURL, ButtonStyle } from 'discord-api-types';
import { BaseButtonComponent } from './BaseButton';

/**
 * Represents a button that opens a specified URL when clicked.
 */
export class LinkButtonComponent extends BaseButtonComponent<ButtonStyle.Link> {
	public url!: string;

	public constructor(data?: BaseButtonComponent<ButtonStyle.Link> | APIButtonComponentWithURL) {
		super(data);

		if (!(data instanceof BaseButtonComponent) && data !== undefined) {
			this.url = data.url;
		}

		this.style = ButtonStyle.Link;
	}

	public override toJSON(): APIButtonComponentWithURL {
		return {
			...super.toJSON(),
			url: this.url,
		};
	}
}
