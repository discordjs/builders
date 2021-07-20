import { Embed } from '../../src';
import type { APIEmbed } from 'discord-api-types/v9';

const emptyEmbed: APIEmbed = {
	fields: [],
};

describe('Message embed', () => {
	describe('Embed getters', () => {
		test('Embed#length', () => {
			const alpha = 'abcdefghijklmnopqrstuvwxyz';
			const embed = new Embed({
				title: alpha,
				description: alpha,
				fields: [{ name: alpha, value: alpha }],
				footer: { text: alpha },
			});

			expect(embed.length).toBe(alpha.length * 5);
		});
	});

	describe('Embed title', () => {
		test('Create an embed with a pre-defined title', () => {
			const embed = new Embed({ title: 'foo' });
			expect(JSON.parse(JSON.stringify(embed.toJSON()))).toStrictEqual({ ...emptyEmbed, title: 'foo' });
		});

		test('Use Embed#setTitle', () => {
			const embed = new Embed();
			embed.setTitle('foo');

			expect(JSON.parse(JSON.stringify(embed.toJSON()))).toStrictEqual({ ...emptyEmbed, title: 'foo' });
		});
	});

	describe('Embed description', () => {
		test('Create an embed with a pre-defined description', () => {
			const embed = new Embed({ ...emptyEmbed, description: 'foo' });
			expect(JSON.parse(JSON.stringify(embed.toJSON()))).toStrictEqual({ ...emptyEmbed, description: 'foo' });
		});

		test('Use Embed#setDescription', () => {
			const embed = new Embed();
			embed.setDescription('foo');

			expect(JSON.parse(JSON.stringify(embed.toJSON()))).toStrictEqual({ ...emptyEmbed, description: 'foo' });
		});
	});

	describe('Embed URL', () => {
		test('Create an embed with a pre-defined url', () => {
			const embed = new Embed({ url: 'https://discord.js.org/' });
			expect(JSON.parse(JSON.stringify(embed.toJSON()))).toStrictEqual({
				...emptyEmbed,
				url: 'https://discord.js.org/',
			});
		});

		test('Use Embed#setURL', () => {
			const embed = new Embed();
			embed.setURL('https://discord.js.org/');

			expect(JSON.parse(JSON.stringify(embed.toJSON()))).toStrictEqual({
				...emptyEmbed,
				url: 'https://discord.js.org/',
			});
		});
	});

	describe('Embed Color', () => {
		test('Create an embed with a pre-defined color', () => {
			const embed = new Embed({ color: 0x0 });
			expect(JSON.parse(JSON.stringify(embed.toJSON()))).toStrictEqual({ ...emptyEmbed, color: 0x0 });
		});

		test('Use Embed#setURL', () => {
			const embed = new Embed();
			embed.setColor(0x0);

			expect(JSON.parse(JSON.stringify(embed.toJSON()))).toStrictEqual({ ...emptyEmbed, color: 0x0 });
		});
	});

	describe('Embed Timestamp', () => {
		const now = new Date();

		test('Create an embed with a pre-defined timestamp', () => {
			const embed = new Embed({ timestamp: now.toISOString() });
			expect(JSON.parse(JSON.stringify(embed.toJSON()))).toStrictEqual({ ...emptyEmbed, timestamp: now.toISOString() });
		});

		test('Use Embed#setTimestamp (with Date)', () => {
			const embed = new Embed();
			embed.setTimestamp(now);

			expect(JSON.parse(JSON.stringify(embed.toJSON()))).toStrictEqual({ ...emptyEmbed, timestamp: now.toISOString() });
		});

		test('Use Embed#setTimestamp (with int)', () => {
			const embed = new Embed();
			embed.setTimestamp(now.getTime());

			expect(JSON.parse(JSON.stringify(embed.toJSON()))).toStrictEqual({ ...emptyEmbed, timestamp: now.toISOString() });
		});
	});

	describe('Embed Thumbnail', () => {
		test('Create an embed with a pre-defined thumbnail', () => {
			const embed = new Embed({ thumbnail: { url: 'https://discord.js.org/static/logo.svg' } });
			expect(JSON.parse(JSON.stringify(embed.toJSON()))).toStrictEqual({
				...emptyEmbed,
				thumbnail: { url: 'https://discord.js.org/static/logo.svg' },
			});
		});

		test('Use Embed#setThumbnail', () => {
			const embed = new Embed();
			embed.setThumbnail('https://discord.js.org/static/logo.svg');

			expect(JSON.parse(JSON.stringify(embed.toJSON()))).toStrictEqual({
				...emptyEmbed,
				thumbnail: { url: 'https://discord.js.org/static/logo.svg' },
			});
		});
	});

	describe('Embed Image', () => {
		test('Create an embed with a pre-defined image', () => {
			const embed = new Embed({ image: { url: 'https://discord.js.org/static/logo.svg' } });
			expect(JSON.parse(JSON.stringify(embed.toJSON()))).toStrictEqual({
				...emptyEmbed,
				image: { url: 'https://discord.js.org/static/logo.svg' },
			});
		});

		test('Use Embed#setImage', () => {
			const embed = new Embed();
			embed.setImage('https://discord.js.org/static/logo.svg');

			expect(JSON.parse(JSON.stringify(embed.toJSON()))).toStrictEqual({
				...emptyEmbed,
				image: { url: 'https://discord.js.org/static/logo.svg' },
			});
		});
	});

	describe('Embed Author', () => {
		test('Create an embed with a pre-defined author', () => {
			const embed = new Embed({
				author: { name: 'Wumpus', icon_url: 'https://discord.js.org/static/logo.svg', url: 'https://discord.js.org' },
			});
			expect(JSON.parse(JSON.stringify(embed.toJSON()))).toStrictEqual({
				...emptyEmbed,
				author: { name: 'Wumpus', icon_url: 'https://discord.js.org/static/logo.svg', url: 'https://discord.js.org' },
			});
		});

		test('Use Embed#setAuthor', () => {
			const embed = new Embed();
			embed.setAuthor('Wumpus', { iconURL: 'https://discord.js.org/static/logo.svg', url: 'https://discord.js.org' });

			expect(JSON.parse(JSON.stringify(embed.toJSON()))).toStrictEqual({
				...emptyEmbed,
				author: { name: 'Wumpus', icon_url: 'https://discord.js.org/static/logo.svg', url: 'https://discord.js.org' },
			});
		});
	});

	describe('Embed Footer', () => {
		test('Create an embed with a pre-defined footer', () => {
			const embed = new Embed({
				footer: { text: 'Wumpus', icon_url: 'https://discord.js.org/static/logo.svg' },
			});
			expect(JSON.parse(JSON.stringify(embed.toJSON()))).toStrictEqual({
				...emptyEmbed,
				footer: { text: 'Wumpus', icon_url: 'https://discord.js.org/static/logo.svg' },
			});
		});

		test('Use Embed#setAuthor', () => {
			const embed = new Embed();
			embed.setFooter('Wumpus', 'https://discord.js.org/static/logo.svg');

			expect(JSON.parse(JSON.stringify(embed.toJSON()))).toStrictEqual({
				...emptyEmbed,
				footer: { text: 'Wumpus', icon_url: 'https://discord.js.org/static/logo.svg' },
			});
		});
	});

	describe('Embed Fields', () => {
		test('Create an embed with a pre-defined field', () => {
			const embed = new Embed({
				fields: [{ name: 'foo', value: 'bar', inline: false }],
			});
			expect(JSON.parse(JSON.stringify(embed.toJSON()))).toStrictEqual({
				fields: [{ name: 'foo', value: 'bar', inline: false }],
			});
		});

		test('Use Embed#addField', () => {
			const embed = new Embed();
			embed.addField('foo', 'bar');

			expect(JSON.parse(JSON.stringify(embed.toJSON()))).toStrictEqual({
				fields: [{ name: 'foo', value: 'bar', inline: false }],
			});
		});

		test('Use Embed#addFields', () => {
			const embed = new Embed();
			embed.addFields({ name: 'foo', value: 'bar' });

			expect(JSON.parse(JSON.stringify(embed.toJSON()))).toStrictEqual({
				fields: [{ name: 'foo', value: 'bar', inline: false }],
			});
		});

		test('Use Embed#spliceFields', () => {
			const embed = new Embed();
			embed.addFields({ name: 'foo', value: 'bar' }, { name: 'foo', value: 'baz' });

			expect(JSON.parse(JSON.stringify(embed.spliceFields(0, 1).toJSON()))).toStrictEqual({
				fields: [{ name: 'foo', value: 'baz', inline: false }],
			});
		});
	});
});
