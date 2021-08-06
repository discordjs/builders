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
import ow from 'ow';
import {
	authorNamePredicate,
	colorPredicate,
	descriptionPredicate,
	embedFieldsArrayPredicate,
	fieldInlinePredicate,
	fieldNamePredicate,
	fieldValuePredicate,
	footerTextPredicate,
	timestampPredicate,
	titlePredicate,
	urlPredicate,
	validateFieldLength,
} from './Assertions';

export interface AuthorURLOptions {
	url?: string | null;
	iconURL?: string | null;
}

/**
 * Represents an embed in a message (image/video preview, rich embed, etc.)
 */
export class Embed implements APIEmbed {
	/**
	 * An array of fields of this embed.
	 */
	public fields: APIEmbedField[];

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
	 */
	public image?: APIEmbedImage;

	/**
	 * Received video data.
	 */
	public video?: APIEmbedVideo;

	/**
	 * The embed author data.
	 */
	public author?: APIEmbedAuthor;

	/**
	 * Received data about the embed provider.
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
		this.fields = data.fields ?? [];

		if (data.timestamp) this.timestamp = new Date(data.timestamp).toISOString();
	}

	/**
	 * The accumulated length for the embed title, description, fields, footer text, and author name.
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
	 * @param name The name of this field.
	 * @param value The value of this field.
	 * @param inline If this field will be displayed inline.
	 */
	public addField(name: string, value: string, inline = false): this {
		return this.addFields({ name, value, inline });
	}

	/**
	 * Adds fields to the embed (max 25).
	 * @param fields The fields to add.
	 */
	public addFields(...fields: APIEmbedField[]): this {
		// Data assertions
		ow(fields, 'fields', embedFieldsArrayPredicate);

		// Ensure adding these fields won't exceed the 25 field limit
		validateFieldLength(this.fields, fields.length);

		this.fields.push(...Embed.normalizeFields(...fields));
		return this;
	}

	/**
	 * Removes, replaces, and inserts fields in the embed (max 25).
	 * @param index The index to start at.
	 * @param deleteCount The number of fields to remove.
	 * @param fields The replacing field objects.
	 */
	public spliceFields(index: number, deleteCount: number, ...fields: APIEmbedField[]): this {
		// Data assertions
		ow(fields, 'fields', embedFieldsArrayPredicate);

		// Ensure adding these fields won't exceed the 25 field limit
		validateFieldLength(this.fields, fields.length - deleteCount);

		this.fields.splice(index, deleteCount, ...Embed.normalizeFields(...fields));
		return this;
	}

	/**
	 * @typedef {Object} AuthorURLOptions
	 * @property {string | null | undefined} url The URL of the author.
	 * @property {string | null | undefined} iconURL The icon URL of the author
	 */

	/**
	 * Sets the author of this embed.
	 * @param name The name of the author.
	 * @param options The URL options of the author.
	 */
	public setAuthor(name: string | null, { iconURL, url }: AuthorURLOptions = {}): this {
		// Data assertions
		ow(name, 'name', authorNamePredicate);
		ow(iconURL, 'iconURL', urlPredicate);
		ow(url, 'url', urlPredicate);

		this.author = name ? { name, icon_url: iconURL ?? undefined, url: url ?? undefined } : undefined;
		return this;
	}

	/**
	 * Sets the color of this embed.
	 * @param color The color of the embed.
	 */
	public setColor(color: number | null): this {
		// Data assertions
		ow(color, 'color', colorPredicate);

		this.color = color ?? undefined;
		return this;
	}

	/**
	 * Sets the description of this embed.
	 * @param description The description.
	 */
	public setDescription(description: string | null): this {
		// Data assertions
		ow(description, 'description', descriptionPredicate);

		this.description = description ?? undefined;
		return this;
	}

	/**
	 * Sets the footer of this embed.
	 * @param text The text of the footer.
	 * @param iconURL The icon URL of the footer.
	 */
	public setFooter(text: string, iconURL?: string | null): this {
		// Data assertions
		ow(text, 'text', footerTextPredicate);
		ow(iconURL, 'iconURL', urlPredicate);

		this.footer = text ? { text, icon_url: iconURL ?? undefined } : undefined;
		return this;
	}

	/**
	 * Sets the image of this embed.
	 * @param url The URL of the image.
	 */
	public setImage(url: string | null): this {
		// Data assertions
		ow(url, 'url', urlPredicate);

		this.image = url ? { url } : undefined;
		return this;
	}

	/**
	 * Sets the thumbnail of this embed.
	 * @param url The URL of the thumbnail.
	 */
	public setThumbnail(url: string | null): this {
		// Data assertions
		ow(url, 'url', urlPredicate);

		this.thumbnail = url ? { url } : undefined;
		return this;
	}

	/**
	 * Sets the timestamp of this embed.
	 * @param timestamp The timestamp or date.
	 */
	public setTimestamp(timestamp: number | Date | null = Date.now()): this {
		// Data assertions
		ow(timestamp, 'timestamp', timestampPredicate);

		this.timestamp = timestamp ? new Date(timestamp).toISOString() : undefined;
		return this;
	}

	/**
	 * Sets the title of this embed.
	 * @param title The title.
	 */
	public setTitle(title: string | null): this {
		// Data assertions
		ow(title, 'title', titlePredicate);

		this.title = title ?? undefined;
		return this;
	}

	/**
	 * Sets the URL of this embed.
	 * @param url The URL.
	 */
	public setURL(url: string | null): this {
		// Data assertions
		ow(url, 'url', urlPredicate);

		this.url = url ?? undefined;
		return this;
	}

	/**
	 * Transforms the embed to a plain object.
	 */
	public toJSON(): APIEmbed {
		return { ...this };
	}

	/**
	 * Normalizes field input and resolves strings.
	 * @param fields Fields to normalize.
	 */
	public static normalizeFields(...fields: APIEmbedField[]): APIEmbedField[] {
		return fields.flat(Infinity).map((field) => {
			ow(field.name, 'field.name', fieldNamePredicate);
			ow(field.value, 'field.value', fieldValuePredicate);
			ow(field.inline, 'field.inline', fieldInlinePredicate);

			return { name: field.name, value: field.value, inline: field.inline ?? undefined };
		});
	}
}
