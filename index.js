const path = require('path')
const fa = require('fair-analytics')
const mkdirp = require('mkdirp')

const datadir = process.env.DATADIR || path.join(__dirname, 'data')
const port = process.env.PORT || 6978

mkdirp.sync(datadir)

const app = fa({
  storageDirectory: path.resolve(datadir),
  memory: (process.env.NODE_ENV === 'development')
})
const { feed } = app

feed.on('ready', () => {
  var server = app.listen(port, '0.0.0.0').on('listening', function () {
    console.log(`listening at: ${server.address().address}:${server.address().port}`)
  })
})
