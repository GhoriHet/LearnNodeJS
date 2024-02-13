
const pick = (object, keys) => {
    return keys.reduce((acc, key) => {
        if (object && object.hasOwnProperty(key)) {
            acc[key] = object[key];
            return acc;
        }
    }, {});
}

module.exports = pick;