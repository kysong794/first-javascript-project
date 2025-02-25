//유저가 값을 입력한다
// + 버튼을 클릭하면, 할일이 추가된다
// delete버튼을 누르면 할일이 삭제된다
// check버튼을 누르면 할일이 끝나면서 밑줄이 간다
//1. check 버튼을 클릭하는 순간 true false
//2. true이면 끝난걸로 간주하고 밑줄 보여주기
//3. false 이면 안끝난거롤 간주하고 그대로
// 진행중 끝남 탭을 누르면, 언더바가 이동한다
// 끝남탭은, 끝난 아이템만, 진행중탭은 진행중인 아이템만
//전체 탭을 누르면 다시 전체 아이템으로 돌아옴
//엔터기능추가
//메뉴언다바 탭에맞게 이동
// 1. 할일 체크버튼 클릭에 따른 상태값 변화를 동적으로 리스트조정 진행중<->끝남
// 1-1. 리스트 변경되면서 알림창 뛰우기
// 2. 진행중 탭에서 등록시 리스트에도 보이게 조정
// 2-1 끝남 탭에서 등록시 진행중탭으로 이동

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div")
addButton.addEventListener("click", addTask);
let task = {}
let taskList = [];
let filterList = [];
let made = "all";

for(let i=0; i<tabs.length;i++){
    tabs[i].addEventListener("click", (event) => filterLis(event));
}

taskInput.addEventListener("keyup", function(event) {
    if(event.key === "Enter"){
        addTask();
    }
});

function addTask(){
    let taskContent = taskInput.Value.trim();

    if(taskContent == ""){
        alert('내용을 작성 바랍니다');
        return;
    }

    task = {
        id:randomIDGenerate(),
        taskContent:taskContent,
        isComplete:false
    }
    taskList.push(task);

    if(mode === "ongoing"){
        filterList.push(task);
    }

    if(mode === "done"){
        mode = "ongoing"
        setUnderline(document.getElementById("ongoing"));
        filterList = taskList.filter(task => !task.isComplete);
    }
    
    taskInput.value = "";
    render();
}


function render(){
    let list=[];

    if(mode ==="all"){
        list = taskList;
    } else if(mode ==="ongoing" || mode === "done"){
        list = filterList;
    }

    let resultHTML='';

    for(let i=0; i < list.length; i++){
        let taskContent = list[i].isComplete ? "task-content completed" : "task-content";

        resultHTML +=`
            <div class="task">
                <div class="${taskContentClass}">${list[i].taskContent}</div>
                <div>
                    <button onclick="toggleComplete('${list[i].id}')">
                        ${list[i].isComplete ? '<i class="fa-solid fa-rotate-left"></i>' : '<i class="fa-regular fa-thumbs-up"></i>'}
                    </button>
                    <button onclick="deleteTask('${list[i].id}')">
                        <i class="fa-regular fa-trash-can"></i>
                    </button>
                </div>
            </div>
        `;
    }
    document.getElementById("task-board").innerHTML = resultHTML;
}

function deleteTask(id){
    let deleteTask = confirm('정말로 삭제 하시겠습니까?');
    if(deleteCheck){
        taskList = taskList.filter(task => task.id !== id);
        filterList = filterList.filter(task => task.id !== id);
    }
    render();
}

function filter(event){
    mode = event.target.id;
    filterList = [];
    if(mode == "all"){
        render();
    } else if (mode == "ongoing"){
        for(let i = 0; i<taskList.length; i++){
            if(taskList[i].isComplete === false){
                filterList.push(taskList[i]);
            }
        }
        render();
    } else if(mode =="done"){
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete === true){
                filterList.push(taskList[i]);
            }
        }
        render();
    }
}

//랜덤 id 생성
function randomIDGenerate(){
    return '_' + Math.random().toString(36).slice(2, 9);
}
