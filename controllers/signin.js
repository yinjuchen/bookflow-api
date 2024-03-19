const handleSignIn = (req, res, db, bcrypt) => {
  const {email, password} = req.body
  if (!email || !password) {
    return res.status(400).json('incorrect from submittion')
  }
  db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data => {
      const isValid = bcrypt.compareSync(req.body.password, data[0].hash)
      if (isValid) {
        return db.select('*').from('users')
          .where('email', '=', email)
          .then(users => {
            res.json(users[0])
          })
          .catch(err => res.status(400).json('unable to get user data'))
      } else {
        res.status(400).json('wrong credential')
      }
    })
    .catch(error => res.status(400).json('err signing in'))
}

module.exports = {
  handleSignIn: handleSignIn
}