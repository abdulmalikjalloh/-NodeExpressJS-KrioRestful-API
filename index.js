const PORT = process.env.PORT || 8010
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const { response } = require('express')
const res = require('express/lib/response')

// call/invoke the express package as a class instance 
const app = express()

const slNewsPapers = [
    {
        name: 'All Peoples Communication',
        address: 'https://allafrica.com/sierraleone/',
        base: 'https://allafrica.com/sierraleone/'


    },
    {
        name: 'AllAfrica.com - Sierra Leone',
        address: 'hhttps://allafrica.com/sierraleone/',
        base: 'https://allafrica.com/sierraleone/'


    },
    // {
    //broken link
    //     name: 'Awareness Times',
    //     address: 'http://www.news.sl/',
    //     base: 'https://awokonewspaper.sl/'


    // },
    {
        name: 'AwokoNews',
        address: 'https://awokonewspaper.sl/',
        base: 'https://awokonewspaper.sl/'


    },
    {
        name: 'AYV Newspaper',
        address: 'http://www.ayvnewspaper.com/',
        base: 'http://www.ayvnewspaper.com/'

    },

    {
        name: 'Cocorioko',
        address: 'https://cocorioko.net/',
        base: 'https://cocorioko.net/'

    },
    {
        name: 'Critique Echo Newspaper',
        address: 'http://www.critiqueecho.com/',
        base: 'http://www.critiqueecho.com/'

    },
    {
        name: 'FritongPost',
        address: 'https://fritongpost.com/',
        base: 'https://fritongpost.com/'

    },

    // {
    //broken link
    //     name: 'De Mirror',
    //     address: 'http://www.demirrornewspaper.com/', 

    // },
    {
        name: 'globaltimes',
        address: 'https://globaltimes-sl.com/en/',
        base: 'https://globaltimes-sl.com/en/'

    },
    {
        name: 'newstimeafrica',
        address: 'https://www.newstimeafrica.com/',
        base: 'https://www.newstimeafrica.com/'

    },

    {
        name: 'Newswatch Newspaper',
        address: 'lBroken link',
        base: ''

    },
    // {
    //broken link
    //     name: 'Night Watch SL',
    //     address: 'http://www.nightwatchsl.com/',  
    //     base: ''

    // },
    // {
    //broken link
    //     name: 'Patriotic Vanguard',
    //     address: 'https://www.thepatrioticvanguard.com/',
    //     base: 'https://www.thepatrioticvanguard.com/'

    // },
    {
        name: 'PoliticoSL',
        address: 'https://politicosl.com/',
        base: 'https://politicosl.com/'

    },

    {
        name: 'SalonePost',
        address: 'https://salonepost.com/',
        base: 'https://salonepost.com/'

    },
    {
        name: 'SierraExpressMedia',
        address: 'https://sierraexpressmedia.com/',
        base: 'https://sierraexpressmedia.com/'

    },
    {
        name: 'SierraLeoneInfo',
        address: 'http://www.sierra-leone.info/',
        base: 'http://www.sierra-leone.info/'


    },

    {
        name: 'SierraLeoneNews',
        address: 'https://www.sierraleonenews.net/',
        base: 'https://www.sierraleonenews.net/'

    },
    {
        name: 'SierraLeonePress',
        address: 'https://www.sierraleonepress.com/',
        base: 'https://www.sierraleonepress.com/'


    },
    {
        name: 'SierraLeoneTelegraph',
        address: 'https://www.thesierraleonetelegraph.com/',
        base: 'https://www.thesierraleonetelegraph.com/'


    },
    {
        name: 'SierraLeoneTimes',
        address: 'https://sierraleoneview.net/',
        base: 'https://sierraleoneview.net/'

    },
    {
        name: 'SierraLeoneView',
        address: 'https://sierraleoneview.net/',
        base: 'https://sierraleoneview.net/'

    },
    {
        name: 'SierraNetworkSalone',
        address: 'https://snradio.net/',
        base: 'https://snradio.net/'

    },
    {
        name: 'StandardTimesNewspaper',
        address: 'http://standardtimespress.org/',
        base: 'http://standardtimespress.org/'

    },
    {
        name: 'StatehouseGovernment',
        address: 'https://statehouse.gov.sl/',
        base: 'https://statehouse.gov.sl/'

    },
    {
        name: 'SwitSalone',
        address: 'https://www.switsalone.com/',
        base: 'https://www.switsalone.com/'

    },
    {
        name: 'TheCalabash',
        address: 'https://thecalabashnewspaper.com/',
        base: 'https://thecalabashnewspaper.com/'

    },

    {
        name: 'ThisisSierraLeone',
        address: 'http://www.thisissierraleone.com/',
        base: 'http://www.thisissierraleone.com/'

    },
    {
        name: 'TheNewHumanitarian',
        address: 'https://www.thenewhumanitarian.org/africa/west-africa/sierra-leone',
        base: 'https://www.thenewhumanitarian.org'

    },
    {
        name: 'TheOrganiser',
        address: 'https://theorganiser.net/',
        base: ''

    },

]

