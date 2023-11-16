const accessKey = "MDjNtRCxJjjKuvZ5mJm7SOPf8zBzsFTmg7Z8ZT381q4"

const searchForm = document.getElementById("searchForm");
const searchBar = document.getElementById("searchBar");
const searchResult = document.getElementById("searchResult");
const showMoreButton = document.getElementById("showMoreButton");

let keyword = "";
let page = 1;

async function searchImages(){
  keyword = searchBar.value; // Stores the value that we enter into searchBar
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

  const response = await fetch(url);
  const data = await response.json();

  if (page === 1){
    searchResult.innerHTML = ""
  }

  const results = data.results;

  results.map((results) => {
    const image = document.createElement("img");
    image.src = results.urls.small;
    const imageLink = document.createElement("a");
    imageLink.href = results.links.html;
    imageLink.target = "_blank";

    imageLink.appendChild(image);
    searchResult.appendChild(imageLink);
  })
  showMoreButton.style.display = "block";
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  searchImages()
})

showMoreButton.addEventListener("click", () => {
  page++;
  searchImages()
}); 