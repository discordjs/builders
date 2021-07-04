/**
 * https://discord.com/developers/docs/interactions/message-components
 */
export interface APIBaseComponent {
	/**
	 * The type of the component
	 */
	type: ComponentType;
}

/**
 * https://discord.com/developers/docs/interactions/message-components#component-types
 */
export enum ComponentType {
	/**
	 * ActionRow component
	 */
	ActionRow = 1,
	/**
	 * Button component
	 */
	Button,
	/**
	 * Select Menu component
	 */
	SelectMenu,
}
