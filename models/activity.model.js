class Activity {
  constructor({ destinationId, name, time, description, type, imageUrl, entryFee, activities, contactInfo }) {
    this.destinationId = destinationId;
    this.name = name;
    this.time = time;
    this.description = description;
    this.type = type;
    this.imageUrl = imageUrl;
    this.entryFee = entryFee;
    this.activities = activities;
    this.contactInfo = contactInfo;
  }
}

export default Activity;
