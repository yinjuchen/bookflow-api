const handleUpdateProfile = (req, res, db) => {
  const { bio, userid } = req.body
  const getUserId = parseInt(userid, 10)

  db('users')
    .where({ userid: getUserId })
    .update({ bio })
    .returning('*')
    .then(user => {
      if (user.length) {
        res.json(user[0])
      } else {
        res.status(400).send('User not found')
      }
    })
    .catch(error => res.status(400).json('Unable to get the user'))
}

module.exports = {
  handleUpdateProfile: handleUpdateProfile
}