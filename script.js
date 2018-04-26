

let page = 1;
let lookingForData = false;
    function fetchEvents() {
        lookingForData=true;
        
        let urlParams = new URLSearchParams(window.location.search);

        let catid = urlParams.get("category");
        let endpoint = "http://wp.astraldesign.dk/wp-json/wp/v2/events?_embed&per_page=2&page=" + page
          if (catid) { // DRY
          fetch("http://wp.astraldesign.dk/wp-json/wp/v2/events?_embed&per_page=2&page=" + page + "&categories=" + catid)
              .then(e => e.json())
              .then(showEvents);

          } else {
          fetch("http://wp.astraldesign.dk/wp-json/wp/v2/events?_embed&per_page=2&page=" + page)
              .then(e => e.json())
              .then(showEvents);

        //not working
       
    }
    }
    function showEvents(data) {
        console.log(data);
        lookingForData=false;
        data.forEach(showSingleEvent);
       
        
        
    }

    function showSingleEvent(anEvent) {
        console.log(anEvent);
        let template = document.querySelector("#evTemp").content;
        let clone = template.cloneNode(true);
        
        clone.querySelector("h1").textContent = anEvent.title.rendered;
        clone.querySelector(".descript").innerHTML = anEvent.content.rendered
        clone.querySelector(".price span").textContent = anEvent.acf.price
        clone.querySelector(".location").textContent = anEvent.acf.location
        clone.querySelector(".date span").textContent = anEvent.acf.date
        clone.querySelector(".hour span").textContent = anEvent.acf.hour
        
   if (anEvent._embedded["wp:featuredmedia"]) { //img is there
              clone.querySelector("img").setAttribute("src", anEvent._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url)
          } else { // no img
              clone.querySelector("img").remove()
          }
        
        clone.querySelector('.readmore').href="subpage.html?id=" +anEvent.id
        let eventList = document.querySelector("#eventList");
        eventList.appendChild(clone);
    }
fetchEvents();


setInterval(function(){
  
  if(bottomVisible()){
    console.log("We've reached rock bottom, fetching articles")
    page++;
    fetchEvents();
  }
}, 100)

function bottomVisible() {
  const scrollY = window.scrollY
  const visible = document.documentElement.clientHeight
  const pageHeight = document.documentElement.scrollHeight
  const bottomOfPage = visible + scrollY >= pageHeight
  return bottomOfPage || pageHeight < visible
}
