const handleProfile = (req, res, db) => {
  const { userid } = req.params;
  db.select('*').from('users').where({ userid })
    .then(user => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(400).send('Not found');
      }
    })
    .catch(error => res.status(400).json('Error getting user'));
}

module.exports = {
  handleProfile: handleProfile
}