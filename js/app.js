class Cooking {
    constructor() {
        this.itemsInCart = {
            itemCount: 0,
            subtotal: 0
        }

        this.menuInventory = {
            item1: {
                id: 1,
                img: './media/burger.jpg',
                alt: 'burger',
                class: 'burger',
                price: 10.99,
                qty: 0,
                name: 'bacon chesseburger'
            },
            item2: {
                id: 2,
                img: './media/shrimp.jpg',
                alt: 'shrimp',
                class: 'shrimp',
                price: 9.26,
                qty:0,
                name: 'fried shrimp'
            },
            item3:{
                id: 3,
                img: './media/chicken sandwich.jpg',
                alt: 'chicken-sandwich',
                class: 'chicken-sandwich',
                price: 11.99,
                qty:0,
                name: 'spicy chicken sandwich'
            },
            item4: {
                id: 4,
                img: './media/rice.jpg',
                alt: 'rice',
                class: 'rice',
                price: 12.99,
                qty: 0,
                name: 'fried rice'
            },
            item5: {
                id: 5,
                img: './media/steak.jpg',
                alt: 'steak',
                class: 'steak',
                price: 14.99,
                qty: 0,
                name: 'steak'
            },
            item6: {
                id : 6,
                img: './media/ramen-noodles-featured.jpg',
                alt: 'ramen-noodles',
                class: 'ramen-noodles',
                price: 8.99,
                qty: 0,
                name: 'ramen noodles'
            }
        }
    }

    init() {
        this.loadItems();
        this.addToCart();
        this.checkout();
    }
    loadItems() {
        let count = 0;

        let meal1 = document.getElementById('meal1');
        let meal2 = document.getElementById('meal2');

        for (const key in this.menuInventory) {
            const item = this.menuInventory[key];
            const product = document.createElement('div');
            product.className - 'col-md-3 product';
            product.innerHTML = `
            <div class="card h-50">
                <img src="${item.img}" class="card-img-top ${item.class}" alt="${item.alt}">
                <div class="card-body">
                    <p class = "card-text">${item.name}</p>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <button class = "btn btn-secondary add-button" data-id="${item.id}">Add to Cart</button>
                </div>
            </div>`;

            if (count < 4) {
                meal1.append(product)
            } else {
                meal2.append(product)
            }
            count++;
        }
    }

    addToCart() {
        let buttons = document.querySelectorAll('.add-button');
        let cartItems = document.getElementById('cartItems');
        let cartSubtotal = document.getElementById('cartSubtotal');
        let itemCount = 0;
        let price = 0;
        for(const key in this.menuInventory) {
            const item = this.menuInventory[key];
            buttons.forEach(buttons => {
                buttons.addEventListener('click', () => {
                    if (buttons.dataset['id'] == item.id) {
                        itemCount++;
                        price += item.price;

                        this.itemsInCart.itemCount = itemCount;
                        this.itemsInCart.subtotal = price;

                        item.qty++;
                    }

                    cartItems.innerText = itemCount;
                    cartSubtotal.innerText = price.toFixed(2);
                })
            })
        }
    }

    checkout() {
        const table = document.getElementById('tbody');
        const checkout = document.getElementById('checkout');
        const checkoutPage = document.querySelector('.checkout-page');
        const mainPage = document.querySelector('.main-page');
        let subTimeQty = 0;
        const subtotalValue = document.getElementById('subtotalValue');
        const taxValue = document.getElementById('taxValue');
        const totalValue = document.getElementById('totalValue');
        let tax = 0;
        const shippingValue = document.getElementById('shippingValue');
        const checkoutItemCount = document.getElementById('checkoutItemCount');
        const shipping = 6;

        checkout.addEventListener('click', () => {
            if (mainPage.classList.contains('d-none')) return;
            checkoutPage.classList.remove('d-none');
            mainPage.classList.add('d-none');

            if(this.itemsInCart.itemCount == 1) {
                checkoutItemCount.innerText = `${this.itemsInCart.itemCount} item`;
            } else {
                checkoutItemCount.innerText = `${this.itemsInCart.itemCount} items`
            }
            for(const key in this.menuInventory) {
                const item = this.menuInventory[key];

                subTimeQty = (item.qty * item.price).toFixed(2);
                subtotalValue.innerText = this.itemsInCart.subtotal.toFixed(2);
                shippingValue.innerText = shipping.toFixed(2);
                tax = this.itemsInCart.subtotal * .07;
                taxValue.innerText = tax.toFixed(2);
                totalValue.innerText = (this.itemsInCart.subtotal + tax + shipping).toFixed(2);

                if(item.qty > 0) {
                    const tableRow = document.createElement('tr');
                    tableRow.className = 'product-checkout';

                    tableRow.innerHTML`
                    <td id="checkoutImg">
                        <img src="${item.img}" alt="${item.alt}" class="img-fluid checkout-img" 
                        id="checkoutImg" height="250" width="200">
                        <div class="product-desc">
                            <p class="item-name">${item.name}</p>
                            <p>This is a nice description of this item. that freaking licking good!</p>
                        </div>
                    </td>
                    <td>
                        <p class"unit-price">${item.price.toFixed(2)}</p>
                    </td>
                    <td>
                            <div id="itemQuanity">
                            <p id="qtyInput">${item.qty}</p>
                            </div>
                        </td>
                        <td id = "itemSubTotal">${subTimeQty}</td>`
                        table.append(tableRow);
                }
            }
        })
    }
}

let action = new Cooking();
action.init();