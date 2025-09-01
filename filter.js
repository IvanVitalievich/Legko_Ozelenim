// Функция для фильтрации товаров
function filterProducts() {
    // Получаем значения фильтров
    const searchText = document.getElementById('search').value.toLowerCase();
    const category = document.getElementById('category').value;
    const priceOrder = document.getElementById('price').value;
    
    // Получаем все товары
    const products = document.querySelectorAll('.product-card');
    const productsArray = Array.from(products);
    
    // Фильтрация по поисковому запросу
    let filteredProducts = productsArray.filter(product => {
        const title = product.querySelector('.product-title').textContent.toLowerCase();
        return title.includes(searchText);
    });
    
    // Фильтрация по категории
    if (category !== 'all') {
        filteredProducts = filteredProducts.filter(product => {
            return product.getAttribute('data-category') === category;
        });
    }
    
    // Сортировка по цене
    if (priceOrder !== 'default') {
        filteredProducts.sort((a, b) => {
            const priceA = parseInt(a.getAttribute('data-price'));
            const priceB = parseInt(b.getAttribute('data-price'));
            
            return priceOrder === 'asc' ? priceA - priceB : priceB - priceA;
        });
    }
    
    // Сначала скрываем все товары
    products.forEach(product => {
        product.style.display = 'none';
    });
    
    // Показываем только отфильтрованные товары
    filteredProducts.forEach(product => {
        product.style.display = 'block';
    });
    
    // Если нет товаров, показываем сообщение
    const noResults = document.getElementById('no-results');
    if (filteredProducts.length === 0) {
        if (!noResults) {
            const productsGrid = document.querySelector('.products-grid');
            const message = document.createElement('div');
            message.id = 'no-results';
            message.className = 'no-results';
            message.innerHTML = `
                <div class="no-results-icon">🔍</div>
                <h3>Товары не найдены</h3>
                <p>Попробуйте изменить параметры фильтрации</p>
            `;
            productsGrid.appendChild(message);
        }
    } else if (noResults) {
        noResults.remove();
    }
}

// Инициализация фильтрации при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Добавляем обработчики событий для фильтров
    document.getElementById('search').addEventListener('input', filterProducts);
    document.getElementById('category').addEventListener('change', filterProducts);
    document.getElementById('price').addEventListener('change', filterProducts);
    
    // Инициализируем фильтрацию
    filterProducts();
    
    // Добавляем стили для сообщения "Товары не найдены"
    const style = document.createElement('style');
    style.textContent = `
        .no-results {
            grid-column: 1 / -1;
            text-align: center;
            padding: 40px 20px;
            background-color: var(--card-bg);
            border-radius: 8px;
            box-shadow: 0 5px 15px var(--card-shadow);
        }
        
        .no-results-icon {
            font-size: 3rem;
            margin-bottom: 20px;
            opacity: 0.5;
        }
        
        .no-results h3 {
            color: var(--primary-color);
            margin-bottom: 10px;
        }
        
        .no-results p {
            color: var(--text-color);
            opacity: 0.7;
        }
    `;
    document.head.appendChild(style);
});