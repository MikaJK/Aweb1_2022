import "./styles.css";

if (document.readyState !== "loading") {
  initializeCode();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    initializeCode();
  });
}

async function getWikiSummary(breedname, element) {
  var url = "https://en.wikipedia.org/api/rest_v1/page/summary/" + breedname;
  const response = await fetch(url).then((response) => response.json());
  element.innerHTML = response["extract"];
}

async function getData(imageContainer, breedName) {
  const randomPicture = await fetch(
    "https://dog.ceo/api/breed/" + breedName + "/images/random"
  );

  var imageUrl = await randomPicture.json();
  const response = await fetch(imageUrl["message"]);
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const image = new Image();
  image.src = url;
  image.className = "wiki-img";
  imageContainer.append(image);
  return image;
}

function getTemplate(breedName, fetchName) {
  var mainWiki = document.createElement("div");
  mainWiki.className = "wiki-item";
  var breedHeader = document.createElement("h1");
  breedHeader.className = "wiki-header";
  breedHeader.innerHTML = breedName;
  mainWiki.append(breedHeader);
  var content = document.createElement("div");
  content.className = "wiki-content";
  var p = document.createElement("p");
  p.className = "wiki-text";

  getWikiSummary(fetchName, p);
  var imageContainer = document.createElement("div");
  imageContainer.className = "img-container";
  getData(imageContainer, breedName);

  imageContainer.innerHTML = "";
  content.append(imageContainer);
  mainWiki.append(content);
  content.append(p);
  return mainWiki;
}

function initializeCode() {
  var cont = document.createElement("div");
  var list = ["hound", "havanese", "husky", "pug", "samoyed"];
  var fetchlist = ["Hound", "Havanese_dog", "Husky", "Pug", "Samoyed_dog"];
  cont.className = "container";
  var nro = 0;
  for (var i = 0; i < 5; i++) {
    nro = Math.floor(Math.random() * list.length);
    cont.append(getTemplate(list[i], fetchlist[i]));
  }
  document.body.append(cont);
}
