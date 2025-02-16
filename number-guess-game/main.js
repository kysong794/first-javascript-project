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

playbutton.addEventListener("click", play);

function pickRandomNum(){
    computerNum = Math.floor(Math.random() * 100)+1;
    console.log("정답", computerNum);
}
console.log(computerNum);
function play(){
    let userValue = userInput.value;
    if(userValue < computerNum){
        resultArea.textContent = "UP";
    } else if(userValue > computerNum){
        resultArea.textContent = "DOWN";
    } else{
        resultArea.textContent = "정답";
    }
    console.log(userValue)
}

pickRandomNum();