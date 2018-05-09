/* jslint esnext: true */

const Config    = require('../config');
const Gematria  = require('./gematria');
const Key       = require('./key');
const Source    = require('./source');
const Util      = require('./util');

const Stats = (() =>
{
    /**
     * Gets the word lengths.
     *
     * @param      {array}  x       foobar
     * @return     {array}  The word lengths.
     */
    const getWordLengths = x => x.map(y => Util.isArray(y) && Util.isArray(y[0]) ? getWordLengths(y) : y.length);

    /**
     * Gets the character count.
     *
     * @param      {<type>}  arrText  The arr text
     * @return     {<type>}  The character count.
     */
    const getCharCount = arrText => Util.flatten(arrText).length;

    /**
     * Gets the word count.
     *
     * @param      {<type>}  arrText  The arr text
     * @return     {<type>}  The word count.
     */
    const getWordCount = arrText => Util.flattenTo1st(arrText).length;

    /**
     * Gets the character at.
     *
     * @param      {<type>}  arrText    The arr text
     * @param      {<type>}  intOffset  The int offset
     * @return     {<type>}  The character at.
     */
    const getCharAt = (arrText, intOffset) => Util.flatten(arrText)[intOffset];

    /**
     * Gets the word at.
     *
     * @param      {<type>}  arrText    The arr text
     * @param      {<type>}  intOffset  The int offset
     * @return     {<type>}  The word at.
     */
    const getWordAt = (arrText, intOffset) => Util.flattenTo1st(arrText)[intOffset];

    /**
     * Gets the prime value.
     *
     * @param      {<type>}  n                    { parameter_description }
     * @param      {<type>}  arrInvertProperties  The arr invert properties
     * @return     {<type>}  The prime value.
     */
    const getPrimeValue = (n, arrInvertProperties) =>
    {
        let prime = Gematria.toPrime(arrInvertProperties)(n);

        return prime ? prime : 0;
    };

    /**
     * { lambda_description }
     *
     * @param      {<type>}  arr                  The arr
     * @param      {<type>}  arrInvertProperties  The arr invert properties
     * @return     {<type>}  { description_of_the_return_value }
     */
    const deepSum = (arr, arrInvertProperties) => arr.reduce((s, n) => s + (Util.isArray(n) ? deepSum(n, arrInvertProperties) : getPrimeValue(n, arrInvertProperties)), 0);

    /**
     * Gets the checksum.
     *
     * @param      {<type>}  arrText  The arr text
     * @return     {<type>}  The checksum.
     */
    const getChecksum = arrText => [deepSum(arrText, []), deepSum(arrText, ['prime'])];

    /**
     * Gets the frequency.
     *
     * @param      {<type>}  arr     The arr
     * @return     {<type>}  The frequency.
     */
    const getFrequency = arr => [...new Set(arr)].map(x => [x, arr.filter(y => y === x).length]);

    /**
     * Gets the ioc.
     *
     * @param      {<type>}  arrText  The arr text
     * @return     {Array}   The ioc.
     */
    const getIOC = arrText =>
    {
        let arrGraphs           = Util.flatten(arrText);
        let intGraphsLength     = arrGraphs.length;
        let arrGraphFrequency   = getFrequency(arrGraphs);

        let intFrequency = arrGraphFrequency.reduce((sum, next) => sum + next[1] * (next[1] - 1), 0);

        return [intFrequency / (intGraphsLength * (intGraphsLength - 1) / Gematria.tableLength), intFrequency / (intGraphsLength * (intGraphsLength - 1))];
    };

    return {
        getFrequency,
        getCharCount,
        getWordCount,
        getCharAt,
        getWordAt,
        getChecksum,
        getIOC
    };

})();

module.exports = Stats;
