const SKEY = "BOOK";

let listBelum = [];

function exist() {
	if (typeof(Storage) === undefined) {
		alert("Maaf! Browser anda tidak mendukung local storage");
		return false
	}
	return true;
}

function simpan() {
	const parsed = JSON.stringify(listBelum);
	localStorage.setItem(SKEY, parsed);
	document.dispatchEvent(new Event("saved"));
}

function load() {
	const serialized = localStorage.getItem(SKEY);

	let zbook = JSON.parse(serialized);

	if (zbook !== null) 
		listBelum = zbook;

	document.dispatchEvent(new Event("loaded"));
}

function updateStorage() {
	if (exist())
		simpan();
}

function composeBobject(textbook, author, year, cek) {
	return {
		id: +new Date(),
		textbook,
		author,
		year,
		cek
	};
}

function findBook(bookId) {
	for(book of listBelum) {
		if (book.id === bookId) 
			return book;
	}
	return null;
}

function findIndex(bookId) {
	let index = 0
	for (book of listBelum) {
		if (book.id === bookId)
			return index;
		index++;
	}
	return -1;
}


function refresh() {
	const listUncompleted = document.getElementById(belum);
	const listCompleted = document.getElementById(selesai);

	for (book of listBelum){
		const newBook = makeBook(book.textbook, book.author, book.year, book.cek);
		newBook[item] = book.id;

		if (book.cek) {
			listCompleted.append(newBook);
		} else {
			listUncompleted.append(newBook);
		}
	}
}