import { ButtonStyle } from 'discord-api-types';
import { z } from 'zod';
import type { BaseButtonComponent } from './button/BaseButton';
import type { SelectMenuOption } from './selectMenu/SelectMenuOption';

export const customIdValidator = z.string().min(1).max(100);

export const emojiValidator = z
	.object({
		id: z.string(),
		name: z.string(),
		animated: z.boolean(),
	})
	.partial()
	.strict();

export const disabledValidator = z.boolean();

export function validateButtonFields(button: BaseButtonComponent) {
	if (button.emoji && button.label) {
		throw new TypeError('Cannot construct a button with both a label and an emoji field present.');
	}
}

export const buttonLabelValidator = z.string().nonempty().max(80);

export const buttonStyleValidator = z.number().min(ButtonStyle.Primary).max(ButtonStyle.Danger);

export const placeholderValidator = z.string().max(100);
export const minMaxValidator = z.number().max(25).min(0);

export const optionsValidator = z.object({}).array().nonempty();

export function validateRequiredSelectMenuParameters(options: SelectMenuOption[], customId?: string) {
	customIdValidator.parse(customId);
	optionsValidator.parse(options);
}

export const labelValueValidator = z.string().min(1).max(100);
export const defaultValidator = z.boolean();

export function validateRequiredSelectMenuOptionParameters(label: string, value: string) {
	labelValueValidator.parse(label);
	labelValueValidator.parse(value);
}

export const urlValidator = z.string().url();
