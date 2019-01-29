const express = require('express')
const request = require('request-promise-native')

const router = express.Router()

const mapAggrNewsItem = (item) => {
  return {
    id: item.id,
    title: item.title,
    source: item.source,
    sourceId: item.sourceId,
    image: item.typeAttributes.imageLarge,
    publishedAt: item.publishedAt,
    readablePublishedAt: item.readablePublishedAt,
    updatedAt: item.updatedAt,
    readableUpdatedAt: item.readableUpdatedAt,
    numViewers: item.typeAttributes.trending.numViewers,
    url: item.typeAttributes.url
  }
}


router.get('/top-stories', (req, res) => {

  return request({
    uri: 'https://api-gw.radio-canada.ca/aggregate-content/v1/items?lineupSlug=trending-news',
    json: true
  })

  .then(data => {
    return res.send(data.map(mapAggrNewsItem))
  })
})

router.get('/world', (req, res) => {

  return request({
    uri: 'https://api-gw.radio-canada.ca/aggregate-content/v1/categories/36/items',
    json: true
  })

  .then(data => {
    return res.send(data.map(mapAggrNewsItem))
  })
})

// hardcoding toronto for now
// we will have to have a mapping file of
// region => aggr categoryId
router.get('/local', (req, res) => {

  return request({
    uri: 'https://www.cbc.ca/aggregate_api/v1/categories/55/items',
    json: true
  })

  .then(data => {
    return res.send(data.map(mapAggrNewsItem))
  })
})

module.exports = router