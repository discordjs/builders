import type { APIButtonComponentWithURL, ButtonStyle } from 'discord-api-types';
import { ButtonComponent } from './Button';

export class LinkButtonComponent extends ButtonComponent<ButtonStyle.Link> {
	public constructor(data?: ButtonComponent<ButtonStyle.Link> | APIButtonComponentWithURL) {
		super(data);
		this.url = data.url!;
	}

	public override toJSON(): APIButtonComponentWithURL {
		return {
			...super.toJSON(),
			url: this.url!,
		};
	}
}
