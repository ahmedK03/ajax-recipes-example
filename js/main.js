var selector = document.getElementById('selector');
var goBtn = document.getElementById('goBtn');
var searchBtn = document.getElementById('searchBtn');
var searchMeals = document.getElementById('searchMeals')
var httpReq = new XMLHttpRequest();
var box = ``;
var box2 = ``;
var allMeals = [];
var inputs_offset = $(".input_parent").offset().top;

//goBtn Action
goBtn.addEventListener('click', function() {
    getData(selector.value)
});

// getting Recipes' API 
let getData = (value) => {
    if (value == 'Select Reciepe') {
        alert("Please Select Reciepe")

    } else {
        getMeals(value)
        alert("Recipes are Ready")
    }
}

// on load recipe
window.addEventListener("load", () => {
    getMeals('pizza')
})

function getMeals(value) {

    httpReq.open('GET', `https://forkify-api.herokuapp.com/api/search?q=${value}`)

    httpReq.send()
    httpReq.addEventListener('readystatechange', () => {
        if (httpReq.readyState == 4) {
            allMeals = JSON.parse(httpReq.response).recipes;
            displayMeals()
            clearData()
        }
    })
}

// Display Recipes in Document
function displayMeals() {
    for (var i = 0; i < allMeals.length; i++) {
        box += `<div class="col-md-4 p-2">
        <div class="card">
            <img src="${allMeals[i].image_url}" class="card-img-top" alt="">
            <div class="card-body">
                <h5 class="card-title">${allMeals[i].title}</h5>
                <p class="publisher card-text text-muted">auther:"<span>${allMeals[i].publisher}</span>"</p>
            </div>
            <div class="card-footer text-right">
                <a href="${allMeals[i].source_url}" class="card-link">see more</a>
            </div>
        </div>
        </div>`
    }
    document.getElementById('displayMeals').innerHTML = box
}

// seach for a Certain Recipe
searchBtn.addEventListener('click', () => {
            var searchText = searchMeals.value
            for (var i = 0; i < allMeals.length; i++) {
                if (allMeals[i].title.toLowerCase().includes(searchText.toLowerCase()) || allMeals[i].publisher.toLowerCase().includes(searchText.toLowerCase())) {
                    box2 += `<div class="col-md-4 p-2">
            <div class="card">
                <img src="${allMeals[i].image_url}"class="card-img-top mx-auto" alt="">
                <div class="card-body">
                    <h6 class="card-title"><span>${allMeals[i].title.replace(searchText,`<span class="highLightedSearch">`+searchText+`</span>`)}</span></h6>
                    <p class="publisher card-text"><span>${allMeals[i].publisher.replace(searchText,`<span class="highLightedSearch">`+searchText+`</span>`)}</span></p>
                </div>
                <div class="card-footer text-right">
                    <a href="${allMeals[i].source_url}"class="card-link">see more</a>
                </div>
            </div>
        </div>`
        }
    }
    document.getElementById('displayMeals').innerHTML=box2
    clearSearchData()
})

// clear Previous display
function clearData(){
    box=``
}
function clearSearchData(){
    box2=''
    console.log("test clear search");
}

// jquery stuff
$(".scroll-down").click(()=>{
    var recipesSection_offset = $("#recipesSection").offset().top;
    // console.log(recipesSection_offset);
    $('html,body').animate({scrollTop:recipesSection_offset - 250},1500)
    // alert("done")
})
// smooth scrolling
$(".navbar .nav-item a").click(function(e) {
    let section_href = $(this).attr("href");
    let section_offset = $(section_href).offset().top;
    $('html,body').animate({ scrollTop: section_offset - 300 }, 1500);
    //active tab coloring
    $(".navbar li a").removeClass('active-tab')
    $(this).addClass('active-tab')
    
})

// navbar color while scrolling

$(window).scroll(function(){
    var top_scroll = $(this).scrollTop();
    if(top_scroll > 650){
        $(".navbar").css({"background-color":"#bbf"})
    }else{
        $(".navbar").css({"background-color":"rgba(0, 0, 0, 0.5)"})

    }
})