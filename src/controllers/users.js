const { Router } = require('express')

const router = new Router()

router.get('/', async (req, res) => {
  const { knex } = req

  const data = await knex('users').select('*')

  return res.json(data)
})

module.exports = router
