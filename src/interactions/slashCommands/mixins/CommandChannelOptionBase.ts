import type { ChannelType } from 'discord-api-types';
import ow from 'ow';
import type { ToAPIApplicationCommandOptions } from '../../..';
import { SlashCommandOptionBase } from './CommandOptionBase';

const channelTypePredicate = ow.number.greaterThanOrEqual(1).lessThanOrEqual(13);
export abstract class ApplicationCommandOptionWithChannelTypesBase
	extends SlashCommandOptionBase
	implements ToAPIApplicationCommandOptions
{
	public channelTypes?: ChannelType[];

	public addChannelType(channelType: ChannelType) {
		ow(channelType, `channel choice name`, channelTypePredicate);
		this.channelTypes?.push(channelType);
	}

	public setChannelTypes(newChannelTypes: ChannelType[]) {
		newChannelTypes.forEach(this.addChannelType);
	}

	public override toJSON() {
		return {
			...super.toJSON(),
			channel_types: this.channelTypes,
		};
	}
}
