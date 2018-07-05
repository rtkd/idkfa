
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
        const int = [];

        for (let i = 0; i < n; i++) int.push(i);

        return int;
    };

    const generateEven = n =>
    {
        const even = [];

        for (let i = 0; even.length < n; i ++) if (i % 2 === 0) even.push(i);

        return even;
    };

    const generateOdd = n =>
    {
        const odd = [];

        for (let i = 0; odd.length < n; i ++) if (i % 2 !== 0) odd.push(i);

        return odd;
    };

    const getRange = (intFrom, intTo) =>
    {
        if (!intFrom && !intTo) intFrom = intLimit;

        let isReversed = intFrom > intTo;

        if (!intTo) { intTo = intFrom; intFrom = 0; }

        if (intFrom > intTo) [intFrom, intTo] = [intTo, intFrom];

        intFrom = intFrom <= Config.math.maxIntegers ? intFrom : Config.math.maxIntegers;

        intTo = intTo <= Config.math.maxIntegers ? intTo : Config.math.maxIntegers;

        return [intFrom, intTo, isReversed];
    };

    /**
     * Gets the integers.
     *
     * @param      {number}    intFrom  The int from
     * @param      {number}    intTo    The int to
     * @return     {Function}  The integers.
     */
    const getAll = (intFrom, intTo) =>
    {
        let foo = getRange(intFrom, intTo);

        let arrIntegers = generateInteger(foo[1]).slice(foo[0]);

        return foo[2] ? arrIntegers.reverse() : arrIntegers;
    };

    const getOdd = (intFrom, intTo) =>
    {
        let foo = getRange(intFrom, intTo);

        let arrIntegers = generateOdd(foo[1]).slice(foo[0]);

        return foo[2] ? arrIntegers.reverse() : arrIntegers;
    };

    const getEven = (intFrom, intTo) =>
    {
        let foo = getRange(intFrom, intTo);

        let arrIntegers = generateEven(foo[1]).slice(foo[0]);

        return foo[2] ? arrIntegers.reverse() : arrIntegers;
    };

    return { getAll, getOdd, getEven, setLimit };

})();

module.exports = Integer;
