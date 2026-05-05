// ============================================================================
// JASN COMPANY - INTERACTIVE FEATURES
// ============================================================================

// Set active nav link based on current page
function setActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Intersection Observer for fade-up animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
}

// Smooth scroll for navigation links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Product comparison tool
function initProductComparison() {
    const comparisonButtons = document.querySelectorAll('[data-compare]');
    if (comparisonButtons.length === 0) return;

    comparisonButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-compare');
            showComparisonModal(productId);
        });
    });
}

function showComparisonModal(productId) {
    // Create modal dynamically
    const modal = document.createElement('div');
    modal.className = 'comparison-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <h2>Product Comparison</h2>
            <div class="comparison-table-container">
                <table class="comparison-table">
                    <thead>
                        <tr>
                            <th>Feature</th>
                            <th>JASN Billing</th>
                            <th>JASN Inventory</th>
                            <th>JASN CRM</th>
                            <th>JASN Accounting</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Offline First</td>
                            <td><span class="check">✓</span></td>
                            <td><span class="check">✓</span></td>
                            <td><span class="check">✓</span></td>
                            <td><span class="check">✓</span></td>
                        </tr>
                        <tr>
                            <td>No Cloud Dependency</td>
                            <td><span class="check">✓</span></td>
                            <td><span class="check">✓</span></td>
                            <td><span class="check">✓</span></td>
                            <td><span class="check">✓</span></td>
                        </tr>
                        <tr>
                            <td>One-Time Payment</td>
                            <td><span class="check">✓</span></td>
                            <td><span class="check">✓</span></td>
                            <td><span class="check">✓</span></td>
                            <td><span class="check">✓</span></td>
                        </tr>
                        <tr>
                            <td>Professional UI</td>
                            <td><span class="check">✓</span></td>
                            <td><span class="check">✓</span></td>
                            <td><span class="check">✓</span></td>
                            <td><span class="check">✓</span></td>
                        </tr>
                        <tr>
                            <td>Status: Live</td>
                            <td><span class="check">✓</span></td>
                            <td><span class="cross">—</span></td>
                            <td><span class="cross">—</span></td>
                            <td><span class="cross">—</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal
    modal.querySelector('.modal-close').addEventListener('click', () => {
        modal.remove();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

// Product filter
function initProductFilter() {
    const filterButtons = document.querySelectorAll('[data-filter]');
    if (filterButtons.length === 0) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            filterProducts(filter);
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function filterProducts(filter) {
    const products = document.querySelectorAll('[data-product-status]');
    products.forEach(product => {
        if (filter === 'all' || product.getAttribute('data-product-status') === filter) {
            product.style.display = '';
            setTimeout(() => product.classList.add('visible'), 10);
        } else {
            product.classList.remove('visible');
            setTimeout(() => product.style.display = 'none', 300);
        }
    });
}

// Early access signup
function initEarlyAccess() {
    const forms = document.querySelectorAll('[data-early-access]');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                // Show success message
                const successMsg = document.createElement('div');
                successMsg.className = 'success-message';
                successMsg.textContent = '✓ Thanks! We\'ll notify you when this product launches.';
                this.appendChild(successMsg);
                
                // Clear form
                this.reset();
                
                // Remove message after 5 seconds
                setTimeout(() => successMsg.remove(), 5000);
            }
        });
    });
}

// Initialize all features
document.addEventListener('DOMContentLoaded', function() {
    setActiveNav();
    initScrollAnimations();
    initSmoothScroll();
    initProductComparison();
    initProductFilter();
    initEarlyAccess();
});

// Re-check animations on resize
window.addEventListener('resize', function() {
    setActiveNav();
});
