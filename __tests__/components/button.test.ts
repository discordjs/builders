import {
	APIButtonComponentWithCustomId,
	APIButtonComponentWithURL,
	ButtonStyle,
	ComponentType,
} from 'discord-api-types/v9';
import { buttonLabelValidator, InteractionButtonComponent, LinkButtonComponent, styleValidator } from '../../src/index';

const interactionButtonComponent = () => new InteractionButtonComponent();
const linkButtonComponent = () => new LinkButtonComponent();

const longStr =
	'looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong';

describe('Button Components', () => {
	describe('Assertion Tests', () => {
		test('GIVEN valid label THEN validator does not throw', () => {
			expect(() => buttonLabelValidator.parse('foobar')).not.toThrowError();
		});

		test('GIVEN invalid label THEN validator does throw', () => {
			expect(() => buttonLabelValidator.parse(null)).toThrowError();
			expect(() => buttonLabelValidator.parse('')).toThrowError();

			expect(() => buttonLabelValidator.parse(longStr)).toThrowError();
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

			expect(() => {
				const button = interactionButtonComponent()
					.setCustomId('custom')
					.setStyle(ButtonStyle.Primary)
					.setDisabled(true)
					.setEmoji({ name: 'test' });

				button.toJSON();
			}).not.toThrowError();

			expect(() => linkButtonComponent().setURL('https://google.com')).not.toThrowError();
		});

		test('GIVEN invalid fields THEN build does throw', () => {
			expect(() => {
				interactionButtonComponent().setCustomId(longStr);
			}).toThrowError();

			expect(() => {
				const button = interactionButtonComponent()
					.setCustomId('custom')
					.setStyle(ButtonStyle.Primary)
					.setDisabled(true)
					.setLabel('test')
					// @ts-expect-error
					.setEmoji({ name: 'test' });

				button.toJSON();
			}).toThrowError();

			expect(() => interactionButtonComponent().setStyle(24));
			expect(() => interactionButtonComponent().setLabel(longStr));
			// @ts-ignore
			expect(() => interactionButtonComponent().setDisabled(0));
			// @ts-ignore
			expect(() => interactionButtonComponent().setEmoji('foo'));

			expect(() => linkButtonComponent().setURL('foobar')).toThrowError();
		});

		test('GiVEN valid input THEN valid JSON outputs are given', () => {
			const interactionData: APIButtonComponentWithCustomId = {
				type: ComponentType.Button,
				custom_id: 'test',
				label: 'test',
				style: ButtonStyle.Primary,
				disabled: true,
			};

			expect(new InteractionButtonComponent(interactionData).toJSON()).toEqual(interactionData);

			expect(
				interactionButtonComponent()
					.setCustomId(interactionData.custom_id)
					.setLabel(interactionData.label)
					.setStyle(interactionData.style)
					.setDisabled(interactionData.disabled)
					.toJSON(),
			).toEqual(interactionData);

			const linkData: APIButtonComponentWithURL = {
				type: ComponentType.Button,
				label: 'test',
				style: ButtonStyle.Link,
				disabled: true,
				url: 'https://google.com',
			};

			expect(new LinkButtonComponent(linkData).toJSON()).toEqual(linkData);

			expect(linkButtonComponent().setLabel(linkData.label).setDisabled(true).setURL(linkData.url));
		});
	});
});
