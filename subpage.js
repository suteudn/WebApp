let urlParams = new URLSearchParams(window.location.search);

let id = urlParams.get("id");
console.log("i want to get article: " + id);


fetch("https://astraldesign.dk/wp/v2/events/"+id)
  .then(e=>e.json())
  .then(showSinglePost)


function showSinglePost(aPost){
  console.log(aPost);
  document.querySelector("#singleEvent h1").textContent=aPost.title.rendered;


  //show carsection
  document.querySelector("#singleEvent").classList.add("slideInCar");
}