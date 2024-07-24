class Destination {
  constructor({
    name,
    priceRange,
    transportation,
    attractions,
    cuisine,
    recreationalActivities,
    safetyAndSecurity,
    localCultureAndCustoms,
    idealWeather,
    location,
    accommodations,
    popularTimes,
    contactInfo
  }) {
    this.name = name;
    this.priceRange = priceRange;
    this.transportation = transportation;
    this.attractions = attractions;
    this.cuisine = cuisine;
    this.recreationalActivities = recreationalActivities;
    this.safetyAndSecurity = safetyAndSecurity;
    this.localCultureAndCustoms = localCultureAndCustoms;
    this.idealWeather = idealWeather;
    this.location = location;
    this.accommodations = accommodations;
    this.popularTimes = popularTimes;
    this.contactInfo = contactInfo;
  }
}

export default Destination;
