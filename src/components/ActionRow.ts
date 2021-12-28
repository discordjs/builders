import { APIActionRowComponent, ComponentType } from 'discord-api-types/v9';
import type { LinkButtonComponent, InteractionButtonComponent, SelectMenuComponent } from '..';
import type { Component } from './Component';
import { createComponent } from './Components';

export type ActionRowComponent = LinkButtonComponent | InteractionButtonComponent | SelectMenuComponent;

// TODO: Add valid form component types

/**
 * Represents an action row component
 */
export class ActionRow<T extends ActionRowComponent> implements Component {
	public readonly components: T[] = [];
	public readonly type = ComponentType.ActionRow;

	public constructor(data?: APIActionRowComponent) {
		if (!data) {
			return;
		}

		this.components = data.components.map(createComponent) as T[];
	}

	/**
	 * Adds components to this action row.
	 * @param components The components to add to this action row.
	 * @returns
	 */
	public addComponents(...components: T[]) {
		this.components.push(...components);
		return this;
	}

	/**
	 * Sets the components in this action row
	 * @param components The components to set this row to
	 */
	public setComponents(components: T[]) {
		Reflect.set(this, 'components', components);
		return this;
	}

	public toJSON(): APIActionRowComponent {
		return {
			type: this.type,
			components: this.components.map((component) => component.toJSON()),
		};
	}
}
