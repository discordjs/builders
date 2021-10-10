import { validateRequiredParameters, validateName, validateType } from './Assertions';
import type { RESTPostAPIApplicationCommandsJSONBody } from 'discord-api-types/v9';

export class ContextMenuCommandBuilder {
	/**
	 * The name of this context menu command
	 */
	public readonly name: string = undefined!;

	/**
	 * The type of this context menu command
	 */
	public readonly type: number = undefined!;

	/**
	 * Sets the name
	 * @param name The name
	 */
	public setName(name: string) {
		// Assert the name matches the conditions
		validateName(name);

		Reflect.set(this, 'name', name);

		return this;
	}

	/**
	 * Sets the type
	 * @param type The type
	 */
	public setType(type: number) {
		// Assert the type is valid
		validateType(type);

		Reflect.set(this, 'type', type);

		return this;
	}

	/**
	 * Returns the final data that should be sent to Discord.
	 *
	 * **Note:** Calling this function will validate required properties based on their conditions.
	 */
	public toJSON(): RESTPostAPIApplicationCommandsJSONBody {
		validateRequiredParameters(this.name, this.type);
		return {
			name: this.name,
			type: this.type,
		};
	}
}
