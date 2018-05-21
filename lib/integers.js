
const Config    = require('../config');

const Integer = (() =>
{
    /**
     * { var_description }
     *
     * @type       {<type>}
     */
    let intLimit;

    /**
     * Sets the limit.
     *
     * @param      {<type>}  intMax  The int maximum
     * @return     {<type>}  { description_of_the_return_value }
     */
    const setLimit = intMax => intLimit = intMax;

    /**
     * { function_description }
     *
     * @param      {number}  n       { parameter_description }
     * @return     {Array}   { description_of_the_return_value }
     */
    const generateInteger = n =>
    {
        let arrInteger = [];

        for (let i = 0; i < n; i++) arrInteger.push(i);

        return arrInteger;
    };

    /**
     * Gets the integers.
     *
     * @param      {number}    intFrom  The int from
     * @param      {number}    intTo    The int to
     * @return     {Function}  The integers.
     */
    const getIntegers = (intFrom, intTo) =>
    {
        if (!intFrom && !intTo) intFrom = intLimit;

        let isReversed = intFrom > intTo;

        if (!intTo) { intTo = intFrom; intFrom = 0; }

        if (intFrom > intTo) [intFrom, intTo] = [intTo, intFrom];

        intFrom = intFrom <= Config.math.maxIntegers ? intFrom : Config.math.maxIntegers;

        intTo = intTo <= Config.math.maxIntegers ? intTo : Config.math.maxIntegers;

        let arrIntegers = generateInteger(intTo).slice(intFrom);

        return isReversed ? arrIntegers.reverse() : arrIntegers;
    };

    return { getIntegers, setLimit };

})();

module.exports = Integer;
