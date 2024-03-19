
const handleSearchbooks = async (req, res) => {
  const { searchQuery } = req.body
  const apiKey = 'AIzaSyBtAa9uMAr4-S2nivZsNFbIrfi8ipeHkLE'
  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchQuery)}&maxResults=6&key=${apiKey}`

  try {
    const response = await fetch(url)
    const data = await response.json()
    res.json(data)
  }
  catch (error) {
    console.log(error)
  }
}

module.exports = {
  handleSearchbooks: handleSearchbooks
}