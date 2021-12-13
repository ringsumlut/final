let carts = document.querySelectorAll('.buybtn');



var products = [
    {
        id: 0,
        img: "images/supremeplus.webp",
        name: "K-Supreme Plus® SMART Single Serve Coffee Maker",
        price: 99.99,
        cart: false,
        quantity: 1,
        total: 0
    },
    {
        id: 1,
        img: "images/mini.webp",
        name: "K-Mini® Single Serve Coffee Maker",
        price: 79.99,
        cart: false,
        quantity: 1,
        total: 0
    },
    {
        id: 2,
        img: "images/select.webp",
        name: "Keurig® K-Select® Coffee Maker",
        price: 'Free',
        cart: false,
        quantity: 1,
        total: 0
    },
    {
        id: 3,
        img: "images/elite.webp",
        name: "Keurig® K-Elite® Single Serve Coffee Maker",
        price: 89.99,
        cart: false,
        quantity: 1,
        total: 0
    },
    {
        id: 4,
        img: "images/cafe.webp",
        name: "K-Café® Single Serve Coffee Latte & Cappuccino Maker",
        price: 89.99,
        cart: false,
        quantity: 1,
        total: 0
    },
    {
        id: 5,
        img: "images/slim.webp",
        name: "K-Slim® Single Serve Coffee Maker",
        price: 49.99,
        cart: false,
        quantity: 1,
        total: 0
    },
    {
        id: 6,
        img: "images/supremeplus.webp",
        name: "K-Supreme Plus® SMART Single Serve Coffee Maker",
        price: "Free",
        cart: false,
        quantity: 1,
        total: 0
    },
    {
        id: 7,
        img: "images/supremeplus.webp",
        name: "K-Supreme Plus® SMART Single Serve Coffee Maker",
        price: 89.99,
        cart: false,
        quantity: 1,
        total: 0
    },
    {
        id: 8,
        img: "images/supremeplus.webp",
        name: "K-Supreme Plus® SMART Single Serve Coffee Maker",
        price: 99.99,
        cart: false,
        quantity: 1,
        total: 0
    },
    {
        id: 9,
        img: "images/supremeplus.webp",
        name: "K-Supreme Plus® SMART Single Serve Coffee Maker",
        price: 99.99,
        cart: false,
        quantity: 1,
        total: 0
    },
]

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers();
    })
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cardNumbers');

    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;

    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;

    }
}