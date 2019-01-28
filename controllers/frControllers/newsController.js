const express = require('express')
const request = require('request-promise-native')

const key = '31b2bb0e-85ec-4406-9b22-31c93d7e75f9'

const mapNeuroNewsItem = (item) => {
  return {
    id: item.id,
    title: item.title,
    source: 'neuro',
    sourceId: item.id,
    image: item.typeAttributes.imageLarge,
    publishedAt: item.publishedAt,
    readablePublishedAt: item.readablePublishedAt,
    updatedAt: item.updatedAt,
    readableUpdatedAt: item.readableUpdatedAt,
    numViewers: item.typeAttributes.trending.numViewers
  }
}

const router = express.Router()

router.get('/top-stories', (req, res) => {

  return request({
    uri: `https://services.radio-canada.ca/neuro/v1/themes/1/lineup?client_key=${key}`,
    json: true
  })

  .then(data => {
    return res.send(data.pagedList.items[0])
  })
})

module.exports = router