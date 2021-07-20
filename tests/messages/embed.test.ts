import { Embed } from '../../src';
import type { APIEmbed } from 'discord-api-types/v9';

const emptyEmbed: APIEmbed = {
	author: undefined,
	color: undefined,
	description: undefined,
	fields: [],
	footer: undefined,
	image: undefined,
	provider: undefined,
	thumbnail: undefined,
	title: undefined,
	url: undefined,
	video: undefined,
};

const alpha = 'abcdefghijklmnopqrstuvwxyz';

describe('Embed', () => {
	describe('Embed getters', () => {
		test('GIVEN an embed with specific amount of characters THEN returns amount of characters', () => {
			const embed = new Embed({
				title: alpha,
				description: alpha,
				fields: [{ name: alpha, value: alpha }],
				author: { name: alpha },
				footer: { text: alpha },
			});

			expect(embed.length).toBe(alpha.length * 6);
		});
	});

	describe('Embed#title', () => {
		test('GIVEN an embed with a pre-defined title THEN return valid toJSON data', () => {
			const embed = new Embed({ title: 'foo' });
			expect(embed.toJSON()).toStrictEqual({ ...emptyEmbed, title: 'foo' });
		});

		test('GIVEN an embed using Embed#setTitle THEN return valid toJSON data', () => {
			const embed = new Embed();
			embed.setTitle('foo');

			expect(embed.toJSON()).toStrictEqual({ ...emptyEmbed, title: 'foo' });
		});

		test('GIVEN an embed with an invalid title THEN throws error', () => {
			const embed = new Embed();

			expect(() => embed.setTitle('a'.repeat(257))).toThrowError();
		});
	});

	describe('Embed description', () => {
		test('GIVEN an embed with a pre-defined description THEN return valid toJSON data', () => {
			const embed = new Embed({ ...emptyEmbed, description: 'foo' });
			expect(embed.toJSON()).toStrictEqual({ ...emptyEmbed, description: 'foo' });
		});

		test('GIVEN an embed using Embed#setDescription THEN return valid toJSON data', () => {
			const embed = new Embed();
			embed.setDescription('foo');

			expect(embed.toJSON()).toStrictEqual({ ...emptyEmbed, description: 'foo' });
		});

		test('GIVEN an embed with an invalid description THEN throws error', () => {
			const embed = new Embed();

			expect(() => embed.setDescription('a'.repeat(4097))).toThrowError();
		});
	});

	describe('Embed URL', () => {
		test('GIVEN an embed with a pre-defined url THEN returns valid toJSON data', () => {
			const embed = new Embed({ url: 'https://discord.js.org/' });
			expect(embed.toJSON()).toStrictEqual({
				...emptyEmbed,
				url: 'https://discord.js.org/',
			});
		});

		test('GIVEN an embed using Embed#setURL THEN returns valid toJSON data', () => {
			const embed = new Embed();
			embed.setURL('https://discord.js.org/');

			expect(embed.toJSON()).toStrictEqual({
				...emptyEmbed,
				url: 'https://discord.js.org/',
			});
		});

		test('GIVEN an embed with an invalid URL THEN throws error', () => {
			const embed = new Embed();

			expect(() => embed.setURL('owo')).toThrowError();
		});
	});

	describe('Embed Color', () => {
		test('GIVEN an embed with a pre-defined color THEN returns valid toJSON data', () => {
			const embed = new Embed({ color: 0x0 });
			expect(embed.toJSON()).toStrictEqual({ ...emptyEmbed, color: 0x0 });
		});

		test('GIVEN an embed using Embed#setURL THEN returns valid toJSON data', () => {
			const embed = new Embed();
			embed.setColor(0x0);

			expect(embed.toJSON()).toStrictEqual({ ...emptyEmbed, color: 0x0 });
		});

		test('GIVEN an embed with an invalid color THEN throws error', () => {
			const embed = new Embed();

			// @ts-expect-error
			expect(() => embed.setColor('RED')).toThrowError();
		});
	});

	describe('Embed Timestamp', () => {
		const now = new Date();

		test('GIVEN an embed with a pre-defined timestamp THEN returns valid toJSON data', () => {
			const embed = new Embed({ timestamp: now.toISOString() });
			expect(embed.toJSON()).toStrictEqual({ ...emptyEmbed, timestamp: now.toISOString() });
		});

		test('given an embed using Embed#setTimestamp (with Date) THEN returns valid toJSON data', () => {
			const embed = new Embed();
			embed.setTimestamp(now);

			expect(embed.toJSON()).toStrictEqual({ ...emptyEmbed, timestamp: now.toISOString() });
		});

		test('GIVEN an embed using Embed#setTimestamp (with int) THEN returns valid toJSON data', () => {
			const embed = new Embed();
			embed.setTimestamp(now.getTime());

			expect(embed.toJSON()).toStrictEqual({ ...emptyEmbed, timestamp: now.toISOString() });
		});

		test('GIVEN an embed using Embed#setTimestamp (default) THEN returns valid toJSON data', () => {
			const embed = new Embed();
			embed.setTimestamp();

			expect(embed.toJSON()).toStrictEqual({ ...emptyEmbed, timestamp: embed.timestamp });
		});
	});

	describe('Embed Thumbnail', () => {
		test('GIVEN an embed with a pre-defined thumbnail THEN returns valid toJSON data', () => {
			const embed = new Embed({ thumbnail: { url: 'https://discord.js.org/static/logo.svg' } });
			expect(embed.toJSON()).toStrictEqual({
				...emptyEmbed,
				thumbnail: { url: 'https://discord.js.org/static/logo.svg' },
			});
		});

		test('GIVEN an embed using Embed#setThumbnail THEN returns valid toJSON data', () => {
			const embed = new Embed();
			embed.setThumbnail('https://discord.js.org/static/logo.svg');

			expect(embed.toJSON()).toStrictEqual({
				...emptyEmbed,
				thumbnail: { url: 'https://discord.js.org/static/logo.svg' },
			});
		});

		test('GIVEN an embed with an invalid thumbnail THEN throws error', () => {
			const embed = new Embed();

			expect(() => embed.setThumbnail('owo')).toThrowError();
		});
	});

	describe('Embed Image', () => {
		test('GIVEN an embed with a pre-defined image THEN returns valid toJSON data', () => {
			const embed = new Embed({ image: { url: 'https://discord.js.org/static/logo.svg' } });
			expect(embed.toJSON()).toStrictEqual({
				...emptyEmbed,
				image: { url: 'https://discord.js.org/static/logo.svg' },
			});
		});

		test('GIVEN an embed using Embed#setImage THEN returns valid toJSON data', () => {
			const embed = new Embed();
			embed.setImage('https://discord.js.org/static/logo.svg');

			expect(embed.toJSON()).toStrictEqual({
				...emptyEmbed,
				image: { url: 'https://discord.js.org/static/logo.svg' },
			});
		});

		test('GIVEN an embed with an invalid image THEN throws error', () => {
			const embed = new Embed();

			expect(() => embed.setImage('owo')).toThrowError();
		});
	});

	describe('Embed Author', () => {
		test('GIVEN an embed with a pre-defined author THEN returns valid toJSON data', () => {
			const embed = new Embed({
				author: { name: 'Wumpus', icon_url: 'https://discord.js.org/static/logo.svg', url: 'https://discord.js.org' },
			});
			expect(embed.toJSON()).toStrictEqual({
				...emptyEmbed,
				author: { name: 'Wumpus', icon_url: 'https://discord.js.org/static/logo.svg', url: 'https://discord.js.org' },
			});
		});

		test('GIVEN an embed using Embed#setAuthor THEN returns valid toJSON data', () => {
			const embed = new Embed();
			embed.setAuthor('Wumpus', { iconURL: 'https://discord.js.org/static/logo.svg', url: 'https://discord.js.org' });

			expect(embed.toJSON()).toStrictEqual({
				...emptyEmbed,
				author: { name: 'Wumpus', icon_url: 'https://discord.js.org/static/logo.svg', url: 'https://discord.js.org' },
			});
		});

		test('GIVEN an embed with an invalid author name THEN throws error', () => {
			const embed = new Embed();

			expect(() => embed.setAuthor('a'.repeat(257))).toThrowError();
		});
	});

	describe('Embed Footer', () => {
		test('GIVEN an embed with a pre-defined footer THEN returns valid toJSON data', () => {
			const embed = new Embed({
				footer: { text: 'Wumpus', icon_url: 'https://discord.js.org/static/logo.svg' },
			});
			expect(embed.toJSON()).toStrictEqual({
				...emptyEmbed,
				footer: { text: 'Wumpus', icon_url: 'https://discord.js.org/static/logo.svg' },
			});
		});

		test('GIVEN an embed using Embed#setAuthor THEN returns valid toJSON data', () => {
			const embed = new Embed();
			embed.setFooter('Wumpus', 'https://discord.js.org/static/logo.svg');

			expect(embed.toJSON()).toStrictEqual({
				...emptyEmbed,
				footer: { text: 'Wumpus', icon_url: 'https://discord.js.org/static/logo.svg' },
			});
		});

		test('GIVEN an embed with invalid footer text THEN throws error', () => {
			const embed = new Embed();

			expect(() => embed.setFooter('a'.repeat(2049))).toThrowError();
		});
	});

	describe('Embed Fields', () => {
		test('GIVEN an embed with a pre-defined field THEN returns valid toJSON data', () => {
			const embed = new Embed({
				fields: [{ name: 'foo', value: 'bar', inline: false }],
			});
			expect(embed.toJSON()).toStrictEqual({
				...emptyEmbed,
				fields: [{ name: 'foo', value: 'bar', inline: false }],
			});
		});

		test('GIVEN an embed using Embed#addField THEN returns valid toJSON data', () => {
			const embed = new Embed();
			embed.addField('foo', 'bar');

			expect(embed.toJSON()).toStrictEqual({
				...emptyEmbed,
				fields: [{ name: 'foo', value: 'bar', inline: false }],
			});
		});

		test('GIVEN an embed using Embed#addFields THEN returns valid toJSON data', () => {
			const embed = new Embed();
			embed.addFields({ name: 'foo', value: 'bar' });

			expect(embed.toJSON()).toStrictEqual({
				...emptyEmbed,
				fields: [{ name: 'foo', value: 'bar', inline: false }],
			});
		});

		test('GIVEN an embed using Embed#spliceFields THEN returns valid toJSON data', () => {
			const embed = new Embed();
			embed.addFields({ name: 'foo', value: 'bar' }, { name: 'foo', value: 'baz' });

			expect(embed.spliceFields(0, 1).toJSON()).toStrictEqual({
				...emptyEmbed,
				fields: [{ name: 'foo', value: 'baz', inline: false }],
			});
		});

		describe('GIVEN invalid field amount THEN throws error', () => {
			test('', () => {
				const embed = new Embed();

				expect(() =>
					embed.addFields(...Array.from({ length: 26 }, () => ({ name: 'foo', value: 'bar' }))),
				).toThrowError();
			});
		});

		describe('GIVEN invalid field name THEN throws error', () => {
			test('', () => {
				const embed = new Embed();

				expect(() => embed.addFields({ name: '', value: 'bar' })).toThrowError();
			});
		});

		describe('GIVEN invalid field name length THEN throws error', () => {
			test('', () => {
				const embed = new Embed();

				expect(() => embed.addFields({ name: 'a'.repeat(257), value: 'bar' })).toThrowError();
			});
		});

		describe('GIVEN invalid field value length THEN throws error', () => {
			test('', () => {
				const embed = new Embed();

				expect(() => embed.addFields({ name: '', value: 'a'.repeat(1025) })).toThrowError();
			});
		});
	});
});
