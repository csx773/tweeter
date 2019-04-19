'use strict'

const userHelper = require('../lib/util/user-helper')

const express = require('express')
const tweetsRoutes = express.Router()

module.exports = function (DataHelpers) {
/// GET route
  tweetsRoutes.get('/', function (req, res) {
    DataHelpers.getTweets((err, tweets) => {
      if (err) {
        res.status(500).json({ error: err.message })
      } else {
        // sends the tweets back to client
        res.json(tweets)
      }
    })
  })

  /// /POST route
  tweetsRoutes.post('/', function (req, res) {
    if (!req.body.text) {
      res.status(400).json({ error: 'invalid request: no data in POST body' })
      return
    }
    // constructing user and tweet object
    const user = req.body.user ? req.body.user : userHelper.generateRandomUser()
    const tweet = {
      user: user,
      content: {
        text: req.body.text
      },
      created_at: Date.now()
    }

    DataHelpers.saveTweet(tweet, (err) => {
      if (err) {
        res.status(500).json({ error: err.message })
      } else {
        // sends status code to client (browser). NO rep.body values are sent
        res.status(201).send()
      }
    })
  })

  return tweetsRoutes
}
