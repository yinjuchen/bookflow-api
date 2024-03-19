
const handleRecommendationRetrieve = (req, res, db) => {
  const { userid } = req.params
  db.select('*').from('recommendations').where('userid', '=', userid)
  .then(recommendations => {
    if(recommendations.length > 0) {
      return res.json(recommendations)
    } else {
      res.status(400).json('No recommendations found')
    }
  })
  .catch(error => {
    console.error(error)
    res.status(500).json('Error retrieving recommendations')
  })
}

module.exports = {
  handleRecommendationRetrieve: handleRecommendationRetrieve
}