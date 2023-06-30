//const puppeteer = require('puppeteer');
import puppeteerExtra from 'puppeteer-extra'
import pluginStealth from 'puppeteer-extra-plugin-stealth'
import randomUseragent from 'random-useragent'

export class PuppeteerService {

    constructor() {
        this.browser = null;
        this.page = null;
        this.pageOptions = null;
        this.waitForFunction = null;
        this.isLinkCrawlTest = null;
        this.proxyURL = 'http://146.59.147.70:8888'
    }

    async initiate(isLinkCrawlTest) {
        this.pageOptions = {
            waitUntil: 'networkidle2'
            //timeout: countsLimitsData.millisecondsTimeoutSourceRequestCount
        };
        this.waitForFunction = 'document.querySelector("body")';
        puppeteerExtra.use(pluginStealth());
        //const browser = await puppeteerExtra.launch({ headless: false });
        this.browser = await puppeteerExtra.launch({ headless: false
            , args: [`--proxy-server=${this.proxyURL}`] 
            ,executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
            ,userDataDir: '/Users/mac/Library/Application Support/Google/Chrome/Default'
        });
        this.page = await this.browser.newPage();
        await this.page.setViewport({
            width: 1920 + Math.floor(Math.random() * 100),
            height: 3000 + Math.floor(Math.random() * 100),
            deviceScaleFactor: 1,
            hasTouch: false,
            isLandscape: false,
            isMobile: false,
        });
        //await this.page.setUserAgent(this.USER_AGENT);
       // await this.page.setJavaScriptEnabled(true);
        //await this.page.setDefaultNavigationTimeout(0);
        /* await this.page.setRequestInterception(true);
        this.page.on('request', (request) => {
            if (['image', 'stylesheet', 'font'].indexOf(request.resourceType()) !== -1) {
                request.continue();
            } else {
                request.continue();
            }
        });
        await this.page.evaluateOnNewDocument(() => {
            // Pass webdriver check
            Object.defineProperty(navigator, 'webdriver', {
                get: () => false,
            });
        });

        await this.page.evaluateOnNewDocument(() => {
            // Pass chrome check
            window.chrome = {
                runtime: {},
                // etc.
            };
        });

        await this.page.evaluateOnNewDocument(() => {
            //Pass notifications check
            const originalQuery = window.navigator.permissions.query;
            return window.navigator.permissions.query = (parameters) => (
                parameters.name === 'notifications' ?
                    Promise.resolve({ state: Notification.permission }) :
                    originalQuery(parameters)
            );
        });

        await this.page.evaluateOnNewDocument(() => {
            // Overwrite the `plugins` property to use a custom getter.
            Object.defineProperty(navigator, 'plugins', {
                // This just needs to have `length > 0` for the current test,
                // but we could mock the plugins too if necessary.
                get: () => [1, 2, 3, 4, 5],
            });
        });

        await this.page.evaluateOnNewDocument(() => {
            // Overwrite the `languages` property to use a custom getter.
            Object.defineProperty(navigator, 'languages', {
                get: () => ['en-US', 'en'],
            });
        }); */
        this.isLinkCrawlTest = isLinkCrawlTest;
    }

    async crawl(link) {
        const userAgent = randomUseragent.getRandom();
        const crawlResults = { isValidPage: true, pageSource: null };
        try {
            await this.page.setUserAgent(userAgent);
            await this.page.goto(link, this.pageOptions);
            await this.page.waitForFunction(this.waitForFunction);
            crawlResults.pageSource = await this.page.content();
        }
        catch (error) {
            crawlResults.isValidPage = false;
        }
        if (this.isLinkCrawlTest) {
            this.close();
        }
        return crawlResults;
    }

    close() {
        if (!this.browser) {
            this.browser.close();
        }
    }
}

