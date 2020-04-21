const cloudscraper = require('cloudscraper');
const jsdom = require('jsdom');

const NW_SERVERS = 'https://kigen.co/scpsl/browser.php?table=y';
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36';

const TAG_REGEX = /<[^>]*?>/g; // Regex to remove all tags
const TAG_STYLE_REGEX = /&lt;\/?(?:\w+=?\w+)&gt;/g; // Regex to remove tags of type '&lt;size=1&gt;SM119.1.9.5 (EXILED)&lt;/size&gt;'

/**
 * @typedef {Object} RowServer
 * 
 * @property {string} [ip]
 * @property {string} [port]
 * @property {string} [info]
 * @property {string} [pastebin]
 * @property {string} [players]
 * @property {string} [version]
 * @property {string} [distance]
 */

/**
 * Retrieves all available servers without using the API & API key.
 * @returns {Promise<RowServer[]>} All servers that could be obtained
 */
function main() {
    return new Promise(async (resolve) => {
        // I don't know why, but it's calmer, like kigen.co does not have cloudflare
        const content = await cloudscraper.get(NW_SERVERS, {headers:{'User-Agent': USER_AGENT}, encoding: 'utf8'});

        const result = [];
        const doc = new jsdom.JSDOM(content, {contentType: 'text/html'})

        for (var z = 0;; z++) {
            const rowDetails = doc.window.document.getElementById(z);      
            if (rowDetails) {
                const rowData = {
                    ip: '',
                    port: '',
                    info: '',
                    pastebin: '',
                    players: '',
                    version: '',
                    distance: ''
                }

                const ipPort = rowDetails.children[0].innerHTML.split(':');
                rowData.ip = ipPort[0];
                rowData.port = ipPort[1];
    
                const info = rowDetails.children[1].innerHTML.replace(TAG_REGEX, '').replace(TAG_STYLE_REGEX, '');
                rowData.info = info;
                    
                rowData.pastebin = rowDetails.children[2].getElementsByTagName('a')[0].innerHTML;
                rowData.players = rowDetails.children[3].innerHTML;
                rowData.version = rowDetails.children[4].innerHTML;
                rowData.distance = rowDetails.children[6].innerHTML;
    
                // because there is no serverId, the server will have to be identified by ip & port
                if (rowData.ip && rowData.port) {
                    result[result.length] = rowData;
                }
            } else {
                break;
            }
        }
    
        resolve(result);        
    });
};

module.exports = main;
