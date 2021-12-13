import { APIButtonComponent, ButtonStyle, ComponentType } from 'discord-api-types';
import { BaseComponent } from './BaseComponent';
import { InteractionButtonComponent } from './InteractionButton';
import { LinkButtonComponent } from './LinkButton';

export class ButtonComponent<T extends ButtonStyle> extends BaseComponent<ComponentType.Button> {
	public style?: T;
	public label?: string;
	public emoji?: string;
	public disabled?: boolean;
	public url?: string;
	public customId?: string;

	public constructor(data?: APIButtonComponent | ButtonComponent<T>) {
		super(data);
	}

	public setStyle(style: T) {
		this.style = style;

		switch (style) {
			case ButtonStyle.Link:
				return new LinkButtonComponent();
			default:
				return new InteractionButtonComponent();
		}
	}

	public setEmoji(emoji: string) {
		this.emoji = emoji;
		return this;
	}

	public setDisabled(disabled: boolean) {
		this.disabled = disabled;
		return this;
	}

	public setLabel(label: string) {
		this.label = label;
		return this;
	}

	public setURL(url: string): LinkButtonComponent {
		this.url = url;
		return this;
	}

	public override toJSON() {
		return {
			...super.toJSON(),
			style: this.style!,
		};
	}
}

new ButtonComponent().setURL('test').setStyle(ButtonStyle.Link);
new ButtonComponent().setStyle(ButtonStyle.Link);
