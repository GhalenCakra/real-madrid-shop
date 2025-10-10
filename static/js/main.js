// Configuration
const PRODUCTS_JSON_URL = "{% url 'main:show_json' %}";

// DOM Elements
const loadingSpinner = document.getElementById('loading-spinner');
const errorMessage = document.getElementById('error-message');
const productGrid = document.getElementById('product-grid');
const productCount = document.getElementById('product-count');
const pageTitle = document.getElementById('page-title');
const categoryFilters = document.querySelectorAll('.category-filter');

// State Variables
let currentCategory = '';

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Category filter clicks
    categoryFilters.forEach(filter => {
        filter.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update active state
            categoryFilters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            
            // Load products for category
            currentCategory = this.dataset.category;
            loadProducts();
        });
    });
}

// Load products from server
async function loadProducts() {
    try {
        showLoadingState();
        
        let url = PRODUCTS_JSON_URL;
        if (currentCategory) {
            url += `?category=${currentCategory}`;
        }

        const response = await fetch(url, {
            headers: { 'Accept': 'application/json' },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }

        const products = await response.json();
        renderProducts(products);
        updatePageInfo(products);
        
    } catch (error) {
        console.error('Error loading products:', error);
        showErrorState();
    }
}

// Show loading state
function showLoadingState() {
    loadingSpinner.classList.remove('d-none');
    errorMessage.classList.add('d-none');
    productGrid.innerHTML = '';
}

// Show error state
function showErrorState() {
    loadingSpinner.classList.add('d-none');
    errorMessage.classList.remove('d-none');
    productCount.textContent = 'Error loading products';
}

// Render products to grid
function renderProducts(products) {
    if (products.length === 0) {
        productGrid.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="bi bi-inbox display-1 text-muted"></i>
                <h4 class="text-muted mt-3">No products found</h4>
                <p class="text-muted">Be the first to add a product!</p>
            </div>
        `;
        return;
    }

    let productsHTML = '';
    products.forEach(product => {
        productsHTML += createProductCard(product);
    });

    productGrid.innerHTML = productsHTML;
    loadingSpinner.classList.add('d-none');
}

// Create product card HTML
function createProductCard(product) {
    const detailUrl = `{% url 'main:show_product' '00000000-0000-0000-0000-000000000000' %}`.replace('00000000-0000-0000-0000-000000000000', product.id);
    const editUrl = `{% url 'main:edit_product' '00000000-0000-0000-0000-000000000000' %}`.replace('00000000-0000-0000-0000-000000000000', product.id);
    const deleteUrl = `{% url 'main:delete_product' '00000000-0000-0000-0000-000000000000' %}`.replace('00000000-0000-0000-0000-000000000000', product.id);

    const formattedDate = new Date(product.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    // Get current user ID from Django template
    const currentUserId = "{{ user.id }}";
    
    // Check if current user is the product owner
    const isOwner = currentUserId && product.user_id && product.user_id.toString() === currentUserId;

    return `
        <div class="col-xl-3 col-lg-4 col-md-6">
            <div class="card product-card h-100 border-0 shadow-sm">
                <div class="position-relative">
                    ${product.thumbnail ?
                        `<img src="${product.thumbnail}" class="card-img-top" alt="${product.title}" style="height: 200px; object-fit: cover;">` :
                        `<div class="bg-light d-flex align-items-center justify-content-center" style="height: 200px;">
                            <span class="text-muted">No Image</span>
                         </div>`
                    }
                    <div class="position-absolute top-0 start-0 p-2">
                        ${product.is_featured ?
                            `<span class="badge bg-warning text-dark">Featured</span>` : ''
                        }
                    </div>
                    <div class="position-absolute top-0 end-0 p-2">
                        <span class="badge bg-primary">${product.category}</span>
                    </div>
                </div>
                <div class="card-body d-flex flex-column">
                    <h6 class="card-title fw-bold">
                        <a href="${detailUrl}" class="text-decoration-none text-dark">${product.title}</a>
                    </h6>
                    <div class="mb-2">
                        <small class="text-muted">
                            <i class="bi bi-calendar me-1"></i>${formattedDate}
                        </small>
                        <small class="text-muted ms-2">
                            <i class="bi bi-eye me-1"></i>${product.views} views
                        </small>
                    </div>
                    <p class="card-text text-muted small flex-grow-1">
                        ${product.description ? product.description.substring(0, 100) + '...' : 'No description'}
                    </p>
                    <div class="mt-auto">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <span class="h6 text-primary mb-0">Rp ${product.price ? product.price.toLocaleString() : '0'}</span>
                            <a href="${detailUrl}" class="btn btn-outline-primary btn-sm">Details</a>
                        </div>
                        ${isOwner ? 
                            `<div class="d-flex gap-1">
                                <a href="${editUrl}" class="btn btn-outline-warning btn-sm flex-fill">
                                    <i class="bi bi-pencil"></i> Edit
                                </a>
                                <a href="${deleteUrl}" class="btn btn-outline-danger btn-sm flex-fill"
                                   onclick="return confirm('Are you sure you want to delete this product?');">
                                    <i class="bi bi-trash"></i> Delete
                                </a>
                            </div>` 
                            : ''
                        }
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Update page information
function updatePageInfo(products) {
    productCount.textContent = `${products.length} product${products.length !== 1 ? 's' : ''} found`;
    
    if (currentCategory) {
        pageTitle.textContent = `${currentCategory} Products`;
    } else {
        pageTitle.textContent = 'All Products';
    }
}

// Add event listener to detect new products
document.addEventListener('newsAdded', function() {
    loadProducts();
});

// Handle form creation product dengan AJAX
document.getElementById('createProductForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const submitBtn = document.getElementById('submitProductBtn');
    
    // Disable button dan show loading
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status"></span> Creating...';
    
    fetch('{% url "main:create_product_ajax" %}', {
        method: 'POST',
        body: formData,
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            // Close modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('createProductModal'));
            modal.hide();
            
            // Show success toast
            showToast('Success', 'Product created successfully!', 'success');
            
            // Reset form
            document.getElementById('createProductForm').reset();
            
            // Refresh product list
            loadProducts();
        } else {
            showToast('Error', data.message, 'error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showToast('Error', 'Failed to create product', 'error');
    })
    .finally(() => {
        // Enable button
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Create Product';
    });
});