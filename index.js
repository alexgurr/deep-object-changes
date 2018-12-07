/**
 * Recursively looks through two objects for changes. Will return an object with keys for
 * only changed values. Will shallow compare arrays, but will deep compare objects.
 *
 * @param {Object} original
 * @param {Object} withChanges
 *
 * @return {Object}
 */
export default function getDeepObjectChanges(original, withChanges) {
  return Object.keys(withChanges).reduce((finalPayload, key) => {
    if (withChanges[key] === original[key]) { return finalPayload; }

    const value = withChanges[key];

    if (typeof value === 'object' && !Array.isArray(value)) {
      const newValue = getObjectsDeepDiff(original[key], value);

      if (!Object.keys(newValue).length) { return finalPayload; }

      return { ...finalPayload, [key]: newValue };
    }

    return { ...finalPayload, [key]: value };
  }, {});
}
