import type { ComponentType } from 'discord-api-types';

export class BaseComponent<T extends ComponentType> {
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
