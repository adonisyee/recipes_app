//Helper functions 
const add_row_func = (table_name) => {
	let cur_table = document.getElementById(table_name+'-table').getElementsByTagName('tbody')[0];
	let i = cur_table.getElementsByTagName('tr').length;
	//copy last row, increase row number, remove text, add to table
	let new_row = document.getElementById(table_name+(i-1)).cloneNode(true);
	let row_num = new_row.getElementsByTagName('th');
	let cells = new_row.getElementsByTagName('td');
	row_num[0].innerHTML = i+1;
	for (let i=0; i<cells.length; i++) {
		cells[i].childNodes[1].value = "";
	}
	new_row.id = table_name+i;
	cur_table.appendChild(new_row);
}

const delete_row_func = (table_name) => {
	let cur_table = document.getElementById(table_name+'-table').getElementsByTagName('tbody')[0];
	let i = cur_table.getElementsByTagName('tr').length;
	if (i > 1) {
		cur_table.deleteRow(i-1);
	}
}

//Init variables
const add_ingredient = document.getElementById('add_ingredient');
const delete_ingredient = document.getElementById('delete_ingredient');
const add_prep = document.getElementById('add_prep');
const delete_prep = document.getElementById('delete_prep');
const add_cook = document.getElementById('add_cook');
const delete_cook = document.getElementById('delete_cook');

//Event Listeners
add_ingredient.addEventListener("click", function() {
	add_row_func('ingredient');
});
delete_ingredient.addEventListener("click", function() {
	delete_row_func('ingredient');
});
add_prep.addEventListener("click", function() {
						  add_row_func('prep');
});
delete_prep.addEventListener("click", function() {
	delete_row_func('prep');
});
add_cook.addEventListener("click", function() {
						  add_row_func('cook');
});
delete_cook.addEventListener("click", function() {
	delete_row_func('cook');
});
