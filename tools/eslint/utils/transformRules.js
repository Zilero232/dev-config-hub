/**
 * Transforms ESLint rules, replacing the prefix.
 *
 * @param {Object} rules - Object with rules.
 * @param {string} fromPrefix - Original prefix.
 * @param {string} toPrefix - New prefix.
 *
 * @returns {Object} Transformed rules.
 */
export const transformRules = (rules, fromPrefix, toPrefix) => {
	if (!rules) {
		return {};
	}

	return Object.entries(rules).reduce((acc, [key, value]) => {
		acc[key.replace(fromPrefix, toPrefix)] = value;

		return acc;
	}, {});
};
