const rootElm = document.getElementById("areaSelector");

async function initAreaSelector() {
  await updatePref();
  await updateCity();
}

//jsonから取得し、オブジェクトに変換
async function getPrefs() {
  const prefResponce = await fetch("./prefectures.json");
  return await prefResponce.json();
}

async function getCities(prefCode) {
  const cityResponce = await fetch(`./cities/${prefCode}.json`);
  return await cityResponce.json();
}

async function updatePref() {
  const prefs = await getPrefs();
  createPrefOptionsHtml(prefs);
}

async function updateCity() {
  const prefSelectorElm = rootElm.querySelector(".prefectures");
  const cities = await getCities(prefSelectorElm.value);
  createCityOptionsHtml(cities);
}

function createPrefOptionsHtml(prefs) {
  const optionStrs = [];
  for (const pref of prefs) {
    optionStrs.push(
      `
        <option name="${pref.name}" value="${pref.code}">
            ${pref.name}
        </option>
        `,
    );
  }

  const prefSelectorElm = rootElm.querySelector(".prefectures");
  prefSelectorElm.innerHTML = optionStrs.join("");

  prefSelectorElm.addEventListener("change", (event) => {
    updateCity();
  });
}

function createCityOptionsHtml(cities) {
  const optionStrs = [];
  for (const city of cities) {
    optionStrs.push(
      `
        <option name="${city.name}" value="${city.code}">
            ${city.name}
        </option>
        `,
    );
  }

  const citySelectorElm = rootElm.querySelector(".cities");
  citySelectorElm.innerHTML = optionStrs.join("");
}

initAreaSelector();
