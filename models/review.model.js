class Review {
  constructor(name, userId, rating, comment, destinationId, date, reviewImages) {
    this.name = name;
    this.userId = userId;
    this.rating = rating;
    this.comment = comment;
    this.destinationId = destinationId;
    this.date = date;
    this.reviewImages = reviewImages;
  }
}

export default Review;
