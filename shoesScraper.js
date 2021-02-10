const puppeteer = require('puppeteer');
const opn = require('open')


const size = process.argv[2];

const scrapingShoes = async (url) => {
  const browser = await puppeteer.launch();

  const page = await browser.newPage();

  await page.goto(url);
  
  await page.click(`[data-product-size="${size}"]`);  
  
  await page.waitForSelector('[data-product-size]');
  
  await page.waitForTimeout(2000)

  
  
  const canBuy = await page.evaluate(() => {
    const button = document.querySelector('[data-button-action=add-to-cart]');

    return !button.hasAttribute('disabled');
       
  })
  
  console.log(canBuy ? `¡Ojo!, parece que sí que hay zapatos de la talla ${size}: ${page.url()}` : `Lo siento, no hay zapatos de la talla ${size} en Yokono`);

  if (canBuy) {
    
  
    await page.screenshot({ path: `shoes-${size}.jpeg` });
   
    opn(page.url())
    
  }



  await browser.close();
};

scrapingShoes('https://yokono.es/779-26360-zapato-plano-sodio-001-kaki.html#/');
