/* jslint esnext: true */

const Config    = require('../config');
const Gematria  = require('./gematria');
const MathLib   = require('./math');

const Key = (() =>
{
    /**
     * Turns latin string into offsets
     *
     * @param      {string}  strKey  The string
     * @return     {array}  The offsets
     */
    const fromString = strKey => Gematria.toGraphs(strKey).map(strGraph => Gematria.toOffset()(strGraph));

    /**
     * Turns integer into offset
     *
     * @param      {integer}  intKey  The integer
     * @return     {integer}  The offset
     */
    const fromInteger = intKey => [intKey % Gematria.tableLength];

    /**
     * Turns integer CSV into offsets
     *
     * @param      {string}  strKey  The integer CSV
     * @return     {array}  The offsets
     */
    const fromIntegerCSV = strKey => strKey.split(',').map(integer => integer % Gematria.tableLength);

    /**
     * Turns futhark string into offsets
     *
     * @param      {string}  strKey  The futhark string
     * @return     {array}  The offsets
     */
    const fromFuthark = strKey => strKey.split('').map(letter => Gematria.toOffset()(letter));

    /**
     * Turns mathematical expression into offsets
     *
     * @param      {string}   strKey     The mathematical expression
     * @param      {integer}  intLength  The key length
     * @return     {array}  The offsets
     */
    const fromExpression = (strKey, intLength) => MathLib.evaluate(strKey, intLength);

    /**
     * Determines the key type.
     *
     * @param      {string}  strKey  The key
     * @return     {string}  The key type.
     */
    const getKeyType = strKey => { for (let encoding in Config.encoding) if (Config.encoding[encoding].test(strKey) === true) return encoding; };

    /**
     * Pads key if shorter than required length
     *
     * @param      {array}    arrKey     The key offsets
     * @param      {integer}  intLength  The needed key length
     * @return     {array}  The padded key
     */
    const padKey = (arrKey, intLength) =>
    {
        if (arrKey.length >= intLength) return arrKey.slice(0, intLength);

        for (let i = 0, ii = intLength - arrKey.length; i < ii; i ++) arrKey.push(arrKey[i]);

        return arrKey;
    };

    /**
     * Builds the key
     *
     * @param      {array}     arrKeys      The key
     * @param      {integer}   intLength    The required key length
     * @param      {boolean}   isInvertKey  Indicates if key should be inverted
     * @return     {array}  The key as offsets
     */
    const generate = (arrKeys = [], intLength = 0, isInvertKey = false) =>
    {
        if (intLength <= 0) return null;

        let keys = arrKeys.map(key =>
        {
            let type = getKeyType(key);

            let length = key.length;

            switch (type)
            {
                case 'isExpression' : key = fromExpression(key, intLength); break;
                case 'isFuthark'    : key = fromFuthark(key); break;
                case 'isInteger'    : key = fromInteger(key); break;
                case 'isIntegerCSV' : key = fromIntegerCSV(key); break;
                case 'isLatin'      : key = fromString(key); break;
                default             : break;
            }

            if (isInvertKey) key = key.map(v => Gematria.tableLength - v);

            return padKey(key, intLength);
        });

        return keys;
    };

    return { generate, fromString };

})();

module.exports = Key;
