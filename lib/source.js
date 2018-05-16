
const Config    = require('../config');
const FS        = require('fs');

const Source = (() =>
{
    /**
     * Holds the source as an hierarchical array
     *
     * @type       {array}
     */
    let SOURCE;

    /**
     * Loads a file
     *
     * @param      {string}  strPath      The file path
     * @param      {string}  strEncoding  The file encoding
     * @return     {array}  The file as a string
     */
    const loadFile = (strPath, strEncoding) => FS.readFileSync(strPath, strEncoding);

    /**
     * Turns source string into an hierarchical array of futhark
     *
     * @param      {string}   strSource     The source
     * @param      {array}    arrDelimiter  The delimiters
     * @param      {boolean}  isPatched     Indicates if source should be patched
     * @param      {string}   p             Internal var to keep track of nesting
     * @return     {array}  The hierarchical source
     */
    const parseSource = (strSource, arrDelimiter, isPatched, p = '') =>
    {
        return (arrDelimiter.length) ?
            strSource.split(arrDelimiter[0])
                .filter(x => x)
                .map((x, i) => parseSource(x, arrDelimiter.slice(1), isPatched, p + '.' + i)) : isPatched ? Config.source.patch[p.substr(1)] ? Config.source.patch[p.substr(1)] : strSource : strSource;
    };

    /**
     * Determines if offset exists within array.
     *
     * @param      {array}    arrSource  The source
     * @param      {integer}  intOffset  The offset
     * @return     {boolean}  True if valid offset, False otherwise.
     */
    const isValidOffset = (arrSource, intOffset) => Array.isArray(arrSource) && arrSource.length >= parseInt(intOffset);

    /**
     * Gets source by waypoints (source path)
     *
     * @param      {array}    arrSourcePaths    The source paths
     * @param      {boolean}  isPatchedSource   Indicates if source should be patched
     * @param      {boolean}  isReversedSource  Indicates if source should be reversed (!) Build me
     * @return     {array}  The hierarchical source
     */
    const getSource = (arrSourcePaths, isPatchedSource = true, isReversedSource = false) =>
    {
        if (!SOURCE || Config.irc.isEnabled === true) //(!) beautify me
        {
            let strSourceRaw    = loadFile(Config.source.src, Config.source.encoding);
            let strSource       = strSourceRaw.replace(/\r?\n|\r|\/|%/g, '');

            SOURCE = parseSource(strSource, Config.source.delimiter, isPatchedSource);
        }

        let arrBlobs = arrSourcePaths.map(strWaypoints =>
        {
            let arrCurrent = SOURCE;

            strWaypoints.split('.').forEach(strWaypoint => { arrCurrent = isValidOffset(arrCurrent, strWaypoint) ? arrCurrent[strWaypoint] : null; });

            return arrCurrent ? arrCurrent : null;

        }).filter(x => x);

        return arrBlobs.length > 0 ? arrBlobs : null;
    };

    return { getSource };

})();

module.exports = Source;
