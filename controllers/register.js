const handleRegister = (req, res, db, bcrypt) => {
  const { email, name, password } = req.body
  if (!email || !name || !password) {
    return res.status(400).json('incorrect from submittion')
  }
  const hash = bcrypt.hashSync(password)
  db.transaction(trx => {
    trx.insert({
      hash: hash,
      email: email
    })
      .into('login')
      .returning('email')
      .then(loginEmail => {
        return trx('users')
          .returning('*')
          .insert({
            email: loginEmail[0].email,
            name: name,
            joined: new Date()
          })
          .then(users => {
            res.json(users[0])
          })
      })
      .then(trx.commit)
      .catch(trx.rollback)
  })
    .catch(error => {
      console.error(error)
      let errorMessage = 'Unable to register'
      if (error.code === '23505') {
        errorMessage = 'Email already registered'
      }
      res.status(400).json({ error: errorMessage })
    })
}

module.exports = {
  handleRegister: handleRegister
}