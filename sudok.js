
var sudokuboard = [];

let solve = () => {

var i = 0;
  for(let i=0;i<9;i++){ // isi baris
      let number = [1,2,3,4,5,6,7,8,9] //
      for (let k = 0; k < 9; k++) {// check baris
        if(sudokuboard[i][k] != '0')   number.splice(number.indexOf(+(sudokuboard[i][k])),1)
      }

      for(let j=0;j<9;j++) {
            if(sudokuboard[i][j] ==='0'){
            sudokuboard[i][j] = String(number.pop())
          }


      }
      //sudokuboard[0][i-1] += i

  }
  console.log(sudokuboard);


  console.log("=======SUDOKU BOARD======");
  // for (i=0;i<9;i++){
  //   console.log(sudokuboard[i].join("  ").replace(/0/g," "));
  //   if((i+1)%3===0 && i!=0) console.log("=========================");
  // }

}


let sudoku_2_chooseoal = (soal) => {

  let noSoal = soal*81;
  let start =0
  let end = 0
  let word = ""
  var fs = require('fs')
  var words = fs.readFileSync('people.csv')
    .toString().split("\n").join("")
  if (soal == 1 ){
    start = 0
    end = start+81
    word = words.substring(start,end).split("")

  } else{
    start = (soal-1)*81
    end = start+81
    word = words.substring(start,end).split("")
    //console.log(word);
  }
  sudoku_board(word,9,9);
}

let sudoku_board = (value,baris,kolom) =>{
  //write your code here
  var chunk = baris;

  var length = baris*kolom

  for (var i=0;i< length;i+=chunk)
  {
    //console.log(value.slice(i,i+chunk))
    sudokuboard.push(value.slice(i,i+chunk))

  }
  let temptBoard =[]
  //  console.log(sudokuboard);
    console.log("=======SUDOKU BOARD================");
    for (i=0;i<9;i++){
      temptBoard.push(sudokuboard[i])


       //temptBoard[i].splice(6,0,"||")
       //temptBoard[i].splice(3,0,"||")


              //sudokuboard[i].splice(3,0,"||")
     console.log(temptBoard[i].join("  ").replace(/0/g," "));
     if((i+1)%3===0 && i!=0) console.log("===================================");
    }

}



//word_random("ABASASCJASDJASDJASDJASJD");

//sudoku_board("003020600900305001001806400008102900700000008006708200002609500800203009005010300200080300060070084030500209000105408000000000402706000301007040720040060004010003",9,9)


sudoku_2_chooseoal(7)
solve();
