// #battleships p, #excursion p, #teacozy p, #fotomatic p, #companyhomepage p, #responsiveclub p
console.log('Im loaded!');
const names = ['battleships', 'excursion', 'teacozy', 'fotomatic', 'companyhomepage', 'responsiveclub', 'weatherapp'];
const createEvents = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        document.getElementById(arr[i]).firstElementChild.onmouseover = (event) => {
            document.getElementById(arr[i]).lastElementChild.style.display = 'block';
        };
        document.getElementById(arr[i]).firstElementChild.onmouseout = (event) => {
            document.getElementById(arr[i]).lastElementChild.style.display = 'none';
        };
    }
};
createEvents(names);
