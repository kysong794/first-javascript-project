//랜덤번호 지정
//유저가 번호를 입력한다 그리고 go 라는 버튼을 누름
//만약에 유저가 랜덤번호를 맞추면, 맞췄습니다!
//랜덤번호가 < 유저번호 Down
//랜덤번호가 > 유저번호 Up
//Rest 버튼을 누르면 게임이 리셋된다
// 3번의 기회를 다쓰면 게임이 끝난다 (더이상 추측 불가, 버튼이 disable)
//유저가 1~100 범위 밖에 숫자를 입력하면 알려준다 기회를 깍지 않는다
// 유저가 이미 입력한 수자를 또 입력하면, 알려준다, 기회를 깍지 않는다

let computerNum = 0;
let playbutton = document.getElementById("play-Button");
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let resetButton = document.getElementById("reset-button");
let chanceArea = document.getElementById("chance-area");
let correct = document.getElementById("correct");
let historyArea = document.getElementById("history-area");
let chances = 3;
let gameOver = false;
let history=[];

playbutton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
userInput.addEventListener("focus", function(){
    userInput.value="";
});

function pickRandomNum(){
    computerNum = Math.floor(Math.random() * 100)+1;
    //console.log("정답", computerNum);
    correct.textContent=`정답 : ${computerNum}`;
}
console.log(computerNum);
function play(){
    let userValue = userInput.value;


    if(userValue < 1 || userValue > 100){
        resultArea.textContent="1과 100사이 숫자를 입력해 주세요.";
        return;
    }
    if(history.includes(userValue)){
        resultArea.textContent="이미 입력한 번호입니다.  다른 숫자를 입력해주세요";
        return;
    }
    chances --;
    chanceArea.textContent = `기회 : ${chances}번`;
    console.log("chances", chances);

    if(userValue < computerNum){
        resultArea.textContent = "UP";
    } else if(userValue > computerNum){
        resultArea.textContent = "DOWN";
    } else{
        resultArea.textContent = "정답";
        gameOver=true;
    }
    
    history.push(userValue);
    
    historyArea.textContent = `기록 : ${history}`

    if(chances < 1){
        gameOver = true;
    }
    if(gameOver == true){
        playbutton.disabled = true; 
    }

}

function reset(){
    //user input 창 깨끗하게 정리
    chances = 3;
    chanceArea.textContent = `기회 : ${chances}번`;
    gameOver = false;
    playbutton.disabled = false;
    userInput.value = "";
    history=[];
    historyArea.textContent = `기록 : ${history}`;
    //새로운번호 생성
    pickRandomNum();

    resultArea.textContent="결과값이 여기 나옵니다"
    
}

pickRandomNum();