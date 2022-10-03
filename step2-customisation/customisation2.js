let accommodationsArray;
let guestInput = document.querySelector(".number_of_guest");
let budgetInput = document.querySelector(".budget");
let searchButton = document.querySelector("#search");
var submitBtn = document.querySelector(".form-submit")
var formContainer = document.querySelector(".container--form")
var hideBtn = document.querySelector(".hide-btm")
var moveToFormBtn = document.querySelector("#bill__button")


function movingToform () {
    moveToFormBtn.onclick = function() {
        formContainer.classList.remove('hidden');
    }
    
    hideBtn.onclick = function() {
        formContainer.classList.add('hidden');
    }
    submitBtn.onclick = function() {
        formContainer.classList.add('hidden');
    }
}

// header function
function calculateDays() {
    var d1 = document.getElementById("d1").value;
    var d2 = document.getElementById("d2").value;
    const dateOne = new Date(d1);
    const dateTwo = new Date(d2);
    const time = Math.abs(dateTwo - dateOne);
    const days = Math.ceil(time / (1000 * 60 * 60 * 24));
    return days;
}
document.getElementById("d1").addEventListener("input", handleDates)

document.getElementById("d2").addEventListener("input", handleDates)


function handleDates(event){
    if(document.getElementById("d1").value && document.getElementById("d2").value) {
        document.getElementById("output").textContent= calculateDays() + " " + "day(s)";
    }
}  


// body functions
async function fetchAccommodation() {
    const response = await fetch("/accommodations.json");
    const data = await response.json();
    accommodationsArray = data.accommodations;
    const categoryArray = data.categories;
    displayOption(accommodationsArray);
    displayCategories(categoryArray)
    categoryEffect();
    preparefiltering();
    movingToform();
}

function displayOption(accommodations) {
    let accommodationOptions ="";
    for (let accommodation of accommodations) {

        const id = accommodation.id;
        const name = accommodation.name;
        const type = accommodation.type;
        const price = accommodation.price;
        const minDay = accommodation.minDay;
        const maxDay = accommodation.maxDay;
        const minGuest = accommodation.minGuest;
        const maxGuest = accommodation.maxGuest;
        const location = accommodation.location;
        const bfPrice1 = accommodation.bfPrice1;
        const bfPrice2 = accommodation.bfPrice2;
        const img = accommodation.img;
        accommodationOptions += `
        <div class="option" data-id="${id}">
            <div class="img__container">
                        <img id="img" src="${img}" alt="">
                        <i class="fa-solid fa-image" id="img__icon"></i>
                    </div>
                    <div class="option__info">
                        <div class="option-offset">
                            <p class="option__name">${name} ${type}</p>
                            <div class="info__container">
                                <div class="detail">
                                    <div class="icon__container">
                                        <i class="fa-solid fa-user icon"></i>
                                    </div> 
                                    <p class="description">${minGuest} to ${maxGuest} people</p>
                                </div>
                                <div class="detail">
                                    <div class="icon__container">
                                        <i class="fa-solid fa-location-dot icon"></i>
                                    </div>
                                   
                                    <p class="description">${location}</p>
                                </div>
                                <div class="detail">
                                    <div class="icon__container">
                                        <i class="fa-solid fa-moon icon"></i>
                                    </div>
                                    
                                    <p class="description">Min: ${minDay} night(s)  -  Max: ${maxDay} night(s)</p>
                                </div>
                                <div class="detail">
                                    <div class="icon__container">
                                        <i class="fa-solid fa-dollar-sign icon"></i>
                                    </div>
                                    
                                    <p class="description">from $${price} p/n</p>
                                </div>
                                <div class="breakfast-detail">
                                    <div class="icon__container">
                                        <i class="fa-solid fa-bowl-food icon"></i>
                                    </div>
                                            
                                    <div class="breakfast__options">
                                            <p class="description">Continental Breakfast ($${bfPrice1}.00 p/p)</p>
                                            <p class="description">English Breakfast ($${bfPrice2}.00 p/p)</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        `
    }
    document.querySelector(".accommodation__container").innerHTML = accommodationOptions;
    selectingOption();
    
}

function displayCategories() {
   let categoryList = document.querySelectorAll(".tab-title");
   for (let categoryItem of categoryList) {
       categoryItem.addEventListener("click", function(event) {
           filterVideoByCategoryId(event.currentTarget.dataset.id)
       })
   }
}

