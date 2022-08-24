import playwright from 'playwright'

export const getData = async () => {

    const browser = await playwright['chromium'].launch();

    const context = await browser.newContext();

    const page = await context.newPage();

    await page.goto('https://www.globo.com/')

    const mainBanner = await page.$eval('.highlight-container .area-destaque .headline .headline__container .post a', (a) => {
        const image = a.querySelector('figure img').src
        const title = a.querySelector('h3').innerHTML
        const link = a.href

        return { image, title, link }
    })

    const otherBannerNews = await page.$$eval('.highlight-container .area-destaque .headline .headline__bullets ul li', (ul) => ul.map((li) => {
        const link = li.querySelector('.post a').href
        const text = li.querySelector('.post a h3').innerHTML

        return { link, text }
    }))

    const top6news = await page.$$eval('.post-row.with-6-posts .theme-jornalismo', (divs) => divs.map((div) => {
        const basePath = '.container .post'
        const title = div.querySelector(`${basePath} a h3`).innerHTML
        const titleLink = div.querySelector(`${basePath} a`).href

        const getBullets = Array.from(div.querySelectorAll('.bullets ul li div'))
        const bullets = getBullets.map((bullet) => {
            const bulletTitle = bullet.querySelector('a h3').innerHTML
            const bulletLink = bullet.querySelector('a').href

            return { bulletTitle, bulletLink }
        })

        return { title, titleLink, bullets }

    }))

    const column1news = await page.$$eval('.post-column-1 .theme-esporte', (divs) => divs.map((div) => {
        const basePath = '.container .post'
        const title = div.querySelector(`${basePath} a h3`).innerHTML
        const titleLink = div.querySelector(`${basePath} a`).href

        const getBullets = Array.from(div.querySelectorAll('.bullets ul li div'))
        const bullets = getBullets.map((bullet) => {
            const bulletTitle = bullet.querySelector('a h3').innerHTML
            const bulletLink = bullet.querySelector('a').href

            return { bulletTitle, bulletLink }
        })

        return { title, titleLink, bullets }
    }))

    const column2news = await page.$$eval('.post-column-2 .theme-entretenimento', (divs) => divs.map((div) => {
        const basePath = '.container .post'
        const title = div.querySelector(`${basePath} a h3`).innerHTML
        const titleLink = div.querySelector(`${basePath} a`).href

        const getBullets = Array.from(div.querySelectorAll('.bullets ul li div'))
        const bullets = getBullets.map((bullet) => {
            const bulletTitle = bullet.querySelector('a h3').innerHTML
            const bulletLink = bullet.querySelector('a').href

            return { bulletTitle, bulletLink }
        })

        return { title, titleLink, bullets }
    }))

    await browser.close()

    return { mainBanner, otherBannerNews, top6news, column1news, column2news }
}