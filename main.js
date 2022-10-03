function map() {
    var map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);
    
    L.Routing.control({
        waypoints: [
          L.latLng(57.74, 11.94),
          L.latLng(57.6792, 11.949)
        ]
      }).addTo(map);    
      
    var marker = L.marker([51.5, -0.09]).addTo(map);
}




// Show contact us box when the button is clicked
const contactUsDiv = document.querySelector(".contact-us");
const contactUsButton = document.querySelector(".secondary-btm");
const hideButton = document.querySelector(".hide-btm");

contactUsButton.onclick = function () {
    contactUsDiv.classList.remove("hidden");
    map();
}

hideButton.onclick = function () {
    contactUsDiv.classList.add("hidden");
}

// show destionation box when the button is clicked
const destinationButton = document.querySelector(".primary-btm");
const destinationContainer = document.querySelector(".destination-container")
const DestinationHideButton = document.querySelector(".destination-hide-btm");

destinationButton.onclick = function () {
    destinationContainer.classList.remove("hidden");
}
DestinationHideButton.onclick = function () {
    destinationContainer.classList.add("hidden");
}

// tab ui for destination pop up tab
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const tabs = $$('.tab-item')
const panes = $$('.tab-pane')
const tabActive = $('.tab-item.active')
const line = $('.tabs .line')

line.style.left = tabActive.offsetLeft + 'px'
line.style.width = tabActive.offsetWidth + 'px'

tabs.forEach((tab, index) => {
const pane = panes[index]

    tab.onclick = function() {
        $('.tab-item.active').classList.remove("active");
        $('.tab-pane.active').classList.remove("active");

        line.style.left = tab.offsetLeft + 'px'
        line.style.width = tab.offsetWidth + 'px'

        this.classList.add('active')
        pane.classList.add('active')
    }
})
