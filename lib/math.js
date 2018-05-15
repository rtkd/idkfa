
const MathJS    = require('mathjs');
const NT        = require('number-theory');
const Primes    = require('./primes.js');

const Evaluate = (() =>
{
    /**
     * Copy of MathJS eval() method
     *
     * @type       {function}
     */
    const meval = MathJS.eval;

    /**
     * { lambda_description }
     *
     * @param      {Function}  f       { parameter_description }
     * @param      {<type>}    arrFoo  The arr foo
     * @return     {<type>}    { description_of_the_return_value }
     */
    const integrate = (f, arrFoo) => arrFoo.map(item => f(item));

    /**
     * { function_description }
     *
     * @param      {<type>}  args    The arguments
     * @param      {<type>}  math    The mathematics
     * @param      {<type>}  scope   The scope
     * @return     {<type>}  { description_of_the_return_value }
     */
    integrate.transform = (args, math, scope) =>
    {
        if (!args[1].isSymbolNode) throw new Error('Second argument must be a symbol');

        let strVarName  = args[1].name;
        let arrFoo      = args[2].compile().eval(scope);
        let fnScope     = Object.create(scope);
        let fnCode      = args[0].compile();

        var f = x =>
        {
            fnScope[strVarName] = x;
            return fnCode.eval(fnScope);
        };

        return integrate(f, arrFoo);
    };

    integrate.transform.rawArgs = true;

    /**
     * Expose methods
     */
    MathJS.import(
    {
        'import'    : function () { throw new Error('Function import is disabled'); },
        'createUnit': function () { throw new Error('Function createUnit is disabled'); },
        'eval'      : function () { throw new Error('Function eval is disabled'); },
        'parse'     : function () { throw new Error('Function parse is disabled'); },
        'simplify'  : function () { throw new Error('Function simplify is disabled'); },
        'derivative': function () { throw new Error('Function derivative is disabled'); },
        '$'         : integrate,
        'ephi'      : NT.eulerPhi,
        'primes'    : Primes.getPrimes

    }, { override: true });

    /**
     * Evaluates a mathematical expression
     *
     * @param      {string}   strExpression  The mathematical expression
     * @param      {integer}  intKeyLength   The key length
     * @return     {<type>}  { description_of_the_return_value }
     */
    const evaluate = (strExpression, intKeyLength) =>
    {
        Primes.setLimit(intKeyLength);

        return meval(strExpression);
    };

    return { evaluate };

})();

module.exports = Evaluate;
