import {
	APIApplicationCommandBooleanOption,
	APIApplicationCommandChannelOption,
	APIApplicationCommandIntegerOption,
	APIApplicationCommandMentionableOption,
	APIApplicationCommandNumberOption,
	APIApplicationCommandRoleOption,
	APIApplicationCommandStringOption,
	APIApplicationCommandUserOption,
	ApplicationCommandOptionType,
	ChannelType,
} from 'discord-api-types/v9';
import {
	SlashCommandBooleanOption,
	SlashCommandChannelOption,
	SlashCommandIntegerOption,
	SlashCommandMentionableOption,
	SlashCommandNumberOption,
	SlashCommandRoleOption,
	SlashCommandStringOption,
	SlashCommandUserOption,
} from '../../../src/index';

const getBooleanOption = () =>
	new SlashCommandBooleanOption().setName('owo').setDescription('Testing 123').setRequired(true);

const getChannelOption = () =>
	new SlashCommandChannelOption()
		.setName('owo')
		.setDescription('Testing 123')
		.setRequired(true)
		.addChannelType(ChannelType.GuildText);

const getStringOption = () =>
	new SlashCommandStringOption().setName('owo').setDescription('Testing 123').setRequired(true);

const getIntegerOption = () =>
	new SlashCommandIntegerOption().setName('owo').setDescription('Testing 123').setRequired(true);

const getNumberOption = () =>
	new SlashCommandNumberOption().setName('owo').setDescription('Testing 123').setRequired(true);

const getUserOption = () => new SlashCommandUserOption().setName('owo').setDescription('Testing 123').setRequired(true);

const getRoleOption = () => new SlashCommandRoleOption().setName('owo').setDescription('Testing 123').setRequired(true);

const getMentionableOption = () =>
	new SlashCommandMentionableOption().setName('owo').setDescription('Testing 123').setRequired(true);

describe('Application Command toJSON() results', () => {
	test('GIVEN a boolean option THEN calling toJSON should return a valid JSON', () => {
		expect(getBooleanOption().toJSON()).toEqual<APIApplicationCommandBooleanOption>({
			name: 'owo',
			description: 'Testing 123',
			type: ApplicationCommandOptionType.Boolean,
			required: true,
		});
	});

	test('GIVEN a channel option THEN calling toJSON should return a valid JSON', () => {
		expect(getChannelOption().toJSON()).toEqual<APIApplicationCommandChannelOption>({
			name: 'owo',
			description: 'Testing 123',
			type: ApplicationCommandOptionType.Channel,
			required: true,
			channel_types: [ChannelType.GuildText],
		});
	});

	test('GIVEN a integer option THEN calling toJSON should return a valid JSON', () => {
		expect(getIntegerOption().toJSON()).toEqual<APIApplicationCommandIntegerOption>({
			name: 'owo',
			description: 'Testing 123',
			type: ApplicationCommandOptionType.Integer,
			required: true,
		});

		expect(
			getIntegerOption().setAutocomplete(true).setChoices([]).toJSON(),
		).toEqual<APIApplicationCommandIntegerOption>({
			name: 'owo',
			description: 'Testing 123',
			type: ApplicationCommandOptionType.Integer,
			required: true,
			autocomplete: true,
			// @ts-expect-error TODO: you *can* send an empty array with autocomplete: true, should correct that in types
			choices: [],
		});

		expect(getIntegerOption().addChoice('uwu', 1).toJSON()).toEqual<APIApplicationCommandIntegerOption>({
			name: 'owo',
			description: 'Testing 123',
			type: ApplicationCommandOptionType.Integer,
			required: true,
			choices: [{ name: 'uwu', value: 1 }],
		});
	});

	test('GIVEN a mentionable option THEN calling toJSON should return a valid JSON', () => {
		expect(getMentionableOption().toJSON()).toEqual<APIApplicationCommandMentionableOption>({
			name: 'owo',
			description: 'Testing 123',
			type: ApplicationCommandOptionType.Mentionable,
			required: true,
		});
	});

	test('GIVEN a number option THEN calling toJSON should return a valid JSON', () => {
		expect(getNumberOption().toJSON()).toEqual<APIApplicationCommandNumberOption>({
			name: 'owo',
			description: 'Testing 123',
			type: ApplicationCommandOptionType.Number,
			required: true,
		});

		expect(getNumberOption().setAutocomplete(true).setChoices([]).toJSON()).toEqual<APIApplicationCommandNumberOption>({
			name: 'owo',
			description: 'Testing 123',
			type: ApplicationCommandOptionType.Number,
			required: true,
			autocomplete: true,
			// @ts-expect-error TODO: you *can* send an empty array with autocomplete: true, should correct that in types
			choices: [],
		});

		expect(getNumberOption().addChoice('uwu', 1).toJSON()).toEqual<APIApplicationCommandNumberOption>({
			name: 'owo',
			description: 'Testing 123',
			type: ApplicationCommandOptionType.Number,
			required: true,
			choices: [{ name: 'uwu', value: 1 }],
		});
	});

	test('GIVEN a role option THEN calling toJSON should return a valid JSON', () => {
		expect(getRoleOption().toJSON()).toEqual<APIApplicationCommandRoleOption>({
			name: 'owo',
			description: 'Testing 123',
			type: ApplicationCommandOptionType.Role,
			required: true,
		});
	});

	test('GIVEN a string option THEN calling toJSON should return a valid JSON', () => {
		expect(getStringOption().toJSON()).toEqual<APIApplicationCommandStringOption>({
			name: 'owo',
			description: 'Testing 123',
			type: ApplicationCommandOptionType.String,
			required: true,
		});

		expect(getStringOption().setAutocomplete(true).setChoices([]).toJSON()).toEqual<APIApplicationCommandStringOption>({
			name: 'owo',
			description: 'Testing 123',
			type: ApplicationCommandOptionType.String,
			required: true,
			autocomplete: true,
			// @ts-expect-error TODO: you *can* send an empty array with autocomplete: true, should correct that in types
			choices: [],
		});

		expect(getStringOption().addChoice('uwu', '1').toJSON()).toEqual<APIApplicationCommandStringOption>({
			name: 'owo',
			description: 'Testing 123',
			type: ApplicationCommandOptionType.String,
			required: true,
			choices: [{ name: 'uwu', value: '1' }],
		});
	});

	test('GIVEN a user option THEN calling toJSON should return a valid JSON', () => {
		expect(getUserOption().toJSON()).toEqual<APIApplicationCommandUserOption>({
			name: 'owo',
			description: 'Testing 123',
			type: ApplicationCommandOptionType.User,
			required: true,
		});
	});
});
