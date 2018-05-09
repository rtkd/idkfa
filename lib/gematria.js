/* jslint esnext: true */

const Util = require('./util');

const Gematria = (() =>
{
    /**
     * The 3301 gematria
     *
     * @type       {array}
     */
    const table =
    [
        [ 'ᚠ', 2,   ['F'] ],
        [ 'ᚢ', 3,   ['U', 'V'] ],
        [ 'ᚦ', 5,   ['TH'] ],
        [ 'ᚩ', 7,   ['O'] ],
        [ 'ᚱ', 11,  ['R'] ],
        [ 'ᚳ', 13,  ['C', 'K'] ],
        [ 'ᚷ', 17,  ['G'] ],
        [ 'ᚹ', 19,  ['W'] ],
        [ 'ᚻ', 23,  ['H'] ],
        [ 'ᚾ', 29,  ['N'] ],
        [ 'ᛁ', 31,  ['I'] ],
        [ 'ᛄ', 37,  ['J'] ],
        [ 'ᛇ', 41,  ['EO'] ],
        [ 'ᛈ', 43,  ['P'] ],
        [ 'ᛉ', 47,  ['X'] ],
        [ 'ᛋ', 53,  ['S', 'Z'] ],
        [ 'ᛏ', 59,  ['T'] ],
        [ 'ᛒ', 61,  ['B'] ],
        [ 'ᛖ', 67,  ['E'] ],
        [ 'ᛗ', 71,  ['M'] ],
        [ 'ᛚ', 73,  ['L'] ],
        [ 'ᛝ', 79,  ['(I)NG', 'ING', 'NG'] ],
        [ 'ᛟ', 83,  ['OE'] ],
        [ 'ᛞ', 89,  ['D'] ],
        [ 'ᚪ', 97,  ['A'] ],
        [ 'ᚫ', 101, ['AE'] ],
        [ 'ᚣ', 103, ['Y'] ],
        [ 'ᛡ', 107, ['I(A/O)', 'IA', 'IO'] ],
        [ 'ᛠ', 109, ['EA'] ]
    ];

    /**
     * Length of gematria
     *
     * @type       {integer}
     */
    const tableLength = table.length;

    /**
     * Unique latin graph lengths of gematria
     *
     * @type       {array}
     */
    const graphLengths = [...new Set(Util.flatten(table.map((item, i) => item[2].map((item, i) => item.length))).sort())];

    /**
     * Builds alternate gematriae
     *
     * @param      {(array|string)}  invertProperties  A string or an array of gematria properties to invert
     * @return     {array}  The alternate gematria table.
     */
    const buildTable = (invertProperties = []) =>
    {
        let t = table.map((item, i) =>
        {
            let invertOffset = tableLength - i - 1;

            return [
                invertProperties.includes('futhark') ? table[invertOffset][0] : table[i][0],
                invertProperties.includes('prime') ? table[invertOffset][1] : table[i][1],
                invertProperties.includes('latin') ? table[invertOffset][2] : table[i][2]
            ];
        });

        return invertProperties.includes('offset') ? t.reverse() : t;
    };

    /**
     * Checks gematria for property
     *
     * @param      {(array|string)}  strTable  A string or an array of gematria properties to invert
     * @param      {function}        fn        The function to apply
     * @return     {array}  The matches
     */
    const lookup = (strTable, fn) => buildTable(strTable).map(fn).filter(item => item !== null);

    /**
     * Determines if latin graph exists within gematria
     *
     * @param      {(array|string)}  strTable  A string or an array of gematria properties to invert
     * @param      {string}          strLatin  A latin graph to look up
     * @return     {boolean}  True if latin graph exists, False otherwise.
     */
    const hasLatin = strTable => strLatin => lookup(strTable, item => item[2].includes(Util.isString(strLatin) ? strLatin.toUpperCase() : strLatin)).filter(x => x).length === 1;

    /**
     * Determines if prime number exists within gematria.
     *
     * @param      {(array|string)}  strTable  A string or an array of gematria properties to invert
     * @param      {integer}         intPrime  A prime number to look up
     * @return     {boolean}  True if prime number exists, False otherwise.
     */
    const hasPrime = strTable => intPrime => lookup(strTable, item => item[1] === intPrime).filter(x => x).length === 1;

    /**
     * Determines if futhark graph exists within gematria.
     *
     * @param      {(array|string)}  strTable    A string or an array of gematria properties to invert
     * @param      {string}          strFuthark  A futhark graph to look up
     * @return     {boolean}  True if futhark graph exists, False otherwise.
     */
    const hasFuthark = strTable => strFuthark => lookup(strTable, item => item[0] === strFuthark).filter(x => x).length === 1;

    /**
     * Turns latin word into latin graphs
     *
     * @param      {string}  strLatin  A latin string
     * @return     {array}  The string split into graphs
     */
    const toGraphs = strLatin =>
    {
        let arrGraphs = [];
        let arrGraphLengths = graphLengths.sort().reverse();

        arrGraphLengths.map(intGraphLength =>
        {
            for (let i = 0, ii = strLatin.length - intGraphLength; i <= ii; i ++)
            {
                let str = strLatin.substr(i, intGraphLength);

                if(hasLatin()(str))
                {
                    arrGraphs[i] = str;
                    strLatin = strLatin.replace(str, '*'.repeat(intGraphLength));
                }
            }
        });

        return arrGraphs.filter(x => x);
    };

    /**
     * Turns futhark graph, prime number or latin graph into offset
     *
     * @param      {(array|string)}    strTable  A string or an array of gematria properties to invert
     * @param      {(string|integer)}  x         A string or an integer to look up
     * @return     {(integer|null)}  Offset if property exists, NULL otherwise
     */
    const toOffset = strTable => x => parseInt(lookup(strTable, (item, i) => item[0] === x || item[1] === x || item[2].includes(Util.isString(x) ? x.toUpperCase() : x) ? i : null));

    /**
     * Turns prime or latin graph into futhark
     *
     * @param      {(array|string)}    strTable  A string or an array of gematria properties to invert
     * @param      {(string|integer)}  x         A string or an integer to look up
     * @return     {(string|null)}  Futhark graph if property exists, NULL otherwise
     */
    const toFuthark = strTable => x => lookup(strTable, (item, i) => item[1] === x || item[2].includes(Util.isString(x) ? x.toUpperCase() : x) ? item[0] : null).toString();

    /**
     * Turns nested primes or latin graphs into futhark
     *
     * @param      {(array|string)}    strTable  A string or an array of gematria properties to invert
     * @param      {(string|integer)}  x         A string or an integer to look up
     * @return     {array}  Futhark graphs
     */
    const toFutharkDeep = strTable => x => Util.isArray(x) ? x.map(y => toFutharkDeep(strTable)(y)) : toFuthark(strTable)(x);

    /**
     * Turns futhark or latin graph into prime number
     *
     * @param      {(array|string)}  strTable  A string or an array of gematria properties to invert
     * @param      {string}          x         A graph to look up
     * @return     {(integer|null)}  Prime number if property exists, NULL otherwise
     */
    const toPrime = strTable => x => parseInt(lookup(strTable, (item, i) => item[0] === x || item[2].includes(Util.isString(x) ? x.toUpperCase() : x) ? item[1] : null));

    /**
     * Turns nested futhark or latin graphs into prime numbers
     *
     * @param      {(array|string)}  strTable  A string or an array of gematria properties to invert
     * @param      {string}          x         A graph to look up
     * @return     {array}  Prime numbers
     */
    const toPrimeDeep = strTable => x => Util.isArray(x) ? x.map(y => toPrimeDeep(strTable)(y)) : toPrime(strTable)(x);

    /**
     * Turns futhark or prime number into latin graphs
     *
     * @param      {(array|string)}    strTable  A string or an array of gematria properties to invert
     * @param      {(string|integer)}  x         A futhark graph or prime number to look up
     * @return     {(string|null)}  Latin graph if exists, NULL otherwise
     */
    const toLatin = strTable => x => lookup(strTable, (item, i) => item[0] === x || item[1] === x ? item[2] : null);

    /**
     * Turns nested futhark or prime numbers into latin graphs
     *
     * @param      {(array|string)}    strTable  A string or an array of gematria properties to invert
     * @param      {(string|integer)}  x         A futhark graph or prime number to look up
     * @return     {array}  Latin graphs
     */
    const toLatinDeep = strTable => x => Util.isArray(x) ? x.map(y => toLatinDeep(strTable)(y)) : toLatin(strTable)(x);

    /**
     * Turns offset into futhark graph
     *
     * @param      {(array|string)}  strTable   A string or an array of gematria properties to invert
     * @param      {integer}         intOffset  An integer offset
     * @return     {string}  A futhark graph
     */
    const offsetToFuthark = strTable => intOffset => buildTable(strTable)[(intOffset % tableLength)][0];

    /**
     * Turns offset into prime number
     *
     * @param      {(array|string)}  strTable   A string or an array of gematria properties to invert
     * @param      {integer}         intOffset  An integer offset
     * @return     {integer}  A prime number
     */
    const offsetToPrime = strTable => intOffset => buildTable(strTable)[(intOffset % tableLength)][1];

    /**
     * Turns offset into latin graphs
     *
     * @param      {(array|string)}  strTable   A string or an array of gematria properties to invert
     * @param      {integer}         intOffset  An integer offset
     * @return     {array}  Latin graphs
     */
    const offsetToLatin = strTable => intOffset => buildTable(strTable)[(intOffset % tableLength)][2];

    /**
     * Turns prime number into futhark graph
     *
     * @param      {(array|string)}  strTable   A string or an array of gematria properties to invert
     * @param      {integer}         intPrime   A prime number
     * @return     {(string|null)}  Futhark graph, or NULL
     */
    const primeToFuthark = strTable => intPrime => lookup(strTable, (item, i) => item[1] === intPrime ? table[i][2] : null);

    /**
     * Turns prime number into latin graphs
     *
     * @param      {(array|string)}  strTable   A string or an array of gematria properties to invert
     * @param      {integer}         intPrime   A prime number
     * @return     {(array|null)}  Latin graphs, or NULL
     */
    const primeToLatin = strTable => intPrime => lookup(strTable, (item, i) => item[1] === intPrime ? table[i][2] : null);

    /**
     * Turns latin graph into futhark graph
     *
     * @param      {(array|string)}  strTable   A string or an array of gematria properties to invert
     * @param      {string}          strLatin   The latin graph to look up
     * @return     {(string|null)}  Futhark graph, or NULL
     */
    const latinToFuthark = strTable => strLatin => lookup(strTable, (item, i) => item[2].includes(strLatin) ? table[i][0] : null);

    /**
     * Turns latin graph into prime number
     *
     * @param      {(array|string)}  strTable   A string or an array of gematria properties to invert
     * @param      {string}          strLatin   The latin graph to look up
     * @return     {(integer|null)}  Prime number, or NULL
     */
    const latinToPrime = strTable => strLatin => lookup(strTable, (item, i) => item[2].includes(strLatin) ? table[i][1] : null);

    /**
     * Gets the distance between two gematria properties
     *
     * @param      {string}          strDirection  The gematria direction
     * @param      {(array|string)}  strTable      A string or an array of gematria properties to invert
     * @return     {integer}  The distance.
     */
    const getDistance = strDirection => strTable => (strGraph1, strGraph2) =>
    {
        let offset1 = toOffset(strTable)(strGraph1);
        let offset2 = toOffset(strTable)(strGraph2);

        let diff = strDirection === 'reverse' ? offset2 - offset1 : offset1 - offset2;

        return diff < 0 ? diff + tableLength : diff;
    };

    return {
        tableLength,
        graphLengths,
        lookup,
        toOffset,
        toFuthark,
        toFutharkDeep,
        toPrime,
        toPrimeDeep,
        toLatin,
        toLatinDeep,
        toGraphs,
        offsetToFuthark,
        offsetToPrime,
        offsetToLatin,
        primeToFuthark,
        primeToLatin,
        latinToFuthark,
        latinToPrime,
        getDistance
    };

})();

module.exports = Gematria;
