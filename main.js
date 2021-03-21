let carts = document.querySelectorAll('.add-cart');

let products = [
  {
    name: 'Moletom Cinza',
    tag: 'moletomcinza',
    price: 160,
    inCart: 0
  },
  {
    name: 'Moletom Bege',
    tag: 'moletombege',
    price: 175,
    inCart: 0
  },
  {
    name: 'Moletom Azul',
    tag: 'moletomAzul',
    price: 160,
    inCart: 0
  },
  {
    name: 'Moletom Azul',
    tag: 'moletomazul',
    price: 160,
    inCart: 0
  },
]

for(let i=0; i < carts.length; i++){
  carts[i].addEventListener('click',()=>{
    cartNumbers(products[i]);
    totalCost(products[i]);
  });
}

function cartNumbers(product){
 // console.log(product)
  let productNumbers = localStorage.getItem('cartNumbers');
  //console.log(typeof productNumbers);

  productNumbers = parseInt(productNumbers);
 
  if(productNumbers){
    localStorage.setItem('cartNumbers',productNumbers + 1);
    document.querySelector('.cart span').textContent = productNumbers + 1;
  }else{
    localStorage.setItem('cartNumbers',1);
    document.querySelector('.cart span').textContent = 1;
  }
  
  setItems(product)
}

function onLoadCartNumbers(){
  let productNumbers = localStorage.getItem('cartNumbers');

  if(productNumbers){
    document.querySelector('.cart span').textContent = productNumbers;
  }
}


function setItems(product){
  //console.log(product)

  let cartItems = localStorage.getItem('productsInCart');
  
  cartItems = JSON.parse(cartItems)

 // console.log("My ", cartItems)


  if(cartItems != null){
   //console.log(cartItems[product.tag])

   if(cartItems[product.tag] == undefined){
     cartItems = {
       ...cartItems,
       [product.tag]: product
     }
   }
    cartItems[product.tag].inCart += 1;
  }else{
    product.inCart = 1;
    cartItems = {
    [product.tag]: product
  }
  } 

  localStorage.setItem('productsInCart',JSON.stringify(cartItems));

}

function totalCost(product){
  //console.log("The is", product.price)

  let cartCost = localStorage.getItem('totalCost');
    if ( cartCost === null){
        localStorage.setItem('totalCost', product.price);
    } else {
        cartCost = parseInt(cartCost);
        localStorage.setItem('totalCost', cartCost + product.price);
    }
  
  // console.log("My cart cost is ", cartCost);
  // console.log(typeof cartCost);

}


function displayCart(){
  let cartItems = localStorage.getItem('productsInCart');

  cartItems = JSON.parse(cartItems);

  let productContainer = document.querySelector('.products');
  let cartCost = localStorage.getItem('totalCost');

  // cartItems and productContainer diferent empty
  if (cartItems && productContainer) {
    console.log('runing')

    productContainer.innerHTML = '';
    Object.values(cartItems).map(item =>{
    productContainer.innerHTML += `
    <div class="product">
      <i class="fas fa-times-circle"></i>
      <img src="./imgs/${item.tag}.jpg">
      <span>${item.name}</span>
    </div>  
    <div class="price">R$${item.price}</div>
    <div class="quantity">
      <i class="fas fa-chevron-circle-left"></i><span> ${item.inCart}</span><i class="fas fa-chevron-circle-right"></i>
    </div>
    <div class="total">
      R$${item.inCart * item.price}
    </div>
    `;
    });

    productContainer.innerHTML += `
        <div class="basketTotalContainer">
          <h4 class="basketTotalTitle">
            Basket Total
          </h4>
          <h4 class="basketTotal">
              R$${cartCost}
          </h4>
        </div>
    `;
  }

  console.log(cartItems)
}

onLoadCartNumbers();
displayCart();