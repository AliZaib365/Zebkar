// ============================================
// MAIN APPLICATION CONTROLLER - ENHANCED VERSION
// ============================================

class JewelryWebsite {
    constructor() {
        this.isInitialized = false;
        this.isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        // State management
        this.state = {
            isMobileMenuOpen: false,
            isSearchOpen: false,
            canVideoAutoplay: false,
            currentVideoVolume: 0.7,
            isVideoMuted: false,
            cart: [],
            wishlist: new Set(),
            currentCategory: 'all',
            sortBy: 'newest'
        };
        
        // Product data
        this.products = [
            {
                id: 1,
                name: "Eternal Diamond Ring",
                category: "rings",
                price: 1299.99,
                originalPrice: 1599.99,
                description: "A stunning diamond ring featuring a brilliant 1-carat center stone with pave diamond halo.",
                image: "https://images.unsplash.com/photo-1594576721254-f3f2a8c56bde?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                badge: "BEST SELLER",
                inStock: true,
                materials: ["18K White Gold", "Diamond (1 ct)", "Pave Diamonds"],
                rating: 4.9,
                reviews: 128,
                details: "This exquisite ring features a brilliant cut diamond set in a classic solitaire design. The band is adorned with pave diamonds that catch the light from every angle."
            },
            {
                id: 2,
                name: "Golden Pearl Necklace",
                category: "necklaces",
                price: 899.99,
                originalPrice: 1099.99,
                description: "Elegant necklace with freshwater pearls and 18k gold accents.",
                image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                badge: "NEW ARRIVAL",
                inStock: true,
                materials: ["18K Yellow Gold", "Freshwater Pearls", "Diamond Accents"],
                rating: 4.7,
                reviews: 89,
                details: "A timeless necklace featuring lustrous freshwater pearls suspended from a delicate gold chain. Each pearl is individually selected for its perfect shape and luster."
            },
            {
                id: 3,
                name: "Infinity Silver Bracelet",
                category: "bracelets",
                price: 499.99,
                originalPrice: null,
                description: "Delicate silver bracelet with infinity symbol charm.",
                image: "https://images.unsplash.com/photo-1589674327935-9e7e77db9d9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                badge: "LIMITED",
                inStock: true,
                materials: ["Sterling Silver", "Rhodium Plating"],
                rating: 4.8,
                reviews: 56,
                details: "Crafted from sterling silver and finished with rhodium plating for lasting shine, this bracelet features an elegant infinity symbol that represents eternal love and commitment."
            },
            {
                id: 4,
                name: "Diamond Stud Earrings",
                category: "earrings",
                price: 749.99,
                originalPrice: 899.99,
                description: "Classic diamond stud earrings perfect for everyday wear.",
                image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                badge: "LIMITED EDITION",
                inStock: true,
                materials: ["14K White Gold", "Diamonds (0.5 ct total)"],
                rating: 4.9,
                reviews: 203,
                details: "These timeless stud earrings feature brilliant cut diamonds in a secure four-prong setting. Perfect for day-to-night wear, they add a touch of elegance to any outfit."
            },
            {
                id: 5,
                name: "Royal Jewelry Set",
                category: "sets",
                price: 2499.99,
                originalPrice: 2999.99,
                description: "Complete set including necklace, earrings, and bracelet.",
                image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                badge: "PREMIUM",
                inStock: true,
                materials: ["22K Gold", "Diamonds", "Emeralds"],
                rating: 5.0,
                reviews: 42,
                details: "This magnificent set features matching necklace, earrings, and bracelet crafted from 22k gold and adorned with diamonds and emeralds."
            },
            {
                id: 6,
                name: "Rose Gold Engagement Ring",
                category: "rings",
                price: 1899.99,
                originalPrice: null,
                description: "Modern engagement ring with rose gold band and solitaire diamond.",
                image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                badge: "TRENDING",
                inStock: true,
                materials: ["Rose Gold", "Diamond (1.2 ct)", "Micro-Pave Band"],
                rating: 4.8,
                reviews: 167,
                details: "Featuring a stunning solitaire diamond set in warm rose gold, this engagement ring combines modern design with timeless elegance."
            },
            {
                id: 7,
                name: "Sapphire Pendant Necklace",
                category: "necklaces",
                price: 649.99,
                originalPrice: 799.99,
                description: "Blue sapphire pendant on a delicate gold chain.",
                image: "https://images.unsplash.com/photo-1573408301185-87e0d6ad5d8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                badge: "BACK IN STOCK",
                inStock: true,
                materials: ["White Gold", "Blue Sapphire", "Diamond Halo"],
                rating: 4.6,
                reviews: 78,
                details: "This captivating pendant features a deep blue sapphire surrounded by a halo of brilliant diamonds."
            },
            {
                id: 8,
                name: "Crystal Hoop Earrings",
                category: "earrings",
                price: 349.99,
                originalPrice: 449.99,
                description: "Statement hoop earrings with Swarovski crystals.",
                image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                badge: "SALE",
                inStock: true,
                materials: ["Gold Plated", "Swarovski Crystals", "Surgical Steel"],
                rating: 4.5,
                reviews: 94,
                details: "Make a statement with these stunning hoop earrings adorned with Swarovski crystals."
            },
            {
                id: 9,
                name: "Luxury Diamond Watch",
                category: "watches",
                price: 3299.99,
                originalPrice: 3999.99,
                description: "Elegant diamond-studded luxury watch with mother of pearl dial.",
                image: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                badge: "LUXURY",
                inStock: true,
                materials: ["Stainless Steel", "Diamonds", "Mother of Pearl"],
                rating: 4.9,
                reviews: 67,
                details: "This luxury timepiece combines precision Swiss movement with exquisite diamond detailing."
            },
            {
                id: 10,
                name: "Gold Tennis Bracelet",
                category: "bracelets",
                price: 1199.99,
                originalPrice: 1499.99,
                description: "Classic tennis bracelet with alternating diamonds in 18k gold.",
                image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                badge: "CLASSIC",
                inStock: true,
                materials: ["18K Yellow Gold", "Round Diamonds"],
                rating: 4.8,
                reviews: 112,
                details: "A timeless tennis bracelet featuring a continuous line of sparkling diamonds set in 18k yellow gold."
            }
        ];
        
        // Cache DOM elements
        this.cache = {};
        
        // Cleanup functions
        this.cleanupFunctions = [];
        
        // Determine current page
        this.currentPage = this.detectCurrentPage();
    }

    detectCurrentPage() {
        const path = window.location.pathname;
        if (path.includes('checkout')) return 'checkout';
        if (path.includes('story')) return 'story';
        if (path.includes('shop')) return 'shop';
        return 'home';
    }

    // ============================================
    // INITIALIZATION
    // ============================================

    async init() {
        if (this.isInitialized) return;
        
        try {
            // Cache DOM elements based on current page
            this.cacheElements();
            
            // Load saved data
            this.loadSavedData();
            
            // Setup all functionality
            this.setupEventListeners();
            
            // Setup common functionality
            this.setupCommonFeatures();
            
            // Setup page-specific functionality
            this.setupPageSpecificFeatures();
            
            this.isInitialized = true;
            console.log(`Jewelry website initialized successfully for ${this.currentPage} page`);
        } catch (error) {
            console.error('Initialization error:', error);
        }
    }

    cacheElements() {
        // Common elements (exist on most pages)
        this.cache.header = document.querySelector('.site-header');
        this.cache.hamburger = document.querySelector('.hamburger');
        this.cache.mobileMenu = document.getElementById('mobileMenu');
        this.cache.closeMenu = document.querySelector('.close-menu');
        this.cache.searchTrigger = document.querySelector('.search-trigger');
        this.cache.searchContainer = document.querySelector('.search-container');
        
        // Page-specific caching
        switch (this.currentPage) {
            case 'home':
                this.cacheHomeElements();
                break;
            case 'shop':
                this.cacheShopElements();
                break;
            case 'checkout':
                this.cacheCheckoutElements();
                break;
            case 'story':
                this.cacheStoryElements();
                break;
        }
    }

    cacheHomeElements() {
        // Sections
        this.cache.sections = {
            featured: document.getElementById('featured'),
            gallery: document.querySelector('.gallery-section'),
            video: document.querySelector('.video-section'),
            diamond: document.querySelector('.diamond-section'),
            gifting: document.querySelector('.gifting-edit-wrapper'),
            shop: document.querySelector('.shop-section')
        };
        
        // Video elements
        this.cache.video = document.querySelector('.hero-video');
        this.cache.videoContainer = document.querySelector('.video-container');
        this.cache.playCircle = document.querySelector('.play-circle');
        this.cache.playPauseBtn = document.querySelector('.play-pause-btn');
        this.cache.volumeBtn = document.querySelector('.volume-btn');
        this.cache.volumeSlider = document.querySelector('.volume-slider');
        this.cache.volumeFilled = document.querySelector('.volume-filled');
        
        // CTA buttons
        this.cache.ctaButtons = document.querySelectorAll('.hero-cta, .featured-view-btn, .gifting-edit-btn, .cta-button, .view-all-btn');
        
        // Interactive elements
        this.cache.interactiveElements = document.querySelectorAll(
            '.featured-category-card, .gallery-card, .testimonial-card, .gifting-reason-card'
        );
    }

