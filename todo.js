const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

let idNumbers = 1;

let toDos = [];

function deleteToDo(event) {
    //console.log(event.target.parentNode); -> button의 부모 즉, li를 출력함.

    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){  //filter 안의 함수 결과가 true인 것만 모아서 새로운 array를 생성
        return toDo.id !== parseInt(li.id);         //내가 삭제하고자 하는 toDo와 id가 같지 않은 것만 true
    });
    console.log(cleanToDos);
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos() {
    /*
    localStorage.setItem(TODOS_LS, toDos); -> X 
    localStorage는 자바스크립트 데이터를 저장할 수 없고 오직 string 타입만 저장 가능함
    */

    //JSON.stringify() 함수를 통해 자바스크립트 object를 string으로 변환
    //JSON.parse() 함수를 통해 string을 object로 변환
    //JSON : 데이터를 전달할 때, 자바스크립트가 그걸 다룰 수 있도록 object <---> string 으로 바꿔주는 기능
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = idNumbers;
    idNumbers += 1;
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteToDo);
    span.innerHTML = text;
    li.appendChild(span);
    li.appendChild(delBtn); //li 안에 span, button 넣음
    li.id = newId;
    toDoList.appendChild(li);   //ul 안에 li 넣음

    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null) {
        //console.log(loadedToDos);   //sting 

        const parsedToDos = JSON.parse(loadedToDos);
        //console.log(parsedToDos);   //object

        parsedToDos.forEach(function(toDo) {    //forEach는 array를 위한 함수
            paintToDo(toDo.text);             //parsedToDos 안에 모든 항목들에 함수를 적용시킴.
        });
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit)
}

init();