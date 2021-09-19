import type { ChannelType } from 'discord-api-types/v9';
import ow from 'ow';
import type { ToAPIApplicationCommandOptions } from '../../..';
import { SlashCommandOptionBase } from './CommandOptionBase';

// Only allow valid channel types to be used. (This can't be dynamic because const enums are erased at runtime)
const maxChannelType = 13;
const channelTypePredicate = ow.number.greaterThanOrEqual(0).lessThanOrEqual(maxChannelType);

export abstract class ApplicationCommandOptionWithChannelTypesBase
	extends SlashCommandOptionBase
	implements ToAPIApplicationCommandOptions
{
	public channelTypes?: ChannelType[];

	/**
	 * Adds a channel type to this option
	 * @param channelType The type of channel to allow
	 */
	public addChannelType(channelType: ChannelType) {
		this.channelTypes ??= [];

		ow(channelType, `channel type`, channelTypePredicate);
		this.channelTypes.push(channelType);

		return this;
	}

	/**
	 * Adds channel types to this option
	 * @param channelTypes The channel types to add
	 */
	public addChannelTypes(channelTypes: ChannelType[]) {
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
