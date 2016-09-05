"use strict"

var csv = require("fast-csv");
var fs = require("fs")


class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  //id,first_name,last_name,email,phone,created_at
  constructor(id,first_name,last_name,email,phone,created_at ){
    this._id = id
    this._first_name = first_name
    this._last_name = last_name
    this._email = email
    this._phone = phone
    this._created_at = created_at
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = []
  }

  get people() {
    // If we've already parsed the CSV file, don't parse it again
    // Remember: people is null by default
    if (this._people)
      return this._people

    // We've never called people before, now parse the CSV file
    // and return an Array of Person objects here
    // Save the Array in the people instance variable.
  }

  get file(){
    return this._file
  }

  save(){
    var temp = ""
    var array = this._people
    for (var i = 0; i < array.length; i++) {
      temp += array[i].id + "," +
              array[i].first_name + "," +
              array[i].last_name + "," +
              array[i].email + "," +
              array[i].phone + "," +
              array[i].created_at + `\n`
    }
    fs.writeFile(this.file, temp, (err) => {
      if (err) throw err;
      console.log('It\'s saved!');
    });

  }

  addPerson(data) {
//    this.people(new Person(data))
  this._people.push(data);
  }
}

let parser = new PersonParser('people.csv')

csv
 .fromPath(parser._file)
 .on("data", function(data){
    var newPerson = new Person
    newPerson = {
      id : data[0],
      first_name : data[1],
      last_name : data[2],
      email : data[3],
      phone : data[4],
      created_at : data[5]
    }

    parser.addPerson(newPerson)
 })
 .on("end", function(){
     //console.log("done");
     console.log(`There are ${parser.people.length-1} people in the file '${parser.file}'.`)
     console.log(`Data ke 200 : ${JSON.stringify(parser.people[200])}`)

     parser.addPerson({
       id : 201,
       first_name : "Lilianti",
       last_name : "Wibiesono",
       email : "lili@gmail.com",
       phone : "08199999000",
       created_at : "2016-09-06T10:09:03-08:00"
     })
     parser.save()

 });
