"use strict"
const fs = require('fs')

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor (property = {}){
    this._id = property['id']
    this._first_name = property['first_name']
    this._last_name = property['last_name']
    this._email = property['email']
    this._phone = property['phone']
    this._created_at = property['created_at']
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = []
  }
  get file(){return this._file}
  set people(value){this._people[this._people.length] = value}
  get people() {
    // If we've already parsed the CSV file, don't parse it again
    // Remember: people is null by default
    if (this._people)
      return this._people

    // We've never called people before, now parse the CSV file
    // and return an Array of Person objects here
    // Save the Array in the people instance variable.
  }

  addPerson(property) { //fungsi untuk menambah orang ke temporary data
    this.people = property
  }
  save(){ //fungsi untuk menambah orang secara persistent (parsing)
    let people_data = this.people
    let new_data = ""

    for(let idx = 0; idx < people_data.length; idx++){
      let string_data = `${people_data[idx].id}, ${people_data[idx].firstname}, ${people_data[idx].lastname}, ${people_data[idx].email}, ${people_data[idx].phone}, ${people_data[idx].created_at}`;
      new_data += string_data + '\n'
    }

    fs.writeFile(this.file, new_data, (err) => { //fungsi untuk replace target file dengan current data
      if(err) throw err;
      console.log(`Berhasil tersimpan`)
    })
  }

}

let parser = new PersonParser('people.csv')
var csv = require("fast-csv");

csv.fromPath(parser.file).on("data", function(data){
  let property = {
    'id':data[0],
    'firstname':data[1],
    'lastname':data[2],
    'email':data[3],
    'phone':data[4],
    'created_at':data[5]
  };
  parser.addPerson(property)
}).on("end", function(){
     console.log(`Ada ${parser.people.length-1} orang di dalam file ${parser.file}.`);

  let isman = {
    'id':parser.people.length,
    'firstname':'Isman',
    'lastname':'Nuri',
    'email':'ismanuri@gmail.com',
    'phone':'+62 856 9876 5432',
    'created_at':'2016-09-15T03:56:50-07:00',
  }
  let ariz = {
    'id':parser.people.length,
    'firstname':'Ahyana',
    'lastname':'Rizky',
    'email':'ahyanarizky@gmail.com',
    'phone':'+62 856 1234 5678',
    'created_at':'2016-09-15T03:56:50-07:00',
  }

  parser.addPerson(ariz)
  parser.save()
  console.log(`Ada ${parser.people.length-1} orang di dalam file ${parser.file}.`)
 });
