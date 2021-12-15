import type { ComponentType } from 'discord-api-types';

export abstract class Component<T extends ComponentType = ComponentType> {
	public type: T;

	public constructor(type: T) {
		this.type = type;
	}

	public toJSON() {
		return {
			type: this.type,
		};
	}
}
