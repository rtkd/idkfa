/* jslint esnext: true */

const Config    = require('../config').dict;
const FS        = require('fs');
const Gematria  = require('./gematria');
const Stats     = require('./stats');
const Util      = require('./util');

const Dictionary = (() =>
{
    /**
     * Will hold the dictionary
     *
     * @type       {map}
     */
    const Dict = new Map();

    /**
     * Loads a file
     *
     * @param      {string}  strPath      The file path
     * @param      {string}  strEncoding  The file encoding
     * @return     {array}  The file as a string
     */
    const loadFile = (strPath, strEncoding) => FS.readFileSync(strPath, strEncoding);

    /**
     * Normalizes word to match expected latin output of decryption
     *
     * @param      {string}  strWord  A word from the dictionary
     * @return     {string}  The normalized word
     */
    const normalize = strWord =>
    {
        let str = strWord.replace('qu', 'kw');

        // Turn word into graphs
        let arrGraphs = Gematria.toGraphs(str);

        // Get the first latin graph of each graph from the gematria
        let arrNormalized = arrGraphs.map(graph => Gematria.lookup([], (item, i) => item[2].includes(graph.toUpperCase()) ? item[2][0] : null));

        // Return the normalized word
        return arrNormalized.join('');
    };

    /**
     * Build the dictionary
     *
     * @param      {boolean}  isNormalized  Indicates if dictionary should be normalized
     * @return     -
     */
    const init = (isNormalized = true) =>
    {
        // Load file
        let strDictRaw = loadFile(Config.src, Config.encoding);

        // Split into array of unique words
        let arrDictWords = [...new Set(strDictRaw.replace(/\s+/gmi, ' ').trim().split(' '))];

        // Normalize each word to match expected output
        let arrDict = isNormalized ? arrDictWords.map(word => normalize(word).toUpperCase()) : arrDictWords.map(word => word.toUpperCase());

        // Sort and add words to dictionary
        arrDict.sort().forEach((word, i) => Dict.set(word, true));
    };

    /**
     * Checks if word exists in dictionary
     *
     * @param      {string}   strWord  The word to look for
     * @return     {boolean}  True if word exists, False otherwise.
     */
    const hasWord = strWord => Dict.has(strWord.toUpperCase());

    /**
     * Finds needle in haystack
     *
     * @param      {array}    arrData       An array of latin chars
     * @param      {boolean}  isNormalized  Indicates if dictionary should be normalized
     * @return     {array}    An array of matched words
     */
    const getMatches = (arrData = [], isNormalized = true) =>
    {
        // Build dictionary if it does not exist
        if (!Dict.size) init(isNormalized);

        // Flatten haystack to words
        let arrWords = Util.flattenTo1st(arrData).map(word => word.join(''));

        // Check if word exists in dictionary and return results
        return arrWords.map(word => hasWord(word) ? word : null).filter(x => x);
    };

    /**
     * Gets most appearing words in haystack.
     *
     * @param      {array}    arrData       An array of latin chars
     * @param      {number}   intTopMost    Indictes how many results should be returned
     * @param      {boolean}  isNormalized  Indicates if dictionary should be normalized
     * @return     {array}  The most matched words
     */
    const getMost = (arrData, intTopMost = 1, isNormalized = true) =>
    {
        // Check if words exists in dictionary
        let arrMatches = getMatches(arrData, isNormalized);

        // Get frequency of words
        let arrFrequency = Stats.getFrequency(arrMatches);

        // Sort result
        let arrSorted = [...arrFrequency].sort((a, b) => b[1] - a[1]);

        // Return the most appearing words
        return arrSorted.slice(0, intTopMost);
    };

    /**
     * Gets the longest words in haystack.
     *
     * @param      {array}    arrData       An array of latin chars
     * @param      {integer}  intTopMost    Indictes how many results should be returned
     * @param      {boolean}  isNormalized  Indicates if dictionary should be normalized
     * @return     {array}  The longest matched words.
     */
    const getLongest = (arrData, intTopMost = 1, isNormalized = true) =>
    {
        // Check if words exists in dictionary
        let arrMatches = getMatches(arrData, isNormalized);

        // Sort result
        let arrSorted = [...new Set(arrMatches)].sort((a, b) => b.length - a.length);

        // Return longest words
        return arrSorted.slice(0, intTopMost);
    };

    return { getMatches, getMost, getLongest };

})();

module.exports = Dictionary;
