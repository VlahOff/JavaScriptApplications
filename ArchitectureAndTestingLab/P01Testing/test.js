const { chromium } = require('playwright-chromium');
const { expect } = require('chai');

let browser, page; // Declare reusable variables

describe('E2E tests', async function () {
    this.timeout(5000);

    before(async () => { browser = await chromium.launch(); });
    after(async () => { await browser.close(); });
    beforeEach(async () => { page = await browser.newPage(); });
    afterEach(async () => { await page.close(); });

    it('loads article titles', async () => {
        await page.goto('http://127.0.0.1:5500/P01Accordion');
        await page.waitForSelector('.accordion');
        const content = await page.textContent('#main');
        expect(content).to.contain('Scalable Vector Graphics');
        expect(content).to.contain('Open standard');
        expect(content).to.contain('Unix');
        expect(content).to.contain('ALGOL');
    });

    it('loads articles', async () => {
        await page.goto('http://127.0.0.1:5500/P01Accordion');
        await page.click('text=more');
        await page.waitForSelector('.accordion p');
        const visible = await page.isVisible('.accordion p');
        expect(visible).to.be.true;
    });

    it('hides articles', async () => {
        await page.goto('http://127.0.0.1:5500/P01Accordion');

        await page.click('text=more');
        await page.waitForSelector('.accordion p');
        let visible = await page.isVisible('.accordion p');

        await page.click('text = less');
        visible = await page.isVisible('.accordion p')
        expect(visible).to.be.false;
    });
});
