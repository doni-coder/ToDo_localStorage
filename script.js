let tasks = [];

let fatherDiv = document.querySelector(".father");
let form = document.querySelector("form");
let taskText = document.querySelector("#taskText");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let textValue = e.target.taskText.value;
  addData(textValue);
  e.target.taskText.value = "";
});

function addData(textValue) {
  let id = Date.now();
  let isToogled = false;
  let update = false
  tasks.push({ id, msg: textValue, isToogled ,update});
  localStore2(tasks);
  addTask(id, textValue, isToogled,update);
}

function addTask(uid, taskValue,toogle,isUpdate) {
  let div = document.createElement("div");
  div.setAttribute("id", "tasks");

  let inptOne = document.createElement("input");
  inptOne.setAttribute("class", "checkBox");
  inptOne.setAttribute("type", "checkbox");

  //----------------------checked------------
  inptOne.addEventListener("click", (e) => {
    toogledTodo(uid);
    checked(uid,inpt,updateBtn)
  });
  //-----------------------------------------

  let inpt = document.createElement("input");
  inpt.setAttribute("type", "text");
  inpt.setAttribute("class", "inpt");
  inpt.setAttribute("value", taskValue);
  inpt.setAttribute("readonly","");

  let updateBtn = document.createElement("button");
  updateBtn.innerText = "update"
  updateBtn.addEventListener("click",()=>{
    update(uid);
    UpdateTask(uid,updateBtn,inpt)
  })

  let deleteBtn = document.createElement("button");
  deleteBtn.innerText = "X";
  deleteBtn.style.backgroundColor = "red"
  deleteBtn.addEventListener("click", (e) => {
    deleteTodoById(uid);
    div.remove();
  });

  if(toogle){
    inpt.style.textDecoration = "line-through"
    inptOne.setAttribute("checked", "");
    updateBtn.setAttribute("disabled",'')
    updateBtn.style.backgroundColor = "grey"
  }

  div.appendChild(inptOne);
  div.appendChild(inpt);
  div.appendChild(updateBtn);
  div.appendChild(deleteBtn);
  fatherDiv.appendChild(div);
}

document.addEventListener("DOMContentLoaded", function () {
  const localStore = () => {
    const todo = JSON.parse(localStorage.getItem("todos")) || [];
    tasks = todo;
    if (tasks.length > 0) {
      tasks.map((arr) => {
        addTask(arr.id, arr.msg, arr.isToogled);
      });
    }
  };
  localStore();
});

function deleteTodoById(id) {
  const updatedTodoList = tasks.filter((todo) => todo.id !== id);
  tasks = updatedTodoList;
  localStore2(tasks);
}

function localStore2(arr) {
  localStorage.setItem("todos", JSON.stringify(arr));
}

function toogledTodo(id,element) {
  const toogledTodo = tasks.map((todo) => {
    if (todo.id === id) {
      todo.isToogled = !todo.isToogled;
    }
    return todo;
  });
  tasks = toogledTodo;
  localStore2(tasks);
}

function checked(id,element,btn){
  const checkedTodo = tasks.map((todo)=>{
    if (todo.id === id) {
      if (todo.isToogled) {
        element.style.textDecoration = "line-through"
        btn.setAttribute("disabled","")
        btn.style.backgroundColor = "grey"
      }else{
        element.style.textDecoration = "none"
        btn.style.backgroundColor = `${todo.update ? "brown":"#16c609"}`
        btn.removeAttribute("disabled")
      }
    }
    return todo;
  })
  tasks = checkedTodo;
  localStore2(tasks)
}

function update(id) {
  const updateTodo = tasks.map((todo)=>{
    if(todo.id === id){
      todo.update = !todo.update;
    }
    return todo;
  })
  tasks = updateTodo;
  localStore2(tasks);
}

function UpdateTask(id,btnTxt,inpt){
  const updateTaskTodo = tasks.map((todo)=>{
    if(todo.id === id){
      if(todo.update === false){
        btnTxt.innerText = "update"
        btnTxt.style.backgroundColor = "#16c609"
        inpt.setAttribute("readonly","");
        todo.msg = inpt.value;
      }else{
        btnTxt.innerText = "save"
        btnTxt.style.backgroundColor = "brown"
        inpt.removeAttribute("readonly");
      }
    }
    return todo;
  })
  tasks = updateTaskTodo;
  localStore2(tasks)
}