function filterVideoByCategoryId(id) {
    if (id === "All") {
        displayOption(accommodationsArray)
    } else {
        let matches = [];
        for (let accommodation of accommodationsArray) {
            if (accommodation.type === id) {
                matches.push(accommodation)
            }
        }
        displayOption(matches)
    }
}

function selectingOption(){
    const optionList = document.querySelectorAll(".option")
    for (let option of optionList) {
        option.addEventListener("click", function(e) {
            for (option of optionList) {
                option.classList.remove("active");
            }
            e.currentTarget.classList.add("active");
            const selectedOption = accommodationsArray.find(function(option) {
                return option.id == e.currentTarget.dataset.id;
            });
            showingBill(selectedOption);
        })
    }
    
}



function showingBill(selectedOption) {
    let selectedAccommodation = "";
    const name = selectedOption.name;
    const type = selectedOption.type;
    const price = selectedOption.price;
    const bfName1 = selectedOption.bfName1;
    const bfPrice1 = selectedOption.bfPrice1;
    const bfName2 = selectedOption.bfName2;
    const bfPrice2 = selectedOption.bfPrice2;
    selectedAccommodation += `
    <div class="bill__container">
                <p class="bill__title">Booking Detail:</p>
                <div class="bill__detail">
                    <div class="detail__group">
                        <p class="accommodation__title">Accommodation:</p>
                        <p class="accommodation__value">${name}</p>
                    </div>
                    <div class="detail__group">
                        <p class="accommodation__title">Type:</p>
                        <p class="accommodation__value">${type}</p>
                    </div>
                    <div class="detail__group">
                        <p class="accommodation__title">Price:</p>
                        <p class="accommodation__value">${price} P/n</p>
                    </div>
                    <div class="detail__group">
                        <p class="accommodation__title">Duration: </p>
                        <p class="accommodation__value"> ${calculateDays()} night(s)</p>
                    </div>
                    <div class="detail__group">
                        <p class="accommodation__title">Number of Guest:</p>
                        <p class="accommodation__value">${guestInput.value}</p>
                    </div>
                    <div class="breakfast__group">
                        <p class="breakfast__title">Breakfast Option:</p>
                        <div class="breakfast__options">
                            <div class="bfoption">
                                
                                <label for="breakfast" class="bfoption1" value="15">${bfName1} (+$${bfPrice1})</label>
                            </div>
                            <div class="bfoption">
                                
                                <label for="breakfast" value="30">${bfName2} (+$${bfPrice2})</label>
                            </div>
                        </div>
                    </div>
                    <div class="line"></div>
                </div>
                <div id="total" class="total">
                    <p class="total__title">Total:</p>
                    <p class="total__value">$ ${calculateDays() * price }.00</p>
                </div>
                <div class="button__container">
                    <button id="bill__button">Next</button>
                </div>
           </div>
    `
    document.querySelector(".bill").innerHTML = selectedAccommodation;
}




function preparefiltering(){

    searchButton.addEventListener("click", function(){
        filterOptionsbyInput(accommodationsArray);
    });

}




function filterOptionsbyInput(accommodationsArray){
    displayOption(accommodationsArray);
    let matches =[];
    for (let accommodation of accommodationsArray){
        const minDay = accommodation.minDay;
        const maxDay = accommodation.maxDay;
        const minGuest = accommodation.minGuest;
        const maxGuest = accommodation.maxGuest;
        const price = accommodation.price;

        if (    minDay <= calculateDays() 
            &&  calculateDays() <= maxDay
            &&  minGuest <= parseInt(guestInput.value)
            &&  parseInt(guestInput.value) <= maxGuest
            &&  price < parseInt(budgetInput.value) ) 
            { matches.push(accommodation); }
    }
    displayOption(matches);

}

function categoryEffect() {
    const $ = document.querySelector.bind(document)
    const $$ = document.querySelectorAll.bind(document)

    const tabs = $$('.tab-item')
    const tabActive = $('.tab-item.tab-active')
    const line = $('.tab__line')

    line.style.left = tabActive.offsetLeft + 'px'
    line.style.width = tabActive.offsetWidth + 'px'

        for (const tab of tabs) {
            tab.onclick = function() {
                $('.tab-item.tab-active').classList.remove("tab-active");
                line.style.left = tab.offsetLeft + 'px'
                line.style.width = tab.offsetWidth + 'px'
    
                this.classList.add('tab-active')
        }
       

    }
    
}




// call the functions
calculateDays();
fetchAccommodation();