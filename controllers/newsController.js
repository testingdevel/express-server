const express = require('express')
const request = require('request-promise-native')

const router = express.Router()

// mapping function
const mapTopStories = (story) => {
  return {
    id: story.id,
    title: story.title,
    source: story.source,
    sourceId: story.sourceId,
    image: story.typeAttributes.imageLarge,
    publishedAt: story.publishedAt,
    readablePublishedAt: story.readablePublishedAt,
    updatedAt: story.updatedAt,
    readableUpdatedAt: story.readableUpdatedAt,
    numViewers: story.typeAttributes.trending.numViewers
  }
}

const mapWorldNews = (story) => {
  return {
    id: story.id,
    title: story.title,
    source: story.source,
    sourceId: story.sourceId,
    image: story.typeAttributes.imageLarge,
    publishedAt: story.publishedAt,
    readablePublishedAt: story.readablePublishedAt,
    updatedAt: story.updatedAt,
    readableUpdatedAt: story.readableUpdatedAt
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

router.get('/world', (req, res) => {

  return request({
    uri: 'https://api-gw.radio-canada.ca/aggregate-content/v1/categories/36/items',
    json: true
  })

  .then(data => {
    return res.send(data.map(mapWorldNews))
  })
})

module.exports = router