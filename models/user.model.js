class User {
  constructor({ personalInfo, preferences, healthInfo, activity, references }) {
    this.personalInfo = personalInfo;
    this.preferences = preferences;
    this.healthInfo = healthInfo;
    this.activity = activity;
    this.references = references;
  }
}

export default User;