    cacheShopElements() {
        // Shop elements
        this.cache.productGrid = document.getElementById('productGrid');
        this.cache.filterButtons = document.querySelectorAll('.filter-btn');
        this.cache.sortSelect = document.getElementById('sortSelect');
        this.cache.quickViewModal = document.getElementById('quickViewModal');
        this.cache.cartNotification = document.getElementById('cartNotification');
    }

    cacheCheckoutElements() {
        // Checkout elements
        this.cache.paymentOptions = document.querySelectorAll('.payment-option');
        this.cache.cardDetails = document.querySelectorAll('.form-grid')[3];
        this.cache.cardNumberInput = document.querySelector('input[placeholder*="Card Number"]');
        this.cache.expiryInput = document.querySelector('input[placeholder*="MM/YY"]');
        this.cache.formInputs = document.querySelectorAll('.form-input');
        this.cache.checkoutBtn = document.getElementById('completeOrderBtn');
        
        // Gift elements
        this.cache.isGiftCheckbox = document.getElementById('isGiftCheckbox');
        this.cache.giftPopupOverlay = document.getElementById('giftPopupOverlay');
        this.cache.closeGiftPopup = document.getElementById('closeGiftPopup');
        this.cache.cancelGiftDetails = document.getElementById('cancelGiftDetails');
        this.cache.saveGiftDetails = document.getElementById('saveGiftDetails');
        this.cache.sameAddressCheckbox = document.getElementById('sameAddress');
        this.cache.addressOptions = document.getElementById('addressOptions');
        this.cache.giftNote = document.getElementById('giftNote');
        this.cache.giftNotePreview = document.getElementById('giftNotePreview');
        this.cache.previewText = document.getElementById('previewText');
        this.cache.popupProductInfo = document.getElementById('popupProductInfo');
    }

    cacheStoryElements() {
        // Story page elements
        this.cache.timelineItems = document.querySelectorAll('.story-timeline-item');
        this.cache.valueCards = document.querySelectorAll('.story-value-card');
        this.cache.heroSection = document.querySelector('.story-hero-section');
        this.cache.ctaButton = document.querySelector('.story-cta-button');
    }

    loadSavedData() {
        try {
            // Load wishlist from localStorage
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key.startsWith('wishlist_')) {
                    const productId = key.replace('wishlist_', '');
                    if (localStorage.getItem(key) === 'true') {
                        this.state.wishlist.add(parseInt(productId));
                    }
                }
            }
            
