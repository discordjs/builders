import type { ChannelType } from 'discord-api-types';
import type { ToAPIApplicationCommandOptions } from '../../..';
import { SlashCommandOptionBase } from './CommandOptionBase';

export abstract class ApplicationCommandOptionWithChannelTypesBase
	extends SlashCommandOptionBase
	implements ToAPIApplicationCommandOptions
{
	public channelTypes?: ChannelType[];

	public addChannelType(channelType: ChannelType) {
		this.channelTypes?.push(channelType);
	}

	public setChannelTypes(newChannelTypes: ChannelType[]) {
		newChannelTypes.forEach(this.addChannelType);
	}
}
