import { APIApplicationCommandChannelOptions, ApplicationCommandOptionType, ChannelType } from 'discord-api-types/v9';
import { z, ZodLiteral } from 'zod';
import type { ToAPIApplicationCommandOptions } from '../../..';
import { SlashCommandOptionBase } from './CommandOptionBase';

// Only allow valid channel types to be used. (This can't be dynamic because const enums are erased at runtime)
const allowedChannelTypes = [
	ChannelType.GuildCategory,
	ChannelType.GuildNews,
	ChannelType.GuildNewsThread,
	ChannelType.GuildStore,
	ChannelType.GuildStageVoice,
	ChannelType.GuildText,
	ChannelType.GuildVoice,
	ChannelType.GuildPublicThread,
	ChannelType.GuildPrivateThread,
];

const channelTypePredicate = z.union(
	allowedChannelTypes.map((type) => z.literal(type)) as [
		ZodLiteral<ChannelType>,
		ZodLiteral<ChannelType>,
		...ZodLiteral<ChannelType>[]
	],
);

export abstract class ApplicationCommandOptionWithChannelTypesBase
	extends SlashCommandOptionBase<ApplicationCommandOptionType.Channel>
	implements ToAPIApplicationCommandOptions
{
	public channelTypes?: Exclude<ChannelType, ChannelType.DM | ChannelType.GroupDM>[];

	/**
	 * Adds a channel type to this option
	 *
	 * @param channelType The type of channel to allow
	 */
	public addChannelType(channelType: Exclude<ChannelType, ChannelType.DM | ChannelType.GroupDM>) {
		this.channelTypes ??= [];

		channelTypePredicate.parse(channelType);
		this.channelTypes.push(channelType);

		return this;
	}

	/**
	 * Adds channel types to this option
	 *
	 * @param channelTypes The channel types to add
	 */
	public addChannelTypes(channelTypes: Exclude<ChannelType, ChannelType.DM | ChannelType.GroupDM>[]) {
		channelTypes.forEach((channelType) => this.addChannelType(channelType));
		return this;
	}

	public override toJSON(): APIApplicationCommandChannelOptions {
		return {
			...super.toJSON(),
			type: this.type,
			channel_types: this.channelTypes,
			autocomplete: undefined,
		};
	}
}
