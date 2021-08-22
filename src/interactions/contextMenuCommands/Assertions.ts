import ow from 'ow';

export function validateRequiredParameters(name: string, type: number) {
	// Assert name matches all conditions
	validateName(name);

	// Assert type is valid
	validateType(type);
}

const namePredicate = ow.string
	.minLength(1)
	.maxLength(32)
	.matches(/^( *[\p{L}\p{N}_-]+ *)+$/u);

export function validateName(name: unknown): asserts name is string {
	ow(name, 'name', namePredicate);
}

const typePredicate = ow.number.inRange(2, 3);

export function validateType(type: unknown): asserts type is number {
	ow(type, 'type', typePredicate);
}
