"use strict"
const fs = require('fs');
const readline = require('readline')
const rl = readline.createInterface(process.stdin, process.stdout)
let menu = 0
class TemporayPerson {
  constructor() {}
  setFirstName(fname) {
    this.fname = fname
  }
  setLastName(lname) {
    this.lname = lname
  }
  setEmail(email) {
    this.email = email
  }
  setphoneNum(pNum) {
    this.pNum = pNum
  }
}
class Person {
  constructor(options) {
      this.id = options['id']
      this.first_name = options['first_name']
      this.last_name = options['last_name']
      this.email = options['email']
      this.phone = options['phone']
      this.created_at = options['created_at']
    }
    // Look at the above CSV file
    // What attributes should a Person object have?
}

class PersonParser {

  constructor(file) {
    this._file = fs.readFileSync(file).toString().split("\n")
    this.head = this._file.slice(0, 1)
    this._people = this._file.slice(1, this._file.length)
    this.last_id = this._people[this._people.length - 1].slice().split(",")[0]
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

  printData() {
    for (var i = 0; i < this._people.length; i++) {
      console.log(this._people[i].split(',').join(" "));
    }
  }
  addPerson(person) {
    let id_exist = false
    let dataArray = parser.last_id
    for (var i = 0; i < this._people.length; i++) {
      dataArray = this._people[i].split(",")
      if (person.id === dataArray[0]) {
        id_exist = true
        break
      }
    }
    if (!id_exist) {
      let jsonformated = String(person.id + "," + person.first_name + "," + person.last_name + "," + person.email + "," + person.created_at)
      this._people.push(jsonformated)
      let dataToWrite = this._people.join("\n")
      fs.writeFile('people.csv', dataToWrite, (err) => {
        if (err) throw err;
        console.log('It\'s saved!');
        rl.close()
      });
    } else {
      console.log("Id Exist")
    }
  }
}


// console.log(line1[1].split(",").join(" "))
let parser = new PersonParser('people.csv')
let tPerson = new TemporayPerson()
console.log(`enter data Person to add. last Id =${parser.last_id}`)
console.log(`1. Entry first_name`);
console.log(`2. Entry last_name`);
console.log(`3. Entry Email address`);
console.log(`4. Entry phone Number`);
console.log(`5. Save`);
console.log(`6 print all data`);

// function askMenu() {
//
//   rl.question('Choose menu:', (answer) => {
//     // TODO: Log the answer in a database
//     chooseMenu(answer)
//     rl.close()
//   });
// }
//
// function askFirstName() {
//   rl = readline.createInterface(process.stdin, process.stdout)
//   rl.question('First Name:', (answer) => {
//     // TODO: Log the answer in a database
//     tPerson.setFirstName(answer)
//     askMenu()
//   });
// }
//
// rl.question('Last Name:', (last_name) => {
//   // TODO: Log the answer in a database
//   tPerson.setLastName(last_name)
//   askMenu()
// });
//
// function askEmail() {
//   rl.question('Email address:', (email) => {
//     // TODO: Log the answer in a database
//     tPerson.setEmail(email)
//     askMenu()
//   });
// }
//
// function askPhone() {
//   rl.question('Phone Number:', (phone) => {
//     // TODO: Log the answer in a database
//     tPerson.setphoneNum(phone)
//     askMenu()
//   });
// }
//
// function askSave() {
//   rl.question('Are you sure to save?', (save) => {
//     // TODO: Log the answer in a database
//   });
// }

// function chooseMenu(cmd) {
//   switch (cmd) {
//   case 1:
//     askFirstName()
//     break;
//   case 2:
//     askLastName()
//     break;
//   case 3:
//     askEmail()
//     break;
//   case 4:
//     askPhone()
//     break;
//   case 5:
//     setPrompt("Are you sure to end this task and save? Y/N")
//     break;
//   default:
//   }
// }
// askMenu()
rl.prompt()
rl.on('line', (cmd) => {
  if (menu === "1") {
    tPerson.setFirstName(cmd)
    console.log(`Fisrt Name =${cmd}`)
    console.log(`Last Name:`)
    menu = "2"
  } else if (menu === "2") {
    tPerson.setLastName(cmd)
    console.log(`last Name =${cmd}`)
    console.log(`Email:`)
    menu = "3"
  } else if (menu === "3") {
    tPerson.setEmail(cmd)
    console.log(`Email =${cmd}`)
    console.log(`Phone:`)
    menu = "4"
  } else if (menu === "4") {
    tPerson.setphoneNum(cmd)
    console.log(`Phone =${cmd}`)
    console.log(`Save? y/n`)
    menu = "5"
  }
  if (menu === "5" && cmd === 'y') {
    let timecreated_at = new Date()
    let id = ~~(parser.last_id) + 1
    let person = new Person({
      id: id,
      first_name: tPerson.fname,
      last_name: tPerson.lname,
      email: tPerson.email,
      phone: tPerson.pNum,
      created_at: timecreated_at
    })
    parser.addPerson(person)
  } else {
    switch (cmd) {
    case "":
      rl.close()
      break;
    case "1":
      console.log("Fisrt Name")
      menu = cmd
      rl.setPrompt("First Name ->")
      break;
    case "2":
      rl.setPrompt("Last Name ->")
      menu = cmd
      break;
    case "3":
      rl.setPrompt("Email Address ->")
      menu = cmd
      break;
    case "4":
      rl.setPrompt("Phone number ->")
      menu = cmd
      break;
    case "6":
      parser.printData(parser._people)
      rl.close()
      break;
    }
  }
});
// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
