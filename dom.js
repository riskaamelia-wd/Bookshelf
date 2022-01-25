const belum = "listBelum";
const selesai = "listSelesai"; 
const item = "listItem"

function tambah() {
	const listbelum = document.getElementById(belum);
    const listselesai = document.getElementById(selesai);
    const textbook = document.getElementById("inputBookTitle").value;
    const author = document.getElementById("inputBookAuthor").value;
    const year = document.getElementById('inputBookYear').value;

    let cek = document.getElementById("inputBookIsComplete");
 
    if (cek.checked) {
        cek = true;
    } else {
        cek = false;
    }

    const book = makeBook(textbook, author, year, cek);
    const bobject = composeBobject(textbook, author, year, cek);

    book[item] = bobject.id;
    listBelum.push(bobject);

    if(cek){
        listselesai.append(book);
    } else {
        listbelum.append(book);
    }
    updateStorage();
}

function undo() {
    return buatButton("undo-button", function (event) {
        tambahBelum(event.target.parentElement.parentElement);
    });
}

function tambahBelum(taskElement) {
    const listUncompleted = document.getElementById(belum);
    const taskBook = taskElement.querySelector(".book_item > h3").innerText;
    const taskAuthor = taskElement.querySelector(".book_item > p").innerText;
    const taskYear = taskElement.querySelector(".book_item > p").innerText;
 
    const newBook = makeBook(taskBook, taskAuthor, taskYear, false);
    
    const book = findBook(taskElement[item]);
    book.cek = false;
    newBook[item] = book.id;

    listUncompleted.append(newBook);
    taskElement.remove();

    updateStorage();
}

function tambahSelesai(taskElement) {
    const listCompleted = document.getElementById(selesai);
    const taskBook = taskElement.querySelector(".book_item > h3").innerText;
    const taskAuthor = taskElement.querySelector(".book_item > p").innerText;
    const taskYear = taskElement.querySelector(".book_item > p").innerText;
 
    const newBook = makeBook(taskBook, taskAuthor, taskYear, true);
    const book = findBook(taskElement[item]);
    book.cek = true;
    newBook[item] = book.id;

    listCompleted.append(newBook);
    
    taskElement.remove();
    updateStorage();
}

function makeBook(zbook, author, year, cek) {
     
    const tbook = document.createElement("h3");
    tbook.innerText = zbook;

    const tauthor = document.createElement("p");
    tauthor.innerText = author;
     
    const tyear = document.createElement("p");
    tyear.innerText = year;

    const tombol = document.createElement("div");
    tombol.classList.add("action");
     
    const textContainer = document.createElement("article");
    textContainer.classList.add("book_item")
    textContainer.append(tbook, tauthor, tyear, tombol);
    
    
    if (cek) {
        tombol.append(
            undo(),
            sampah()
        );
        textContainer.append(tombol);
    } else {
        tombol.append(
            checkButton(),
            sampah()
        );
        textContainer.append(tombol);
    }
	return textContainer;
}

function buatButton(buttonTypeClass, eventListener) {
	const button = document.createElement("button");
	button.classList.add(buttonTypeClass);
    
	button.addEventListener("click", function (event) {
		eventListener(event);
	});
	return button;
}
 
function tombolCek() {
    const text = document.querySelector("span");
    if (inputBookIsComplete.checked) {
        text.innerText = "selesai dibaca";

    } else {
        text.innerText = "belum selesai dibaca";
    }
}

function checkButton() {
    return buatButton("check-button",function(event){
        tambahSelesai(event.target.parentElement.parentElement);
    });
}


function hapus(taskElement) {
    const hapuskah = window.confirm("Yakin menghapus buku "+taskElement.querySelector(".book_item > h3").innerText + " ?");
    if (hapuskah === true) {
        const bookPosition = findIndex(taskElement[item]);
        listBelum.splice(bookPosition, 1);

        taskElement.remove();
        updateStorage();
        
    }
}

function sampah() {
    return buatButton("trash-button", function (event) {
        hapus(event.target.parentElement.parentElement);
    });
}


