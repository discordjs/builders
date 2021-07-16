import { ApplicationCommandOptionType } from 'discord-api-types/v8';
import { mix } from 'ts-mixer';
import { assertReturnOfBuilder, validateMaxOptionsLength, validateRequiredParameters } from './Assertions';
import { SharedSlashCommandOptions } from './mixins/CommandOptions';
import { SharedNameAndDescription } from './mixins/NameAndDescription';
import type { ToAPIApplicationCommandOptions } from './SlashCommandBuilder';

/**
 * Represents a folder for sub commands
 *
 * For more information, go to https://discord.com/developers/docs/interactions/slash-commands#subcommands-and-subcommand-groups
 */
@mix(SharedNameAndDescription)
export class SlashCommandSubCommandGroupBuilder implements ToAPIApplicationCommandOptions {
	/**
	 * The name of this sub command group
	 */
	public readonly name: string = undefined!;

	/**
	 * The description of this sub command group
	 */
	public readonly description: string = undefined!;

	/**
	 * The sub commands part of this sub command group
	 */
	public readonly options: ToAPIApplicationCommandOptions[] = [];

	/**
	 * Adds a new sub command to this group
	 * @param input A function that returns a sub command builder, or an already built builder
	 */
	public addSubCommand(
		input:
			| SlashCommandSubCommandBuilder
			| ((subCommandGroup: SlashCommandSubCommandBuilder) => SlashCommandSubCommandBuilder),
	) {
		const { options } = this;

		// First, assert options conditions - we cannot have more than 25 options
		validateMaxOptionsLength(options);

		// Get the final result
		const result = typeof input === 'function' ? input(new SlashCommandSubCommandBuilder()) : input;

		assertReturnOfBuilder(result, SlashCommandSubCommandBuilder);

		// Push it
		options.push(result);

		return this;
	}

	public toJSON() {
		validateRequiredParameters(this.name, this.description, this.options);
		return {
			type: ApplicationCommandOptionType.SUB_COMMAND_GROUP,
			name: this.name,
			description: this.description,
			options: this.options.map((option) => option.toJSON()),
		};
	}
}

export interface SlashCommandSubCommandGroupBuilder extends SharedNameAndDescription {}

/**
 * Represents a sub command
 *
 * For more information, go to https://discord.com/developers/docs/interactions/slash-commands#subcommands-and-subcommand-groups
 */
@mix(SharedNameAndDescription, SharedSlashCommandOptions)
export class SlashCommandSubCommandBuilder implements ToAPIApplicationCommandOptions {
	/**
	 * The name of this sub command
	 */
	public readonly name: string = undefined!;

	/**
	 * The description of this sub command
	 */
	public readonly description: string = undefined!;

	/**
	 * The options of this sub command
	 */
	public readonly options: ToAPIApplicationCommandOptions[] = [];

	public toJSON() {
		validateRequiredParameters(this.name, this.description, this.options);
		return {
			type: ApplicationCommandOptionType.SUB_COMMAND,
			name: this.name,
			description: this.description,
			options: this.options.map((option) => option.toJSON()),
		};
	}
}

export interface SlashCommandSubCommandBuilder extends SharedNameAndDescription, SharedSlashCommandOptions<false> {}
