import { ArgumentError } from 'ow/dist';
import { MessageButton } from '../src';

describe('Components', () => {
	describe('MessageButton', () => {
		describe('constructor', () => {
			test('GIVEN data THEN class properties are set', () => {
				const button = new MessageButton({
					customID: 'discord.js',
					emoji: '⭐',
					label: 'discord.js',
					style: 'Primary',
				});
				expect(button.customID).toBe('discord.js');
				expect(button.emoji).toMatchObject({ id: null, name: '⭐' });
				expect(button.label).toBe('discord.js');
				expect(button.style).toBe(1);
			});

			test('GIVEN raw data THEN customID is set to custom_id', () => {
				const button = new MessageButton({
					custom_id: 'discord.js',
					style: 2,
				});
				expect(button.customID).toBe('discord.js');
				expect(button.style).toBe(2);
			});

			test('GIVEN data for link button THEN class properties are set', () => {
				const button = new MessageButton({
					url: 'https://discord.js.org',
					label: 'discord.js',
					style: 'Link',
				});
				expect(button.url).toBe('https://discord.js.org');
			});
		});

		describe('setLabel', () => {
			test('GIVEN label > 80 characters THEN should throw ArgumentError', () => {
				expect(() => new MessageButton().setLabel('a'.repeat(81))).toThrow(ArgumentError);
			});
		});

		describe('setStyle', () => {
			test('GIVEN "Primary" THEN should set style to 1', () => {
				expect(new MessageButton().setStyle('Primary').style).toBe(1);
			});

			test('GIVEN 6 THEN should throw ArgumentError', () => {
				expect(() => new MessageButton().setStyle(6)).toThrow(ArgumentError);
			});
		});

		describe('setEmoji', () => {
			test('GIVEN emoji object THEN sets emoji property', () => {
				expect(
					new MessageButton().setEmoji({
						id: '850901572418666558',
						name: 'charmander',
					}).emoji,
				).toMatchObject({
					id: '850901572418666558',
					name: 'charmander',
				});
			});

			test('GIVEN emoji id THEN sets emoji id property', () => {
				expect(new MessageButton().setEmoji('850901572418666558').emoji).toMatchObject({
					id: '850901572418666558',
				});
			});

			test('GIVEN unicode THEN sets emoji name property', () => {
				expect(new MessageButton().setEmoji('⭐').emoji).toMatchObject({
					name: '⭐',
				});
			});

			test('GIVEN custom emoji string THEN sets emoji property', () => {
				expect(new MessageButton().setEmoji('<:charmander:850901572418666558>').emoji).toMatchObject({
					id: '850901572418666558',
					name: 'charmander',
					animated: false,
				});
			});

			test('GIVEN emoji name THEN sets emoji property', () => {
				expect(new MessageButton().setEmoji(':charmander:').emoji).toMatchObject({
					name: 'charmander',
				});
			});

			test('GIVEN no param THEN throws ArgumentError', () => {
				// @ts-expect-error
				expect(() => new MessageButton().setEmoji()).toThrow(ArgumentError);
			});

			test('GIVEN non-emoji object THEN throws ArgumentError', () => {
				// @ts-expect-error
				expect(() => new MessageButton().setEmoji({})).toThrow(ArgumentError);
			});
		});

		describe('toJSON', () => {
			test('should throw ArgumentError if style not set', () => {
				expect(() => new MessageButton().toJSON()).toThrow(ArgumentError);
			});

			test('should return MessageButtonDataRaw', () => {
				expect(
					new MessageButton({
						style: 'Primary',
						customID: 'discord.js',
						label: 'Labelled',
						disabled: true,
						emoji: '⭐',
					}).toJSON(),
				).toMatchObject({
					custom_id: 'discord.js',
					disabled: true,
					emoji: { id: null, name: '⭐' },
					label: 'Labelled',
					style: 1,
					type: 2,
				});
			});
		});
	});
});
