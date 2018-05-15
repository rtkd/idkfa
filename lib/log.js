
const Console = console;

const Log = (() =>
{
    /**
     * { var_description }
     *
     * @type       {Map}
     */
    let logData = new Map();

    /**
     * Gets the now.
     *
     * @return     {<type>}  The now.
     */
    const getNow = () => new Date();

    /**
     * Gets the data.
     *
     * @return     {<type>}  The data.
     */
    const getData = () => logData;

    /**
     * Sets the data.
     *
     * @param      {<type>}  strType  The string type
     * @param      {<type>}  arrData  The arr data
     * @return     {<type>}  { description_of_the_return_value }
     */
    const setData = (strType, arrData) => logData.set(strType, arrData);

    /**
     * { lambda_description }
     *
     * @return     {<type>}  { description_of_the_return_value }
     */
    const reset = () => logData.clear();

    /**
     * Writes a data.
     *
     * @return     {<type>}  { description_of_the_return_value }
     */
    const writeData = () =>
    {
        //if (Config.log.to.includes('file')) console.log('file');

        //if (Config.log.to.includes('irc')) console.log('irc');

        //if (Config.log.to.includes('pastebin')) console.log('pastebin');

        //if (Config.log.to.includes('stdout')) console.log('stdout');

        //let stat = Pastebin.paste(JSON.stringify([...logData]), 'Test', response => console.log(response));

        logData.forEach((a,b) => Console.log(JSON.stringify(a,b)));

        Console.log(getNow());
    };

    /**
     * Writes an error.
     *
     * @param      {<type>}  error   The error
     * @return     {<type>}  { description_of_the_return_value }
     */
    const writeError = (error) =>
    {
        Console.log(error);
    };

    return { getData, setData, writeData, writeError, getNow, reset };

})();

module.exports = Log;
