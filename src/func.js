const puppeteer = require('puppeteer');
const jsdom = require('jsdom');

const NW_SERVERS = 'https://servers.scpslgame.com/';
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36';

const ROW_SELECTOR = '.server-row'; // CSS Selector that defines the loading of the page
const CONTAINER_ID = 'servers-list'; // ID of the container that is stored inside the row servers
const ROW_ID_REGEX = 'server-row-\\d+'; // Regular expression that defines the ID of the server element (server-row-{serverId})

/**
 * Retrieves all available servers without using the API & API key.
 * @returns {Array<string>} All servers that could be obtained
 */
async function main() {
    const browser = await puppeteer.launch();
    const [page] = await browser.pages();
    page.setUserAgent(USER_AGENT);

    await page.goto(NW_SERVERS, {waitUntil: 'networkidle0'});
    await page.waitForSelector(ROW_SELECTOR);
    const containerId = CONTAINER_ID;
    const rowRegex = ROW_ID_REGEX;
    await page.waitForFunction((containerId, rowRegex) => {
        rowRegex = new RegExp(rowRegex, 's');
        const container = document.getElementById(containerId);
        if (container && container.firstChild) {
            for (const row of container.children) {
                if (rowRegex.test(row.id)) {
                    return true;
                }
            }
        }
        return false;
    }, {}, containerId, rowRegex);
    await page.waitFor(1500); // to make the site script complete all its work

    const content = await page.content();
    await browser.close();

    const result = [];

    const doc = new jsdom.JSDOM(content);
    const container = doc.window.document.getElementById(CONTAINER_ID);
    if (container && container.firstChild) {
        const rowIdRegex = new RegExp(ROW_ID_REGEX, 's');
        for (const row of container.children) {
            var processed = '';

            if (rowIdRegex.test(row.id)) {
                const codeDocs = row.getElementsByTagName('code');
                for (const codeDoc of codeDocs) {
                    for (const chunkDoc of codeDoc.children) {
                        processed += chunkDoc.innerHTML;
                    }
                }
            }

            // for some reason, the first object is always empty
            if (processed != '') {
                result[result.length] = processed;
            }
        }
    }

    return result;
};

module.exports = main;
