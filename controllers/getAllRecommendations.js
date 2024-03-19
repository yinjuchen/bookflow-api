
const handleGetAllRecommendation = (req, res, db) => {
  db.select('*').from('recommendations')
    .then(recommendations => {
      if (recommendations.length > 0) {
        res.json(recommendations)
      }
    })
    .catch(error => {
      console.error(error)
      res.status(500).json('Error retrieving recommendations')
    })
}

module.exports = {
  handleGetAllRecommendation: handleGetAllRecommendation
}