// pass all the articles scraped from an array
const articles = []


slNewsPapers.forEach(slNewsPaper => {
    axios.get(slNewsPaper.address)
        .then(response => {
            const html = response.data
            // console.log(html)
            const $ = cheerio.load(html)
            $('a:contains("Sierra")', html).each(function () {
                const title = $(this).text()
                const url = $(this).attr('href')
                articles.push({
                    title,
                    url: slNewsPaper.base + url,
                    source: slNewsPaper.address
                })
            })

        }).catch((err) => console.log(err))

})

// pass  in th ('/') for the homepage
// pass('/test') for a page called test
app.get('/', (req, res) => {
    res.json('Welcome to Sierra Leone News API')
})
app.get('/news', (req, res) => {
    res.json(articles)
})


app.get('/news/:paperName', async (req, res) => {
    const paperName = req.params.paperName
    const slNewsPaperAddress = slNewsPapers.filter(slNewsPaper => slNewsPaper.name == paperName)[0].address
    console.log(slNewsPaperAddress)

    const slNewsPaperBase = slNewsPapers.filter(slNewsPaper => slNewsPaper.name == paperName)[0].base
    axios.get(slNewsPaperAddress)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            const byArticle = []


            $('a:contains("Sierra")', html).each(function () {
                const title = $(this).text()
                const url = $(this).attr('href')
                byArticle.push({
                    title,
                    url: slNewsPaperBase + url,
                    source: paperName
                })
            })
            res.json(byArticle)

        }).catch((err) => console.log(err))

})



// app.get('/news', (req, res) => {

//     slNewsPapers.forEach(slNewsPaper => {
//         axios.get(slNewsPaper.address)
//             .then(response => {
//                 const html = response.data
//                 // console.log(html)
//                 const $ = cheerio.load(html)
//                 $('a:contains("Sierra")', html).each(function () {
//                     const title = $(this).text()
//                     const url = $(this).attr('href')
//                     articles.push({ title, url, source: slNewsPaper.name }) //: slNewsPaper.base + url, source: slNewsPaper.address })
//                 })
//                 res.json(articles)
//             }).catch((err) => console.log(err))

//     })
// })



const londonNewsPapers = [
    {
        name: 'TheTimes',
        address: 'https://www.thetimes.co.uk/environment/climate-change'


    },
    {
        name: 'TheGuardian',
        address: 'https://www.theguardian.com/environment/climate-crisis'


    },
    {
        name: 'Telegraph',
        address: 'https://www.telegraph.co.uk/climate-change/'


    }
]
// pass all the articles scraped from an array
const garticles = []
app.get('/guardian', (req, res) => {
    // res.json('Welcome to Guardian News API')
    axios.get('https://www.theguardian.com/environment/climate-crisis')
        // chaining
        .then((response) => {
            const html = response.data
            // console.log(html)
            // pick out the html elements/tag using cheerio 
            const $ = cheerio.load(html)

            $('a:contains("climate")', html).each(function () {
                const title = $(this).text()
                const url = $(this).attr('href')
                garticles.push({ title, url })
            })
            res.json(garticles)

        }).catch((err) => console.log(err))

})


// port listening 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))