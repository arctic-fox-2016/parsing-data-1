"use strict"


const fs = require("fs");


class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(property = {}){
    this._id = property["id"];
    this._first_name = property["first_name"];
    this._last_name = property["last_name"];
    this._email = property["email"];
    this._phone = property["phone"];
    this._created_at = property["created_at"];
  }

}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = []
  }

  get file(){ return this._file; }
  set people(value){ this._people[this._people.length] = value; }
  get people(){
    // If we've already parsed the CSV file, don't parse it again
    // Remember: people is null by default
    if (this._people) return this._people

    // We've never called people before, now parse the CSV file
    // and return an Array of Person objects here
    // Save the Array in the people instance variable.
  }

  addPerson(property){
    this.people = property
  }

  save(){
    var people_data = this.people;
    var new_data = "";

    for(let idx = 0; idx < people_data.length; idx++){
      let string_data = people_data[idx].id + "," + people_data[idx].firstname + "," + people_data[idx].lastname + "," + people_data[idx].email + "," + people_data[idx].phone + "," + people_data[idx].created_at;
      new_data += string_data + "\n";
    }

    fs.writeFile(this.file, new_data, (err) => {
        if(err) throw err;
        console.log('It\'s saved!');
    });
  }

}

let parser = new PersonParser('people.csv')
const csv = require("fast-csv");

csv.fromPath(parser.file).on("data", function(data){
    let property = {
      "id":data[0],
      "firstname":data[1],
      "lastname":data[2],
      "email":data[3],
      "phone":data[4],
      "created_at":data[5]
    };
    parser.addPerson(property)
 }).on("end", function(){
    console.log(`There are ${parser.people.length-1} people in the file '${parser.file}'.`)

    let new_property = {
      "id":parser.people.length,
      "firstname":"Kun",
      "lastname":"Lanang",
      "email":"kunlanang@gmail.com",
      "phone":"+62 1234 567 8900",
      "created_at":"2012-05-10T03:53:40-07:00",
    };

    parser.addPerson(new_property)
    parser.save()
    console.log(`There are ${parser.people.length-1} people in the file '${parser.file}'.`)
 });
