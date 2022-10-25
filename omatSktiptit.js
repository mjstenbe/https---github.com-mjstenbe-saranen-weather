// Lisätään nappiin kuuntelija
let b = document.getElementsByTagName("button")[0];
let i = document.getElementsByTagName("input")[0];

b.addEventListener("click", function () {
  console.log("Painoit nappia! " + i.value);
});

// Lisätään tekstikenttään kuuntelija

i.addEventListener("focus", function onfocus() {
  console.log("Aktivoit kentän!");
  i.value = "";
});

// Lisätään toinen kuuntelija
i.addEventListener("blur", function onfocus() {
  console.log("Poistuit kentästä!");
  i.value = "Kirjoita hakutermi";
});

function haeData(kaupunki) {
  var xmlhttp = new XMLHttpRequest();
  let url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    kaupunki +
    "&units=metric&mode=XML&APPID=ff64c247a136f706923d1ee0d55d71e2";
  xmlhttp.open("GET", url, true);
  xmlhttp.send();

  xmlhttp.onreadystatechange = function () {
    // Tarkistetaan virheet
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      // Lokitetaan data
      console.log(xmlhttp.responseText);
      // Muutetaan string muotoinen data JSON-muotoon
      let data = JSON.parse(xmlhttp.responseText);
      console.log(data);
      // Kutsu funktiota joka rakentaa taulukon
      rakennaTaulukko(data);
    }
  };
}

function rakennaTaulukko(data) {
  console.log(data.name);
  console.log(data.main.temp);

  // Muodostetaan datan ulkoasu
  let html = `
  <select onchange="haeKaupunki()" name="paikka" id="paikka">
  <option value="Helsinki">Helsinki</option>
  <option value="Turku">Turku</option>
  <option value="Kuopio">Kuopio</option>
  <option value="Bangkok">Bangkok</option>
</select>
<br>
  <div id="container">
    <div>${data.name}</div>  
    <div>${data.weather[0].description}</div>
    <div>${data.main.temp} &deg;C</div>
    <div>${data.main.humidity} %</div>
    <div>${data.wind.speed} m/s</div>
    <div><img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png"></div>
  </div>
    `;
  // Injektoidaan sisältö sivulle
  document.querySelector("#weather").innerHTML = html;
}

function haeKaupunki() {
  let kaupunki = document.querySelector("select").value;
  haeData(kaupunki);
}
haeData("Helsinki");
