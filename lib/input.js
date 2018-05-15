
const Config = require('../config');

const Input = (() =>
{
    /**
     * Determines if argument is valid.
     *
     * @param      {string}              strArgument  An argument to check
     * @param      {regular expression}  rxIsValid    A regular expression
     * @return     {boolean}  True if valid, False otherwise.
     */
    const isValid = (strArgument, rxIsValid) => rxIsValid.test(strArgument);

    /**
     * Determines if arguments are valid
     *
     * @param      {string}       strCommand  The command
     * @param      {array}        arrOptions  The passed arguments
     * @throws     {syntaxerror}  The offending argument
     * @return     {array}  The validated arguments
     */
    const validate = (strCommand, arrOptions) =>
    {
        let arrParams = [...new Set(arrOptions)];

        if (arrParams.length > 0 && strCommand !== '_unknown')
        {
            return arrParams.map(strArgument =>
            {
                if (isValid(strArgument, Config.input[strCommand].regex)) return strArgument;

                else throw new SyntaxError(`Invalid parameter '${strArgument}' in command '${strCommand}'`);
            });
        }

        else return arrParams;
    };

    /**
     * Gets the validated options.
     *
     * @param      {object}  objCommands  The raw options object
     * @return     {object}  The validated options.
     */
    const getOptions = objCommands => Object.assign({}, ...Object.keys(objCommands).map(strCommand => ({ [strCommand]: validate(strCommand, objCommands[strCommand]) })));

    return { validate, getOptions };

})();

module.exports = Input;
