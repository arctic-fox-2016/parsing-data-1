var words = [];

function dictionary_sort(arr) {
  // Your code here to sort the array
  let sorted_arr = arr.sort();

  console.log("Here's your sorted dictionary list: \n");

  for(var i=0;i<arr.length;i++){
    console.log(i+1 + ". " + sorted_arr[i]);
  }
}



// ...your code here to initialize the program and take user input
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.setPrompt("Type another word: ");

console.log("type a word: ");
rl.on('line', (line) => {
  if(line == ""){
    rl.close();
    console.log(dictionary_sort(words));
  }else{
    words.push(line);
    rl.prompt();
  }
});
