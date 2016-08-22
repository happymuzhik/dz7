;(function(w,d,undefined){

for (var i = 0; i < 11; i++) {
	d.cookie = 'name'+i+'=value'+i;
};

$cookie_table_body = d.getElementById('cookie_table_body');

let add_cookie_button = d.getElementById('add_cookie_button');
let input_name = d.getElementById('name');
let input_value = d.getElementById('value');
let input_expires = d.getElementById('expires');

let draw_tr = function(name,value){
	let tr = d.createElement('tr');
	let td_name = d.createElement('td');
	let td_value = d.createElement('td');
	let td_button = d.createElement('td');
	let button = d.createElement('button');

	td_name.innerText = name;
	td_value.innerText = value;	
	td_button.appendChild(button);	

	button.innerText = 'Удалить';
	button.addEventListener('click', function(){
		if(confirm('Удалить '+name+'?')){
			let date = new Date(0);
			d.cookie = name+"=; path=/; expires=" + date.toUTCString();
			tr.remove();
		}
	});

	tr.appendChild(td_name);
	tr.appendChild(td_value);
	tr.appendChild(td_button);

	$cookie_table_body.appendChild(tr);

	return tr;
};

let cookie_arr =  d.cookie.split(';');

for (let i = 0; i < cookie_arr.length; i++) {
	draw_tr(cookie_arr[i].split('=')[0], cookie_arr[i].split('=')[1]);
};

add_cookie_button.addEventListener('click', function(e){
	e.preventDefault();
	if (input_name.value.trim().length == 0 || isNaN(parseInt(input_expires.value)) ){
		return false;
	}
	let date = new Date;
	date.setDate(date.getDate() + parseInt(input_expires.value));	
	d.cookie = input_name.value+"="+input_value.value+"; expires=" + date.toUTCString()+";";
	draw_tr(input_name.value,input_value.value);
});

})(window,document);