class Activity {
  constructor({
    destinationId,
    name,
    timeStart,
    timeEnd,
    dayOfWeek,
    description,
    type,
    imageUrl,
    entryFee,
    sponsors,
    activities,
    contactInfo
  }) {
    this.destinationId = destinationId;
    this.name = name;
    this.timeStart = timeStart;
    this.timeEnd = timeEnd;
    this.dayOfWeek = dayOfWeek;
    this.description = description;
    this.type = type;
    this.imageUrl = imageUrl;
    this.entryFee = entryFee;
    this.sponsors = sponsors;
    this.activities = activities;
    this.contactInfo = contactInfo;
  }
}

export default Activity;
