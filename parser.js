"use strict"
var csv = require("fast-csv");
const fs = require('fs');
let database= []
let stringnya=""
class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(person){
  this.userId = person.userId
  this.first_name = person.first_name
  this.last_name = person.last_name
  this.email = person.email
  this.phone = person.phone
  this.created_at = person.created_at
  }
}
class PersonParser {
  constructor(file) {
    this._file = file
    this._people = null
  }
  get people() {
    csv
     .fromPath("people.csv")
     .on("data", function(data){
      database.push(new Person({userId: data[0], first_name: data[1], last_name: data[2], email:data[3], phone: data[4], created_at: data[5]}))

     })
     .on("end", function(){
       parser.addPerson(new Person({userId: 201,first_name:"dudi",last_name:"didu",email:"dudi@yahoo.com",phone:4535345,created_at:201511012180700}))
       for(let idx in database){
         stringnya += database[idx].userId +","+database[idx].first_name+","+database[idx].last_name+","+database[idx].email+","+database[idx].phone+","+new Date(database[idx].created_at)+"\n";
       }
       console.log(stringnya)
       parser.save(stringnya)

     });
    if (this._people)
      return this._people
  }

  addPerson(person)
  {
    database.push(new Person(person))
  }
  save(stringnya){
    //console.log(stringnya)
    fs.writeFile('message.csv', stringnya);
  }
}
let parser = new PersonParser('people.csv')
parser.people

//console.log(parser.save())
//parser.addPerson({userId: 345242,first_name:"dudi",last_name:"didu",email:"dudi@yahoo.com",phone:4535345,created_at:423904290})
// parser.save()
// console.log(parser.people)

//console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
