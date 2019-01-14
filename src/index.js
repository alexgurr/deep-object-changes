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
  if (!original) { return withChanges; }

  return Object.keys(withChanges).reduce((finalPayload, key) => {
    if (withChanges[key] === original[key]) { return finalPayload; }
    
    const value = withChanges[key];

    if (value && typeof value === 'object' && !Array.isArray(value)) {
      const newValue = getDeepObjectChanges(original[key], value);

      return !Object.keys(newValue).length 
        ? finalPayload 
        : { ...finalPayload, [key]: newValue };
    }

    return { ...finalPayload, [key]: value };
  }, {});
}
