const Application = require('./app')

const app = new Application()

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
