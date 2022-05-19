import axiosInstance from "./utils/axiosInstance";
import "./styles/home.scss";

class Home {
  banners = [];
  categories = [];
  errors = {};

  constructor(args) {
    this.loadData();
  }

  loadData = async () => {
    
    
    try {
      const res = await Promise.allSettled([
        axiosInstance.get("banners"),
        axiosInstance.get("categories"),
      ]);

      if (res[0].status === "fulfilled") {
        this.banners = res[0].value;
        this.createSwiper();
      }
      if (res[1].status === "fulfilled") {
        this.categories = res[1].value;
        this.displayCategories();
      }
      if (res[0].status === "rejected") {
        this.errors["banners"] = "Banners Data not available";
      }
      if (res[1].status === "rejected") {
        this.errors["categories"] = "categories Data not available";
      }
    } catch (error) {}
  };

  createSwiper = () => {
    const swiperOl = document.createElement("ol");
    swiperOl.className = "swiper";

    const swiperBtn = document.createElement("div");
    swiperBtn.className = "swiper-btn";

    for (let i = 0; i < this.banners.length; i++) {
      const element = this.banners[i];

      const swiperLI = document.createElement("li");
      swiperLI.className = "swiper__item";
      swiperLI.id = element.id;

      const img = document.createElement("img");
      img.src = element.bannerImageUrl;
      img.alt = element.bannerImageAlt;
      swiperLI.appendChild(img);

      swiperOl.appendChild(swiperLI);

      const anchor = document.createElement("a");
      anchor.href = `#${element.id}`;
      swiperBtn.appendChild(anchor);
    }

    const banner = document.getElementById("banner");
    banner.appendChild(swiperOl);
    banner.appendChild(swiperBtn);
  };

  displayCategories = () => {
    const category = document.getElementById("category");

    for (let i = 0; i < this.categories.length; i++) {
      const element = this.categories[i];
      const categoryItem = document.createElement("div");
      categoryItem.className = "category__item";

      const categoryContent = document.createElement("div");
      categoryContent.className = "category__content";

      const h1 = document.createElement("h1");
      h1.innerHTML = element.name;

      const p = document.createElement("p");
      p.innerHTML = element.description;

      const button = document.createElement("button");
      button.innerHTML = `Explore ${element.name}`;
      button.className ="btn-class";
      button.onclick = () => {
        history.pushState(
          { page: 1 },
          "Home Page",
          `products.html?category=${element.key}`
        );
        location.reload();
      };

      categoryContent.appendChild(h1);
      categoryContent.appendChild(p);
      categoryContent.appendChild(button);

      const categoryImg = document.createElement("img");

      categoryImg.src = element.imageUrl;
      categoryImg.alt = element.name;
      categoryImg.className = "category__img";
     // console.log(element.imageUrl,"categoryImg.src")
     
if (element.imageUrl != undefined) {
      categoryItem.appendChild(categoryContent);
      categoryItem.appendChild(categoryImg);
      category.appendChild(categoryItem);
}
    }
    let cartArray = JSON.parse(localStorage.getItem('ArrayItem'))
    document.getElementById("number-item").innerHTML = cartArray.length;
  };
}

const home = new Home();
