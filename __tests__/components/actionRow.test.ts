import { APIActionRowComponent, ButtonStyle, ComponentType } from 'discord-api-types';
import { ActionRow, createComponent, LinkButtonComponent } from '../../src';

describe('Action Row Components', () => {
	describe('Assertion Tests', () => {
		test('GIVEN valid components THEN do not throw', () => {
			expect(() => new ActionRow().addComponents(new LinkButtonComponent())).not.toThrowError();
			expect(() => new ActionRow().setComponents([new LinkButtonComponent()])).not.toThrowError();
		});

		test('GIVEN valid JSON input THEN valid JSON output is given', () => {
			const actionRowData: APIActionRowComponent = {
				type: ComponentType.ActionRow,
				components: [
					{
						type: ComponentType.Button,
						label: 'button',
						style: ButtonStyle.Primary,
						custom_id: 'test',
					},
					{
						type: ComponentType.Button,
						label: 'link',
						style: ButtonStyle.Link,
						url: 'https://google.com',
					},
					{
						type: ComponentType.SelectMenu,
						placeholder: 'test',
						custom_id: 'test',
						options: [
							{
								label: 'option',
								value: 'option',
							},
						],
					},
				],
			};

			expect(new ActionRow(actionRowData).toJSON()).toEqual(actionRowData);
			expect(new ActionRow().toJSON()).toEqual({ type: ComponentType.ActionRow, components: [] });
			expect(() => createComponent({ type: ComponentType.ActionRow, components: [] })).not.toThrowError();
		});
	});
});
