/* jslint esnext: true */

const Config    = require('../config');
const Gematria  = require('./gematria');

const Shift = (() =>
{
    /**
     * Determines if graph is futhark
     *
     * @param      {string}  char    The graph
     * @return     {boolean}  True if futhark, False otherwise.
     */
    const isFuthark = char => Config.encoding.isFuthark.test(char);

    /**
     * Recursively maps a function to an array
     *
     * @param      {<type>}    v       { parameter_description }
     * @param      {Function}  fn      The function
     * @return     {<type>}    { description_of_the_return_value }
     */
    const recursiveMap = (v, fn) => Array.isArray(v) ? v.map(v => recursiveMap(v, fn)) : fn(v);

    /**
     * Shifts a graph up the gematria
     *
     * @param      {string}          char                 The character
     * @param      {integer}         offset               The offset
     * @param      {(array|string)}  arrInvertProperties  A string or an array of gematria properties to invert
     * @return     {boolean}  The new offset
     */
    const shiftUp = (char, offset, arrInvertProperties) =>
    {
        let newOffset = (Gematria.toOffset(arrInvertProperties)(char) - offset) % Gematria.tableLength;

        return (newOffset < 0) ? newOffset + Gematria.tableLength : newOffset;
    };

    /**
     * Shifts a graph down the gematria
     *
     * @param      {string}          char                 The character
     * @param      {integer}         offset               The offset
     * @param      {(array|string)}  arrInvertProperties  A string or an array of gematria properties to invert
     * @return     {boolean}  The new offset
     */
    const shiftDown = (char, offset, arrInvertProperties) => (Gematria.toOffset(arrInvertProperties)(char) + offset) % Gematria.tableLength;

    /**
     * Turns source into clear text
     *
     * @param      {array}    arrSourceData      The source data
     * @param      {array}    arrKeyData         The key data
     * @param      {boolean}  isInvertedFuthark  Indicates if gematria futhark is inverted
     * @param      {boolean}  isInvertedLatin    Indicates if gematria latin is inverted
     * @param      {boolean}  isInvertedOffset   Indicates if gematria offset is inverted
     * @param      {boolean}  isInvertedPrime    Indicates if gematria prime is inverted
     * @param      {boolean}  isReversedShift    Indicates if shift is reversed
     * @return     {array}  The clear text
     */
    const mutate = (arrSourceData = [], arrKeyData = [], isInvertedFuthark = false, isInvertedLatin = false, isInvertedOffset = false, isInvertedPrime = false, isReversedShift = false) =>
    {
        let arrInvertProperties = [];

        if (isInvertedFuthark) arrInvertProperties.push('futhark');
        if (isInvertedLatin) arrInvertProperties.push('latin');
        if (isInvertedOffset) arrInvertProperties.push('offset');
        if (isInvertedPrime) arrInvertProperties.push('prime');

        const arrLatin = arrKeyData.map((key, i) =>
        {
            let keyOffset = 0;

            return recursiveMap(arrSourceData, char =>
            {
                // If char is within futhark unicode range
                if (isFuthark(char))
                {
                    let charOffset = isReversedShift ? shiftDown(char, arrKeyData[i][keyOffset ++], arrInvertProperties) : shiftUp(char, arrKeyData[i][keyOffset ++], arrInvertProperties);

                    // Return the corresponding latin graph
                    return Gematria.offsetToLatin(arrInvertProperties)(charOffset)[0];
                }

                // If char is not futhark, just return the char
                else return char;
            });
        });

        return arrLatin;
    };

    return { mutate };

})();

module.exports = Shift;

