/**
 * Wraps the content inside a codeblock with no language.
 * @param content The content to wrap.
 * @returns The formatted content.
 */
export function codeBlock<C extends string>(content: C): `\`\`\`\n${C}\`\`\``;
/**
 * Wraps the content inside a codeblock with the specified language.
 * @param language The language for the codeblock.
 * @param content The content to wrap.
 * @returns The formatted content.
 */
export function codeBlock<L extends string, C extends string>(language: L, content: C): `\`\`\`${L}\n${C}\`\`\``;
export function codeBlock(language: string, content?: string): string {
  return typeof content === 'undefined' ? `\`\`\`\n${language}\`\`\`` : `\`\`\`${language}\n${content}\`\`\``;
}

/**
 * Wraps the content inside an inline code.
 * @param content The content to wrap.
 * @returns The formatted content.
 */
export function inlineCode<C extends string>(content: C): `\`${C}\`` {
  return `\`${content}\``;
}

/**
 * Formats the content into italic text.
 * @param content The content to wrap.
 * @returns The formatted content.
 */
export function italic<C extends string>(content: C): `*${C}*` {
  return `*${content}*`;
}

/**
 * Formats the content into bold text.
 * @param content The content to wrap.
 * @returns The formatted content.
 */
export function bold<C extends string>(content: C): `**${C}**` {
  return `**${content}**`;
}

/**
 * Formats the content into underscored text.
 * @param content The content to wrap.
 * @returns The formatted content.
 */
export function underscore<C extends string>(content: C): `__${C}__` {
  return `__${content}__`;
}

/**
 * Formats the content into strikethrough text.
 * @param content The content to wrap.
 * @returns The formatted content.
 */
export function strikethrough<C extends string>(content: C): `~~${C}~~` {
  return `~~${content}~~`;
}

/**
 * Formats the content into a quote. This needs to be at the start of the line for Discord to format it.
 * @param content The content to wrap.
 * @returns The formatted content.
 */
export function quote<C extends string>(content: C): `> ${C}` {
  return `> ${content}`;
}

/**
 * Formats the content into a block quote. This needs to be at the start of the line for Discord to format it.
 * @param content The content to wrap.
 * @returns The formatted content.
 */
export function blockQuote<C extends string>(content: C): `>>> ${C}` {
  return `>>> ${content}`;
}

/**
 * Formats a date into a short date-time string.
 * @param date The date to format, defaults to the current time.
 */
export function time(date?: Date): `<t:${bigint}>`;
/**
 * Formats a date given a format style.
 * @param date The date to format.
 * @param style The style to use.
 */
export function time<S extends TimestampStylesString>(date: Date, style: S): `<t:${bigint}:${S}>`;
/**
 * Formats the given timestamp into a short date-time string.
 * @param seconds The time to format, represents an UNIX timestamp in seconds.
 */
export function time<C extends number>(seconds: C): `<t:${C}>`;
/**
 * Formats the given timestamp into a short date-time string.
 * @param seconds The time to format, represents an UNIX timestamp in seconds.
 * @param style The style to use.
 */
export function time<C extends number, S extends TimestampStylesString>(seconds: C, style: S): `<t:${C}:${S}>`;
export function time(timeOrSeconds?: number | Date, style?: TimestampStylesString): string {
  if (typeof timeOrSeconds !== 'number') {
    timeOrSeconds = Math.floor((timeOrSeconds?.getTime() ?? Date.now()) / 1000);
  }

  return typeof style === 'string' ? `<t:${timeOrSeconds}:${style}>` : `<t:${timeOrSeconds}>`;
}

/**
 * The [message formatting timestamp styles](https://discord.com/developers/docs/reference#message-formatting-timestamp-styles) supported by Discord.
 */
export const TimestampStyles = {
  /**
   * Short time format, consisting of hours and minutes, e.g. 16:20.
   */
  ShortTime: 't',

  /**
   * Long time format, consisting of hours, minutes, and seconds, e.g. 16:20:30.
   */
  LongTime: 'T',

  /**
   * Short date format, consisting of day, month, and year, e.g. 20/04/2021.
   */
  ShortDate: 'd',

  /**
   * Long date format, consisting of day, month, and year, e.g. 20 April 2021.
   */
  LongDate: 'D',

  /**
   * Short date-time format, consisting of short date and short time formats, e.g. 20 April 2021 16:20.
   */
  ShortDateTime: 'f',

  /**
   * Long date-time format, consisting of long date and short time formats, e.g. Tuesday, 20 April 2021 16:20.
   */
  LongDateTime: 'F',

  /**
   * Relative time format, consisting of a relative duration format, e.g. 2 months ago.
   */
  RelativeTime: 'R',
} as const;

/**
 * The possible values, see {@link TimestampStyles} for more information.
 */
export type TimestampStylesString = typeof TimestampStyles[keyof typeof TimestampStyles];
