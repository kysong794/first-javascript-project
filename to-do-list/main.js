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

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div")
let taskList=[]
addButton.addEventListener("click", addTask);
let mode="all";
let filterList=[];
let task={}
for(let i=1; i<tabs.length;i++){
    tabs[i].addEventListener("click", function(event){
        filter(event);
    });
}

//엔터기능 추가
taskInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

function addTask(){
    let taskContent = taskInput.value.trim();
    
    //입력값이 없으면 등록하지 않음
    if (taskContent === "") return;

    task = {
        id:randomIDGenerate(),
        taskContent:taskContent,
        isComplete:false
    }
    taskList.push(task)
    
    //입력창 초기화
    taskInput.value = "";
    render();
}

function render() {
    //1. 내가선택한 탭에 따라서
    let list=[];
    if(mode ==="all"){
        //all taskList
        list = taskList;
    } else if(mode ==="ongoing" || mode === "done"){
        //4. ongoing, done, filterList
        list = filterList;
    }
    //2. 리스트를 달리 보여준다
    //3. all taskList
    
    let resultHTML = '';
    for (let i = 0; i < list.length; i++) {
        let taskContentClass = list[i].isComplete ? "task-content completed" : "task-content";
        
        resultHTML += `
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

function toggleComplete(id){
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id == id){
            taskList[i].isComplete=!taskList[i].isComplete;
            break;
        }
    }
    render();
}


function deleteTask(id) {
    let deleteCheck = confirm('정말로 삭제 하시겠습니까?');
    if (deleteCheck) {
        taskList = taskList.filter(task => task.id !== id);
        filterList = filterList.filter(task => task.id !== id);
    }
    render();
}

function filter(event){
    mode = event.target.id;
    filterList = [];
    if(mode == "all"){
        //전체 리스트를 보여준다
        render();
    } else if(mode == "ongoing"){
        //진행중인 아이템을 보여준다.
        //task.isComplete = false
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete === false){
                filterList.push(taskList[i]);
            }
        }
        render();
        //console.log("진행중", filterList);
    } else if(mode == "done"){
        //끝나는 케이스
        //task.isComplete = true
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete === true){
                filterList.push(taskList[i]);
            }
        }
        render();
    }
}

function randomIDGenerate(){
    return '_' + Math.random().toString(36).slice(2, 9);
}