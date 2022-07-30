// 유저가 값을 입력한다.
// + 버튼을 클릭하면, 할일이 추가된다.
// delete버튼을 누르면 할일이 삭제된다.
// check버튼을 누르면 할일이 끝나면서 밑줄이 간다.
// 1. check 버튼을 클릭하는 순간 true를 false로 바꿔준다.
// 2. true이면 끝난걸로 간주하고 밑줄 보여주기
// 3. false이면 안 끝난걸로 간주하고 그대로

// 진행중 끝남 탭을 누르면, 언더바가 이동한다.
// 끝남탭은, 끝난 아이템만, 진행중탭은 진행중인 아이템만
// 전체탭을 누르면 다시 전체아이템으로 돌아옴

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
//마우스 커서 .task-tabs의 자손 div태그 모두 선택 이란 뜻
let tabs = document.querySelectorAll(".task-tabs div");
//.task-tabs의 자손 div태그의 ID값  tabs클릭했을때 filter(event) -> event.target.id값
let mode = 'all'
let filterList = [];
let taskList = [];


//0번째에 under-line은 필요가 없다 그래서 for문을 1부터
console.log(tabs);
for(let i=1; i<tabs.length; i++) {
    tabs[i].addEventListener("click", function(event) {
        filter(event);
    });
  
}

addButton.addEventListener("click", addTask);

//input에 값을 입력값을 배열에 담기
function addTask() {
    //let taskContent = taskInput.value;
    //체크를 누르면 화면글씨에 밑줄이 쳐져야한다. 그러기 위해선 객체가 필요하다.
    let task = {
        id: randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete: false
    }
   // taskList.push(taskContent);
    taskList.push(task);
    console.log(taskList);
    render();
}

//input값 배열에 담긴 애들을 화면에 뿌리기
function render() {
    let list = [];

    if(mode == "all") {
        list = taskList
    } else if(mode == "ongoing" || mode == "done") {
        list = filterList
    } 

    let resultHTML = '';
    for(let i=0; i<list.length; i++) {
        //isComplte가 true이면 글에 밑줄 치게된다.
        if(list[i].isComplete == true) {
            resultHTML += `<div class="task">
                                <div class="task-done">${list[i].taskContent}</div>
                                <div>
                                    <button onclick="toggleComplete('${list[i].id}')">check</button>
                                    <button onclick="deleteTask('${list[i].id}')">Delete</button>
                                </div>
                            </div>`;
        } else {
            resultHTML += `<div class="task">
            <div>${list[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${list[i].id}')">check</button>
                <button onclick="deleteTask('${list[i].id}')">Delete</button>
            </div>
        </div>`;
        }     
    }
    document.getElementById("task-board").innerHTML = resultHTML;   
}

//taskList객체에 false를 id값을 이용해 false를 true로 변경하는 로직
function toggleComplete(id) {
    for(let i=0; i<taskList.length; i++) {
        if(taskList[i].id == id) {
            //이렇게 되면 check박스를 아무리 눌러도 true만나온다...그래서 밑줄친채로 영원히이잉....
            //taskList[i].isComplete = true;
            //그래서 이렇게 바꿧다. ! 이게 있으면 true이면 false로 true이면 false로 반환
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render()
    console.log(taskList);
}

//taskList객체에 각각 id값 부여
function randomIDGenerate() {
    return '_' + Math.random().toString(36).substr(2,9);
}

function deleteTask(id) {
    console.log("deleteTask클릭");
    for(let i=0; i<taskList.length; i++) {
        if(taskList[i].id == id) {       
            taskList.splice(i, 1);
            break; 
        }
    }
    render();
}

//tabs클릭했을때 함수
function filter(event) {
    mode = event.target.id;
    filterList = [];
    console.log("filter클릭됨", event.target.id);
    if(mode == "all") {
        render()
    } else if(mode == "ongoing") {
        for(let i=0; i<taskList.length; i++) {
            if(taskList[i].isComplete == false) {
                filterList.push(taskList[i]);
            }
        }
        console.log(filterList);
        render();
    } else if(mode == "done") {
        for(let i=0; i<taskList.length; i++) {
            if(taskList[i].isComplete == true) {
                filterList.push(taskList[i]);
            }
        }
        render();
    }
}
