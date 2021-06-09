const form = document.querySelector("select");

const COUNTRY_LS = "country";

form.addEventListener('change', event => {
    localStorage.setItem(COUNTRY_LS, event.target.value);
})

// const form = document.querySelector("select");

// const COUNTRY_LS = "country";

// function saveCountry(value) {
//     localStorage.setItem(COUNTRY_LS, value);
// }

// function changeCountry(event) {
//     const value = form.options[form.selectedIndex].value;
//     saveCountry(value);
// }