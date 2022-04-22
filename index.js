const PORT = 8010
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const { response } = require('express')
const res = require('express/lib/response')

// call/invoke the express package as a class instance 
const app = express()

const slNewsPapers = [
    {
        name: 'AwokoNews',
        address: 'https://awokonewspaper.sl/'


    },
    {
        name: 'TheCalabash',
        address: '   https://thecalabashnewspaper.com/'

    },
    {
        name: 'FritongPost',
        address: 'https://fritongpost.com/'

    },
    {
        name: 'AwokoNews',
        address: 'https://awokonewspaper.sl/'

    },
    {
        name: 'AwokoNews',
        address: 'https://awokonewspaper.sl/'

    },

    {
        name: 'SalonePost',
        address: 'https://salonepost.com/'

    },
    {
        name: 'SierraExpressMedia',
        address: 'https://sierraexpressmedia.com/'

    },
    {
        name: 'SierraLeoneInfo',
        address: 'http://www.sierra-leone.info/'

    },

    {
        name: 'SierraLeoneNews',
        address: 'https://www.sierraleonenews.net/',
        base: 'https://www.sierraleonenews.net/'

    },
    {
        name: 'SierraLeonePress',
        address: 'https://www.sierraleonepress.com/'

    },
    {
        name: 'SierraLeoneTelegraph',
        address: 'https://www.thesierraleonetelegraph.com/'

    },
    {
        name: 'SierraLeoneTimes',
        address: 'https://sierraleoneview.net/'

    },
    {
        name: 'SierraLeoneView',
        address: 'https://sierraleoneview.net/'

    },
    {
        name: 'SierraNetworkSalone',
        address: 'https://snradio.net/'

    },
    {
        name: 'StandardTimesNewspaper',
        address: 'http://standardtimespress.org/'

    },
    {
        name: 'StatehouseGovernment',
        address: 'https://statehouse.gov.sl/'

    },
    {
        name: 'SwitSalone',
        address: 'https://www.switsalone.com/'

    },

    {
        name: 'TheNewHumanitarian',
        address: 'https://www.thenewhumanitarian.org/africa/west-africa/sierra-leone'

    },
    {
        name: 'TheOrganiser',
        address: 'https://theorganiser.net/'

    },

    {
        name: 'ThisisSierraLeone',
        address: 'http://www.thisissierraleone.com/'

    }

]

// pass all the articles scraped from an array
const articles = []
// pass  in th ('/') for the homepage
// pass('/test') for a page called test
app.get('/', (req, res) => {
    res.json('Welcome to Sierra Leone News API')
})

app.get('/news', (req, res) => {

    slNewsPapers.forEach(slNewsPaper => {
        axios.get(slNewsPaper.address)
            .then(response => {
                const html = response.data
                // console.log(html)
                const $ = cheerio.load(html)
                $('a:contains("Sierra")', html).each(function () {
                    const title = $(this).text()
                    const url = $(this).attr('href')
                    articles.push({ title, url: slNewsPaper.base + url, source: slNewsPaper.address })
                })
                res.json(articles)
            }).catch((err) => console.log(err))

    })
})
// 


//     // res.json('Welcome to Sierra Leone News API')
//     // axios.get('https://www.theguardian.com/environment/climate-crisis')
//     axios.get('https://www.switsalone.com/category/people/')
//         // chaining
//         .then((response) => {
//             const html = response.data
//             console.log(html)
//             // pick out the html elements/tag using cheerio 
//             const $ = cheerio.load(html)

//             $('a:contains("Sierra")', html).each(function () {
//                 const title = $(this).text()
//                 const url = $(this).attr('href')
//                 articles.push({ title, url })
//             })
//             res.json(articles)

//         }).catch((err) => console.log(err))


// app.get('/news/:paperName', async (req, res) => {
//     const paperName = req.params.paperName
//     const slNewsPaperAddress = slNewsPapers.filter(slNewsPaper => slNewsPaper.name === paperName)[0].address
//     // console.log(slNewsPaperAddress)
//     axios.get()

// })
// port listening 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))