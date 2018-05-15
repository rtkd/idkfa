
const Gematria  = require('./gematria');
const Source    = require('./source');
const Util      = require('./util');

const Crib = (() =>
{
    /**
     * Gets the word lengths of nested source.
     *
     * @param      {Array}  x       The source array
     * @return     {Array}  The word lengths.
     */
    const getWordLengths = x => x.map(y => Util.isArray(y) && Util.isArray(y[0]) ? getWordLengths(y) : y.length);

    /**
     * Finds crib offsets in source.
     *
     * @param      {array}    arrWordLength  The array containing the word length of source
     * @param      {integer}  intCribLength  The length of the crib
     * @param      {string}   strCribHash    The crib 'hash'
     * @param      {string}   strPath        Internal property to keep track of crib nesting
     * @return     {array}  Offsets of matches within the source array
     */
    const getMatches = (arrWordLength, intCribLength, strCribHash, strPath = '') =>
    {
        // Walk through sources.
        return arrWordLength.map((item, i) =>
        {
            // Keeps track of current position.
            let strNesting =  strPath + '.' + i;

            // Walk through word lengths, down to sentence.
            if (Util.isArray(item) && Util.isArray(item[0])) return getMatches(item, intCribLength, strCribHash, strNesting);

            else
            {
                // Multiple words lengths.
                if (Util.isArray(item))
                {
                    // Walk through words lengths.
                    return item.map((z, j) =>
                    {
                        // Cut substring, of crib length, from words lengths.
                        let strTextHash = item.slice(j, j + intCribLength).toString();

                        // Compare text hash to crib hash; if same, return path, else NULL.
                        return strTextHash === strCribHash ? strNesting.substr(1) + '.' + j : null;

                    }).filter(x => x || x === 0);
                }

                // Just one word.
                else
                {
                    // Compare text hash to crib hash; if same, return path, else NULL.
                    return y.toString() === strCribHash ? i : null;
                }
            }
        });
    };

    /**
     * Finds crib in source
     *
     * @param      {array}  arrText         An array of futhark strings
     * @param      {array}  arrSourcePaths  An array of source root path(s)
     * @param      {array}  arrCrib         An Array containing the words of the crib
     * @return     {array}  Matches within source as futhark, full path and key to produce
     */
    const findCrib = (arrText, arrSourcePaths, arrCrib) =>
    {
        // Get the length of each word in source text
        let textWordLength      = getWordLengths(arrText);

        // Split crib into graphs
        let cribGraphs          = arrCrib.map(strCrib => Gematria.toGraphs(strCrib));

        // How many graphs in each crib word
        let cribWordLength      = arrCrib.map(strCrib => Gematria.toGraphs(strCrib).length);

        // How many words in crib
        let cribLength          = cribWordLength.length;

        //let cribGraphsLength  = cribWordLength.reduce((x, s) => s + x, 0);

        // Fingerprint (graph length of each word in crib) to match against word length of source
        let cribHash            = cribWordLength.toString();

        // Get offsets where crib fingerprint matches source
        let arrMatches = Util.flatten(getMatches(textWordLength, cribLength, cribHash)).filter(x => x || x === 0);

        // Get full path of crib start
        let arrFullPaths = arrMatches.map((path, i) =>
        {
            // Crib is a single graph (letter)
            if (Util.isInteger(path)) return arrSourcePaths[i];

            else
            {
                // Slice root source path
                let [a, ...b] = path.split('.');

                // Return the full path
                return arrSourcePaths[a] + '.' + b.join('.');
            }
        });

        // Get full path for every word in crib
        let arrCribPaths = arrFullPaths.map(strPath =>
        {
            // Add path of first word
            let arrPaths        = [strPath];

            // Split crib path into waypoints
            let arrWaypoints    = strPath.split('.').map(x => parseInt(x));

            // Get the parent path
            let arrParentPath   = arrWaypoints.slice(0, arrWaypoints.length - 1);

            // Get the last waypoint
            let arrLastWaypoint = arrWaypoints.slice(-1);

            // Build additionl paths
            for (let i = arrPaths.length; i < cribLength; i ++)
            {
                // Increase waypoint by 1 to get the next word
                let arrFullPath = [...arrParentPath, arrLastWaypoint[0] + i];

                // Build and store path
                arrPaths.push(arrFullPath.join('.'));
            }

            // Return full path(s) of crib
            return arrPaths;

        });

        // Get the futhark representation of crib from source
        let arrFuthark      = arrCribPaths.map(paths => Source.getSource(paths));

        // Build the key that is needed to turn matches into crib
        let keyAsOffsets    = arrFuthark.map(crib => crib.map((word, i) => word.map((letter, j) => Gematria.getDistance()()(letter, cribGraphs[i][j]))));

        // Get key as latin
        let keyAsLatin      = keyAsOffsets.map(crib => crib.map((word, i) => word.map((letter, j) => Gematria.offsetToLatin()(letter))));

        // Return futhark, full path and keys
        return [arrFuthark, arrCribPaths, keyAsOffsets, keyAsLatin];

    };

    return { findCrib };

})();

module.exports = Crib;

//return Util.isArray(y) && !Util.isInteger(y[0]) ? getMatches(y, p+'.'+i) : Util.isArray(y) ? y.map((z, j) => (y.slice(j, j + cribLength).toString() === cribHash) ? (p+'.'+ i).substr(1) +'.'+ j : null)
//.filter(x => x || x === 0) : y.toString() === cribHash ? i : null;
