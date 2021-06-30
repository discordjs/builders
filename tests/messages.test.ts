import {
	blockQuote,
	bold,
	codeBlock,
	inlineCode,
	italic,
	quote,
	strikethrough,
	time,
	TimestampStyles,
	underscore,
} from '../src';

describe('Messages', () => {
	describe('codeBlock', () => {
		test('GIVEN "discord.js" with no language THEN returns "```\\ndiscord.js```"', () => {
			expect<'```\ndiscord.js```'>(codeBlock('discord.js')).toBe('```\ndiscord.js```');
		});

		test('GIVEN "discord.js" with "js" as language THEN returns "```js\\ndiscord.js```"', () => {
			expect<'```js\ndiscord.js```'>(codeBlock('js', 'discord.js')).toBe('```js\ndiscord.js```');
		});
	});

	describe('inlineCode', () => {
		test('GIVEN "discord.js" THEN returns "`discord.js`"', () => {
			expect<'`discord.js`'>(inlineCode('discord.js')).toBe('`discord.js`');
		});
	});

	describe('italic', () => {
		test('GIVEN "discord.js" THEN returns "_discord.js_"', () => {
			expect<'_discord.js_'>(italic('discord.js')).toBe('_discord.js_');
		});
	});

	describe('bold', () => {
		test('GIVEN "discord.js" THEN returns "**discord.js**"', () => {
			expect<'**discord.js**'>(bold('discord.js')).toBe('**discord.js**');
		});
	});

	describe('underscore', () => {
		test('GIVEN "discord.js" THEN returns "__discord.js__"', () => {
			expect<'__discord.js__'>(underscore('discord.js')).toBe('__discord.js__');
		});
	});

	describe('strikethrough', () => {
		test('GIVEN "discord.js" THEN returns "~~discord.js~~"', () => {
			expect<'~~discord.js~~'>(strikethrough('discord.js')).toBe('~~discord.js~~');
		});
	});

	describe('quote', () => {
		test('GIVEN "discord.js" THEN returns "> discord.js"', () => {
			expect<'> discord.js'>(quote('discord.js')).toBe('> discord.js');
		});
	});

	describe('blockQuote', () => {
		test('GIVEN "discord.js" THEN returns ">>> discord.js"', () => {
			expect<'>>> discord.js'>(blockQuote('discord.js')).toBe('>>> discord.js');
		});
	});

	describe('time', () => {
		test('GIVEN no arguments THEN returns "<t:${bigint}>"', () => {
			jest.useFakeTimers('modern');
			jest.setSystemTime(1566424897579);

			expect<`<t:${bigint}>`>(time()).toBe('<t:1566424897>');

			jest.useRealTimers();
		});

		test('GIVEN a date THEN returns "<t:${bigint}>"', () => {
			expect<`<t:${bigint}>`>(time(new Date(1867424897579))).toBe('<t:1867424897>');
		});

		test('GIVEN a date and a style from string THEN returns "<t:${bigint}:${style}>"', () => {
			expect<`<t:${bigint}:d>`>(time(new Date(1867424897579), 'd')).toBe('<t:1867424897:d>');
		});

		test('GIVEN a date and a format from enum THEN returns "<t:${bigint}:${style}>"', () => {
			expect<`<t:${bigint}:R>`>(time(new Date(1867424897579), TimestampStyles.RelativeTime)).toBe('<t:1867424897:R>');
		});

		test('GIVEN a date THEN returns "<t:${time}>"', () => {
			expect<'<t:1867424897>'>(time(1867424897)).toBe('<t:1867424897>');
		});

		test('GIVEN a date and a style from string THEN returns "<t:${time}:${style}>"', () => {
			expect<'<t:1867424897:d>'>(time(1867424897, 'd')).toBe('<t:1867424897:d>');
		});

		test('GIVEN a date and a format from enum THEN returns "<t:${time}:${style}>"', () => {
			expect<'<t:1867424897:R>'>(time(1867424897, TimestampStyles.RelativeTime)).toBe('<t:1867424897:R>');
		});
	});
});
