var CPUFirst = false;
var isX = true;
function getCurrent(){
  if(isX){
    return "X";
  } else{
    return "O";
  }
}
function getOther(){
  if(isX){
    return "O";
  } else{
    return "X";
  }
}
var playerIsX = true;
var isCPU = false;
var CPUDifficulty = 0;
var isActive = false; 
var lastMove = 9;
var secondPick;
var lastCPUMove = 9;
var turnNumber = 0;
var humanWins = 0;
var CPUWins = 0;
var itsOnlyAMatterOfTime = false;
var theMessage = document.getElementById("message");
var winners = [{0:"",1:"",2:""},{0:"",3:"",6:""},{0:"",4:"",8:""},{1:"",4:"",7:""},{2:"",5:"",8:""},{2:"",4:"",6:""},{3:"",4:"",5:""},{6:"",7:"",8:""}];
var used = [9];
var entries = [document.getElementById("lt"), document.getElementById("ct"), document.getElementById("rt"), document.getElementById("lm"), document.getElementById("cm"), document.getElementById("rm"), document.getElementById("lb"), document.getElementById("cb"), document.getElementById("rb")];
function isVictory(){
  var wellIsIt = false;
  for(p=0;p<winners.length;p++){
    var counter = 0;
    for(q=0;q<3;q++){
      
      if(winners[p][Object.keys(winners[p])[q]] == getCurrent()){
        counter +=1;
      }
    }
    if(counter == 3){
      wellIsIt = true;
    }
  }
  return wellIsIt;
}
function endGame(){
  if(!isVictory()){
    theMessage.innerHTML = "<h6>Well, That's a Tie...</h6>";
    document.getElementById('restart').innerHTML = "<button onClick='reset()'>Start Next Game</button>";
  } else{
  isActive = false;
  var winningPlayer;
  if(isCPU){
    winningPlayer="CPU";
    CPUWins++;
  } else {
    humanWins++;
    winningPlayer="Human Player";
  }
  document.getElementById("scores").innerHTML = "CPU: "+CPUWins+" // Human: "+humanWins;
  
  theMessage.innerHTML = "<h6>"+ winningPlayer + " WINS!!</h6>";
    document.getElementById('restart').innerHTML = "<button onClick='reset()'>Start Next Game</button>";
  }
}
function reset(){
  document.getElementById('restart').innerHTML="";
  isActive = true;
  
  for(l=0;l<9;l++){
    entries[l].innerHTML = "";
  }
  used = [9];
  lastMove = 9;
  lastCPUMove = 9;
  secondPick = 9;
  itsOnlyAMatterOfTime = false;
  for(w=0;w<winners.length;w++){
    for(x=0;x<3;x++){
      winners[w][Object.keys(winners[w])[x]] = "";
    }
  }
  turnNumber = 0;
  if(CPUFirst){
    isCPU = false;
    if(playerIsX){
      isX = true;
    }
    theMessage.innerHTML = "Human Turn";
  } else {
    isCPU = true;
    if(playerIsX){
      isX = false;
    }
  }
  CPUFirst = !CPUFirst;
  if(isCPU){
    theMessage.innerHTML="CPU Turn";
    CPUMove();
  }
}
function pickX(){
  document.getElementById("letterPick").innerHTML = "";
  document.getElementById("difficulty").style.visibility = "visible";
}
function pickO(){
  playerIsX = false;
  isX = false;
  pickX();
}
function pickEasy(){
  isActive = true;
  document.getElementById("difficulty").style.visibility = "hidden";
  theMessage.innerHTML = "Human Turn";
}
function pickMedium(){
  CPUDifficulty = 1;
  pickEasy();
}
function pickHard() {
  CPUDifficulty = 2;
  pickEasy();
}
function togglePlayer(){
  if(isActive){
    turnNumber++;
    isCPU = !isCPU;
    isX = !isX;
    if(isCPU){
      theMessage.innerHTML = "CPU Turn";
    } else{
      theMessage.innerHTML = "Human Turn";
    }
  }
}
function move(element){
  
  if(element.innerHTML == "" && isActive && !isCPU){
    element.innerHTML = getCurrent();
    used.push(entries.indexOf(element));
    lastMove = entries.indexOf(element);
    marker(lastMove);
    if(isVictory()||turnNumber==8){
      endGame();
    } else{
      togglePlayer();
      setTimeout(CPUMove(),3000);
    }
  }
}
function marker(theMove){
  for(m=0;m<winners.length;m++){
    var thisArray = Object.keys(winners[m]);
    for(n=0;n<3;n++){
      if(theMove==thisArray[n]){
        winners[m][thisArray[n]] = getCurrent();
      }
    }
  }
}
function CPUMove(){
  if(isActive && isCPU){
    var CPUDecisionNo;
    if(CPUDifficulty==0){
      CPUDecisionNo = randPick();
    } else if(CPUDifficulty==1){
      CPUDecisionNo = medPick();
    } else{
      CPUDecisionNo = goodPick();
    }
    entries[CPUDecisionNo].innerHTML = getCurrent();
    used.push(CPUDecisionNo);
    lastCPUMove=CPUDecisionNo;
    marker(lastCPUMove);
    if(isVictory()||turnNumber==8){
      endGame();
    } else{
      togglePlayer();
    }
  }
}
function randPick(){
  var wasUsed=true;
  var thePick;
  while(wasUsed){
    wasUsed=false;
    thePick = Math.floor(Math.random()*9);
    
    for(k=0;k<used.length;k++){
      if(thePick == used[k]){
      wasUsed=true;
    }
  }
  }
  return thePick;
}
function isNew(pick){
  for(p=0;p<used.length;p++){
    if(pick==used[p]){
      return false;
    }
  }
  return true;
}
function secondMove(pick){
  if(pick==0||pick==6){
    return "leftCorner";
  } else if (pick==2||pick==8){
    return "rightCorner";
  } else if (pick==1||pick==3){
    return "leftMiddle";
  } else {
    return "rightMiddle";
  }
}
function goodPick(){
  var potentialMove;
  if(CPUFirst){
    if(turnNumber==0){
      return 4;
    } else if(turnNumber==2){
      switch(secondMove(lastMove)){
        case "leftCorner":
          return 3;
        case "leftMiddle":
          itsOnlyAMatterOfTime = true;
          secondPick = lastMove;
          return 0;
        case "rightCorner":
          return 5;
        case "rightMiddle":
          itsOnlyAMatterOfTime = true;
          secondPick = lastMove;
          return 8;
                                 }
    } else if (turnNumber ==4){
      potentialMove = defense();
      if(potentialMove == 9){
        if(itsOnlyAMatterOfTime==true){
          if(secondPick == 3){
            return 1;
          } else if(secondPick==1){
            return 3;
          } else if(secondPick==7){
            return 5;
          } else{
            return 7;
          }
        } else{
          potentialMove=randPick();
        }
      }
      return potentialMove;
    } else{
      potentialMove=defense();
      if(potentialMove==9){
        potentialMove=randPick();
      }
    }
    return potentialMove;
  }
  else {
    if(turnNumber == 1){
      if(lastMove==4){
        return 6;
      } else{
        return 4;
      }
    } else if(turnNumber == 3 && lastCPUMove ==4){
      potentialMove=defense();
      if(potentialMove==9){
        if(isNew(1)&&isNew(7)){
          potentialMove=7;
        } else if(isNew(6) && isNew(2)){
          potentialMove= 6;
        } else{
          potentialMove = 0;
        }
      }
      return potentialMove;
    } else{
      potentialMove=defense();
      if(potentialMove==9){
        potentialMove = randPick();
      }
      return potentialMove;
    }
  }
}
function medPick(){
  if(turnNumber==0){
    var midiPick=Math.floor(Math.random()*2);
    if(midiPick == 0){
      return 4;
    } else{
      return 0;
    }
  } else if(turnNumber==1){
    if(isNew(8)){
      return 8;
    } else{
      return 6;
    }
  } else if(turnNumber==2 && lastCPUMove == 0){
    if(isNew(8)){
      return 8;
    } else{
      return 2;
    }
  } else if(turnNumber == 4 && lastCPUMove == 2){
    if(isNew(1)){
      return 1;
    } else {
      return 6;
    }
  } else{
    var potentialMove = defense();
    if(potentialMove==9){
      potentialMove = randPick();
    }
    return potentialMove;
  } 
}
function defense(){
  var thisMove = 9;
  for(h=0;h<2;h++){
    var thisType;
    if(h==0){
      thisType = getCurrent();
    }else{
      thisType = getOther();
    }
  for(z=0;z<8;z++){
    var counter=0;
    var empty="";
    var thisArray = Object.keys(winners[z]);
    for(j=0;j<3;j++){
      var thisSpace = winners[z][thisArray[j]];
      if(thisSpace==thisType){
        counter++;
      } else if(thisSpace==""){
        empty = thisArray[j];
      }
    }
    if(counter==2 && empty != ""){
      console.log(empty);
      return empty;
      break;
    }
  }
  }
  console.log(thisMove);
  return thisMove;
}