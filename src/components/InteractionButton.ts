import type { ButtonStyle } from 'discord-api-types';
import { ButtonComponent } from './Button';

export class InteractionButtonComponent extends ButtonComponent<Exclude<ButtonStyle, ButtonStyle.Link>> {}
