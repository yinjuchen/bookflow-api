const handleRecommendation = (req, res, db, transporter) => {
  const {
    bookTitle,
    authorName,
    genre,
    recommendationText,
    recipientEmail,
    userid,
  } = req.body;

  const getUserId = parseInt(userid, 10)

  db('recommendations')
    .returning('*')
    .insert({
      userid: getUserId,
      booktitle: bookTitle,
      authorname: authorName,
      genre: genre,
      recommendationtext: recommendationText,
      recipientemail: recipientEmail
    })
    .then(recommendation => {
      // Define the email options
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: recipientEmail,
        subject: 'Book Recommendation',
        text: `Here is a new book recommendation for you:
          \nTitle: ${bookTitle}
          \nAuthor: ${authorName}
          \nGenre: ${genre}
          \nWhy I recommend it: ${recommendationText}`
      }

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          res.status(500).json({ error: "Failed to send email" })
        } else {
          console.log('Email sent: ' + info.response);
          // Since this is the successful path, ensure no code after this point attempts another response
          res.json({ message: 'Recommendation submitted successfully via email', recommendation: recommendation[0]})
        }
      })
    })
    .catch(error => {
      console.log('Error when sending a recommendation', error)
      res.status(400).json('Unable to send recommendation')
    })
}

module.exports = {
  handleRecommendation: handleRecommendation
}
