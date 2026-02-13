require('dotenv').config()
const express = require('express')
const axios = require('axios')
const crypto = require('crypto')

const app = express()

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URI = process.env.REDIRECT_URI

let accessToken = null
let refreshToken = null

// Page d'accueil
app.get('/', (req, res) => {
  res.send('<a href="/login">Se connecter avec Spotify</a>')
})

// Rediriger vers Spotify
app.get('/login', (req, res) => {
  const state = crypto.randomBytes(16).toString('hex')
  const scopes = 'user-read-private user-read-email playlist-read-private'

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: CLIENT_ID,
    scope: scopes,
    redirect_uri: REDIRECT_URI,
    state: state
  })

  res.redirect('https://accounts.spotify.com/authorize?' + params.toString())
})

// Spotify redirige ici avec le code
app.get('/callback', async (req, res) => {
  const code = req.query.code
  const error = req.query.error

  if (error) {
    return res.send('Erreur : ' + error)
  }

  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: REDIRECT_URI
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')
        }
      }
    )

    accessToken = response.data.access_token
    refreshToken = response.data.refresh_token

    res.redirect('/profile')
  } catch (err) {
    res.send('Erreur : ' + err.message)
  }
})

// Afficher le profil Spotify
app.get('/profile', async (req, res) => {
  // Fonction pour rafraîchir le token automatiquement
async function refreshAccessToken() {
  const response = await axios.post(
    'https://accounts.spotify.com/api/token',
    new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')
      }
    }
  )
  accessToken = response.data.access_token
}

// Afficher le profil Spotify
app.get('/profile', async (req, res) => {
  if (!accessToken) {
    return res.redirect('/login')
  }

  try {
    const response = await axios.get('https://api.spotify.com/v1/me', {
      headers: { 'Authorization': 'Bearer ' + accessToken }
    })
    res.json(response.data)
  } catch (err) {
    // Si le token est expiré, on le rafraîchit automatiquement
    if (err.response && err.response.status === 401 && refreshToken) {
      try {
        await refreshAccessToken()
        const response = await axios.get('https://api.spotify.com/v1/me', {
          headers: { 'Authorization': 'Bearer ' + accessToken }
        })
        res.json(response.data)
      } catch (refreshErr) {
        res.redirect('/login')
      }
    } else {
      res.redirect('/login')
    }
  }
})})