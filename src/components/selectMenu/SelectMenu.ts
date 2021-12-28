import { APISelectMenuComponent, ComponentType } from 'discord-api-types/v9';
import { customIdValidator, disabledValidator } from '../Assertions';
import type { Component } from '../Component';
import { z } from 'zod';
import { SelectMenuOption } from './SelectMenuOption';

export const placeholderValidator = z.string().max(100);
export const minMaxValidator = z.number().max(25).min(0);

export const optionsValidator = z.object({}).array().nonempty();

function validateRequiredParameters(customId: string, options: SelectMenuOption[]) {
	customIdValidator.parse(customId);
	optionsValidator.parse(options);
}

/**
 * Represents a select menu component
 */
export class SelectMenuComponent implements Component {
	public readonly type = ComponentType.SelectMenu;
	public readonly options!: SelectMenuOption[];
	public readonly placeholder?: string;
	public readonly minValues?: number;
	public readonly maxValues?: number;
	public readonly customId!: string;
	public readonly disabled?: boolean;

	public constructor(data?: APISelectMenuComponent) {
		if (!data) {
			this.options = [];
			return;
		}

		this.options = data.options.map((option) => new SelectMenuOption(option));
		this.placeholder = data.placeholder;
		this.minValues = data.min_values;
		this.maxValues = data.max_values;
		this.customId = data.custom_id;
		this.disabled = data.disabled;
	}

	/**
	 * Sets the placeholder for this select menu
	 * @param placeholder The placeholder to use for this select menu
	 */
	public setPlaceholder(placeholder: string) {
		placeholderValidator.parse(placeholder);
		Reflect.set(this, 'placeholder', placeholder);
		return this;
	}

	/**
	 * Sets thes minimum values that must be selected in the select menu
	 * @param minValues The minimum values that must be selected
	 */
	public setMinValues(minValues: number) {
		minMaxValidator.parse(minValues);
		Reflect.set(this, 'minValues', minValues);
		return this;
	}

	/**
	 * Sets thes maximum values that must be selected in the select menu
	 * @param minValues The maximum values that must be selected
	 */
	public setMaxValues(maxValues: number) {
		minMaxValidator.parse(maxValues);
		Reflect.set(this, 'maxValues', maxValues);
		return this;
	}

	/**
	 * Sets the custom Id for this select menu
	 * @param customId The custom ID to use for this select menu
	 */
	public setCustomId(customId: string) {
		customIdValidator.parse(customId);
		Reflect.set(this, 'customId', customId);
		return this;
	}

	/**
	 * Sets whether or not this select menu is disabled
	 * @param disabled Whether or not this select menu is disabled
	 */
	public setDisabled(disabled: boolean) {
		disabledValidator.parse(disabled);
		Reflect.set(this, 'disabled', disabled);
		return this;
	}

	/**
	 * Adds options to this select menu
	 * @param options The options to add to this select menu
	 * @returns
	 */
	public addOptions(...options: SelectMenuOption[]) {
		this.options.push(...options);
		return this;
	}

	/**
	 * Sets the options on this select menu
	 * @param options The options to set on this select menu
	 */
	public setOptions(options: SelectMenuOption[]) {
		Reflect.set(this, 'options', options);
		return this;
	}

	public toJSON(): APISelectMenuComponent {
		validateRequiredParameters(this.customId, this.options);
		return {
			type: this.type,
			custom_id: this.customId,
			options: this.options.map((option) => option.toJSON()),
			placeholder: this.placeholder,
			min_values: this.minValues,
			max_values: this.maxValues,
			disabled: this.disabled,
		};
	}
}
