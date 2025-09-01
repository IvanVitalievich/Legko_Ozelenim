// ====== Тема ======
const themeToggle = document.getElementById("themeToggle");
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });
}

// ====== Меню ======
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("active");
  });
}

// ====== Каталог ======
const products = [
  {name: "Фикус", category: "plants", price: 5000},
  {name: "Орхидея", category: "plants", price: 7000},
  {name: "Керамическое кашпо", category: "pots", price: 3000},
  {name: "Лейка дизайнерская", category: "accessories", price: 2500},
];

const productList = document.getElementById("productList");
if (productList) renderProducts(products);

function renderProducts(list){
  productList.innerHTML = "";
  list.forEach(p=>{
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `<h3>${p.name}</h3><p>${p.price} ₸</p>`;
    productList.appendChild(div);
  });
}

const search = document.getElementById("search");
const category = document.getElementById("category");
const sort = document.getElementById("sort");

if (search && category && sort) {
  function filter(){
    let result = [...products];
    if (search.value) {
      result = result.filter(p=>p.name.toLowerCase().includes(search.value.toLowerCase()));
    }
    if (category.value !== "all") {
      result = result.filter(p=>p.category === category.value);
    }
    if (sort.value === "cheap") result.sort((a,b)=>a.price-b.price);
    if (sort.value === "expensive") result.sort((a,b)=>b.price-a.price);
    renderProducts(result);
  }
  search.addEventListener("input", filter);
  category.addEventListener("change", filter);
  sort.addEventListener("change", filter);
}


// Определите функцию для переключения темы
function toggleTheme() {
  // Получите текущую тему из локального хранилища
  const currentTheme = localStorage.getItem("theme");

  // Если текущая тема светлая, переключите на темную
  if (currentTheme === "light") {
    localStorage.setItem("theme", "dark");
    document.body.classList.add("dark");
  } else {
    // Если текущая тема темная, переключите на светлую
    localStorage.setItem("theme", "light");
    document.body.classList.remove("dark");
  }
}

// Добавьте обработчик события для кнопки переключения темы
themeToggle.addEventListener("click", toggleTheme);

// Установите текущую тему при загрузке страницы
const currentTheme = localStorage.getItem("theme");
if (currentTheme === "dark") {
  document.body.classList.add("dark");
}