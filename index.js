import express from 'express'
import dotenv from 'dotenv'
import cheerio from 'cheerio'
import puppeteer from 'puppeteer'
import {getPageContent} from './helper/puppeteer.js'
import {getSecondPageContent} from './helper/secondsite.js'
import {PuppeteerService} from './helper/PuppeteerService.js'



dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000
const url = 'https://valoracion.redpiso.es'
const url2 = 'https://www.idealista.com/valoracion-de-inmuebles'
//const url2 = 'https://bot.sannysoft.com/'
const start = async()=>{
    try {
       // const content =  await getPageContent(url)
      // await getSecondPageContent(url2)
       // console.log(price)
       const puppeteerService = new PuppeteerService();
       await puppeteerService.initiate()
       await puppeteerService.crawl(url2)
       console.log(puppeteerService)
    } catch (error) {
        console.error(error.message)
    }
    

    app.listen(PORT, () => {
        console.log(`server started at PORT: ${PORT}`)
    })

}

start()
