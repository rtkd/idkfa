
const Config    = require('../config');
const NT        = require('number-theory');

const Primes = (() =>
{
    /**
     * The maximum amount of primes to generate
     *
     * @type       {integer}
     */
    let intLimit;

    /**
     * Determines if a number is prime.
     *
     * @param      {integer}  x       The nubber to check
     * @return     {boolean}  True if prime, False otherwise.
     */
    const isPrime = x => NT.isProbablyPrime(x);

    /**
     * Sets the maximum number of primes to generate
     *
     * @param      {integer}  intMax  The maximum
     */
    const setLimit = intMax => intLimit = intMax;

    /**
     * Generates prime numbers
     *
     * @param      {integer}  n       The amount of primes to generate
     * @return     {array}  The prime numbers
     */
    const generatePrimes = n =>
    {
        let primes = [];

        for (let i = 0; primes.length < n; i++) if (isPrime(i)) primes.push(i);

        return primes;
    };

    /**
     * Gets the nth prime.
     *
     * @param      {number}  n       The nth prime to get
     * @return     {integer}  The prime.
     */
    const getPrime = n => generatePrimes(n).slice(n - 1);

    /**
     * Gets primes from n to n
     *
     * @param      {integer}    intFrom  Start at nth prime
     * @param      {integer}    intTo    Stop at nth prime
     * @return     {array}  The primes.
     */
    const getPrimes = (intFrom, intTo) =>
    {
        if (!intFrom && !intTo) intFrom = intLimit;

        let isReversed = intFrom > intTo;

        if (!intTo) { intTo = intFrom; intFrom = 0; }

        if (intFrom > intTo) [intFrom, intTo] = [intTo, intFrom];

        intFrom = intFrom <= Config.math.maxPrimes ? intFrom : Config.math.maxPrimes;

        intTo = intTo <= Config.math.maxPrimes ? intTo : Config.math.maxPrimes;

        let arrPrimes = generatePrimes(intTo).slice(intFrom);

        return isReversed ? arrPrimes.reverse() : arrPrimes;
    };

    return { getPrime, getPrimes, setLimit };

})();

module.exports = Primes;
