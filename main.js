function init() {

// toBuy list 
// Parse local storage toBuy list to array 
var toBuy = JSON.parse(localStorage["toBuy"]);

// for each of toBuy list   
toBuy.forEach(function(listEntries) {

   // line from addListItem()
   item = $('<li class="item"><button class="checkbox">✓</button><span class="list">' + listEntries + '</span><button class="delete">X</button></li>');
   $('#itemList').append(item);   
});


// Bought list 
// Parse local storage bought list to array 
var bought = JSON.parse(localStorage["bought"]);

// for each of bought list   
bought.forEach(function(listEntries) {

   // line from addListItem()
   item = $('<li class="item bought"><button class="checkbox">«</button><span class="list">' + listEntries + '</span><button class="delete">X</button></li>');
   $('#itemList').append(item);
});
}


// #menu
function showSeznam(){
	$("#letaky").hide();
	$("#letakyLink").removeClass("active"); 

	$("#seznam").show();
	$("#seznamLink").addClass("active");
}

function showLetaky(){
	$("#seznam").hide();
	$("#seznamLink").removeClass("active"); 

	$("#letaky").show();
	$("#letakyLink").addClass("active");
	loadLetaky();
}


// #seznam
function updateStorage() {

    var toBuyList = [];
    var boughtList = [];

    // for each of list
    $(".item").each(function() {

        var text = $(this).children(".list").text();

        // Sorting them out to arrays
        if( $(this).hasClass("bought").toString() == "true"){
            boughtList.push(text);
            $(this).children(".checkbox").text("«");
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
	var item = $('<li class="item"><button class="checkbox">✓</button><span class="list">' + write + '</span><button class="delete">X</button></li>');

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

    updateStorage();

    // List is redrawn to put toBuy items on top
    $('#itemList').html("");
    init();
}


// #letaky
function loadLetaky() {

	$.get('vendorlist.html')
        .success(function(data) {
        $('#letaky').html(data);
    });
}


function notifyToggle() {
	$(this).toggleClass("notifyIconTrue");
	notifyUpdate();
}


// to transfer value from init to notifyUpdate, variable is set as global
var notifyList = []; 
function notifyListInit() {

	$(".notifyIcon").on('click',notifyToggle);
	$(".vendorDetailLink").on('click',showDetail);	

	// parse local storage notifyList into notifyList[]
	notifyList = JSON.parse(localStorage["notifyList"]);

	notifyUpdate();
}

function notifyUpdate(){

    // for each vendor having .notifyIcon add .notifyIconTrue if it's vendorName is in local storage "notifyList"
    $(".notifyIcon").each(function() {

    	var notifyIcon = $(this);
    		
	    notifyList.forEach(function(notifyListCell) {

    		if(notifyListCell == notifyIcon.siblings(".vendorName").text()){
	    		notifyIcon.addClass("notifyIconTrue");
	    	}
	    });
    });

    // notifyList[] could still have values from init
    notifyList = [];

    // add name of all vendors having .notifyIconTrue to local storage "notifyList"
    $(".notifyIconTrue").each(function() {

        var text = $(this).siblings(".vendorName").text();
        notifyList.push(text);
    });
    localStorage.setItem("notifyList", JSON.stringify(notifyList));

  	// notifyList[] is global variable, it needs to be reset manually
    notifyList = [];
}


function showDetail() {

	// get .vendorName, "Penny market" -> "pennymarket"
	var vendorName = $(this).prev(".vendorName").text().toLowerCase().replace(" ", "");

	$.get(vendorName+".html")
        .success(function(data) {
        $('#letaky').html(data);

        $(".leafletLink").on('click',showLeaflet);	
    });   
}


function showLeaflet() {

	// get .vendorName, "Penny market" -> "pennymarket"
	var leafletCode = $(this).siblings(".leafletCode").text();

	$.get(leafletCode+".html")
        .success(function(data) {
        $('#letaky').html(data);

        initPhotoSwipeFromDOM('.my-simple-gallery');
    });

	
}



// Jquery event listeners
$(function() {

	$("#seznamLink").on('click',showSeznam);
	$("#letakyLink").on('click',showLetaky);

	$('#addItem').on('click', addListItem);
	$('#itemList').on('click', '.checkbox', toggleItem);
	$('#itemList').on('click', '.delete', deleteItem);	
	$('#newItem').on('keypress', function (e) {
	   if (e.which == 13) {
		  addListItem();
	   }
	});
});
