const express = require('express')
const request = require('request-promise-native')

// in this implementation we are using prod neuro,
// for the hackathon we might need this key if we are using
// hackathon neuro
const key = '31b2bb0e-85ec-4406-9b22-31c93d7e75f9'

const mapNeuroNewsItem = (item) => {

  // this check exists because a neuro article might not have an image
  const imageUrl = item.summaryImage ? item.summaryImage.concreteImages[0].mediaLink.href : ''

  return {
    id: item.id,
    title: item.title,
    source: 'neuro',
    sourceId: item.id,
    image: imageUrl,
    publishedAt: null,
    readablePublishedAt: null,
    updatedAt: item.publishedLastTimeAt,
    readableUpdatedAt: null,
    numViewers: null
  }
}

const router = express.Router()

router.get('/top-stories', (req, res) => {

  return request({
    uri: 'https://services.radio-canada.ca/neuro/v1/future/lineups/4159',
    json: true
  })

  .then(data => {
    return res.send(data.pagedList.items.map(mapNeuroNewsItem))
  })
})

router.get('/world', (req, res) => {

  return request({
    uri: 'https://services.radio-canada.ca//neuro/v1/themes/2/lineup',
    json: true
  })

  .then(data => {
    return res.send(data.pagedList.items.map(mapNeuroNewsItem))
  })
})

router.get('/local', (req, res) => {

  return request({
    uri: 'https://services.radio-canada.ca/neuro/v1/regions/27/lineup?pageNumber=1',
    json: true
  })

  .then(data => {
    return res.send(data.pagedList.items.map(mapNeuroNewsItem))
  })
})

module.exports = router