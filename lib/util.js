
const Util = (() =>
{
    /**
     * Determines if defined.
     *
     * @param      {<type>}   x       { parameter_description }
     * @return     {boolean}  True if defined, False otherwise.
     */
    const isDefined = x => typeof x !== 'undefined';

    /**
     * Determines if undefined.
     *
     * @param      {<type>}   x       { parameter_description }
     * @return     {boolean}  True if undefined, False otherwise.
     */
    const isUndefined = x => !isDefined(x);

    /**
     * Determines if array.
     *
     * @param      {<type>}   x       { parameter_description }
     * @return     {boolean}  True if array, False otherwise.
     */
    const isArray = x => Array.isArray(x);

    /**
     * Determines if integer.
     *
     * @param      {<type>}   x       { parameter_description }
     * @return     {boolean}  True if integer, False otherwise.
     */
    const isInteger = x => Number.isInteger(x);

    /**
     * Determines if string.
     *
     * @param      {<type>}   x       { parameter_description }
     * @return     {boolean}  True if string, False otherwise.
     */
    const isString = x => Object.prototype.toString.call(x) === "[object String]";

    /**
     * { lambda_description }
     *
     * @param      {<type>}  o       { parameter_description }
     * @return     {<type>}  { description_of_the_return_value }
     */
    const keys = o => Object.keys(o);

    /**
     * { lambda_description }
     *
     * @param      {Array}   o       { parameter_description }
     * @return     {<type>}  { description_of_the_return_value }
     */
    const assign = (...o) => Object.assign({}, ...o);

    /**
     * { lambda_description }
     *
     * @param      {Function}  f       { parameter_description }
     * @return     {<type>}    { description_of_the_return_value }
     */
    const map = f => xs => xs.map(x => f(x));

    /**
     * { lambda_description }
     *
     * @param      {Function}  f       { parameter_description }
     * @return     {<type>}    { description_of_the_return_value }
     */
    const objectMap = f => o => (o = assign(o), map(x => o[x] = f(o[x])) (keys(o)), o);

    /**
     * { lambda_description }
     *
     * @param      {<type>}  x       { parameter_description }
     * @param      {<type>}  y       { parameter_description }
     * @return     {<type>}  { description_of_the_return_value }
     */
    const concat = (x, y) => x.concat(y);

    /**
     * { lambda_description }
     *
     * @param      {<type>}  f       { parameter_description }
     * @return     {<type>}  { description_of_the_return_value }
     */
    const concatMap = f => xs => xs.map(f).reduce(concat, []);

    /**
     * { lambda_description }
     *
     * @param      {<type>}  [x, ...xs]  { parameter_description }
     * @return     {<type>}  { description_of_the_return_value }
     */
    const flatten = ([x, ...xs]) => isDefined(x) ? isArray(x) ? [...flatten(x), ...flatten(xs)] : [x, ...flatten(xs)] : [];

    /**
     * { lambda_description }
     *
     * @param      {<type>}  [x, ...xs]  { parameter_description }
     * @return     {<type>}  { description_of_the_return_value }
     */
    const flattenTo1st = ([x, ...xs]) => isDefined(x) ? isArray(x) && isArray(x[0]) ? [...flattenTo1st(x), ...flattenTo1st(xs)] : [x, ...flattenTo1st(xs)] : [];

    /**
     * { lambda_description }
     *
     * @param      {<type>}  [x, ...xs]  { parameter_description }
     * @return     {<type>}  { description_of_the_return_value }
     */
    const flattenTo2nd = ([x, ...xs]) => isDefined(x) ? isArray(x) && isArray(x[0][0]) ? [...flattenTo2nd(x), ...flattenTo2nd(xs)] : [x, ...flattenTo2nd(xs)] : [];

    /**
     * { lambda_description }
     *
     * @param      {<type>}  [x, ...xs]  { parameter_description }
     * @return     {<type>}  { description_of_the_return_value }
     */
    const flattenTo3rd = ([x, ...xs]) => isDefined(x) ? isArray(x) && isArray(x[0][0][0]) ? [...flattenTo3rd(x), ...flattenTo3rd(xs)] : [x, ...flattenTo3rd(xs)] : [];

    /**
     * { lambda_description }
     *
     * @param      {<type>}  [x, ...xs]  { parameter_description }
     * @return     {<type>}  { description_of_the_return_value }
     */
    const flattenTo4th = ([x, ...xs]) => isDefined(x) ? isArray(x) && isArray(x[0][0][0][0]) ? [...flattenTo4th(x), ...flattenTo4th(xs)] : [x, ...flattenTo4th(xs)] : [];

    /**
     * { lambda_description }
     *
     * @param      {<type>}  [x, ...xs]  { parameter_description }
     * @return     {<type>}  { description_of_the_return_value }
     */
    const flattenTo5th = ([x, ...xs]) => isDefined(x) ? isArray(x) && isArray(x[0][0][0][0][0]) ? [...flattenTo5th(x), ...flattenTo5th(xs)] : [x, ...flattenTo5th(xs)] : [];

    /**
     * { lambda_description }
     *
     * @param      {<type>}  [x, ...xs]  { parameter_description }
     * @return     {<type>}  { description_of_the_return_value }
     */
    const flattenTo6th = ([x, ...xs]) => isDefined(x) ? isArray(x) && isArray(x[0][0][0][0][0][0]) ? [...flattenTo6th(x), ...flattenTo6th(xs)] : [x, ...flattenTo6th(xs)] : [];

    return {
        isDefined,
        isUndefined,
        isArray,
        isInteger,
        isString,
        flatten,
        flattenTo1st,
        flattenTo2nd,
        flattenTo3rd,
        flattenTo4th,
        flattenTo5th,
        flattenTo6th
    };

})();


module.exports = Util;
