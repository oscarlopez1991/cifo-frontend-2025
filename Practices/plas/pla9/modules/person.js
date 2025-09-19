// This is a class.
// We can use it from other JavaScript files because we `export` it.

export class Person {
  constructor(name, dob, gender, hobby) {
    this.name = name;
    this.dob = dob;
    this.gender = gender;
    this.hobby = hobby;
  }

  greet() {
    return `Hi! My name is ${this.name}, I was born in ${this.dob.getFullYear()} and I love ${this.hobby}`;
  }

  updateHobby(newHobby) {
    this.hobby = newHobby;
  }
}
