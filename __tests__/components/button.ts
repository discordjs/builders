import { ButtonStyle } from 'discord-api-types';
import { buttonLabelValidator, InteractionButtonComponent, styleValidator } from '../../src/index';

const interactionButtonComponent = () => new InteractionButtonComponent();

describe('Button Components', () => {
	describe('Assertion Tests', () => {
		test('GIVEN valid label THEN validator does not throw', () => {
			expect(() => buttonLabelValidator.parse('foobar')).not.toThrowError();
		});

		test('GIVEN invalid label THEN validator does throw', () => {
			expect(() => buttonLabelValidator.parse(null)).toThrowError();
			expect(() => buttonLabelValidator.parse('')).toThrowError();

			expect(() =>
				buttonLabelValidator.parse(
					'loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong',
				),
			);
		});

		test('GIVEN valid style then validator does not throw', () => {
			expect(() => styleValidator.parse(3)).not.toThrowError();
			expect(() => styleValidator.parse(ButtonStyle.Secondary)).not.toThrowError();
		});

		test('GIVEN invalid style then validator does not throw', () => {
			expect(() => styleValidator.parse(7)).toThrowError();

			// Note: this throws because link styles are always set for you.
			expect(() => styleValidator.parse(ButtonStyle.Link)).toThrowError();
		});

		test('GIVEN valid fields THEN builder does not throw', () => {
			expect(() =>
				interactionButtonComponent().setCustomId('custom').setStyle(ButtonStyle.Primary).setLabel('test'),
			).not.toThrowError();
			expect(() =>
				interactionButtonComponent()
					.setCustomId('custom')
					.setStyle(ButtonStyle.Primary)
					.setLabel('test')
					.setDisabled(true),
			).not.toThrowError();
		});
	});
});
