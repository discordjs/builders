import { APIMessageComponent, ButtonStyle, ComponentType } from 'discord-api-types';
import { ActionRow, Component, InteractionButtonComponent, LinkButtonComponent, SelectMenuComponent } from '../index';
import type { ActionRowComponent } from './ActionRow';

export interface MappedComponentTypes {
	[ComponentType.ActionRow]: ActionRow<ActionRowComponent>;
	[ComponentType.Button]: LinkButtonComponent | InteractionButtonComponent;
	[ComponentType.SelectMenu]: SelectMenuComponent;
}

/**
 * Factory for creating components from API data
 * @param data The api data to transform to a component class
 */
export function createComponent<T extends keyof MappedComponentTypes>(
	data: APIMessageComponent & { type: T },
): MappedComponentTypes[T];
export function createComponent(data: APIMessageComponent): Component {
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
		default:
			// @ts-expect-error
			throw new Error(`Cannot serialize component type: ${data.type as number}`);
	}
}
