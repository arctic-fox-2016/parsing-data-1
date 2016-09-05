"use strict"
var csv = require("basic-csv");
var fs = require('fs');
var faker = require('./faker');
var list = []
var file = "people.csv"

csv.readCSV("people.csv", {
  dropHeader: true
}, function (error, rows) {

  class Person {
    constructor(rows) {
      this._people = rows
    }
  }

  class PersonParser {
    constructor(file) {
      this._file = file
      this._people = rows
      this._new_people = ""
      this._new_people_count = 0
    }

    get people() {
      if (this._people)
        return this._people
    }

    addPerson(first_name, last_name, email, phone, created_at) {
      let date = new Date(created_at)
      this._new_people += (this._people.length + this._new_people_count + 1) + "," +  first_name + "," + last_name + "," + email + "," + phone + "," + date + "\n"
      this._new_people_count++
    }

    save() {
      let data = this._new_people
      fs.appendFile(file, data, function(err) {
        if (err) throw 'error writing file: ' + err;
      });

      console.log(`Added ${this._new_people_count + 1} rows of data into ${this._file}.`)
      this._new_people_count = 0
    }

    addFakeData(n) {
      for (var i = 0; i < n; i++) {
        this._new_people += (this._people.length + this._new_people_count + 1) + "," +  first_name + "," + last_name + "," + email + "," + phone + "," + date + "\n"
        this._new_people_count++
      }
    }
  }

  // Initiate parser
  let parser = new PersonParser(file)

  parser.addPerson("Fadhli","Ramadhani","fadhli@gmail.com","1-633-389-7173","2012-05-10T03:53:40-07:00")
  parser.addPerson("Fadhli","Ramadhani","fadhli@gmail.com","1-633-389-7173","2012-05-10T03:53:40-07:00")
  parser.addPerson("Fadhli","Ramadhani","fadhli@gmail.com","1-633-389-7173","2012-05-10T03:53:40-07:00")
  parser.addPerson("Fadhli","Ramadhani","fadhli@gmail.com","1-633-389-7173","2012-05-10T03:53:40-07:00")

  parser.save()

  console.log(`There are ${parser._people.length + parser._new_people_count} people in the file '${parser._file}'.`)

});
