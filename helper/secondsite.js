import puppeteer from 'puppeteer';
import path from 'path'
import useProxy from 'puppeteer-page-proxy'

export const LAUNCH_PUPPETEER_OPTS = {
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--disable-accelerated-2d-canvas',
    '--disable-gpu',
    '--window-size=2880x1800'
  ],
  headless: false
};

export const PAGE_PUPPETEER_OPTS = {
  networkIdle2Timeout: 5000,
  waitUntil: 'networkidle2',
  timeout: 5000
};

export async function getSecondPageContent(url){
    try{
        const browser = await puppeteer.launch(LAUNCH_PUPPETEER_OPTS)
        const page = await browser.newPage()
        await page.goto(url, PAGE_PUPPETEER_OPTS)
       // await page.click('#vendorlead > div.landing-ref-link > a',{waitUntil: 'domcontentloaded'})
       // await page.waitForSelector('#search-by-reference')
       // await page.type('#search-by-reference','7786302WJ9178F0007FK')

        /*await Promise.all([
          page.click('#__BVID__39 > p > form > div.text-center > button'),
          page.waitForNavigation({ waitUntil: 'networkidle2' }),
          page.waitForSelector('#property-form > div > div.card-body > div:nth-child(3) > h3', {timeout: 3000}),
          
        ]);
        

      
        const dataHandles = await page.$$('.card-body > .card-price-info')
        const attempts = 3
        const results = {}
        for(let i = 1; i<=attempts; i++ ){
          for (const dataHandle of dataHandles){
          try{
            const price = await page.evaluate(el=>el.querySelector('h3').textContent,dataHandle)
            const name = await page.evaluate(el=>el.querySelector('small').textContent,dataHandle) 
            const min = await page.evaluate(el=>{
              const spans = el.querySelectorAll('span');
              const texts = Array.from(spans, span => span.textContent);
              return texts;
            },dataHandle) 
            if (price === 'No disponible'){
              await page.waitForTimeout(500)
              break
            }
            results[name] = price
            results[name + '-min/max'] = min[0] + ' - ' + min[1]
            }catch(err){
            console.log(err.message)
            }
          }
          if(Object.keys(results).length !== 0){
            break
          }
        }
        console.log(results)*/
       // browser.close()
       // return 
    }catch(err){
        throw err
    }
    

}