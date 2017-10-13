var brMin = 5;
var wkMin = 25;
var minutes=25;
var seconds=00;
var theTimer = document.getElementById("Timer");
var isActive = false;
var isWork = true;
var timeInterval;

function chTime(){
  var secondString
  if(minutes==0&&seconds==1){
    if(isWork){
      theTimer.style.backgroundColor = "olivedrab";
      theTimer.setAttribute("border" ,"2px solid tomato");

      seconds =0;
      minutes = brMin;
      isWork = false;
    } else {
      theTimer.style.backgroundColor = "tomato";
      theTimer.setAttribute("border","2px solid olivedrab");
      seconds = 0;
      minutes = wkMin;
      isWork = true;
    }
    
  } else if(minutes>0&&seconds==0){
    minutes-=1;
    seconds=59;
  } else {
    seconds -= 1;
  }
  display();
}
function toggleTimer() {
  if(isActive){
    clearInterval(timeInterval);
    isActive = false;
  }
  else{
    timeInterval = setInterval(chTime,1000);
    isActive = true;
  }
}
function display() {
  var secondString;
  if(seconds<10){
    secondString = "0" + seconds.toString();
  } else{
    secondString = seconds.toString();
  }
  theTimer.innerHTML = minutes + ":" + secondString;
  document.getElementById("workMin").innerHTML = wkMin;
  document.getElementById("breakMin").innerHTML = brMin;
}

function addMinute(){
  if(!isActive && wkMin<120 && isWork){
    wkMin +=1;
    if(isWork){
      minutes = wkMin;
      seconds = 0;
    }
    display();
  }
}
function minusMinute(){
  if(!isActive && wkMin > 1){
    wkMin -=1;
    if(isWork){
      minutes = wkMin;
      seconds = 0;
    }
    display();
  }
}
function plusBreak(){
  if(!isActive && brMin<29){
    brMin += 1;
    if(!isWork){
      minutes = brMin;
      seconds = 0;
    }
    display();
  }
}
function minusBreak(){
  if(!isActive && brMin > 1){
    brMin -= 1;
    if(!isWork){
      minutes = brMin;
      seconds = 0;
    }
    display();
  }
}