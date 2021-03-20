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

  console.log("My ", cartItems)


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

onLoadCartNumbers();