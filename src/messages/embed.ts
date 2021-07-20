import type {
	APIEmbed,
	APIEmbedAuthor,
	APIEmbedField,
	APIEmbedFooter,
	APIEmbedImage,
	APIEmbedProvider,
	APIEmbedThumbnail,
	APIEmbedVideo,
} from 'discord-api-types/v9';

/**
 * Represents an embed in a message (image/video preview, rich embed, etc.)
 */
export class Embed implements APIEmbed {
	/**
	 * An array of Fields of this Embed.
	 */
	public fields: APIEmbedField[] = [];

	/**
	 * The embed title.
	 */
	public title?: string;

	/**
	 * The embed description.
	 */
	public description?: string;

	/**
	 * The embed url.
	 */
	public url?: string;

	/**
	 * The embed color.
	 */
	public color?: number;

	/**
	 * The timestamp of the embed in the ISO format.
	 */
	public timestamp?: string;

	/**
	 * The embed thumbnail data.
	 */
	public thumbnail?: APIEmbedThumbnail;

	/**
	 * The embed image data.
	 * @since 0.0.1
	 */
	public image?: APIEmbedImage;

	/**
	 * Received video data.
	 * @since 0.0.1
	 */
	public video?: APIEmbedVideo;

	/**
	 * The embed author data.
	 * @since 0.0.1
	 */
	public author?: APIEmbedAuthor;

	/**
	 * Received data about the embed provider.
	 * @since 0.0.1
	 */
	public provider?: APIEmbedProvider;

	/**
	 * The embed footer data.
	 */
	public footer?: APIEmbedFooter;

	public constructor(data: APIEmbed = {}) {
		this.title = data.title;
		this.description = data.description;
		this.url = data.url;
		this.color = data.color;
		this.thumbnail = data.thumbnail;
		this.image = data.image;
		this.video = data.video;
		this.author = data.author;
		this.provider = data.provider;
		this.footer = data.footer;

		if (data.timestamp) this.timestamp = new Date(data.timestamp).toISOString();
		if (data.fields) this.fields = data.fields;
	}

	/**
	 * The date displayed on this embed.
	 */
	public get createdAt(): Date | null {
		return this.timestamp ? new Date(this.timestamp) : null;
	}

	/**
	 * The accumulated length for the embed title, description, fields, footer text, and author name
	 */
	public get length(): number {
		return (
			(this.title?.length ?? 0) +
			(this.description?.length ?? 0) +
			(this.fields.length >= 1
				? this.fields.reduce((prev, curr) => prev + curr.name.length + curr.value.length, 0)
				: 0) +
			(this.footer?.text.length ?? 0) +
			(this.author?.name?.length ?? 0)
		);
	}

	/**
	 * Adds a field to the embed (max 25).
	 * @param name The name of this field
	 * @param value The value of this field
	 * @param inline If this field will be displayed inline
	 */
	public addField(name: string, value: string, inline = false): this {
		return this.addFields({ name, value, inline });
	}

	/**
	 * Adds fields to the embed (max 25).
	 * @param fields The fields to add
	 */
	public addFields(...fields: APIEmbedField[]): this {
		this.fields.push(...Embed.normalizeFields(...fields));
		return this;
	}

	/**
	 * Removes, replaces, and inserts fields in the embed (max 25).
	 * @param index The index to start at
	 * @param deleteCount The number of fields to remove
	 * @param fields The replacing field objects
	 */
	public spliceFields(index: number, deleteCount: number, ...fields: APIEmbedField[]): this {
		this.fields.splice(index, deleteCount, ...Embed.normalizeFields(...fields));
		return this;
	}

	/**
	 * Sets the author of this embed.
	 * @param name The name of the author
	 * @param options The URL options of the author
	 * @param options.iconURL The icon URL of the author
	 * @param options.url The URL of the author
	 */
	public setAuthor(name: string, { iconURL, url }: Record<string, string | undefined> = {}): this {
		this.author = { name, icon_url: iconURL, url };
		return this;
	}

	/**
	 * Sets the color of this embed.
	 * @param color The color of the embed
	 */
	public setColor(color: number): this {
		this.color = color;
		return this;
	}

	/**
	 * Sets the description of this embed.
	 * @param description The description
	 */
	public setDescription(description: string): this {
		this.description = description;
		return this;
	}

	/**
	 * Sets the footer of this embed.
	 * @param text The text of the footer
	 * @param iconURL The icon URL of the footer
	 */
	public setFooter(text: string, iconURL: string): this {
		this.footer = { text, icon_url: iconURL };
		return this;
	}

	/**
	 * Sets the image of this embed.
	 * @param url The URL of the image
	 */
	public setImage(url: string): this {
		this.image = { url };
		return this;
	}

	/**
	 * Sets the thumbnail of this embed.
	 * @param url The URL of the thumbnail
	 */
	public setThumbnail(url: string): this {
		this.thumbnail = { url };
		return this;
	}

	/**
	 * Sets the timestamp of this embed.
	 * @param timestamp The timestamp or date
	 */
	public setTimestamp(timestamp: number | Date = Date.now()): this {
		this.timestamp = new Date(timestamp).toISOString();
		return this;
	}

	/**
	 * Sets the title of this embed.
	 * @param title The title
	 */
	public setTitle(title: string): this {
		this.title = title;
		return this;
	}

	/**
	 * Sets the URL of this embed.
	 * @param url The URL
	 */
	public setURL(url: string): this {
		this.url = url;
		return this;
	}

	/**
	 * Transforms the embed to a plain object.
	 */
	public toJSON(): APIEmbed {
		return this;
	}

	/**
	 * Normalizes field input and resolves strings.
	 * @param fields Fields to normalize
	 */
	public static normalizeFields(...fields: APIEmbedField[]): APIEmbedField[] {
		return fields
			.flat(Infinity)
			.map((field) => ({ name: field.name, value: field.value, inline: field.inline ?? false }));
	}
}
