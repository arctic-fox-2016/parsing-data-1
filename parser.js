"use strict"

var csv = require("fast-csv");
var fs = require('fs')
var faker = require('faker');


var peoples =[]
let ID = []
let stringCSV = ""

let fakeID
let fakeFName
let fakeLName
let fakeEmail
let fakePhone
let fakeDate

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(person){
    this._userId = person.userId
    this._fName = person.fName
    this._lName = person.lName
    this._email = person.email
    this._phone = person.phone
    this._createdAt = person.createdAt
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = null
  }

  parseOn(){

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

  addPerson(person) {
    peoples.push(new Person (person))
  }

  createCSV(array){
      fs.writeFile("HasilKonversi.csv", stringCSV)
  }
}

let parser = new PersonParser('people.csv')

csv
 .fromPath('people.csv')
 .on("data", function(data){
   peoples.push(new Person({userId: data[0], fName: data[1], lName: data[2], email: data[3], phone: data[4], createdAt: data[5]}))
 })
 .on("end", function(){

   //add new Person
   parser.addPerson({userId: 201, fName: "Andrew", lName: "Tandiawan", email: "atandiawan@andrrew.com", phone:"0813409", createdAt: new Date('2015-04-11')})
   for (let person in peoples){
     stringCSV = stringCSV + peoples[person]._userId + "," + peoples[person]._fName + "," + peoples[person]._lName+ "," + peoples[person]._email + "," + peoples[person]._phone + "," + new Date(peoples[person]._createdAt) + "\n"
   }

   //add faker - start
   for(var i =0 ; i<100 ; i++){
     fakeID = faker.random.number()
     fakeFName =  faker.name.firstName()
     fakeLName =  faker.name.firstName()
     fakeEmail =  faker.internet.email()
     fakePhone =  faker.phone.phoneNumber()
     fakeDate =  faker.date.past()
     stringCSV += fakeID + "," + fakeFName + "," + fakeLName + "," + fakeEmail + "," + fakePhone + "," + fakeDate + "\n"
   }
   //add faker - end

   parser.createCSV(stringCSV)


   //console.log(stringCSV)
 });
//
// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
