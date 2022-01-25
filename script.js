document.addEventListener("DOMContentLoaded", function() {
	const submitForm = document.getElementById('inputBook');
	const inputFrom = document.getElementById("inputBookIsComplete");
	
	inputFrom.addEventListener("input", function (event) {
		event.preventDefault();
		tombolCek();
	});



	submitForm.addEventListener("submit", function (event) {
		event.preventDefault();
		tambah();
	});

	if (exist()) {
	load();
	}

});


document.addEventListener("saved", () => {
	console.log("Data Berhasil Disimpan!");
});

document.addEventListener("loaded", () => {
	refresh();
});