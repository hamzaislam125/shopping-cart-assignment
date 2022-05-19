
import "./styles/products.scss";
import axiosInstance from "./utils/axiosInstance";

class Products {
  products = [];
  allproducts = [];
  categories = [];
  errors = {};
  constructor(props) {
    this.loadData();
  }
  modalclose = async () => {
    let close = document.getElementById("spanclose")
     let modal = document.getElementById("myModal")
    close.onclick = async function() {
      console.log(document.getElementsByClassName("input-field")[0])
      document.getElementsByClassName("input-field")[0].innerHTML = ''
      setTimeout(myGreeting, 2000)
     
    }
    function myGreeting() {
      modal.style.display = "none";
    }
  }
  
  
  modalopen = async () => {
   let btn = document.getElementById("myBtn")
   let modal = document.getElementById("myModal")
   let itemArr = [];
    btn.onclick = async function (){
    modal.style.display = "block";
    itemArr =  JSON.parse(localStorage.getItem('ArrayItem'))
  
    for(let i =0; i<itemArr.length;i++){
      let input = document.createElement("div")
      input.className = 'input-field'
      input.id = itemArr[i].id;
      input.value = 1;
      input.innerHTML =1
      let row = document.createElement("div")
      row.className = 'row-cart';
      row.id = 'row-cart-id'
      let rowid = document.createElement("div")
      
      let imageclass = document.createElement("div")
      imageclass.id = 'imageclass';
      let elem = document.createElement("img")
      elem.src = itemArr[i].imageURL
      let name = document.createElement("div")
      name.id = "item-name"
      let price = document.createElement("div")
      price.id = "item-price"
      let priceMark = document.createElement("div")
      priceMark.id = "priceMark"
      name.innerHTML = itemArr[i].name
      price.innerHTML = itemArr[i].price 
      price.value = itemArr[i].price*1
      rowid.innerHTML = itemArr[i].id 
     row.appendChild(elem)
     row.appendChild(name)
     row.appendChild(input)
      row.appendChild(price)
      if(!document.getElementById(itemArr[i].id))
      document.getElementById("row-container").appendChild(row)
      else{
        document.getElementById(itemArr[i].id).value++
        document.getElementById(itemArr[i].id).innerHTML =  document.getElementById(itemArr[i].id).value
      }
    }
    }
   
  }

loadSidebar = async () =>{
  let elements = document.getElementsByClassName("hello");
      for (let i = 0; i < elements.length; i++) {
      const self = this  
elements[i].onclick = async function (e) {
  const selectedProductId = e.target.getAttribute("data-id");
  self.products = self.allproducts.filter(

    (value) => value.category === selectedProductId
   
    );
    await self.render();
    await self.loadSidebar()

  };
         }
}
buynow = async () =>{
  let cartCounter;
  let cartArray=[];
  let parseData;
  let elements = document.getElementsByClassName("button-wrapper");
  
  for (let i = 0; i < elements.length; i++) {
   const self = this;
   let selectedproduct = {}
    elements[i].onclick = async function (e) {
      const dataid = e.target.getAttribute("data-id");
       selectedproduct = self.allproducts.find(

        (value) => value.id === dataid
       
        );
        localStorage.setItem('additem', JSON.stringify(selectedproduct))
     cartCounter = localStorage.getItem('additem');
     parseData= JSON.parse(cartCounter)
     cartArray.push(parseData)
     localStorage.setItem('ArrayItem',JSON.stringify(cartArray))
      document.getElementById("number-item").innerHTML = cartArray.length;
    }

  }
}

  loadData = async () => {
    
    const res = await Promise.allSettled([
      axiosInstance.get("products"),
      axiosInstance.get("categories"),
    ]);

    if (res[0].status === "fulfilled") {
      this.products = res[0].value;
      this.allproducts = res[0].value;
      await this.render();
      await this.loadSidebar()
      await this.buynow();
      await this.modalopen();
      await this.modalclose();
    }

    if (res[1].status === "fulfilled") {
      this.categories = res[1].value;
     await this.render();
     await this.loadSidebar()
     await this.buynow();
     await this.modalopen();
     await this.modalclose();
    }
    if (res[0].status === "rejected") {
      this.errors["products"] = "Banners Data not available";
    }
    if (res[1].status === "rejected") {
      this.errors["categories"] = "categories Data not available";
    }

  };
  
 
  renderProducts(category = null) {
    let ele = [];
    this.products.forEach((list) => ele.push(this.renderProduct(list)));
    if(category != null){
      this.products.filter( prod => {return prod.category === category});
          for (let prod of list) {
            console.log(prod,"prods");
          }
    }
    return ele.join("");
  }

  renderProduct = (product) => {
    const { price, description, name, imageURL,id } = product;
    const getPrice = () => {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(price);
    };
    return `
        <li class="product-card" tabindex="0">
          <h1 class="product-title" tabindex="0">${name}</h1>
          <div class='product-content'>
            <div class='product-image'>
              <img src='${imageURL}' alt=${name}' tabindex=0 /></div>
            <div class='product-details'>
              <div class="product-desc">
                <p tabindex="0">${description}</p>
              </div>
              <div class="product-footer">
                <span class="product-price" tabindex="0">
                  MRP ${getPrice()}
                </span>
                <button class='button-wrapper buy-now-btn' tabindex=0 data-id="${id}">Buy Now</button>
                 <button class='buy-now-btn mobile-buy-now-btn' tabindex=0 >${`Buy Now @ MRP ${getPrice()}`}</button>
              </div>
            </div>
          </div>
        </li>
    `;
  };

  renderSideList = ({ name }) => {
    
    return `<li class='item' tabindex=0><a class="hello">${name}</a></li>`;
    
  };
 
 


  renderSidebar = () => {
    return `
    <aside class="product-list-aside">
          <select id="dropdown__list" class='dropdown-list' onchange="">
            <option value=""><a>Beverages</a></option>
            <option value=""><a>Bakery Cakes and Dairy</a></option>
            <option value="">Beauty and Hygiene</option>
            <option value="">Baby Care</option>
            <option value="">Fruits & Vegetables</option>
          </select>
      <ul class="list" tabindex="0">
       
        <li class='item' tabindex=0><a class="hello" data-id='5b675e5e5936635728f9fc30'>Beverages</a></li>
        <li class='item' tabindex=0><a class="hello" data-id='5b6899123d1a866534f516de'>Bakery Cakes and Dairy</a></li>
        <li class='item' tabindex=0><a class="hello" data-id='5b68994e3d1a866534f516df'>Beauty and Hygiene</a></li>
        <li class='item' tabindex=0><a class="hello" data-id='5b6899683d1a866534f516e0'>Baby Care</a></li>
        <li class='item' tabindex=0><a class="hello" data-id='5b6899953d1a866534f516e2'>Fruits & Vegetables</a></li>
        </ul>
    </aside>
    `;
  };
 
 
  render = async () => {
    document.getElementById(
      "list-category"
    ).innerHTML = ` <div class='product-list-container'>
              <div class='product-category'>${this.renderSidebar()}</div>
              <ul class='product-card-container'>${this.renderProducts()}</ul>
          </div>`;
  };

}


export default new Products();
