const restaurantsURL = '../db/partners.json'
const restaurantsNode = document.querySelector('.restaurants')
const getData = async (url) => {
    const res = await fetch(url, {
        method: "GET"
    });
    if (res.ok) {
        const data = await res.json()
        return data
    }
    throw new Error('Ошибка') // конструкция для создания обьекта ошибки
}



const createRestaurantsCard = ({ name, kitchen, price, stars, time_of_delivery, image, products }) => {

    const restaurantCard = `
    <div class="restaurant-card" data-product=${products}>
    <h3>${name}</h3>
    <span>${kitchen}</span>
    <ul>
        <li>${price}</li>
        <li> ${stars}</li>
        <li>${time_of_delivery}</li>
    </ul>
    <img src="${image}" alt="#">
</div>
    `;

    restaurantsNode.insertAdjacentHTML('beforeend', restaurantCard)
}

const init = async () => {
    const restaurantArr = await getData(restaurantsURL)
    restaurantArr.map(restaurant => {
        console.log(restaurant);
        createRestaurantsCard(restaurant)
    })
}
const openRestaurant = (e) => {
    const target = e.target
    const restaurant = target.closest(".restaurant-card")
    // console.log(restaurant);
    if (restaurant) {
        console.log(restaurant.dataset.product);
        getData(`../db/${restaurant.dataset.product}`)
    }
}
restaurantsNode.addEventListener('click', openRestaurant)
init()


