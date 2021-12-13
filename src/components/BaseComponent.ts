import type { APIBaseMessageComponent, ComponentType } from 'discord-api-types';

export abstract class BaseComponent<T extends ComponentType> {
	public type?: T;

	public constructor(data?: APIBaseMessageComponent<T> | BaseComponent<T>) {
		this.type = data?.type;
	}

	public toJSON() {
		return {
			type: this.type!,
		};
	}
}
