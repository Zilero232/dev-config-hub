import type { Awaitable, ConfigNames, OptionsConfig, TypedFlatConfigItem } from '@antfu/eslint-config';
import type { Linter } from 'eslint';
import type { FlatConfigComposer } from 'eslint-flat-config-utils';

/**
 * Basic configuration options.
 */
interface ConfigOptions extends OptionsConfig, TypedFlatConfigItem {
	/** Enables accessibility rules for JSX */
	jsxA11y?: boolean;

	/** Adds support for Next.js */
	next?: boolean;

	/** Sorts rules alphabetically */
	sort?: boolean;
}

/**
 * Types of user configurations.
 */
type UserConfig = Awaitable<FlatConfigComposer<any, any> | TypedFlatConfigItem | TypedFlatConfigItem[] | Linter.Config[]>;

/**
 * Main configuration function for ESLint.
 */
declare type ConfigFunction = (options?: ConfigOptions, ...userConfigs: UserConfig[]) => FlatConfigComposer<TypedFlatConfigItem, ConfigNames>;

/**
 * Exported module.
 */
declare module '@zilero/eslint' {
	type Eslint = ConfigFunction;

	export const eslint: Eslint;
}
