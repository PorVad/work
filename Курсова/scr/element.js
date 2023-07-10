function buildElementToPage(id, elem) {                               
    const element = document.createElement('div');
    element.classList.add('element');
    element.insertAdjacentHTML('afterbegin', `
    <div class="element-content">
        <div class="element-name">${elem.name}</div>
        <img src="img/${elem.image}" class="element-img">
        <p class="element-text">Кількість кадрів на секунду: <span class="element-fps"><b>${elem.fps}</b></span></p> 
        <p class="element-text">Розширення відео: <span class="element-video"><b>${elem.video}</b></span></p> 
    </div>
    <div class="element-footer">
        <button class="blue-btn" onclick="modalInEdit(${id})">Редагувати</button><span> </span>
        <button class="red-btn" onclick="removeElementFromStorage(${id})">Видалити</button>
    </div>
    <p></p>
    `);
    document.getElementsByClassName("displayzone")[0].appendChild(element);
}

function modalInCreate() {
    document.getElementsByClassName("modal-title")[0].innerText = "Створити нову камеру";
    document.getElementById("modal-btn").setAttribute("onclick", `addElementToLocalStorage()`);
    document.getElementById("modal-btn").innerText = "Створити";
    document.getElementById("img-prev-section").setAttribute("style", "display: none");
    document.getElementById("select-img").innerText = "Виберіть зображення";
    
    modal.open();
}

function modalInEdit(id) {
    document.getElementsByClassName("modal-title")[0].innerText = "Редагувати";
    document.getElementById("modal-btn").innerText = "Змінити";
    document.getElementById("modal-btn").setAttribute("onclick", `editElementInLocalStorage(${id})`);

    let edElem = JSON.parse(localStorage.getItem(id));

    document.getElementById("name").value = edElem.name;   
    document.getElementById("fps").value = edElem.fps;   
    document.getElementById("video").value = edElem.video;   
    document.getElementById("imgprev").setAttribute("src", `img/${edElem.image}`);
    document.getElementById("select-img").innerText = "Ви можете вибрати нове зображення";
    document.getElementById("img-prev-section").setAttribute("style", "display: block");
    
    modal.open();
}

function showPrewImg(){
    let filename = document.getElementById("imgfile").value.replace(/C:\\fakepath\\/, '');
    document.getElementById("imgprev").setAttribute("src", `img/${filename}`);
    document.getElementById("select-img").innerText = "Ви можете вибрати нове зображення";
    document.getElementById("img-prev-section").setAttribute("style", "display: block");
}

document.getElementById("imgfile").addEventListener("change", showPrewImg);


//Валідація введеного імені і об'єму чашки
function valNameAndFPS(){
    let valid = true;
    let showMsg = '';
    let formName = document.getElementById("name").value.trim();
    let formFPS = document.getElementById("fps").value.trim();
    
    if (!formName) {
        showMsg = 'Field is empty. INPUT NAME . '
        valid = false;
    }  
    
    if (!formFPS) {
        showMsg = showMsg + 'Field is empty. INPUT the FPS. '
        valid = false;
    } else
    if (+formFPS > 1000) {
        showMsg = showMsg + 'FPS more than 120. INPUT the CORRECT FPS. '
        valid = false;
    } else
    
    if (+formFPS < 10) {
        showMsg = showMsg + 'FPS less than 30. INPUT the CORRECT FPS. '
        valid = false;
    } 
    
    if (valid) {return valid} else {alert (showMsg)}
   
}
function validImg() {
    if (document.getElementById("imgfile").value) {return true} 
    else {
        alert ("The image was not selected. SELECT an IMAGE. ")
        return false} ;
}

// Створення параметрів нового елемента та розміщення його в LS
function addElementToLocalStorage(){
            
    if (valNameAndFPS() && validImg()) {
        //Шукаємо максимальне значення ID,  в LS не зайняте
        let keyArr = [];
        for(let i=0; i<localStorage.length; i++) {
            let key = Number(localStorage.key(i)) ;
            keyArr[i] = key
        }
        const freeKey = Math.max(...keyArr) + 1; 
        //Забираємо значення з форми
        let filename = document.getElementById("imgfile").value.replace(/C:\\fakepath\\/, ''); // Обрізаємо C:\fakepath\
        // Будуємо новий елемент
        const newElement = {};
        newElement.name =  document.getElementById("name").value;   
        newElement.fps = document.getElementById("fps").value;   
        newElement.video = document.getElementById("video").value;   
        newElement.image = filename;   
        // Конвертуємо елемент в стрічку
        let rowSt = JSON.stringify(newElement)
        // Пакуємо елемент в LS
        localStorage.setItem(`${freeKey}`, rowSt)
        modal.close()
        setTimeout(location.reload(), 1000)
    }
}
   
// Редагування параметрів елемента та розміщення його в LS
function editElementInLocalStorage(id) {
    if (valNameAndFPS()) {
        let edElem = JSON.parse(localStorage.getItem(id))
        edElem.name =  document.getElementById("name").value;   
        edElem.fps = document.getElementById("fps").value;   
        edElem.video = document.getElementById("video").value;   
        if (document.getElementById("imgfile").value) {
            let filename = document.getElementById("imgfile").value.replace(/C:\\fakepath\\/, ''); // Обрізаємо C:\fakepath\
            edElem.image = filename; 
        }
        // Конвертуємо елемент в стрічку
        let rowSt = JSON.stringify(edElem)
        // Пакуємо елемент в LS
        localStorage.setItem(`${id}`, rowSt);
        
        modal.close();
        setTimeout(location.reload(), 1000);
    }
   
}

// Видалення параметрів елемента з LS
function removeElementFromStorage(id){
    if (confirm("Are you sure you want to delete?")) {
        localStorage.removeItem(id)
        location.reload();          //Перезавантажуємо вікно
    }

} 

let keyNumbers = Object.keys(localStorage).length //Визначаємо кількість об'єктів LocalStorage

for (let k=0; k<keyNumbers; k++) {
    let keyName = localStorage.key(k)
    let row = JSON.parse(localStorage.getItem(keyName))
    buildElementToPage(keyName, row)
}

