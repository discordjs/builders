import { assertReturnOfBuilder, validateMaxOptionsLength } from '../Assertions';
import type { SlashCommandOptionBase } from './CommandOptionBase';
import { SlashCommandBooleanOption } from '../options/boolean';
import { SlashCommandChannelOption } from '../options/channel';
import { SlashCommandIntegerOption } from '../options/integer';
import { SlashCommandMentionableOption } from '../options/mentionable';
import { SlashCommandNumberOption } from '../options/number';
import { SlashCommandRoleOption } from '../options/role';
import { SlashCommandStringOption } from '../options/string';
import { SlashCommandUserOption } from '../options/user';
import type { ToAPIApplicationCommandOptions } from '../SlashCommandBuilder';

export class SharedSlashCommandOptions<ShouldOmitSubcommandFunctions = true> {
	public readonly options!: ToAPIApplicationCommandOptions[];

	/**
	 * Adds a boolean option
	 *
	 * @param input A function that returns an option builder, or an already built builder
	 */
	public addBooleanOption(
		input: SlashCommandBooleanOption | ((builder: SlashCommandBooleanOption) => SlashCommandBooleanOption),
	) {
		return this._sharedAddOptionMethod(input, SlashCommandBooleanOption);
	}

	/**
	 * Adds a user option
	 *
	 * @param input A function that returns an option builder, or an already built builder
	 */
	public addUserOption(input: SlashCommandUserOption | ((builder: SlashCommandUserOption) => SlashCommandUserOption)) {
		return this._sharedAddOptionMethod(input, SlashCommandUserOption);
	}

	/**
	 * Adds a channel option
	 *
	 * @param input A function that returns an option builder, or an already built builder
	 */
	public addChannelOption(
		input: SlashCommandChannelOption | ((builder: SlashCommandChannelOption) => SlashCommandChannelOption),
	) {
		return this._sharedAddOptionMethod(input, SlashCommandChannelOption);
	}

	/**
	 * Adds a role option
	 *
	 * @param input A function that returns an option builder, or an already built builder
	 */
	public addRoleOption(input: SlashCommandRoleOption | ((builder: SlashCommandRoleOption) => SlashCommandRoleOption)) {
		return this._sharedAddOptionMethod(input, SlashCommandRoleOption);
	}

	/**
	 * Adds a mentionable option
	 *
	 * @param input A function that returns an option builder, or an already built builder
	 */
	public addMentionableOption(
		input: SlashCommandMentionableOption | ((builder: SlashCommandMentionableOption) => SlashCommandMentionableOption),
	) {
		return this._sharedAddOptionMethod(input, SlashCommandMentionableOption);
	}

	/**
	 * Adds a string option
	 *
	 * @param input A function that returns an option builder, or an already built builder
	 */
	public addStringOption(
		input:
			| SlashCommandStringOption
			| Omit<SlashCommandStringOption, 'setAutocomplete'>
			| Omit<SlashCommandStringOption, 'addChoice' | 'addChoices'>
			| ((
					builder: SlashCommandStringOption,
			  ) =>
					| SlashCommandStringOption
					| Omit<SlashCommandStringOption, 'setAutocomplete'>
					| Omit<SlashCommandStringOption, 'addChoice' | 'addChoices'>),
	) {
		return this._sharedAddOptionMethod(input, SlashCommandStringOption);
	}

	/**
	 * Adds an integer option
	 *
	 * @param input A function that returns an option builder, or an already built builder
	 */
	public addIntegerOption(
		input:
			| SlashCommandIntegerOption
			| Omit<SlashCommandIntegerOption, 'setAutocomplete'>
			| Omit<SlashCommandIntegerOption, 'addChoice' | 'addChoices'>
			| ((
					builder: SlashCommandIntegerOption,
			  ) =>
					| SlashCommandIntegerOption
					| Omit<SlashCommandIntegerOption, 'setAutocomplete'>
					| Omit<SlashCommandIntegerOption, 'addChoice' | 'addChoices'>),
	) {
		return this._sharedAddOptionMethod(input, SlashCommandIntegerOption);
	}

	/**
	 * Adds a number option
	 *
	 * @param input A function that returns an option builder, or an already built builder
	 */
	public addNumberOption(
		input:
			| SlashCommandNumberOption
			| Omit<SlashCommandNumberOption, 'setAutocomplete'>
			| Omit<SlashCommandNumberOption, 'addChoice' | 'addChoices'>
			| ((
					builder: SlashCommandNumberOption,
			  ) =>
					| SlashCommandNumberOption
					| Omit<SlashCommandNumberOption, 'setAutocomplete'>
					| Omit<SlashCommandNumberOption, 'addChoice' | 'addChoices'>),
	) {
		return this._sharedAddOptionMethod(input, SlashCommandNumberOption);
	}

	private _sharedAddOptionMethod<T extends SlashCommandOptionBase>(
		input:
			| T
			| Omit<T, 'setAutocomplete'>
			| Omit<T, 'addChoice' | 'addChoices'>
			| ((builder: T) => T | Omit<T, 'setAutocomplete'> | Omit<T, 'addChoice' | 'addChoices'>),
		Instance: new () => T,
	): ShouldOmitSubcommandFunctions extends true ? Omit<this, 'addSubcommand' | 'addSubcommandGroup'> : this {
		const { options } = this;

		// First, assert options conditions - we cannot have more than 25 options
		validateMaxOptionsLength(options);

		// Get the final result
		const result = typeof input === 'function' ? input(new Instance()) : input;

		assertReturnOfBuilder(result, Instance);

		// Push it
		options.push(result);

		return this;
	}
}
