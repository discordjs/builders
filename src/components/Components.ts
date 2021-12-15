import {
	APIActionRowComponent,
	APIButtonComponent,
	APISelectMenuComponent,
	ButtonStyle,
	ComponentType,
} from 'discord-api-types';
import { ActionRow, Component, InteractionButtonComponent, LinkButtonComponent, SelectMenuComponent } from '../index';

/**
 * Factory for creating components from api data
 * @param data The api data to transform to a component class
 */
export function createComponent(data: APIButtonComponent | APISelectMenuComponent | APIActionRowComponent): Component {
	switch (data.type) {
		case ComponentType.ActionRow:
			return new ActionRow(data);
		case ComponentType.Button:
			if (data.style === ButtonStyle.Link) {
				return new LinkButtonComponent(data);
			}
			return new InteractionButtonComponent(data);
		case ComponentType.SelectMenu:
			return new SelectMenuComponent(data);
	}
}
