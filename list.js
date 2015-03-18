function init() {
    // toBuy list 
	// Parse local storage toBuy list to array 
	var toBuy = JSON.parse(localStorage["toBuy"]);

	// for each of toBuy list   
	toBuy.forEach(function(listEntries) {

	   var stringifiedLine = JSON.stringify(listEntries);
	   var elementsOfLines = JSON.parse(stringifiedLine);

	   // line from addListItem()
	   item = $('<li class="item"><button class="checkbox">&#x2713;</button><span class="list">' + elementsOfLines + '</span><button class="delete">X</button></li>');
	   $('#itemList').append(item);   
	});

    // Bought list 
	// Parse local storage bought list to array 
	var bought = JSON.parse(localStorage["bought"]);

	// for each of bought list   
	bought.forEach(function(listEntries) {

	   var stringifiedLine = JSON.stringify(listEntries);
	   var elementsOfLines = JSON.parse(stringifiedLine);
	   
	   // line from addListItem()
	   item = $('<li class="item bought"><button class="checkbox">&#x2713;</button><span class="list">' + elementsOfLines + '</span><button class="delete">X</button></li>');
	   $('#itemList').append(item);

	});
}

function updateStorage() {

    var toBuyList = [];
    var boughtList = [];

    // for each of list
    $(".item").each(function() {

        var text = $(this).children(".list").text();

        // Sorting them out to arrays
        if( $(this).hasClass("bought").toString() == "true"){
            boughtList.push(text);
        }
        else{
            toBuyList.push(text);
        }
    });

    localStorage.setItem("toBuy", JSON.stringify(toBuyList));
    localStorage.setItem("bought", JSON.stringify(boughtList));  
}

function addListItem() {
	
	var write = $('#newItem').val();
	var list = $('#itemList');
	var item = $('<li class="item"><button class="checkbox">&#x2713;</button><span class="list">' + write + '</span><button class="delete">X</button></li>');

	if (write.length === 0  || write.length > 33) {
	   return false;
	}
	
	list.prepend(item);
	$("#newItem").val('');
	$("#newItem").focus();

    updateStorage();
}

function deleteItem() {

	$(this).parent().remove();

    updateStorage();
}

function toggleItem() {

	$(this).parent().toggleClass('bought');
	$(this).parent().appendTo('ul#itemList');

    updateStorage();

    // List is redrawn to put toBuy items on top
    $('#itemList').html("");
    init();
}



function showSeznam(){
	$("#letaky").hide();
	$("#letakyLink").removeClass("active"); 

	$("#seznam").show();
	$("#seznamLink").addClass("active")
}

function showLetaky(){
	$("#seznam").hide();
	$("#seznamLink").removeClass("active"); 

	$("#letaky").show();
	$("#letakyLink").addClass("active")
}


$(function() {

	var add = $('#addItem');
	var newItem = $('#newItem');
	var list = $('#itemList');

	$("#seznamLink").on('click',showSeznam);
	$("#letakyLink").on('click',showLetaky);

	add.on('click', addListItem);
	list.on('click', '.checkbox', toggleItem);
	list.on('click', '.delete', deleteItem);
	newItem.on('keypress', function (e) {
	   if (e.which == 13) {
		  addListItem();
	   }
	});
});
