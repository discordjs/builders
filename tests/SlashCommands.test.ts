import {
	SlashCommandAssertions,
	SlashCommandBooleanOption,
	SlashCommandBuilder,
	SlashCommandChannelOption,
	SlashCommandIntegerOption,
	SlashCommandMentionableOption,
	SlashCommandRoleOption,
	SlashCommandStringOption,
	SlashCommandSubCommandBuilder,
	SlashCommandSubCommandGroupBuilder,
	SlashCommandUserOption,
} from '../src/index';

const largeArray = Array.from({ length: 26 }, () => 1 as any);

const getBuilder = () => new SlashCommandBuilder();
const getNamedBuilder = () => getBuilder().setName('example').setDescription('Example command');
const getStringOption = () => new SlashCommandStringOption().setName('owo').setDescription('Testing 123');
const getIntegerOption = () => new SlashCommandIntegerOption().setName('owo').setDescription('Testing 123');
const getBooleanOption = () => new SlashCommandBooleanOption().setName('owo').setDescription('Testing 123');
const getUserOption = () => new SlashCommandUserOption().setName('owo').setDescription('Testing 123');
const getChannelOption = () => new SlashCommandChannelOption().setName('owo').setDescription('Testing 123');
const getRoleOption = () => new SlashCommandRoleOption().setName('owo').setDescription('Testing 123');
const getMentionableOption = () => new SlashCommandMentionableOption().setName('owo').setDescription('Testing 123');
const getSubCommandGroup = () => new SlashCommandSubCommandGroupBuilder().setName('owo').setDescription('Testing 123');
const getSubCommand = () => new SlashCommandSubCommandBuilder().setName('owo').setDescription('Testing 123');

class Collection {
	public get [Symbol.toStringTag]() {
		return 'Map';
	}
}

