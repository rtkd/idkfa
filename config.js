
const Config    = {};

/**
 * Command line arguments options
 */
Config.cla =
[
    { name: 'charAt',   alias: 'c', type: Number, multiple: true, defaultValue: [] },
    { name: 'find',     alias: 'f', type: String, multiple: true, defaultValue: [] },
    { name: 'invert',   alias: 'i', type: String, multiple: true, defaultValue: [] },
    { name: 'key',      alias: 'k', type: String, multiple: true, defaultValue: ['0'] },
    { name: 'patch',    alias: 'p', type: String, multiple: true, defaultValue: [] },
    { name: 'source',   alias: 's', type: String, multiple: true, defaultValue: [] },
    { name: 'to',       alias: 't', type: String, multiple: true, defaultValue: [] }, // (!) Build me
    { name: 'verbose',  alias: 'v', type: String, multiple: true, defaultValue: [] },
    { name: 'wordAt',   alias: 'w', type: Number, multiple: true, defaultValue: [] }
];

/**
 * Dictionary options
 */
Config.dict =
{
    // Path to source file.
    'src'       : './data/dict',

    // Source file encoding
    'encoding'  : 'utf8',

    // Return x longest words
    'longest'   : 3,

    // Return x most frequent words
    'most'      : 5,

    // Normalize dictionary to Gematria
    'isNormalized'  : true
};

/**
 * Encoding
 */
Config.encoding =
{
    // Is value a mathematical expression?
    'isExpression'  : /^\$\((.*?)\)$/i, // /^(\$\().+(\))+$/i

    // Is value from Futhark unicode range?
    'isFuthark'     : /^[\u16A0-\u16FF]+$/i,

    // Is value an integer without leading zeros?
    'isInteger'     : /^(0|[1-9]\d*)$/,

    // Is value comma separated values without leading zeros?
    'isIntegerCSV'  : /^(?!(?:\d+[, ])*0\d)(?:\d+(?:,\d+)*)+$/,

    // Is value dot separated values without leading zeros? Repeat 0-5.
    'isIntegerDSV'  : /^(?!(?:\d+[. ])*0\d)(?:\d+(?:\.\d+){0,5}(?: |$))+$/,

    // Is value latin?
    'isLatin'       : /^[a-z]+$/i
};

/**
 * Input options
 */
Config.input =
{
    // Accept: multiple integer.
    'charAt'    : { 'regex': Config.encoding.isInteger },

    // Accept: multiple latin words.
    'find'      : { 'regex': Config.encoding.isLatin },

    // Accept: multiple single latin chars.
    'invert'    : { 'regex': /^[fklopst]$/i },

    // Accept: multiple integer, integerCSV, latin chars/words, futhark chars/words and mathematical expressions.
    'key'       : { 'regex': new RegExp(Config.encoding.isInteger.source + '|' + Config.encoding.isIntegerCSV.source + '|' + Config.encoding.isLatin.source  + '|' + Config.encoding.isFuthark.source + '|' + Config.encoding.isExpression.source, 'i') },

    // Accept: multiple single latin chars.
    'patch'     : { 'regex': /^[sd]$/i },

    // Accept: multiple integerDSV.
    'source'    : { 'regex': Config.encoding.isIntegerDSV },

    // (!) Build me
    'to'        : { 'regex': Config.encoding.isLatin },

    // Accept: multiple single latin chars.
    'verbose'   : { 'regex': /^[cdfiklpswx]$/i },

    // Accept: multiple integer.
    'wordAt'    : { 'regex': Config.encoding.isInteger },
};

/**
 * IRC options
 */
Config.irc =
{
    'isEnabled'     : true,

    //'isWellFormed'  : /^lb (?:\-{1,2}(?:[a-z]+)(?: (?:[a-z0-9\.,\u16A0-\u16FF]+))+)(?: (?:\-{1,2}(?:[a-z]+)(?: )(?:[a-z0-9\.,\u16A0-\u16FF]+)))*$/ig, //(!) Build me

    'owner'         : {},

    'botalias'      : 'lb',

    'server'        : 'chat.freenode.net',

    'nick'          : '',

    'options'   :
    {
        'userName'              : '',
        'realName'              : '',
        'password'              : '',
        'port'                  : 6697,
        'localAddress'          : null,
        'debug'                 : false,
        'showErrors'            : false,
        'autoRejoin'            : true,
        'autoConnect'           : true,
        'channels'              : [],
        'secure'                : true,
        'selfSigned'            : false,
        'certExpired'           : false,
        'floodProtection'       : true,
        'floodProtectionDelay'  : 900,
        'sasl'                  : true,
        'stripColors'           : true,
        'channelPrefixes'       : '&#',
        'messageSplit'          : 512,
        'encoding'              : 'utf-8'
    }
};

/**
 * MathJS options
 */
Config.math =
{
    // Limit amount of generateable primes
    'maxPrimes': 20000
};

/**
 * Pastebin options
 */
Config.pastebin =
{
    'user':
    {
        'api_dev_key'       : '',

        'api_user_name'     : '',

        'api_user_password' : ''
    },

    'paste':
    {
        'api_paste_format'  :'js',

        // 0 = Public, anonymous, 1 = Unlisted, anonymous, 2 = Private, user, 3 = Public, user
        'privacy'           : 2,

        'duration'          :'N'
    }
};

/**
 * Source options
 */
Config.source =
{
    // Path to source file.
    'src'       : './data/liber',

    // Source file encoding
    'encoding'  : 'utf8',

    // Hirachical delimiters within source file. § = Chapter, $ = Section, & = Paragraph, . = Clause, - = Word, '' = Char.
    'delimiter' : ['§', '$', '&', '.', '-', ''],

    'isPatched' : true,

    // Hirachical offsets of single chars to replace.
    'patch':
    {
        '0.1.0.1.9.1'   : 'F',
        '0.1.0.2.7.0'   : 'F',
        '0.1.0.2.10.0'  : 'F',
        '0.1.0.3.5.0'   : 'F',
        '0.1.0.3.12.2'  : 'F',
        '0.1.0.3.12.3'  : 'F',
        '0.1.0.4.7.3'   : 'F',
        '0.1.1.1.5.7'   : 'F',
        '0.1.1.2.5.7'   : 'F',
        '0.1.1.4.0.0'   : 'F',
        '0.1.1.5.5.3'   : 'F',
        '0.5.0.2.5.1'   : 'F',
        '0.5.0.2.7.6'   : 'F',
        '0.16.0.2.4.1'  : 'F'
    }
};

module.exports = Config;
