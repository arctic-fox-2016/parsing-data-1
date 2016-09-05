"use strict"
const CSV = require('fs')

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(property = {id, first_name, last_name, email, phone, created_at}){
    this.id = property["id"];
    this.first_name = property["first_name"];
    this.last_name = property["last_name"];
    this.email = property["email"];
    this.phone = property["phone"];
    this.created_at = property["created_at"];
    }
  }

// let test = new Person({
//   // id  :
//   // first_name :
//   // last_name :
//   // email :
//   // phone :
//   // created_at :
// })

class PersonParser {


  constructor(file) {
    this._file = file
    this._people = []
  }

  get file(){ return this._file; }
  set people(value){ this._people[this._people.length] = value; }
  get people() {
    // If we've already parsed the CSV file, don't parse it again
    // Remember: people is null by default
    if (this._people)
      return this._people

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

   CSV.writeFile(this.file, new_data, (err) => {
       if(err) throw err;
       console.log('Cek Isian');
   });
 }

}

let parser = new PersonParser('people.csv')
const csv = require("fast-csv");

csv.fromPath(parser.file).on("data", function(isi){
    let property = {
      "id":isi[0],
      "firstname":isi[1],
      "lastname":isi[2],
      "email":isi[3],
      "phone":isi[4],
      "created_at":isi[5]
    };
    parser.addPerson(property)
 }).on("end", function(){
    console.log(`There are ${parser.people.length-1} people in the file '${parser.file}'.`)

    let new_property = {
      "id":parser.people.length,
      "firstname":"Aji",
      "lastname":"Lantang",
      "email":"ajilantangsangpemujacinta@gmail.com",
      "phone":"+62 8121 9090 355",
      "created_at":"2012-05-10T03:53:40-07:00",
    };


  parser.addPerson(new_property)
  parser.save()
console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
});
