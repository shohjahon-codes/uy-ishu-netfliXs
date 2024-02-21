"use strict"

// -------------------------  Variables ---------------------------

let movies__wrapper = $('#movies-wrapper');
let categoryOption = $('#category');
let movies_file = movies.splice(0, 100);
let categories = [];
let header_search = $('#header-search');
let dark_btn = $('#dark-btn');
let body = $('body');
let filmname =$('#namefilm');
let rating = $('#rating');
let multbutton = $('#multibutton');
let toastOpen = $('.toast');
let toastError = $('.toast-close')



// ---------------------------- render categories ---------------------------------
function renderCategories(data){
    data.forEach(element => {
        element.categories.forEach(el => {
            if(!categories.includes(el)){
                categories.push(el);
            }
        })
    });
}
renderCategories(movies_file)
renderdata(categories, categoryOption, 'option', '', ``)

function renderdata(data, tagWrapper, ...tagName){
    data.sort().forEach(el => {
        tagName[2] = el;
        tagWrapper.append(createElement(...tagName));
    });
}

// -------------------------------- Render data ----------------------------------

function renderMovies(data, tagWrapper){
    tagWrapper.innerHTML = "";
    if(data.length > 0){
        data.forEach(el =>{
            const card = createElement('div', 'card', `
                <img src="${el.smallThumbnail}" alt="smth">
                <div class="card-body">
                    <h2>${el.title.length > 26 ? el.title.substring(0,23)+"..." : el.title}</h2>
                    <ul>
                        <li><strong>Year:</strong> ${el.year}</li>
                        <li><strong>Categories:</strong>${el.categories}</li>
                        <li><strong>Rating:</strong>${el.imdbRating}</li>
                        <li><strong>Language:</strong>${el.language}</li>
                    </ul>
    
                    <div class="flex btn-wrappeer items-center gap-x-3">
    
                        <button 
                            data-like="${el.imdbId}"
                            class="save grid hover:bg-red-700 hover:text-white duration-500 text-red-700 place-content-center p-4 border w-12 h-12 rounded-full">
                            <i data-like="${el.imdbId}" class="bi bi-suit-heart-fill save"></i>
                        </button>
    
                        <a href="https://www.youtube.com/results?search_query=${el.youtubeId}" target="_blank" class="flex hover:bg-black hover:text-white duration-500  justify-center gap-x-2 text-xl items-center border min-w-24 px-3 h-12 rounded-full"> 
                            <i class="bi bi-play-circle-fill"></i>
                            <span>watch movie</span>
                        </a>
                    </div>
    
                </div>
                `
                );
    
            tagWrapper.append(card)
        })
    }else{
        tagWrapper.innerHTML = "<h1>Bunday film mavjud emas</h1>"
    }
}

renderMovies(movies_file, movies__wrapper)




// ---------------------------- Header search ----------------------------
header_search.addEventListener('keyup', (e) =>{
    let div = movies_file.filter(el => {
        if(el.title.toLocaleLowerCase().includes(header_search.value)){
            return el;
        }else{
            return null
        }
    })
    if(e.keyCode == 13){
        movies__wrapper.innerHTML = '<div class="loader"></div>'
        setTimeout(()=> {
            renderMovies(div, movies__wrapper)
        }, 1300);
    }
})


// ------------------------------ Dark mode --------------------------------------
dark_btn.addEventListener('click', ()=> {
    body.classList.toggle("darkmode");

})



multbutton.addEventListener('click', (e)=>{
    e.preventDefault()
    let filmTitle = filmname.value;
    let ratingTitle = rating.value;
    let categoryTitle = categoryOption.value;
    
    let multarr = movies_file.filter((el) => {
        return el.title.toLowerCase().includes(filmTitle.toLowerCase()) && el.categories.includes(categoryTitle) && el.imdbRating >= ratingTitle;
    })

    movies__wrapper.innerHTML = '<div class="loader"></div>'
        setTimeout(()=> {
            renderMovies(multarr, movies__wrapper)
        }, 1300);
})


let basket = []
movies__wrapper.addEventListener('click', (e)=>{
    let id = e.target.getAttribute('data-like');
    if(e.target.classList.contains('save')){
        if(! basket.includes(id)){
            basket.push(id);
            toastOpen.style.cssText = "opacity: 1; transition: all 0.1s linear; right: 0";
            localStorage.setItem("Likedata", JSON.stringify(basket));
            setTimeout(()=>{
                toastOpen.style.cssText = "opacity: 0; transition: all 0.1s linear; right: -300px";
            }, 500)
        }else{
            toastError.style.cssText = "opacity: 1; transition: all 0.1s linear; right: 0";
            setTimeout(()=>{
                toastError.style.cssText = "opacity: 0; transition: all 0.1s linear; right: -300px";
            }, 500)
        }
    }
});
