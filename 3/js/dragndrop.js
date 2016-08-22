;(function(window, document, undefined){

//// РИСОВАНИЕ БЛОКОВ, ДРАГ Н ДРОП ////////

	var random = function(min,max){	return Math.random() * (max - min) + min; };

	var create_block_button = document.getElementById('create_block_button'),
		save_button = document.getElementById('save_button'),
		container = document.getElementById('content'),
		hex = ['0','1','2','3','4','5','6','7','8','9','0','A','B','C','D','E','F'];

	let create_block_func = function(p_top,p_left,p_height,p_width,p_color){
		var block = document.createElement('div'), color = '#', is_dragging = false, offsetX = 0, offsetY = 0;

		block.addEventListener('mousedown', function(e){
			is_dragging = true;
			offsetX = e.offsetX;
			offsetY = e.offsetY;
		});
		block.addEventListener('mousemove', function(e){
			if(is_dragging){
				e.target.style.top = (e.clientY - offsetY) + 'px';
				e.target.style.left = (e.clientX - offsetX) + 'px';
			}
		});
		block.addEventListener('mouseup', function(e){
			is_dragging = false;
		});

		block.classList.add('block');
		block.style.top = p_top||(random(0,100) + '%');
		block.style.left = p_left||(random(0,100) + '%');
		block.style.height = p_height||(random(0,300) + 'px');
		block.style.width = p_width||(random(0,300) + 'px');

		for (var i = 0; i < 6; i++) {
			color += hex[Math.round(random(0,15))];
		};		
		block.style.backgroundColor = p_color||color;

		container.appendChild(block);		
	};

	create_block_button.addEventListener('click', function(){
		create_block_func()
	});

//// РИСОВАНИЕ БЛОКОВ, ДРАГ Н ДРОП ////////

//// СОХРАНЕНИЕ И ВОССТАНОВЛЕНИЕ ////////

	save_button.addEventListener('click', function(){
		let blocks_arr = document.querySelectorAll('.block');
		let cookie_str = '';
		for (let i = 0; i < blocks_arr.length; i++){
			cookie_str += blocks_arr[i].style.top+':'+blocks_arr[i].style.left+':'+blocks_arr[i].style.height+':'+blocks_arr[i].style.width+':'+blocks_arr[i].style.backgroundColor+'|';			
		};
		document.cookie = 'blocks='+cookie_str.substr(0,cookie_str.length-1);
	});

	let getCookie = function (name) {
		let matches = document.cookie.match(new RegExp(
			"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	 	));
		return matches ? matches[1] : undefined;
	};

	let blocks_coockie = getCookie('blocks');
	if (blocks_coockie){
		blocks_coockie_arr = blocks_coockie.split('|');
		for (let i = 0; i < blocks_coockie_arr.length; i++){
			blocks_style_arr = blocks_coockie_arr[i].split(':');
			create_block_func(blocks_style_arr[0],blocks_style_arr[1],blocks_style_arr[2],blocks_style_arr[3],blocks_style_arr[4]);
		};
	}

//// СОХРАНЕНИЕ И ВОССТАНОВЛЕНИЕ ////////

})(window, document);