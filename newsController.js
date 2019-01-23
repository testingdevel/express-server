const express = require('express')
const request = require('request-promise-native')

const router = express.Router()


const mapTopStories = (story) => {
  return {
    id: story.id,
    title: story.title,
    source: story.source,
    sourceId: story.sourceId,
    numViewers: story.typeAttributes.trending.numViewers,
    image: story.typeAttributes.imageLarge
  }
}


router.get('/top-stories', (req, res) => {

  return request({
    uri: 'https://api-gw.radio-canada.ca/aggregate-content/v1/items?lineupSlug=trending-news',
    json: true
  })

  .then(data => {
    return res.send(data.map(mapTopStories))
  })
})

module.exports = router