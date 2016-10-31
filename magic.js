/*
To Do:
 - Make the app visually appealing (randomize the same list instead of creating a new one?
 	Top bar: input, add button, clear all button, select one button, randomize button)
 - Animations while randomizing?
*/

function onBodyLoad () {
	$('#inputItemToAdd').keypress(function(evt){
		var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13'){
           onItemAdd();
        }
	});

	$('#listUserItems').on('click','li',function(){
		$(this).remove();
	})
}

function onItemAdd () {
	var itemInput = $('#inputItemToAdd');
	var itemText = itemInput.val();

	if(itemText.trim() === "") {
		return;
	}

	itemInput.val('');

	var listUserItems = $('#listUserItems');
	listUserItems.prepend($('<li>').addClass('list-group-item').text(itemText));

	itemInput.focus();
}

function generateRandomSequence (min, max) {
	var arr = [];
	var res = [];
	for(let x = min; x < max; x++) {
		arr.push(x);
	}
	while(arr.length > 0) {
		// Not fairly distributed! Extremes have lower probability of occuring
		let index = Math.max(0, Math.round(Math.random() * arr.length - 1));
		res.push(arr.splice(index,1)[0]);
	}
	return res;
}

function randomize () {
	var list = $('#listUserItems').children();
	var randomList = $('#listRandomItems');
	var randomNumbers = generateRandomSequence(0,list.length);

	randomList.children().remove();
	
	randomNumbers.forEach(function(ele, i, arr) {
		randomList.append($(list[ele]).clone());
	});
}

function onClearAll () {
	$('#listUserItems').children().remove();
	$('#listRandomItems').children().remove();
	$('#inputItemToAdd').focus();
}

function selectOne () {
	var list = $('#listUserItems').children();
	// Not fairly distributed! Extremes have lower probability of occuring
	var index = Math.max(0, Math.round(Math.random() * list.length - 1));
	
	var randomList = $('#listRandomItems');
	randomList.children().remove();
	randomList.append($(list[index]).clone());
}