class Stop {
  constructor({
    name,
    address,
    phone,
    email,
    website,
    type,
    description,
    rating,
    reviews,
    priceRange,
    services,
    images,
    location,
    openingHours
  }) {
    this.name = name;
    this.address = address;
    this.phone = phone;
    this.email = email;
    this.website = website;
    this.type = type;
    this.description = description;
    this.rating = rating;
    this.reviews = reviews;
    this.priceRange = priceRange;
    this.services = services;
    this.images = images;
    this.location = location;
    this.openingHours = openingHours;
  }
}

export default Stop;
