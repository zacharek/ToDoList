let taskInput = document.querySelector('#taskInput');
let addTaskButton = document.querySelector('#addTaskButton');
let taskList = document.querySelector('#taskList');
let removeFinishedTasks = document.querySelector('#removeFinishedTasksButton');
let completedTasks = [];
let tasksArray = [];

addTaskButton.addEventListener('click', addLi);

function upBtnChildCheck() {
    taskList.firstElementChild.querySelector('.btn-up').style.visibility='hidden';
    for(let i = 1; i < taskList.children.length; i++) {
        taskList.children[i].querySelector('.btn-up').style.visibility='visible';
    }
}

function downBtnChildCheck() {
    taskList.lastElementChild.querySelector('.btn-down').style.visibility='hidden';
    for(let i = 0; i < taskList.children.length-1; i++) {
        taskList.children[i].querySelector('.btn-down').style.visibility='visible';
    }
}

function addLi() {
    let li = document.createElement('li');
    li.innerHTML =
        `<h1>${taskInput.value}</h1>
         <button class="btn-delete">Delete</button>
         <button class="btn-complete">Complete</button>
         <button class="btn-up">Up</button>
         <button class="btn-down">Down</button>
        `;
    taskList.appendChild(li);
    upBtnChildCheck();
    downBtnChildCheck();
    taskInput.value = '';
    tasksArray.push(li);
    console.log(taskList.children);
    let allUpBtn = document.querySelectorAll('.btn-up');
    allUpBtn.forEach(function(up,index){
        index===allUpBtn.length-1&&
        (up.addEventListener('click', function(){
            taskList.insertBefore(this.parentElement,this.parentElement.previousElementSibling);
            upBtnChildCheck();
            downBtnChildCheck();
        }))
    });
    let allDownBtn = document.querySelectorAll('.btn-down');
    allDownBtn.forEach(function(up,index){
        index===allDownBtn.length-1&&
        (up.addEventListener('click', function(){
            taskList.insertBefore(this.parentElement.nextElementSibling,this.parentElement);
            upBtnChildCheck();
            downBtnChildCheck();
        }))
    });
    let completeButton = document.querySelectorAll('.btn-complete');
    completeButton.forEach(function (btn,index) {
        index===completeButton.length-1&&
        (btn.addEventListener('click', function () {
            this.parentElement.classList.toggle('complete');
        }))
    });
    let deleteButton = document.querySelectorAll('.btn-delete');
    deleteButton.forEach(function(btn, index) {
        index===deleteButton.length-1&&
        (btn.addEventListener('click', function() {
            taskList.removeChild(li);
            let i = tasksArray.indexOf(li);
            tasksArray.splice(i,1)
            upBtnChildCheck();
            downBtnChildCheck();
        }))
    })
}

removeFinishedTasks.addEventListener('click', function () {
    completedTasks = tasksArray.filter(function (elem) {
        return elem.className === 'complete';
    });
    console.log(completedTasks);
    completedTasks.forEach(function (elem) {
        taskList.removeChild(elem);
    });
    completedTasks = [];
    let tempArr =  tasksArray.filter(function (elem) {
        return elem.className === '';
    });
    tasksArray = tempArr;
    upBtnChildCheck();
    downBtnChildCheck();
});
