
const Config    = require('../config');
const Pastebin  = require('pastebin-js');

const PB = (() =>
{
    const API = new Pastebin(Config.pastebin.user);

    /**
     * Post text to pastebin
     *
     * @param      {string}    strText    The text to paste
     * @param      {string}    strHeader  The headline
     * @param      {function}  fnCB       The callback function
     * @return     {<type>}  { description_of_the_return_value }
     */
    const paste = (strText, strHeader, fnCB) => API.createPaste(strText, strHeader, Config.pastebin.paste.format, Config.pastebin.paste.privacy, Config.pastebin.paste.duration).then(data => fnCB(data)).fail(err => fnCB(err));

    return { paste };

})();

module.exports = PB;
