
const Config    = require('../config');

const Fibonacci = (() =>
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
    const generateFibonacci = n =>
    {
        var arrSeed = [1, 1];

        for (var i = 2; i < n; i ++) { arrSeed[i] = arrSeed[i - 1] + arrSeed[i - 2]; }

        return arrSeed;
    };

    /**
     * Gets the fibonacci.
     *
     * @param      {number}    intFrom  The int from
     * @param      {number}    intTo    The int to
     * @return     {Function}  The fibonacci.
     */
    const getFibonacci = (intFrom, intTo) =>
    {
        if (!intFrom && !intTo) intFrom = intLimit;

        let isReversed = intFrom > intTo;

        if (!intTo) { intTo = intFrom; intFrom = 0; }

        if (intFrom > intTo) [intFrom, intTo] = [intTo, intFrom];

        intFrom = intFrom <= Config.math.maxFibonacci ? intFrom : Config.math.maxFibonacci;

        intTo = intTo <= Config.math.maxFibonacci ? intTo : Config.math.maxFibonacci;

        let arrIntegers = generateFibonacci(intTo).slice(intFrom);

        return isReversed ? arrIntegers.reverse() : arrIntegers;
    };

    return { getFibonacci, setLimit };

})();

module.exports = Fibonacci;
