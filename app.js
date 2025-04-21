const resultDiv = document.querySelector(".result-div");
const input = document.querySelector(".input");

const toUsdBtn = document.getElementById("to-usd-btn");
const toEurBtn = document.getElementById("to-eur-btn");
const toRubBtn = document.getElementById("to-rub-btn");
const toAznBtn = document.getElementById("to-azn-btn");

const usdBtn = document.getElementById("usd-btn");
const eurBtn = document.getElementById("eur-btn");
const rubBtn = document.getElementById("rub-btn");
const aznBtn = document.getElementById("azn-btn");

const clearBtn = document.querySelector(".clear-btn");

let resultcCurrency = "";
let num = 0;
let rates = {};

// Загрузка курсов валют с сайта ЦБ РФ
async function fetchRates() {
  const res = await fetch("https://www.cbr-xml-daily.ru/daily_json.js");
  const data = await res.json();
  rates = {
    USD: data.Valute.USD.Value,
    EUR: data.Valute.EUR.Value,
    AZN: data.Valute.AZN.Value
  };
  console.log("Курсы ЦБ РФ загружены:", rates);
}

fetchRates();

function addCurrency(code) {
  num = parseFloat(input.value);
  if (!num) return alert("Введите число!");

  resultcCurrency = code;
  input.value = `${num} ${code}`;
}

toUsdBtn.addEventListener("click", () => addCurrency("USD"));
toEurBtn.addEventListener("click", () => addCurrency("EUR"));
toRubBtn.addEventListener("click", () => addCurrency("RUB"));
toAznBtn.addEventListener("click", () => addCurrency("AZN"));

function convert(toCurrency) {
  if (!num || !resultcCurrency) {
    resultDiv.textContent = "Сначала введите сумму и выберите валюту";
    return;
  }

  if (resultcCurrency === toCurrency) {
    resultDiv.textContent = `Это уже ${toCurrency}`;
    return;
  }

  let rubValue = 0;
  if (resultcCurrency === "USD") rubValue = num * rates.USD;
  else if (resultcCurrency === "EUR") rubValue = num * rates.EUR;
  else if (resultcCurrency === "AZN") rubValue = num * rates.AZN;
  else if (resultcCurrency === "RUB") rubValue = num;

  let result = 0;
  if (toCurrency === "USD") result = rubValue / rates.USD;
  else if (toCurrency === "EUR") result = rubValue / rates.EUR;
  else if (toCurrency === "AZN") result = rubValue / rates.AZN;
  else if (toCurrency === "RUB") result = rubValue;

  resultDiv.textContent = `${result.toFixed(2)} ${toCurrency}`;
  console.log(`Результат: ${result} ${toCurrency}`);
}

usdBtn.addEventListener("click", () => convert("USD"));
eurBtn.addEventListener("click", () => convert("EUR"));
rubBtn.addEventListener("click", () => convert("RUB"));
aznBtn.addEventListener("click", () => convert("AZN"));

clearBtn.addEventListener("click", () => {
  input.value = "";
  resultDiv.textContent = "Итоговый расчет";
  num = 0;
  resultcCurrency = "";
});
