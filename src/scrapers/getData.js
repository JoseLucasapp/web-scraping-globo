import playwright from 'playwright'

export const getData = async () => {

    const browser = await playwright['chromium'].launch();

    const context = await browser.newContext();

    const page = await context.newPage();

    await page.goto('https://www.globo.com/')

    await browser.close()
}