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
let taskList=[]
addButton.addEventListener("click", addTask);


function addTask(){
    let task = {
        id:randomIDGenerate(),
        taskContent:taskInput.value,
        isComplete:false
    }
    taskList.push(task)
    console.log(taskList);
    render();
}

/*
function render(){
    let resultHTML =  '';
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].isComplete == true){
            resultHTML +=`<div class="task">
                    <div class="task-done">${taskList[i].taskContent}</div>
                    <div >
                        <button onclick="toggleComplete('${taskList[i].id}')"><i class="fa-regular fa-circle-xmark"></i></button>
                        <button onclick="deleteTask('${taskList[i].id}')"><i class="fa-regular fa-trash-can"></i></button>
                    </div>
                </div>`;
        } else {
            resultHTML += `<div class="task">
                    <div>${taskList[i].taskContent}</div>
                    <div >
                        <button onclick="toggleComplete('${taskList[i].id}')"><i class="fa-regular fa-thumbs-up"></i></button>
                        <button onclick="deleteTask('${taskList[i].id}')"><i class="fa-regular fa-trash-can"></i></button>
                    </div>
                </div>`;
        }
    }
    document.getElementById("task-board").innerHTML = resultHTML;
}
*/
function render() {
    let resultHTML = '';
    for (let i = 0; i < taskList.length; i++) {
        let taskContentClass = taskList[i].isComplete ? "task-content completed" : "task-content";
        
        resultHTML += `
            <div class="task">
                <div class="${taskContentClass}">${taskList[i].taskContent}</div>
                <div>
                    <button onclick="toggleComplete('${taskList[i].id}')">
                        ${taskList[i].isComplete ? '<i class="fa-solid fa-rotate-left"></i>' : '<i class="fa-regular fa-thumbs-up"></i>'}
                    </button>
                    <button onclick="deleteTask('${taskList[i].id}')">
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
    console.log(taskList)
}

function deleteTask(id) {
    let deleteCheck = confirm('정말로 삭제 하시겠습니까?');
    if (deleteCheck) {
        taskList = taskList.filter(task => task.id !== id); 
        render();
    }
}

function randomIDGenerate(){
    return '_' + Math.random().toString(36).slice(2, 9);
}