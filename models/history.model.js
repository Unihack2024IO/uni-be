class TravelHistory {
  constructor({ userId, destination, rating, favoriteActivities, travelDates, travelCompanions }) {
    this.userId = userId;
    this.destination = destination;
    this.rating = rating;
    this.favoriteActivities = favoriteActivities;
    this.travelDates = {
      start: travelDates.start,
      end: travelDates.end
    };
    this.travelCompanions = travelCompanions;
  }
}

export default TravelHistory;
