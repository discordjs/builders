import { APIApplicationCommandSubCommandOptions, ApplicationCommandOptionType } from 'discord-api-types/v9';
import type {
	ApplicationCommandChoicesData,
	ApplicationCommandNonOptionsData,
	ApplicationCommandSubCommandData,
	ApplicationCommandSubGroupData,
} from 'discord.js';
import { mix } from 'ts-mixer';
import { assertReturnOfBuilder, validateMaxOptionsLength, validateRequiredParameters } from './Assertions';
import { SharedSlashCommandOptions } from './mixins/CommandOptions';
import { SharedNameAndDescription } from './mixins/NameAndDescription';
import type { ToAPIApplicationCommandOptions } from './SlashCommandBuilder';

/**
 * Represents a folder for subcommands
 *
 * For more information, go to https://discord.com/developers/docs/interactions/slash-commands#subcommands-and-subcommand-groups
 */
@mix(SharedNameAndDescription)
export class SlashCommandSubcommandGroupBuilder implements ToAPIApplicationCommandOptions {
	/**
	 * The name of this subcommand group
	 */
	public readonly name: string = undefined!;

	/**
	 * The description of this subcommand group
	 */
	public readonly description: string = undefined!;

	/**
	 * The subcommands part of this subcommand group
	 */
	public readonly options: ToAPIApplicationCommandOptions[] = [];

	/**
	 * Adds a new subcommand to this group
	 * @param input A function that returns a subcommand builder, or an already built builder
	 */
	public addSubcommand(
		input:
			| SlashCommandSubcommandBuilder
			| ((subcommandGroup: SlashCommandSubcommandBuilder) => SlashCommandSubcommandBuilder),
	) {
		const { options } = this;

		// First, assert options conditions - we cannot have more than 25 options
		validateMaxOptionsLength(options);

		// Get the final result
		const result = typeof input === 'function' ? input(new SlashCommandSubcommandBuilder()) : input;

		assertReturnOfBuilder(result, SlashCommandSubcommandBuilder);

		// Push it
		options.push(result);

		return this;
	}

	public toJSON(): APIApplicationCommandSubCommandOptions {
		validateRequiredParameters(this.name, this.description, this.options);
		return {
			type: ApplicationCommandOptionType.SubcommandGroup,
			name: this.name,
			description: this.description,
			options: this.options.map((option) => option.toJSON()),
		};
	}

	public toData(): ApplicationCommandSubGroupData {
		return {
			...this.toJSON(),
			type: 2,
			options: this.options.map((option) => option.toData()) as ApplicationCommandSubCommandData[],
		};
	}
}

export interface SlashCommandSubcommandGroupBuilder extends SharedNameAndDescription {}

/**
 * Represents a subcommand
 *
 * For more information, go to https://discord.com/developers/docs/interactions/slash-commands#subcommands-and-subcommand-groups
 */
@mix(SharedNameAndDescription, SharedSlashCommandOptions)
export class SlashCommandSubcommandBuilder implements ToAPIApplicationCommandOptions {
	/**
	 * The name of this subcommand
	 */
	public readonly name: string = undefined!;

	/**
	 * The description of this subcommand
	 */
	public readonly description: string = undefined!;

	/**
	 * The options of this subcommand
	 */
	public readonly options: ToAPIApplicationCommandOptions[] = [];

	public toJSON(): APIApplicationCommandSubCommandOptions {
		validateRequiredParameters(this.name, this.description, this.options);
		return {
			type: ApplicationCommandOptionType.Subcommand,
			name: this.name,
			description: this.description,
			options: this.options.map((option) => option.toJSON()),
		};
	}

	public toData(): ApplicationCommandSubCommandData {
		return {
			...this.toJSON(),
			type: 1,
			options: this.options.map((option) => option.toData()) as (
				| ApplicationCommandNonOptionsData
				| ApplicationCommandChoicesData
			)[],
		};
	}
}

export interface SlashCommandSubcommandBuilder extends SharedNameAndDescription, SharedSlashCommandOptions<false> {}
