import type { ChannelType } from 'discord-api-types/v9';
import ow from 'ow';
import type { ToAPIApplicationCommandOptions } from '../../..';
import { SlashCommandOptionBase } from './CommandOptionBase';

// Only allow valid channel types to be used. (This can't be dynamic because const enums are erased at runtime)
const maxChannelType = 13;
const DMChannels = [1, 3];
const channelTypePredicate = ow.number.greaterThanOrEqual(0).lessThanOrEqual(maxChannelType).not.oneOf(DMChannels);

export abstract class ApplicationCommandOptionWithChannelTypesBase
	extends SlashCommandOptionBase
	implements ToAPIApplicationCommandOptions
{
	public channelTypes?: ChannelType[];

	/**
	 * Adds a channel type to this option
	 * @param channelType The type of channel to allow
	 */
	public addChannelType(channelType: Exclude<ChannelType, ChannelType.DM | ChannelType.GroupDM>) {
		this.channelTypes ??= [];

		ow(channelType, `channel type`, channelTypePredicate);
		this.channelTypes.push(channelType);

		return this;
	}

	/**
	 * Adds channel types to this option
	 * @param channelTypes The channel types to add
	 */
	public addChannelTypes(channelTypes: Exclude<ChannelType, ChannelType.DM | ChannelType.GroupDM>[]) {
		channelTypes.forEach((channelType) => this.addChannelType(channelType));
		return this;
	}

	public override toJSON() {
		return {
			...super.toJSON(),
			channel_types: this.channelTypes,
		};
	}
}