            // Load cart from localStorage
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                this.state.cart = JSON.parse(savedCart);
            }
        } catch (error) {
            console.error('Error loading saved data:', error);
        }
    }

    // ============================================
    // EVENT LISTENERS SETUP
    // ============================================

    setupEventListeners() {
        // Common window events
        this.debouncedScroll = this.debounce(this.handleScroll.bind(this), 10);
        this.debouncedResize = this.debounce(this.handleResize.bind(this), 250);
        
        window.addEventListener('scroll', this.debouncedScroll);
        window.addEventListener('resize', this.debouncedResize);
        window.addEventListener('load', this.handleLoad.bind(this));
        
        // Common mobile menu
        if (this.cache.hamburger) {
            this.cache.hamburger.addEventListener('click', this.toggleMobileMenu.bind(this));
        }
        
        if (this.cache.closeMenu) {
            this.cache.closeMenu.addEventListener('click', this.closeMobileMenu.bind(this));
        }
        
        // Close mobile menu on link click
        const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
        if (mobileNavLinks.length) {
            mobileNavLinks.forEach(link => {
                link.addEventListener('click', this.closeMobileMenu.bind(this));
            });
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', this.handleKeyboardNavigation.bind(this));
        
        // Setup search if exists
        if (this.cache.searchTrigger && this.cache.searchContainer) {
            this.setupSearch();
        }
        
        // Setup touch optimizations
        if (this.isTouchDevice) {
            this.setupTouchOptimizations();
        }
    }

    setupCommonFeatures() {
        // Setup accessibility
        this.setupAccessibility();
        
        // Setup performance optimizations
        this.setupPerformanceOptimizations();
        
        // Setup navigation for common pages
        if (this.currentPage === 'home' || this.currentPage === 'story') {
            this.setupNavigation();
        }
    }

    setupPageSpecificFeatures() {
        switch (this.currentPage) {
            case 'home':
                this.setupHomeFeatures();
                break;
            case 'shop':
                this.setupShopFeatures();
                break;
            case 'checkout':
                this.setupCheckoutFeatures();
                break;
            case 'story':
                this.setupStoryFeatures();
                break;
        }
    }

    setupHomeFeatures() {
        this.setupIntersectionObservers();
        this.setupContinuousSlider();
        this.setupVideoPlayer();
        this.setupHoverEffects();
    }

    setupShopFeatures() {
        this.setupShop();
    }

    setupCheckoutFeatures() {
        this.setupCheckout();
    }

    setupStoryFeatures() {
        this.setupStoryAnimations();
        this.setupSmoothScrolling();
        this.setupInteractiveElements();
    }

    // ============================================
    // HOME PAGE FUNCTIONALITY
    // ============================================

    setupContinuousSlider() {
        const track = document.getElementById('featuredSlider');
        if (!track) return;
        
        const cards = track.querySelectorAll('.featured-category-card');
        if (cards.length === 0) return;
        
        // Only duplicate if we have cards
        cards.forEach(card => {
            const clone = card.cloneNode(true);
            track.appendChild(clone);
        });
        
        // Pause animation on hover
        track.addEventListener('mouseenter', () => {
            if (!this.prefersReducedMotion) {
                track.style.animationPlayState = 'paused';
            }
        });
        
        track.addEventListener('mouseleave', () => {
            if (!this.prefersReducedMotion) {
                track.style.animationPlayState = 'running';
            }
        });
        
        // Handle card clicks
        track.addEventListener('click', (e) => {
            const card = e.target.closest('.featured-category-card');
            if (card) {
                const label = card.querySelector('.featured-category-label')?.textContent || 'collection';
                this.navigateToCollection(label);
            }
        });
    }

    setupVideoPlayer() {
        if (!this.cache.video) return;
        
        // Play/Pause functionality
        const togglePlayPause = () => {
            if (this.cache.video.paused) {
                this.cache.video.play().catch(e => console.log('Autoplay prevented:', e));
                this.updatePlayButtonState(true);
                if (this.cache.playCircle) this.cache.playCircle.style.display = 'none';
            } else {
                this.cache.video.pause();
                this.updatePlayButtonState(false);
                if (this.cache.playCircle) this.cache.playCircle.style.display = 'flex';
            }
        };
        
        // Event listeners
        if (this.cache.playCircle) {
            this.cache.playCircle.addEventListener('click', (e) => {
                e.preventDefault();
                togglePlayPause();
            });
        }
        
        if (this.cache.playPauseBtn) {
            this.cache.playPauseBtn.addEventListener('click', togglePlayPause);
        }
        
        // Volume control
        if (this.cache.volumeBtn && this.cache.volumeSlider) {
            this.setupVolumeControls();
        }
        
        // Video progress
        this.cache.video.addEventListener('timeupdate', this.updateVideoProgress.bind(this));
        
        // Video ended
        this.cache.video.addEventListener('ended', () => {
            this.updatePlayButtonState(false);
            if (this.cache.playCircle) this.cache.playCircle.style.display = 'flex';
        });
        
        // Enable autoplay on user interaction
        this.enableVideoAutoplay();
    }

    setupVolumeControls() {
        this.cache.volumeBtn.addEventListener('click', () => {
            if (this.state.isVideoMuted) {
                this.cache.video.volume = this.state.currentVideoVolume;
                this.updateVolumeIcon(this.state.currentVideoVolume);
                this.state.isVideoMuted = false;
            } else {
                this.state.currentVideoVolume = this.cache.video.volume;
                this.cache.video.volume = 0;
                this.updateVolumeIcon(0);
                this.state.isVideoMuted = true;
            }
            this.updateVolumeBar(this.cache.video.volume);
        });
        
        this.cache.volumeSlider.addEventListener('click', (e) => {
            const rect = this.cache.volumeSlider.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            const newVolume = Math.max(0, Math.min(1, percent));
            
            this.cache.video.volume = newVolume;
            this.state.currentVideoVolume = newVolume;
            this.state.isVideoMuted = newVolume === 0;
            
            this.updateVolumeIcon(newVolume);
            this.updateVolumeBar(newVolume);
        });
    }

    updateVolumeBar(volume) {
        if (this.cache.volumeFilled) {
            this.cache.volumeFilled.style.width = `${volume * 100}%`;
        }
    }

    updateVolumeIcon(volume) {
        if (!this.cache.volumeBtn) return;
        
        const icon = this.cache.volumeBtn.querySelector('i');
        if (!icon) return;
        
        icon.className = 'fas fa-volume-';
        if (volume === 0) {
            icon.classList.add('fa-volume-mute');
        } else if (volume < 0.5) {
            icon.classList.add('fa-volume-down');
        } else {
            icon.classList.add('fa-volume-up');
        }
    }

    updateVideoProgress() {
        const videoProgress = document.querySelector('.video-progress-filled');
        if (videoProgress && this.cache.video.duration) {
            const percent = (this.cache.video.currentTime / this.cache.video.duration) * 100;
            videoProgress.style.width = `${percent}%`;
        }
    }

    updatePlayButtonState(isPlaying) {
        if (!this.cache.playPauseBtn) return;
        
        const icon = this.cache.playPauseBtn.querySelector('i');
        if (icon) {
            icon.className = isPlaying ? 'fas fa-pause' : 'fas fa-play';
        }
    }

    enableVideoAutoplay() {
        const enable = () => {
            this.state.canVideoAutoplay = true;
            document.removeEventListener('click', enable);
            document.removeEventListener('touchstart', enable);
        };
        
        document.addEventListener('click', enable);
        document.addEventListener('touchstart', enable);
    }

    // ============================================
    // SHOP PAGE FUNCTIONALITY
    // ============================================

    setupShop() {
        this.initParticles();
        this.renderProducts();
        this.setupShopEventListeners();
        this.setupShopScrollAnimations();
        this.preloadHeroImage();
    }

    initParticles() {
        const container = document.getElementById('particles');
        if (!container) return;
        
        const particleCount = window.innerWidth < 768 ? 15 : 30;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';

            const size = Math.random() * 4 + 1;
            const posX = Math.random() * 100;
            const duration = Math.random() * 15 + 10;
            const delay = Math.random() * 15;

            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}%`;
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${delay}s`;

            container.appendChild(particle);
        }
    }

    preloadHeroImage() {
        const img = new Image();
        img.src = 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80';
    }

    renderProducts(filteredProducts = null) {
        if (!this.cache.productGrid) return;
        
        const productsToRender = filteredProducts || this.getFilteredProducts();
        
        if (productsToRender.length === 0) {
            this.cache.productGrid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 4rem 1rem;">
                    <h3 class="gold-text" style="margin-bottom: 1rem; font-size: 1.8rem;">No products found</h3>
                    <p style="color: rgba(255,255,255,0.7); font-size: 0.95rem;">Try adjusting your filters or search terms</p>
                </div>
            `;
            return;
        }

        this.cache.productGrid.innerHTML = productsToRender.map(product => this.createProductCard(product)).join('');
        this.attachCardEventListeners();
        
        // Setup scroll animations for new cards
        this.setupProductCardAnimations();
    }

    getFilteredProducts() {
        let filtered = [...this.products];
        
        // Apply category filter
        if (this.state.currentCategory !== 'all') {
            filtered = filtered.filter(p => p.category === this.state.currentCategory);
        }
        
        // Apply sort
        switch (this.state.sortBy) {
            case 'newest':
                filtered.reverse();
                break;
            case 'price-low':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'popular':
                filtered.sort((a, b) => b.reviews - a.reviews);
                break;
        }
        
        return filtered;
    }

    createProductCard(product) {
        const isWishlisted = this.state.wishlist.has(product.id);

        return `
           <div class="product-card" data-id="${product.id}" data-category="${product.category}">
    <a href="single-product.html?id=${product.id}" 
       class="product-card-link"
       style="text-decoration: none; color: inherit; display: block;">

        <div class="product-image-container">
            <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
        </div>

        <div class="product-content">
            <h3 class="product-title">${product.name}</h3>

            <div class="product-price">
                <span class="current-price">$${product.price.toFixed(2)}</span>
                ${product.originalPrice ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
            </div>
        </div>
    </a>

    <!-- Wishlist Button -->
    <button class="product-wishlist ${isWishlisted ? 'active' : ''}"
        aria-label="${isWishlisted ? 'Remove from' : 'Add to'} wishlist"
        onclick="event.stopPropagation();">
        <i class="fas fa-heart"></i>
    </button>

    <!-- Cart Button -->
    <div class="product-actions">
      
    </div>
</div>

        `;
    }

    setupShopEventListeners() {
        // Filter buttons
        if (this.cache.filterButtons) {
            this.cache.filterButtons.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.cache.filterButtons.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');

                    this.state.currentCategory = btn.dataset.filter;
                    this.renderProducts();

                    // Animation
                    btn.style.transform = 'scale(0.95)';
                    setTimeout(() => btn.style.transform = '', 150);
                });
            });
        }

        // Sort select
        if (this.cache.sortSelect) {
            this.cache.sortSelect.addEventListener('change', (e) => {
                this.state.sortBy = e.target.value;
                this.renderProducts();
                this.showNotification(`Sorted by: ${e.target.options[e.target.selectedIndex].text}`);
            });
        }

        // Explore button
        const exploreBtn = document.getElementById('exploreBtn');
        if (exploreBtn) {
            exploreBtn.addEventListener('click', () => {
                document.querySelector('.shop-controls')?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                exploreBtn.style.transform = 'scale(0.95)';
                setTimeout(() => exploreBtn.style.transform = '', 200);
            });
        }

        // New arrivals button
        const newArrivalsBtn = document.getElementById('newArrivalsBtn');
        if (newArrivalsBtn) {
            newArrivalsBtn.addEventListener('click', () => {
                const newProducts = this.products.filter(p => p.badge === 'NEW ARRIVAL');
                this.renderProducts(newProducts);
                this.showNotification('Showing new arrivals');
                newArrivalsBtn.style.transform = 'scale(0.95)';
                setTimeout(() => newArrivalsBtn.style.transform = '', 200);
            });
        }

        // Close modal
        if (this.cache.quickViewModal) {
            this.cache.quickViewModal.addEventListener('click', (e) => {
                if (e.target === this.cache.quickViewModal) {
                    this.closeModal();
                }
            });
        }

        // Window resize for particles
        window.addEventListener('resize', this.handleParticlesResize.bind(this));
    }

    attachCardEventListeners() {
        // Wishlist buttons
        document.querySelectorAll('.product-wishlist').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = parseInt(e.currentTarget.closest('.product-card').dataset.id);
                const isActive = e.currentTarget.classList.contains('active');
                
                if (isActive) {
                    this.state.wishlist.delete(productId);
                    localStorage.setItem(`wishlist_${productId}`, 'false');
                } else {
                    this.state.wishlist.add(productId);
                    localStorage.setItem(`wishlist_${productId}`, 'true');
                }
                
                e.currentTarget.classList.toggle('active');
                
                // Animation
                e.currentTarget.style.transform = 'scale(1.3)';
                setTimeout(() => e.currentTarget.style.transform = '', 300);
                
                this.showNotification(`${!isActive ? 'Added to' : 'Removed from'} wishlist!`);
            });
        });

        // Quick view buttons
        document.querySelectorAll('.quick-view').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = parseInt(e.currentTarget.closest('.product-card').dataset.id);
                const product = this.products.find(p => p.id === productId);
                if (product) this.openModal(product);
                
                e.currentTarget.style.transform = 'scale(0.9)';
                setTimeout(() => e.currentTarget.style.transform = '', 200);
            });
        });

        // Add to cart buttons
        document.querySelectorAll('.add-to-cart').forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (e.currentTarget.disabled) return;
                
                const productId = parseInt(e.currentTarget.closest('.product-card').dataset.id);
                const product = this.products.find(p => p.id === productId);
                
                this.addToCart(product);
                
                e.currentTarget.style.transform = 'scale(0.95)';
                setTimeout(() => e.currentTarget.style.transform = '', 200);
            });
        });
    }

    addToCart(product) {
        this.state.cart.push({
            ...product,
            quantity: 1,
            addedAt: new Date().toISOString()
        });
        
        // Save to localStorage
        localStorage.setItem('cart', JSON.stringify(this.state.cart));
        
        this.showCartNotification(product.name);
    }

    openModal(product) {
        if (!this.cache.quickViewModal) return;
        
        const isWishlisted = this.state.wishlist.has(product.id);
        
        this.cache.quickViewModal.innerHTML = `
            <div class="modal-content">
                <button class="close-modal" aria-label="Close modal">
                    <i class="fas fa-times"></i>
                </button>
                <div style="padding: 1.5rem;">
                    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                        <div style="display: grid; grid-template-columns: 1fr; gap: 1.5rem;">
                            <div>
                                <img src="${product.image}" alt="${product.name}" style="width: 100%; border-radius: 15px; max-height: 400px; object-fit: cover;">
                            </div>
                            <div>
                                <div style="color: #e0c98f; font-size: 0.9rem; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 0.5rem;">${product.category}</div>
                                <h2 style="font-size: 1.8rem; margin-bottom: 0.8rem; background: linear-gradient(to right, #e0c98f, #a58b5c, #8a754d); -webkit-background-clip: text; background-clip: text; color: transparent; line-height: 1.2;">${product.name}</h2>
                                <div style="display: flex; align-items: center; gap: 0.8rem; margin-bottom: 1rem;">
                                    <div style="color: #e0c98f; font-size: 1.1rem;">
                                        ${this.generateStars(product.rating)}
                                    </div>
                                    <span style="color: rgba(255,255,255,0.7); font-size: 0.9rem;">(${product.reviews} reviews)</span>
                                </div>
                                <p style="color: rgba(255,255,255,0.8); line-height: 1.6; margin-bottom: 1.5rem; font-size: 0.95rem;">${product.details}</p>
                                <div style="margin-bottom: 1.5rem;">
                                    <h4 style="color: #e0c98f; margin-bottom: 0.6rem; font-size: 1rem;">Materials:</h4>
                                    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                                        ${product.materials.map(m => `<span style="background: rgba(224, 201, 143, 0.1); color: #e0c98f; padding: 0.4rem 0.8rem; border-radius: 6px; font-size: 0.85rem;">${m}</span>`).join('')}
                                    </div>
                                </div>
                                <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;">
                                    <div style="font-size: 1.8rem; background: linear-gradient(to right, #e0c98f, #a58b5c, #8a754d); -webkit-background-clip: text; background-clip: text; color: transparent; font-weight: 600;">$${product.price.toFixed(2)}</div>
                                    ${product.originalPrice ? `<div style="font-size: 1.3rem; color: rgba(255,255,255,0.4); text-decoration: line-through;">$${product.originalPrice.toFixed(2)}</div>` : ''}
                                </div>
                                <div style="display: flex; gap: 0.8rem;">
                                    <button class="modal-add-to-cart" style="flex: 1; padding: 0.875rem; background: linear-gradient(to right, #e0c98f, #a58b5c, #8a754d); border: none; color: #0a0a0a; border-radius: 8px; font-size: 0.95rem; font-weight: 600; cursor: pointer; transition: transform 0.3s ease;">
                                        <i class="fas fa-shopping-cart"></i> Add to Cart
                                    </button>
                                    <button class="modal-wishlist ${isWishlisted ? 'active' : ''}" style="width: 3rem; background: ${isWishlisted ? 'rgba(224, 201, 143, 0.3)' : 'rgba(224, 201, 143, 0.1)'}; border: 1px solid rgba(224, 201, 143, 0.3); color: #e0c98f; border-radius: 8px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.3s ease;">
                                        <i class="fas fa-heart"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add event listeners to modal buttons
        this.cache.quickViewModal.querySelector('.close-modal').addEventListener('click', () => this.closeModal());
        this.cache.quickViewModal.querySelector('.modal-add-to-cart').addEventListener('click', () => {
            this.addToCart(product);
            this.cache.quickViewModal.querySelector('.modal-add-to-cart').style.transform = 'scale(0.95)';
            setTimeout(() => {
                if (this.cache.quickViewModal.querySelector('.modal-add-to-cart')) {
                    this.cache.quickViewModal.querySelector('.modal-add-to-cart').style.transform = '';
                }
            }, 200);
        });
        this.cache.quickViewModal.querySelector('.modal-wishlist').addEventListener('click', (e) => {
            const isActive = e.currentTarget.classList.contains('active');
            
            if (isActive) {
                this.state.wishlist.delete(product.id);
                localStorage.setItem(`wishlist_${product.id}`, 'false');
                e.currentTarget.classList.remove('active');
                e.currentTarget.style.background = 'rgba(224, 201, 143, 0.1)';
            } else {
                this.state.wishlist.add(product.id);
                localStorage.setItem(`wishlist_${product.id}`, 'true');
                e.currentTarget.classList.add('active');
                e.currentTarget.style.background = 'rgba(224, 201, 143, 0.3)';
            }
            
            e.currentTarget.style.transform = 'scale(1.3)';
            setTimeout(() => e.currentTarget.style.transform = '', 300);
            
            this.showNotification(`${!isActive ? 'Added to' : 'Removed from'} wishlist!`);
        });

        // Show modal
        this.cache.quickViewModal.style.display = 'flex';
        setTimeout(() => this.cache.quickViewModal.style.opacity = '1', 10);
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        if (!this.cache.quickViewModal) return;
        
        this.cache.quickViewModal.style.opacity = '0';
        setTimeout(() => {
            this.cache.quickViewModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 400);
    }

    generateStars(rating) {
        let stars = '';
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars += '<i class="fas fa-star"></i>';
            } else if (i === fullStars && hasHalfStar) {
                stars += '<i class="fas fa-star-half-alt"></i>';
            } else {
                stars += '<i class="far fa-star"></i>';
            }
        }

        return stars;
    }

    showCartNotification(productName) {
        if (!this.cache.cartNotification) return;
        
        const notification = this.cache.cartNotification;
        notification.querySelector('p').textContent = `"${productName}" added to cart!`;
        notification.classList.add('show');

        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }

    showNotification(message) {
        const toast = document.createElement('div');
        toast.className = 'notification-toast';
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('show');
        }, 10);

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 500);
        }, 3000);
    }

    setupProductCardAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.product-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }

    setupShopScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        const controls = document.querySelector('.controls-container');
        if (controls) {
            controls.style.opacity = '0';
            controls.style.transform = 'translateX(-30px)';
            controls.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            observer.observe(controls);
        }

        // Add parallax effect to hero
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.shop-hero');
            if (hero) {
                const rate = scrolled * 0.5;
                hero.style.transform = `translateY(${rate}px)`;
                hero.style.opacity = `${1 - scrolled / 800}`;
            }
        });
    }

    handleParticlesResize() {
        const container = document.getElementById('particles');
        if (!container) return;
        
        container.innerHTML = '';
        this.initParticles();
    }

    // ============================================
    // CHECKOUT PAGE FUNCTIONALITY
    // ============================================

    setupCheckout() {
        if (this.currentPage !== 'checkout') return;
        
        this.setupCheckoutForm();
        this.setupGiftFunctionality();
    }

    setupCheckoutForm() {
        // Payment option selection
        if (this.cache.paymentOptions && this.cache.cardDetails) {
            this.cache.paymentOptions.forEach(option => {
                option.addEventListener('click', function() {
                    this.cache.paymentOptions.forEach(opt => opt.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Show/hide card details based on selection
                    const isCard = this.querySelector('.fa-credit-card');
                    if (isCard) {
                        this.cache.cardDetails.style.display = 'grid';
                    } else {
                        this.cache.cardDetails.style.display = 'none';
                    }
                }.bind(this));
            });
        }

        // Card number formatting
        if (this.cache.cardNumberInput) {
            this.cache.cardNumberInput.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                value = value.replace(/(\d{4})/g, '$1 ').trim();
                e.target.value = value.substring(0, 19);
            });
        }

        // Expiry date formatting
        if (this.cache.expiryInput) {
            this.cache.expiryInput.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length >= 2) {
                    value = value.substring(0, 2) + '/' + value.substring(2, 4);
                }
                e.target.value = value.substring(0, 5);
            });
        }

        // Form validation
        if (this.cache.formInputs && this.cache.checkoutBtn) {
            this.validateCheckoutForm();
        }

        // Handle keyboard navigation
        if (this.cache.formInputs) {
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' && e.target.classList.contains('form-input')) {
                    e.preventDefault();
                    const inputs = Array.from(this.cache.formInputs);
                    const currentIndex = inputs.indexOf(e.target);
                    if (currentIndex < inputs.length - 1) {
                        inputs[currentIndex + 1].focus();
                    }
                }
            }.bind(this));

            // Add focus styles
            this.cache.formInputs.forEach(input => {
                input.addEventListener('focus', function() {
                    this.style.borderColor = '#e0c98f';
                });
                
                input.addEventListener('blur', function() {
                    this.style.borderColor = 'rgba(165, 139, 92, 0.3)';
                });
            });
        }
    }

    validateCheckoutForm() {
        const validate = () => {
            let isValid = true;
            
            // Check required fields
            this.cache.formInputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#f44336';
                } else if (input.type === 'email' && input.value) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(input.value)) {
                        isValid = false;
                        input.style.borderColor = '#f44336';
                    }
                } else {
                    input.style.borderColor = 'rgba(165, 139, 92, 0.3)';
                }
            });
            
            if (this.cache.checkoutBtn) {
                this.cache.checkoutBtn.disabled = !isValid;
            }
            return isValid;
        };

        // Real-time validation
        this.cache.formInputs.forEach(input => {
            input.addEventListener('input', validate);
            input.addEventListener('blur', validate);
        });

        // Initial validation
        validate();

        // Complete order
        if (this.cache.checkoutBtn) {
            this.cache.checkoutBtn.addEventListener('click', function(e) {
                e.preventDefault();
                
                if (!validate()) {
                    this.showMessage('Please fill in all required fields correctly.', 'error');
                    return;
                }
                
                // Show loading state
                const originalText = this.innerHTML;
                this.innerHTML = '<span class="spinner"></span>Processing...';
                this.disabled = true;
                
                // Simulate API call
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-check"></i> Order Confirmed!';
                    this.style.background = '#4caf50';
                    
                    this.showMessage('Order placed successfully! Redirecting...', 'success');
                    
                    // Simulate redirect
                    setTimeout(() => {
                        window.location.href = '/order-confirmation';
                    }, 1500);
                }, 2000);
            }.bind(this));
        }
    }

    // ============================================
    // STORY PAGE FUNCTIONALITY
    // ============================================

    setupStoryAnimations() {
        if (this.currentPage !== 'story') return;
        
        // Timeline scroll animation
        if (this.cache.timelineItems && this.cache.timelineItems.length) {
            const timelineObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add('visible');
                        }, index * 200);
                    }
                });
            }, { 
                threshold: 0.2,
                rootMargin: '0px 0px -100px 0px'
            });
            
            this.cache.timelineItems.forEach(item => timelineObserver.observe(item));
        }

        // Value cards animation
        if (this.cache.valueCards && this.cache.valueCards.length) {
            const valueObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }, index * 200);
                    }
                });
            }, { threshold: 0.3 });
            
            this.cache.valueCards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(50px)';
                card.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                valueObserver.observe(card);
            });
        }

        // Create floating elements
        if (this.cache.heroSection) {
            this.createFloatingElements();
        }
    }

    setupSmoothScrolling() {
        // Smooth scroll for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    setupInteractiveElements() {
        if (!this.cache.ctaButton) return;
        
        // Enhanced CTA button effect
        this.cache.ctaButton.addEventListener('mouseenter', function() {
            this.createRippleEffect(this.cache.ctaButton);
        }.bind(this));
        
        this.cache.ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            this.createRippleEffect(this.cache.ctaButton, true);
            
            // Show loading state
            const originalText = this.cache.ctaButton.innerHTML;
            this.cache.ctaButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            this.cache.ctaButton.style.pointerEvents = 'none';
            
            setTimeout(() => {
                this.cache.ctaButton.innerHTML = originalText;
                this.cache.ctaButton.style.pointerEvents = 'auto';
                // Simulate navigation
                alert('Welcome to Zebkar. You will now be redirected to our collections.');
            }, 1500);
        }.bind(this));
    }

    createFloatingElements() {
        const jewelrySymbols = ['✦', '❖', '◈', '✧', '♔'];
        
        for (let i = 0; i < 15; i++) {
            const element = document.createElement('div');
            element.className = 'floating-jewel';
            
            const size = Math.random() * 30 + 15;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 5;
            const symbol = jewelrySymbols[Math.floor(Math.random() * jewelrySymbols.length)];
            const opacity = Math.random() * 0.3 + 0.1;
            
            element.innerHTML = symbol;
            element.style.cssText = `
                position: absolute;
                font-size: ${size}px;
                left: ${posX}%;
                top: ${posY}%;
                animation: floatJewel ${duration}s ease-in-out infinite ${delay}s;
                opacity: ${opacity};
                color: ${i % 2 === 0 ? '#e0c98f' : '#a58b5c'};
                pointer-events: none;
                z-index: 1;
                filter: blur(${Math.random() * 2}px);
            `;
            
            this.cache.heroSection.appendChild(element);
        }
    }

    createRippleEffect(button, isClick = false) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = isClick ? 
            (event.clientX - rect.left - size / 2) : 
            (Math.random() * rect.width - size / 2);
        const y = isClick ? 
            (event.clientY - rect.top - size / 2) : 
            (Math.random() * rect.height - size / 2);
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: ${isClick ? 'rgba(255, 255, 255, 0.6)' : 'rgba(224, 201, 143, 0.3)'};
            transform: scale(0);
            animation: rippleEffect 0.8s linear;
            width: ${size}px;
            height: ${size}px;
            top: ${y}px;
            left: ${x}px;
            pointer-events: none;
            z-index: 0;
        `;
        
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 800);
    }

    // ============================================
    // GIFT FUNCTIONALITY (CHECKOUT PAGE)
    // ============================================

    setupGiftFunctionality() {
        if (this.currentPage !== 'checkout') return;
        
        // Product data for gift functionality
        const products = {
            1: {
                name: 'Eternal Diamond Ring',
                category: 'Size: 7 • Qty: 1',
                price: '$1,299.99',
                image: 'https://images.unsplash.com/photo-1594576721254-f3f2a8c56bde?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
            },
            2: {
                name: 'Golden Pearl Necklace',
                category: '18K Gold • Qty: 1',
                price: '$899.99',
                image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
            }
        };
        
        // Gift details storage for each product
        let giftDetails = {
            isGift: false,
            products: {
                1: {
                    isGift: false,
                    recipientName: '',
                    giftNote: '',
                    sameAddress: true,
                    giftAddress: '',
                    giftCity: '',
                    giftPostalCode: ''
                },
                2: {
                    isGift: false,
                    recipientName: '',
                    giftNote: '',
                    sameAddress: true,
                    giftAddress: '',
                    giftCity: '',
                    giftPostalCode: ''
                }
            },
            currentProductId: null
        };
        
        // Open gift popup when main checkbox is checked
        if (this.cache.isGiftCheckbox && this.cache.giftPopupOverlay) {
            this.cache.isGiftCheckbox.addEventListener('change', function() {
                if (this.checked) {
                    giftDetails.isGift = true;
                    // Check all product checkboxes
                    document.querySelectorAll('.product-gift-checkbox-input').forEach(checkbox => {
                        checkbox.checked = true;
                        const productId = checkbox.closest('.product-gift-checkbox').dataset.productId;
                        giftDetails.products[productId].isGift = true;
                    });
                } else {
                    giftDetails.isGift = false;
                    // Uncheck all product checkboxes
                    document.querySelectorAll('.product-gift-checkbox-input').forEach(checkbox => {
                        checkbox.checked = false;
                        const productId = checkbox.closest('.product-gift-checkbox').dataset.productId;
                        giftDetails.products[productId].isGift = false;
                    });
                    resetGiftDetails();
                }
            });
        }
        
        // Open gift popup for specific product
        document.querySelectorAll('.product-gift-checkbox-input').forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const productCheckbox = this;
                const productId = productCheckbox.closest('.product-gift-checkbox').dataset.productId;
                
                if (productCheckbox.checked) {
                    giftDetails.currentProductId = productId;
                    giftDetails.products[productId].isGift = true;
                    
                    // Show popup with product info
                    const product = products[productId];
                    if (this.cache.popupProductInfo) {
                        this.cache.popupProductInfo.innerHTML = `
                            <div class="product-info">
                                <img src="${product.image}" alt="${product.name}">
                                <div class="product-info-text">
                                    <h4>${product.name}</h4>
                                    <p>${product.category} • ${product.price}</p>
                                </div>
                            </div>
                        `;
                    }
                    
                    // Load existing gift details for this product
                    loadProductGiftDetails(productId);
                    
                    if (this.cache.giftPopupOverlay) {
                        this.cache.giftPopupOverlay.style.display = 'flex';
                        document.body.style.overflow = 'hidden';
                    }
                } else {
                    giftDetails.products[productId].isGift = false;
                    resetProductGiftDetails(productId);
                }
            }.bind(this));
        });
        
        // Close popup functions
        const closePopup = () => {
            if (this.cache.giftPopupOverlay) {
                this.cache.giftPopupOverlay.style.display = 'none';
                document.body.style.overflow = 'auto';
                
                // If popup is closed without saving, uncheck the current product checkbox
                if (giftDetails.currentProductId) {
                    const productId = giftDetails.currentProductId;
                    if (!giftDetails.products[productId].recipientName) {
                        const checkbox = document.querySelector(`.product-gift-checkbox[data-product-id="${productId}"] input`);
                        if (checkbox) checkbox.checked = false;
                        giftDetails.products[productId].isGift = false;
                    }
                    giftDetails.currentProductId = null;
                }
            }
        };
        
        if (this.cache.closeGiftPopup) {
            this.cache.closeGiftPopup.addEventListener('click', closePopup);
        }
        
        if (this.cache.cancelGiftDetails) {
            this.cache.cancelGiftDetails.addEventListener('click', closePopup);
        }
        
        // Close popup when clicking outside
        if (this.cache.giftPopupOverlay) {
            this.cache.giftPopupOverlay.addEventListener('click', function(e) {
                if (e.target === this.cache.giftPopupOverlay) {
                    closePopup();
                }
            }.bind(this));
        }
        
        // Load product gift details into form
        const loadProductGiftDetails = (productId) => {
            const details = giftDetails.products[productId];
            if (document.getElementById('recipientName')) {
                document.getElementById('recipientName').value = details.recipientName || '';
            }
            if (document.getElementById('giftNote')) {
                document.getElementById('giftNote').value = details.giftNote || '';
            }
            if (this.cache.sameAddressCheckbox) {
                this.cache.sameAddressCheckbox.checked = details.sameAddress;
            }
            if (document.getElementById('giftAddress')) {
                document.getElementById('giftAddress').value = details.giftAddress || '';
            }
            if (document.getElementById('giftCity')) {
                document.getElementById('giftCity').value = details.giftCity || '';
            }
            if (document.getElementById('giftPostalCode')) {
                document.getElementById('giftPostalCode').value = details.giftPostalCode || '';
            }
            
            // Update preview
            if (this.cache.previewText && this.cache.giftNotePreview) {
                if (details.giftNote) {
                    this.cache.previewText.textContent = details.giftNote;
                    this.cache.giftNotePreview.classList.add('active');
                } else {
                    this.cache.giftNotePreview.classList.remove('active');
                }
            }
            
            // Update address options visibility
            if (this.cache.addressOptions) {
                if (details.sameAddress) {
                    this.cache.addressOptions.classList.remove('active');
                } else {
                    this.cache.addressOptions.classList.add('active');
                }
            }
        };
        
        // Toggle address fields based on same address checkbox
        if (this.cache.sameAddressCheckbox && this.cache.addressOptions) {
            this.cache.sameAddressCheckbox.addEventListener('change', function() {
                if (this.checked) {
                    this.cache.addressOptions.classList.remove('active');
                } else {
                    this.cache.addressOptions.classList.add('active');
                }
            }.bind(this));
        }
        
        // Preview gift note as user types
        if (this.cache.giftNote && this.cache.giftNotePreview && this.cache.previewText) {
            this.cache.giftNote.addEventListener('input', function() {
                if (this.value.trim()) {
                    this.cache.previewText.textContent = this.value;
                    this.cache.giftNotePreview.classList.add('active');
                } else {
                    this.cache.giftNotePreview.classList.remove('active');
                }
            }.bind(this));
        }
        
        // Save gift details
        if (this.cache.saveGiftDetails) {
            this.cache.saveGiftDetails.addEventListener('click', function() {
                const productId = giftDetails.currentProductId;
                if (!productId) return;
                
                const recipientName = document.getElementById('recipientName')?.value.trim() || '';
                const sameAddress = this.cache.sameAddressCheckbox?.checked || true;
                
                if (!recipientName) {
                    alert('Please enter the recipient\'s name');
                    document.getElementById('recipientName')?.focus();
                    return;
                }
                
                if (!sameAddress) {
                    const giftAddress = document.getElementById('giftAddress')?.value.trim() || '';
                    const giftCity = document.getElementById('giftCity')?.value.trim() || '';
                    const giftPostalCode = document.getElementById('giftPostalCode')?.value.trim() || '';
                    
                    if (!giftAddress || !giftCity || !giftPostalCode) {
                        alert('Please fill in all address fields');
                        return;
                    }
                    
                    giftDetails.products[productId].giftAddress = giftAddress;
                    giftDetails.products[productId].giftCity = giftCity;
                    giftDetails.products[productId].giftPostalCode = giftPostalCode;
                }
                
                // Save all details for current product
                giftDetails.products[productId].recipientName = recipientName;
                giftDetails.products[productId].giftNote = document.getElementById('giftNote')?.value.trim() || '';
                giftDetails.products[productId].sameAddress = sameAddress;
                
                // Update complete order button text if any product is a gift
                const hasGiftProducts = Object.values(giftDetails.products).some(product => product.isGift);
                if (hasGiftProducts && this.cache.checkoutBtn) {
                    this.cache.checkoutBtn.innerHTML = `Complete Order - $2,419.98 <i class="fas fa-gift" style="margin-left: 5px;"></i>`;
                }
                
                // Show success message
                alert('Gift details saved successfully!');
                closePopup();
            }.bind(this));
        }
        
        // Reset gift details for a specific product
        const resetProductGiftDetails = (productId) => {
            giftDetails.products[productId] = {
                isGift: false,
                recipientName: '',
                giftNote: '',
                sameAddress: true,
                giftAddress: '',
                giftCity: '',
                giftPostalCode: ''
            };
        };
        
        // Reset all gift details
        const resetGiftDetails = () => {
            giftDetails = {
                isGift: false,
                products: {
                    1: {
                        isGift: false,
                        recipientName: '',
                        giftNote: '',
                        sameAddress: true,
                        giftAddress: '',
                        giftCity: '',
                        giftPostalCode: ''
                    },
                    2: {
                        isGift: false,
                        recipientName: '',
                        giftNote: '',
                        sameAddress: true,
                        giftAddress: '',
                        giftCity: '',
                        giftPostalCode: ''
                    }
                },
                currentProductId: null
            };
            
            // Reset button text
            if (this.cache.checkoutBtn) {
                this.cache.checkoutBtn.textContent = 'Complete Order - $2,419.98';
            }
        };
        
        // Handle complete order button
        if (this.cache.checkoutBtn) {
            this.cache.checkoutBtn.addEventListener('click', function() {
                // Check if any product has gift details
                const hasGiftProducts = Object.values(giftDetails.products).some(product => product.isGift && product.recipientName);
                
                if (hasGiftProducts) {
                    // Prepare order summary with gift details
                    let summary = `Order Summary:\n`;
                    summary += `Items: $2,199.98\n`;
                    summary += `Shipping: FREE\n`;
                    summary += `Tax: $220.00\n`;
                    summary += `Total: $2,419.98\n\n`;
                    
                    summary += `Gift Details:\n`;
                    summary += `----------------\n`;
                    
                    Object.keys(giftDetails.products).forEach(productId => {
                        const product = giftDetails.products[productId];
                        if (product.isGift && product.recipientName) {
                            const productInfo = products[productId];
                            summary += `Product: ${productInfo.name}\n`;
                            summary += `Recipient: ${product.recipientName}\n`;
                            if (product.giftNote) {
                                summary += `Message: ${product.giftNote}\n`;
                            }
                            summary += `Shipping: ${product.sameAddress ? 'Same as billing address' : 'Different address'}\n`;
                            
                            if (!product.sameAddress) {
                                summary += `Gift Shipping Address:\n`;
                                summary += `${product.giftAddress}\n`;
                                summary += `${product.giftCity}, ${product.giftPostalCode}\n`;
                            }
                            summary += `----------------\n`;
                        }
                    });
                    
                    alert(summary + '\n\nOrder submitted successfully! Thank you for shopping with Zebkar Jewelry.');
                } else {
                    alert('Order submitted successfully! Thank you for shopping with Zebkar Jewelry.');
                }
            });
        }
        
        // Initialize address options based on checkbox state
        if (this.cache.sameAddressCheckbox && this.cache.addressOptions) {
            if (this.cache.sameAddressCheckbox.checked) {
                this.cache.addressOptions.classList.remove('active');
            } else {
                this.cache.addressOptions.classList.add('active');
            }
        }
        
        // Keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            // Close popup with ESC key
            if (e.key === 'Escape' && this.cache.giftPopupOverlay && this.cache.giftPopupOverlay.style.display === 'flex') {
                closePopup();
            }
            
            // Save with Ctrl/Cmd + Enter
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && this.cache.giftPopupOverlay && this.cache.giftPopupOverlay.style.display === 'flex') {
                if (this.cache.saveGiftDetails) {
                    this.cache.saveGiftDetails.click();
                }
            }
        }.bind(this));
        
        // Touch event support for mobile
        document.addEventListener('touchstart', function(e) {
            // Close popup when tapping outside on mobile
            if (this.cache.giftPopupOverlay && this.cache.giftPopupOverlay.style.display === 'flex' && e.target === this.cache.giftPopupOverlay) {
                closePopup();
            }
        }.bind(this));
        
        // Prevent body scroll when popup is open on mobile
        if (this.cache.giftPopupOverlay) {
            this.cache.giftPopupOverlay.addEventListener('touchmove', function(e) {
                if (this.cache.giftPopupOverlay.style.display === 'flex') {
                    e.preventDefault();
                }
            }.bind(this), { passive: false });
        }
    }

    // ============================================
    // ANIMATIONS AND VISIBILITY (HOME PAGE)
    // ============================================

    setupIntersectionObservers() {
        if (this.currentPage !== 'home') return;
        
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    this.animateSection(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe all sections
        if (this.cache.sections) {
            Object.values(this.cache.sections).forEach(section => {
                if (section) this.fadeObserver.observe(section);
            });
        }
        
        // Observe testimonials
        document.querySelectorAll('.testimonial-card').forEach(card => {
            if (this.prefersReducedMotion) {
                card.style.animation = 'none';
                card.style.opacity = '1';
            } else {
                card.style.animationPlayState = 'paused';
                this.fadeObserver.observe(card);
            }
        });
    }

    animateSection(section) {
        if (!section) return;
        
        const animations = {
            'featured-section': this.animateFeaturedSection.bind(this),
            'gifting-edit-wrapper': this.animateGiftingSection.bind(this),
            'gallery-section': this.animateGallerySection.bind(this),
            'video-section': this.animateVideoSection.bind(this),
            'diamond-section': this.animateDiamondSection.bind(this)
        };
        
        for (const [className, animationFn] of Object.entries(animations)) {
            if (section.classList.contains(className)) {
                animationFn(section);
                break;
            }
        }
    }

    animateFeaturedSection(section) {
        this.animateElementsWithDelay(section, [
            '.featured-title',
            '.featured-urdu',
            '.featured-view-btn'
        ], [100, 800, 1000]);
    }

    animateGiftingSection(section) {
        this.animateElementsWithDelay(section, [
            '.gifting-edit-container',
            '.gifting-edit-title',
            '.gifting-edit-description',
            '.gifting-edit-btn',
            '.gifting-edit-image-section'
        ], [100, 300, 500, 700, 900]);
    }

    animateGallerySection(section) {
        const title = section.querySelector('.section-title');
        const cards = section.querySelectorAll('.gallery-card');
        const viewBtn = section.querySelector('.view-all-btn');
        
        if (title) setTimeout(() => title.classList.add('visible'), 100);
        
        cards.forEach((card, index) => {
            setTimeout(() => card.classList.add('visible'), 200 + (index * 150));
        });
        
        if (viewBtn) setTimeout(() => viewBtn.classList.add('visible'), 800);
    }

    animateVideoSection(section) {
        this.animateElementsWithDelay(section, [
            '.section-heading',
            '.video-media',
            '.video-panel'
        ], [100, 300, 500]);
    }

    animateDiamondSection(section) {
        this.animateElementsWithDelay(section, [
            '.diamond-copy',
            '.cta-button',
            '.diamond-image'
        ], [100, 300, 500]);
    }

    animateElementsWithDelay(container, selectors, delays) {
        selectors.forEach((selector, index) => {
            const element = container.querySelector(selector);
            if (element) {
                setTimeout(() => element.classList.add('visible'), delays[index]);
            }
        });
    }

    // ============================================
    // NAVIGATION AND SEARCH
    // ============================================

    setupNavigation() {
        // Hero secondary button
        const heroSecondary = document.querySelector('.hero-cta.secondary');
        if (heroSecondary) {
            heroSecondary.addEventListener('click', () => {
                this.scrollToSection('featured');
            });
        }
        
        // Primary hero buttons
        document.querySelectorAll('.hero-cta:not(.secondary)').forEach(btn => {
            btn.addEventListener('click', () => {
                this.showAlert('Booking consultation...');
            });
        });
        
        // Scroll indicator
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', () => {
                this.scrollToSection('featured');
            });
        }
        
        // View all buttons
        document.querySelectorAll('.featured-view-btn, .view-all-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showAlert('Redirecting to all collections...');
            });
        });
        
        // Gifting edit button
        const giftingBtn = document.querySelector('.gifting-edit-btn');
        if (giftingBtn) {
            giftingBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showAlert('Exploring gifting options...');
            });
        }
        
        // Gallery cards
        const galleryCards = document.querySelectorAll('.gallery-card');
        if (galleryCards.length) {
            galleryCards.forEach(card => {
                card.addEventListener('click', () => {
                    const title = card.querySelector('h3')?.textContent || 'collection';
                    this.showAlert(`Exploring ${title} collection...`);
                });
            });
        }
    }

    setupSearch() {
        if (!this.cache.searchTrigger || !this.cache.searchContainer) return;
        
        this.cache.searchTrigger.addEventListener('click', () => {
            if (this.state.isSearchOpen) return;
            
            this.state.isSearchOpen = true;
            this.createSearchBox();
        });
    }

    createSearchBox() {
        const searchBox = document.createElement('div');
        searchBox.className = 'search-box';
        searchBox.innerHTML = `
            <input type="text" placeholder="Search for jewelry..." aria-label="Search">
            <button type="submit" aria-label="Submit search">
                <i class="fa-solid fa-magnifying-glass"></i>
            </button>
        `;
        
        this.cache.searchContainer.appendChild(searchBox);
        
        const input = searchBox.querySelector('input');
        input.focus();
        
        // Close search when clicking outside
        const closeSearch = (e) => {
            if (!this.cache.searchContainer.contains(e.target) && 
                !this.cache.searchTrigger.contains(e.target)) {
                searchBox.remove();
                this.state.isSearchOpen = false;
                document.removeEventListener('click', closeSearch);
            }
        };
        
        setTimeout(() => {
            document.addEventListener('click', closeSearch);
        }, 100);
        
        // Handle search
        const handleSearch = () => {
            const query = input.value.trim();
            if (query) {
                this.showAlert(`Searching for: ${query}`);
            }
        };
        
        searchBox.querySelector('button').addEventListener('click', handleSearch);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSearch();
        });
    }

    // ============================================
    // INTERACTIVITY AND EFFECTS
    // ============================================

    setupHoverEffects() {
        if (this.prefersReducedMotion || this.currentPage !== 'home') return;
        
        // Sparkle effects for cards
        document.querySelectorAll('.featured-category-card, .gallery-card, .diamond-svg').forEach(element => {
            element.addEventListener('mouseenter', this.createSparkleEffect.bind(this));
        });
        
        // Panel frame sparkles
        const panelFrame = document.querySelector('.panel-frame');
        if (panelFrame) {
            panelFrame.addEventListener('mouseenter', () => {
                this.createMultipleSparkles(panelFrame, 5);
            });
        }
        
        // Enhanced hover animations
        document.querySelectorAll('.gifting-reason-card, .gifting-cta-button, .gifting-process-step').forEach(el => {
            el.addEventListener('mouseenter', function() {
                this.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            });
            
            el.addEventListener('mouseleave', function() {
                this.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            });
        });
    }

    setupTouchOptimizations() {
        // Add touch feedback
        if (this.cache.interactiveElements) {
            this.cache.interactiveElements.forEach(el => {
                el.addEventListener('touchstart', function() {
                    this.style.transform = 'scale(0.95)';
                });
                
                el.addEventListener('touchend', function() {
                    this.style.transform = '';
                });
            });
        }
        
        // Always show video controls on touch devices
        const videoControls = document.querySelector('.video-controls');
        if (videoControls) {
            videoControls.style.opacity = '1';
            videoControls.style.transform = 'translateY(0)';
        }
        
        // Adjust cursor for testimonials
        document.querySelectorAll('.testimonial-card').forEach(card => {
            card.style.cursor = 'pointer';
        });
    }

    createSparkleEffect(e) {
        if (this.prefersReducedMotion) return;
        
        const target = e.currentTarget;
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.style.cssText = `
                    position: absolute;
                    width: 6px;
                    height: 6px;
                    background: #fff;
                    border-radius: 50%;
                    box-shadow: 0 0 10px 3px rgba(255, 255, 255, 0.9);
                    left: ${Math.random() * 90 + 5}%;
                    top: ${Math.random() * 90 + 5}%;
                    animation: sparkle 2s ease-out;
                    z-index: 1;
                    pointer-events: none;
                `;
                
                target.appendChild(sparkle);
                
                setTimeout(() => {
                    if (sparkle.parentNode) sparkle.remove();
                }, 2000);
            }, i * 200);
        }
    }

    createMultipleSparkles(container, count) {
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.style.cssText = `
                    position: absolute;
                    width: 6px;
                    height: 6px;
                    background: radial-gradient(circle, #fff 0%, #e6c895 100%);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 1;
                    filter: blur(0.5px);
                    animation: sparkleAnim 1s ease-out forwards;
                    left: ${Math.random() * 80 + 10}%;
                    top: ${Math.random() * 80 + 10}%;
                `;
                
                container.appendChild(sparkle);
                
                setTimeout(() => {
                    if (sparkle.parentNode) sparkle.remove();
                }, 1000);
            }, i * 100);
        }
    }

    // ============================================
    // UTILITY FUNCTIONS
    // ============================================

    handleScroll() {
        // Header scroll effect
        if (this.cache.header) {
            const scrollPosition = window.scrollY;
            if (scrollPosition > 50) {
                this.cache.header.classList.add('scrolled');
            } else {
                this.cache.header.classList.remove('scrolled');
            }
        }
        
        // Check visibility for home page
        if (this.currentPage === 'home') {
            this.checkVisibility();
        }
        
        // Add parallax effect to story page
        if (this.currentPage === 'story') {
            const scrolled = window.pageYOffset;
            const brandingElements = document.querySelectorAll('.floating-jewel');
            
            // Move floating elements
            brandingElements.forEach(element => {
                const speed = parseFloat(element.style.animationDuration) || 15;
                element.style.transform = `translateY(${scrolled * 0.02}px)`;
            });
        }
    }

    handleResize() {
        // Close mobile menu on larger screens
        if (window.innerWidth > 768 && this.state.isMobileMenuOpen) {
            this.closeMobileMenu();
        }
    }

    handleLoad() {
        // Add page load animation
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 1s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
        
        // Create particles for gifting section (home page)
        if (this.currentPage === 'home') {
            this.createParticles();
        }
    }

    createParticles() {
        const particlesContainer = document.querySelector('.gifting-hero-section');
        if (!particlesContainer) return;
        
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.className = 'gifting-particle';
            
            const size = Math.random() * 10 + 5;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 5;
            
            particle.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${posX}%;
                top: ${posY}%;
                animation: float-particle ${duration}s ease-in-out infinite ${delay}s;
                opacity: ${Math.random() * 0.3 + 0.1};
                position: absolute;
                background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(224,201,143,0.3) 100%);
                border-radius: 50%;
                pointer-events: none;
                z-index: 1;
            `;
            
            particlesContainer.appendChild(particle);
        }
    }

    toggleMobileMenu() {
        this.state.isMobileMenuOpen = !this.state.isMobileMenuOpen;
        
        if (this.cache.hamburger) {
            const isExpanded = this.cache.hamburger.getAttribute('aria-expanded') === 'true';
            this.cache.hamburger.classList.toggle('active');
            this.cache.hamburger.setAttribute('aria-expanded', !isExpanded);
        }
        
        if (this.cache.mobileMenu) {
            this.cache.mobileMenu.classList.toggle('active');
        }
        
        document.body.style.overflow = this.state.isMobileMenuOpen ? 'hidden' : 'auto';
    }

    closeMobileMenu() {
        this.state.isMobileMenuOpen = false;
        
        if (this.cache.hamburger) {
            this.cache.hamburger.classList.remove('active');
            this.cache.hamburger.setAttribute('aria-expanded', 'false');
        }
        
        if (this.cache.mobileMenu) {
            this.cache.mobileMenu.classList.remove('active');
        }
        
        document.body.style.overflow = 'auto';
    }

    checkVisibility() {
        if (!this.cache.sections) return;
        
        Object.values(this.cache.sections).forEach(section => {
            if (section && this.isElementInViewport(section, 100)) {
                section.classList.add('visible');
                this.animateSection(section);
            }
        });
    }

    isElementInViewport(el, offset = 0) {
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= (window.innerHeight || document.documentElement.clientHeight) - offset;
    }

    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    navigateToCollection(collectionName) {
        this.showAlert(`Viewing ${collectionName} collection...`);
    }

    showAlert(message) {
        console.log(message);
    }

    showMessage(message, type) {
        // Remove existing message
        const existingMsg = document.querySelector('.message-box');
        if (existingMsg) existingMsg.remove();
        
        // Create message box
        const messageBox = document.createElement('div');
        messageBox.className = 'message-box';
        messageBox.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            left: 20px;
            padding: 15px;
            background: ${type === 'success' ? '#4caf50' : '#f44336'};
            color: white;
            border-radius: 8px;
            text-align: center;
            z-index: 1000;
            animation: slideIn 0.3s ease;
            font-size: 0.95rem;
        `;
        
        messageBox.textContent = message;
        document.body.appendChild(messageBox);
        
        // Remove after 3 seconds
        setTimeout(() => {
            messageBox.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => messageBox.remove(), 300);
        }, 3000);
        
        // Add animation styles if not already present
        if (!document.querySelector('#message-styles')) {
            const style = document.createElement('style');
            style.id = 'message-styles';
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateY(-100%); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                @keyframes slideOut {
                    from { transform: translateY(0); opacity: 1; }
                    to { transform: translateY(-100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // ============================================
    // PERFORMANCE OPTIMIZATIONS
    // ============================================

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    setupAccessibility() {
        // Add keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.querySelectorAll(':focus').forEach(el => {
                    el.style.outline = '2px solid #e0c98f';
                    el.style.outlineOffset = '4px';
                });
            }
        });
        
        // Add skip to content link
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.className = 'skip-to-content';
        skipLink.textContent = 'Skip to main content';
        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    setupPerformanceOptimizations() {
        // Use passive event listeners for scroll
        const options = { passive: true };
        window.addEventListener('scroll', this.debouncedScroll, options);
    }

    handleKeyboardNavigation(e) {
        // Close mobile menu with Escape
        if (e.key === 'Escape') {
            if (this.state.isMobileMenuOpen) {
                this.closeMobileMenu();
            }
            if (this.state.isSearchOpen) {
                const searchBox = this.cache.searchContainer?.querySelector('.search-box');
                if (searchBox) {
                    searchBox.remove();
                    this.state.isSearchOpen = false;
                }
            }
            if (this.cache.quickViewModal?.style.display === 'flex') {
                this.closeModal();
            }
        }
    }

    // ============================================
    // CLEANUP
    // ============================================

    cleanup() {
        // Remove event listeners
        window.removeEventListener('scroll', this.debouncedScroll);
        window.removeEventListener('resize', this.debouncedResize);
        
        // Call cleanup functions
        this.cleanupFunctions.forEach(fn => fn());
        this.cleanupFunctions = [];
        
        this.isInitialized = false;
    }
}

// ============================================
// INSTANTIATE AND INITIALIZE
// ============================================

// Create global instance
window.jewelryApp = new JewelryWebsite();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.jewelryApp.init());
} else {
    window.jewelryApp.init();
}

// Add CSS animations and styles
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkle {
        0%, 100% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
        }
        50% {
            opacity: 1;
            transform: scale(1.5) rotate(180deg);
        }
    }
    
    @keyframes sparkleAnim {
        0% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
        }
        50% {
            opacity: 1;
            transform: scale(1.5) rotate(180deg);
        }
        100% {
            opacity: 0;
            transform: scale(0) rotate(360deg);
        }
    }
    
    @keyframes float-particle {
        0%, 100% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 0.1;
        }
        25% {
            transform: translate(20px, -20px) rotate(90deg);
            opacity: 0.3;
        }
        50% {
            transform: translate(-15px, 15px) rotate(180deg);
            opacity: 0.2;
        }
        75% {
            transform: translate(10px, -10px) rotate(270deg);
            opacity: 0.4;
        }
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes floatJewel {
        0%, 100% {
            transform: translate(0, 0) rotate(0deg) scale(1);
            opacity: 0.1;
        }
        25% {
            transform: translate(30px, -30px) rotate(90deg) scale(1.2);
            opacity: 0.3;
        }
        50% {
            transform: translate(-20px, 20px) rotate(180deg) scale(0.8);
            opacity: 0.2;
        }
        75% {
            transform: translate(15px, -15px) rotate(270deg) scale(1.1);
            opacity: 0.4;
        }
    }
    
    @keyframes pageFadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    .skip-to-content {
        position: absolute;
        top: -40px;
        left: 0;
        background: #e0c98f;
        color: #000;
        padding: 8px;
        z-index: 10000;
        text-decoration: none;
        font-size: 14px;
        border-radius: 4px;
        transition: top 0.3s ease;
    }
    
    .skip-to-content:focus {
        top: 0;
        outline: 2px solid #e0c98f;
        outline-offset: 2px;
    }
    
    .touch-device .interactive-element {
        cursor: pointer;
    }
    
    .notification-toast {
        position: fixed;
        bottom: 2rem;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        background: rgba(15, 15, 15, 0.95);
        border: 1px solid rgba(224, 201, 143, 0.3);
        color: #e0c98f;
        padding: 0.875rem 1.5rem;
        border-radius: 8px;
        z-index: 9999;
        backdrop-filter: blur(10px);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
        transition: transform 0.5s ease;
        font-weight: 500;
        text-align: center;
        min-width: 200px;
        max-width: 90vw;
        font-size: 0.9rem;
        border-image: linear-gradient(to right, #e0c98f, #a58b5c, #8a754d);
        border-image-slice: 1;
        opacity: 0;
    }
    
    .notification-toast.show {
        transform: translateX(-50%) translateY(0);
        opacity: 1;
    }
    
    @media (prefers-reduced-motion: reduce) {
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }
    
    /* Shop specific styles */
    .product-card {
        background: rgba(15, 15, 15, 0.7);
        border: 1px solid rgba(224, 201, 143, 0.1);
        border-radius: 15px;
        overflow: hidden;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
    }
    
    .product-card:hover {
        transform: translateY(-5px);
        border-color: rgba(224, 201, 143, 0.3);
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
    }
    
    .product-badge {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: linear-gradient(to right, #e0c98f, #a58b5c, #8a754d);
        color: #0a0a0a;
        padding: 0.3rem 0.8rem;
        border-radius: 20px;
        font-size: 0.75rem;
        font-weight: 600;
        letter-spacing: 0.5px;
    }
    
    .product-wishlist {
        position: absolute;
        top: 1rem;
        left: 1rem;
        background: rgba(15, 15, 15, 0.7);
        border: 1px solid rgba(224, 201, 143, 0.3);
        color: rgba(224, 201, 143, 0.5);
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;
        backdrop-filter: blur(5px);
    }
    
    .product-wishlist:hover,
    .product-wishlist.active {
        color: #e0c98f;
        border-color: #e0c98f;
        background: rgba(224, 201, 143, 0.1);
    }
    
    .current-price {
        font-size: 1.3rem;
        font-weight: 600;
        background: linear-gradient(to right, #e0c98f, #a58b5c, #8a754d);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
    }
    
    .original-price {
        font-size: 1rem;
        color: rgba(255, 255, 255, 0.4);
        text-decoration: line-through;
        margin-left: 0.5rem;
    }
    
    .add-to-cart {
        flex: 1;
        background: linear-gradient(to right, #e0c98f, #a58b5c, #8a754d);
        border: none;
        color: #0a0a0a;
        padding: 0.7rem;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .add-to-cart:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(224, 201, 143, 0.3);
    }
    
    .add-to-cart:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
    
    .quick-view {
        width: 3rem;
        background: rgba(224, 201, 143, 0.1);
        border: 1px solid rgba(224, 201, 143, 0.3);
        color: #e0c98f;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .quick-view:hover {
        background: rgba(224, 201, 143, 0.2);
        transform: translateY(-2px);
    }
    
    .filter-btn {
        background: transparent;
        border: 1px solid rgba(224, 201, 143, 0.2);
        color: rgba(255, 255, 255, 0.7);
        padding: 0.6rem 1.2rem;
        border-radius: 25px;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .filter-btn:hover,
    .filter-btn.active {
        background: rgba(224, 201, 143, 0.1);
        color: #e0c98f;
        border-color: rgba(224, 201, 143, 0.5);
    }
    
    .filter-btn.active {
        background: linear-gradient(to right, rgba(224, 201, 143, 0.2), rgba(165, 139, 92, 0.2));
        border-color: #e0c98f;
    }
    
    #cartNotification {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: rgba(15, 15, 15, 0.95);
        border: 1px solid rgba(224, 201, 143, 0.3);
        border-radius: 10px;
        padding: 1rem 1.5rem;
        display: flex;
        align-items: center;
        gap: 1rem;
        transform: translateY(100px);
        opacity: 0;
        transition: all 0.5s ease;
        z-index: 10000;
        backdrop-filter: blur(10px);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
    }
    
    #cartNotification.show {
        transform: translateY(0);
        opacity: 1;
    }
    
    #quickViewModal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        z-index: 9999;
        display: none;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(10px);
        opacity: 0;
        transition: opacity 0.4s ease;
    }
    
    .modal-content {
        background: rgba(15, 15, 15, 0.95);
        border: 1px solid rgba(224, 201, 143, 0.2);
        border-radius: 15px;
        max-width: 900px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
        position: relative;
        backdrop-filter: blur(10px);
    }
    
    .close-modal {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: rgba(15, 15, 15, 0.7);
        border: 1px solid rgba(224, 201, 143, 0.3);
        color: #e0c98f;
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;
        z-index: 10;
    }
    
    .close-modal:hover {
        background: rgba(224, 201, 143, 0.1);
        transform: rotate(90deg);
    }
    
    .particle {
        position: absolute;
        background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(224,201,143,0.3) 100%);
        border-radius: 50%;
        pointer-events: none;
        animation: float-particle linear infinite;
    }
    
    .spinner {
        display: inline-block;
        width: 20px;
        height: 20px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        border-top-color: #e0c98f;
        animation: spin 1s ease-in-out infinite;
        margin-right: 8px;
    }
    
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);