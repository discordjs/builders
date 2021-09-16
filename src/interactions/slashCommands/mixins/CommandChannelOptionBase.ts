import type { ChannelType } from 'discord-api-types';
import ow from 'ow';
import type { ToAPIApplicationCommandOptions } from '../../..';
import { SlashCommandOptionBase } from './CommandOptionBase';

const channelTypePredicate = ow.number.greaterThanOrEqual(0).lessThanOrEqual(13);

export abstract class ApplicationCommandOptionWithChannelTypesBase
	extends SlashCommandOptionBase
	implements ToAPIApplicationCommandOptions
{
	public channelTypes?: ChannelType[];

	public addChannelType(channelType: ChannelType) {
		this.channelTypes ??= [];

		ow(channelType, `channel type`, channelTypePredicate);
		this.channelTypes.push(channelType);
		return this;
	}

	public addChannelTypes(newChannelTypes: ChannelType[]) {
		newChannelTypes.forEach((channelType) => this.addChannelType(channelType));
		return this;
	}

	public override toJSON() {
		return {
			...super.toJSON(),
			channel_types: this.channelTypes,
		};
	}
}
