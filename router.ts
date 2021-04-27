import * as express from 'express'

const router = express.Router()

router.get('/checkAuth.js', (req, res) => {
  res.sendFile(__dirname + '/src/template/checkAuth.js')
})

router.get('/', (req, res, next) => {
  res.redirect('/signin')
})

router.get('/signin', (req, res) => {
  res.sendFile(__dirname + '/src/template/signin.html')
})
router.get('/signin.js', (req, res) => {
  res.sendFile(__dirname + '/src/template/signin.js')
})

router.get('/signup', (req, res) => {
  res.sendFile(__dirname + '/src/template/signup.html')
})
router.get('/signup.js', (req, res) => {
  res.sendFile(__dirname + '/src/template/signup.js')
})

router.get('/room', (req, res) => {
  res.sendFile(__dirname + '/src/template/main.html')
})
router.get('/main.js', (req, res) => {
  res.sendFile(__dirname + '/src/template/main.js')
})

router.get('/user', (req, res) => {
  res.sendFile(__dirname + '/src/template/user.html')
})
router.get('/user.js', (req, res) => {
  res.sendFile(__dirname + '/src/template/user.js')
})

router.get('/friend', (req, res) => {
  res.sendFile(__dirname + '/src/template/friend.html')
})
router.get('/friend.js', (req, res) => {
  res.sendFile(__dirname + '/src/template/friend.js')
})

router.get('/friend/list', (req, res) => {
  res.sendFile(__dirname + '/src/template/friendList.html')
})
router.get('/friendList.js', (req, res) => {
  res.sendFile(__dirname + '/src/template/friendList.js')
})

export default router