describe('Slash Commands', () => {
	describe('Assertions tests', () => {
		test('GIVEN valid name THEN does not throw error', () => {
			expect(() => SlashCommandAssertions.validateName('ping')).not.toThrowError();
		});

		test('GIVEN invalid name THEN throw error', () => {
			expect(() => SlashCommandAssertions.validateName(null)).toThrowError();

			// Too short of a name
			expect(() => SlashCommandAssertions.validateName('')).toThrowError();

			// Invalid characters used
			expect(() => SlashCommandAssertions.validateName('ABC123$%^&')).toThrowError();

			// Too long of a name
			expect(() =>
				SlashCommandAssertions.validateName('qwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnm'),
			).toThrowError();
		});

		test('GIVEN valid description THEN does not throw error', () => {
			expect(() => SlashCommandAssertions.validateDescription('This is an OwO moment fur sure!~')).not.toThrowError();
		});

		test('GIVEN invalid description THEN throw error', () => {
			expect(() => SlashCommandAssertions.validateDescription(null)).toThrowError();

			// Too short of a description
			expect(() => SlashCommandAssertions.validateDescription('')).toThrowError();

			// Too long of a description
			expect(() =>
				SlashCommandAssertions.validateDescription(
					'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam autem libero expedita vitae accusamus nostrum ipsam tempore repudiandae deserunt ipsum facilis, velit fugiat facere accusantium, explicabo corporis aliquam non quos.',
				),
			).toThrowError();
		});

		test('GIVEN valid array of options or choices THEN does not throw error', () => {
			expect(() => SlashCommandAssertions.validateMaxOptionsLength([])).not.toThrowError();

			expect(() => SlashCommandAssertions.validateMaxChoicesLength([])).not.toThrowError();
		});

		test('GIVEN invalid options or choices THEN throw error', () => {
			expect(() => SlashCommandAssertions.validateMaxOptionsLength(null)).toThrowError();

			expect(() => SlashCommandAssertions.validateMaxChoicesLength(null)).toThrowError();

			// Given an array that's too big
			expect(() => SlashCommandAssertions.validateMaxOptionsLength(largeArray)).toThrowError();

			expect(() => SlashCommandAssertions.validateMaxChoicesLength(largeArray)).toThrowError();
		});

		test('GIVEN valid required parameters THEN does not throw error', () => {
			expect(() =>
				SlashCommandAssertions.validateRequiredParameters(
					'owo',
					'My fancy command that totally exists, to test assertions',
					[],
				),
			).not.toThrowError();
		});
	});

	describe('SlashCommandBuilder', () => {
		describe('Builder with no options', () => {
			test('GIVEN empty builder THEN throw error when calling toJSON', () => {
				expect(() => getBuilder().toJSON()).toThrowError();
			});

			test('GIVEN valid builder THEN does not throw error', () => {
				expect(() => getBuilder().setName('example').setDescription('Example command').toJSON()).not.toThrowError();
			});
		});

		describe('Builder with simple options', () => {
			test('GIVEN valid builder with options THEN does not throw error', () => {
				expect(() =>
					getBuilder()
						.setName('example')
						.setDescription('Example command')
						.addBooleanOption((boolean) =>
							boolean.setName('iscool').setDescription('Are we cool or what?').setRequired(true),
						)
						.addChannelOption((channel) => channel.setName('iscool').setDescription('Are we cool or what?'))
						.addMentionableOption((mentionable) => mentionable.setName('iscool').setDescription('Are we cool or what?'))
						.addRoleOption((role) => role.setName('iscool').setDescription('Are we cool or what?'))
						.addUserOption((user) => user.setName('iscool').setDescription('Are we cool or what?'))
						.addIntegerOption((integer) =>
							integer
								.setName('iscool')
								.setDescription('Are we cool or what?')
								.addChoices(new Map([['Very cool', 1_000]])),
						)
						.addStringOption((string) =>
							string
								.setName('iscool')
								.setDescription('Are we cool or what?')
								.addChoices([
									['Fancy Pants', 'fp_1'],
									['Fancy Shoes', 'fs_1'],
									['The Whole shebang', 'all'],
								])
								.addChoices({ value_you_will_get_when_this_is_chosen: 'Pretty name for the client' }),
						)
						.toJSON(),
				).not.toThrowError();
			});

			test('GIVEN an already built builder THEN does not throw an error', () => {
				expect(() => getBuilder().addStringOption(getStringOption())).not.toThrowError();

				expect(() => getBuilder().addIntegerOption(getIntegerOption())).not.toThrowError();

				expect(() => getBuilder().addBooleanOption(getBooleanOption())).not.toThrowError();

				expect(() => getBuilder().addUserOption(getUserOption())).not.toThrowError();

				expect(() => getBuilder().addChannelOption(getChannelOption())).not.toThrowError();

				expect(() => getBuilder().addRoleOption(getRoleOption())).not.toThrowError();

				expect(() => getBuilder().addMentionableOption(getMentionableOption())).not.toThrowError();
			});

			test('GIVEN no valid return for an addOption method THEN throw error', () => {
				// @ts-expect-error Checking if not providing anything, or an invalid return type causes an error
				expect(() => getBuilder().addBooleanOption()).toThrowError();

				// @ts-expect-error Checking if not providing anything, or an invalid return type causes an error
				expect(() => getBuilder().addBooleanOption(getRoleOption())).toThrowError();
			});

			test('GIVEN invalid name THEN throw error', () => {
				expect(() => getBuilder().setName('TEST_COMMAND')).toThrowError();

				expect(() => getBuilder().setName('ĂĂĂĂĂĂ')).toThrowError();
			});

			test('GIVEN valid names THEN does not throw error', () => {
				expect(() => getBuilder().setName('hi_there')).not.toThrowError();

				// Translation: a_command
				expect(() => getBuilder().setName('o_comandă')).not.toThrowError();
			});

			test('GIVEN invalid returns for builder THEN throw error', () => {
				// @ts-expect-error Checking if not providing anything, or an invalid return type causes an error
				expect(() => getBuilder().addBooleanOption(true)).toThrowError();

				expect(() => getBuilder().addBooleanOption(null)).toThrowError();

				expect(() => getBuilder().addBooleanOption(undefined)).toThrowError();

				// @ts-expect-error Checking if not providing anything, or an invalid return type causes an error
				expect(() => getBuilder().addBooleanOption(() => SlashCommandStringOption)).toThrowError();
				// @ts-expect-error Checking if not providing anything, or an invalid return type causes an error
				expect(() => getBuilder().addBooleanOption(() => new Collection())).toThrowError();
			});
		});

		describe('Builder with sub command (group) options', () => {
			test('GIVEN builder with sub command group THEN does not throw error', () => {
				expect(() =>
					getNamedBuilder().addSubCommandGroup((group) => group.setName('group').setDescription('Group us together!')),
				).not.toThrowError();
			});

			test('GIVEN builder with sub command THEN does not throw error', () => {
				expect(() =>
					getNamedBuilder().addSubCommand((subCommand) =>
						subCommand.setName('boop').setDescription('Boops a fellow nerd (you)'),
					),
				).not.toThrowError();
			});

			test('GIVEN builder with already built sub command group THEN does not throw error', () => {
				expect(() => getNamedBuilder().addSubCommandGroup(getSubCommandGroup())).not.toThrowError();
			});

			test('GIVEN builder with already built sub command THEN does not throw error', () => {
				expect(() => getNamedBuilder().addSubCommand(getSubCommand())).not.toThrowError();
			});

			test('GIVEN builder with already built sub command with options THEN does not throw error', () => {
				expect(() =>
					getNamedBuilder().addSubCommand(getSubCommand().addBooleanOption(getBooleanOption())),
				).not.toThrowError();
			});

			test('GIVEN builder with a sub command group that tries to add a sub command THEN throw error', () => {
				expect(() =>
					// @ts-expect-error Checking if check works JS-side too
					getNamedBuilder().addSubCommandGroup(getSubCommandGroup()).addSubCommand(getSubCommand()),
				).toThrowError();
			});

			test('GIVEN builder with a sub command that tries to add an invalid result THEN throw error', () => {
				expect(() =>
					// @ts-expect-error Checking if check works JS-side too
					getNamedBuilder().addSubCommand(getSubCommand()).addSubCommandGroup(getSubCommandGroup()),
				).toThrowError();
			});

			test('GIVEN no valid return for an addSubCommand(Group) method THEN throw error', () => {
				// @ts-expect-error Checking if not providing anything, or an invalid return type causes an error
				expect(() => getBuilder().addSubCommandGroup()).toThrowError();

				// @ts-expect-error Checking if not providing anything, or an invalid return type causes an error
				expect(() => getBuilder().addSubCommand()).toThrowError();

				// @ts-expect-error Checking if not providing anything, or an invalid return type causes an error
				expect(() => getBuilder().addSubCommand(getSubCommandGroup())).toThrowError();
			});
		});

		describe('Sub command group builder', () => {
			test('GIVEN no valid sub command THEN throw error', () => {
				// @ts-expect-error Checking if not providing anything, or an invalid return type causes an error
				expect(() => getSubCommandGroup().addSubCommand()).toThrowError();

				// @ts-expect-error Checking if not providing anything, or an invalid return type causes an error
				expect(() => getSubCommandGroup().addSubCommand(getSubCommandGroup())).toThrowError();
			});

			test('GIVEN a valid sub command THEN does not throw an error', () => {
				expect(() =>
					getSubCommandGroup()
						.addSubCommand((sub) => sub.setName('sub').setDescription('Testing 123'))
						.toJSON(),
				).not.toThrowError();
			});
		});

		describe('Sub command builder', () => {
			test('GIVEN a valid sub command with options THEN does not throw error', () => {
				expect(() => getSubCommand().addBooleanOption(getBooleanOption()).toJSON()).not.toThrowError();
			});
		});
	});
});
