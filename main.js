        // Gestion du menu hamburger
        const hamburger = document.getElementById('hamburger');
        const mobileMenu = document.getElementById('mobileMenu');
        const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

        hamburger.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                const dropdown = toggle.nextElementSibling;
                dropdown.classList.toggle('active');
            });
        });

        mobileMenu.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                mobileMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });

        // Fonctions pour les modals
        const buyButtons = document.querySelectorAll('.buy-btn');
        const modal = document.getElementById('checkoutModal');
        const diamondModal = document.getElementById('diamondModal');
        const closeBtns = document.querySelectorAll('.close');
        const selectedProductInput = document.getElementById('selectedProduct');
        const selectedPriceInput = document.getElementById('selectedPrice');
        const errorMessage = document.getElementById('errorMessage');
        const openDiamondModalBtn = document.getElementById('openDiamondModal');
        const diamondSlider = document.getElementById('diamondSlider');
        const diamondCount = document.getElementById('diamondCount');
        const totalPrice = document.getElementById('totalPrice');
        const discountBadge = document.getElementById('discountBadge');
        const confirmDiamondPurchase = document.getElementById('confirmDiamondPurchase');
        const productCards = document.querySelectorAll('.product-card');
        const transactionID = document.getElementById('transactionID');
        const idError = document.getElementById('idError');
        const orderFormContainer = document.getElementById('orderFormContainer');
        const confirmationMessage = document.getElementById('confirmationMessage');
        const countdownElement = document.getElementById('countdown');

        // Animation des produits au défilement
        function checkVisibility() {
            productCards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const isVisible = (rect.top <= window.innerHeight * 0.75) && 
                                 (rect.bottom >= window.innerHeight * 0.25);
                
                if (isVisible && !card.classList.contains('visible')) {
                    setTimeout(() => {
                        card.classList.add('visible');
                    }, 200 * Array.from(productCards).indexOf(card));
                }
            });
        }

        window.addEventListener('load', checkVisibility);
        window.addEventListener('scroll', checkVisibility);

        // Ouvrir modal pour produits normaux
        buyButtons.forEach(button => {
            if (button.id !== 'openDiamondModal') {
                button.addEventListener('click', () => {
                    const productName = button.getAttribute('data-product');
                    const productPrice = button.getAttribute('data-price') || "Prix variable";
                    selectedProductInput.value = productName;
                    selectedPriceInput.value = productPrice;
                    modal.style.display = 'flex';
                    errorMessage.style.display = 'none';
                    orderFormContainer.style.display = 'block';
                    confirmationMessage.style.display = 'none';
                });
            }
        });

        // Ouvrir modal pour diamants Free Fire
        openDiamondModalBtn.addEventListener('click', () => {
            diamondModal.style.display = 'flex';
        });

        // Fermer les modals
        closeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                modal.style.display = 'none';
                diamondModal.style.display = 'none';
            });
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal || e.target === diamondModal) {
                modal.style.display = 'none';
                diamondModal.style.display = 'none';
            }
        });

        // Calcul du prix des diamants avec remise
        diamondSlider.addEventListener('input', () => {
            const diamonds = parseInt(diamondSlider.value);
            diamondCount.textContent = diamonds;

            const basePricePer100 = 220;
            let total = (diamonds / 100) * basePricePer100;

            let discount = 0;
            if (diamonds >= 5000) {
                discount = 16;
            } else if (diamonds >= 3000) {
                discount = 11;
            } else if (diamonds >= 1000) {
                discount = 8;
            } else if (diamonds >= 500) {
                discount = 5;
            }

            if (discount > 0) {
                const discountAmount = (total * discount) / 100;
                total -= discountAmount;
                discountBadge.textContent = `Remise ${discount}%`;
                discountBadge.style.display = 'inline-block';
            } else {
                discountBadge.style.display = 'none';
            }

            totalPrice.textContent = Math.round(total);
        });

        // Confirmer achat de diamants
        confirmDiamondPurchase.addEventListener('click', () => {
            const diamonds = parseInt(diamondSlider.value);
            const price = totalPrice.textContent;
            selectedProductInput.value = `Diamants Free Fire (${diamonds})`;
            selectedPriceInput.value = `${price} HTG`;
            diamondModal.style.display = 'none';
            modal.style.display = 'flex';
            orderFormContainer.style.display = 'block';
            confirmationMessage.style.display = 'none';
        });

        // Validation de l'ID de transaction
        transactionID.addEventListener('input', function() {
            const idValue = this.value;
            const idLength = idValue.length;
            
            if (idLength > 0 && !/^\d+$/.test(idValue)) {
                idError.textContent = "L'ID doit contenir uniquement des chiffres";
                idError.style.display = 'block';
            } else if (idLength > 0 && idLength < 9) {
                idError.textContent = "Nombre de chiffres insuffisant (minimum 9)";
                idError.style.display = 'block';
            } else if (idLength > 14) {
                idError.textContent = "Nombre de chiffres trop élevé (maximum 14)";
                idError.style.display = 'block';
            } else {
                idError.style.display = 'none';
            }
        });

        // Fonction de redirection
        function startCountdown() {
            let seconds = 10;
            countdownElement.textContent = seconds;
            
            const countdownInterval = setInterval(() => {
                seconds--;
                countdownElement.textContent = seconds;
                
                if (seconds <= 0) {
                    clearInterval(countdownInterval);
                    modal.style.display = "none";
                    window.location.href = window.location.origin + window.location.pathname + "#home";
                    setTimeout(() => { window.location.reload(); }, 100);
                }
            }, 1000);
        }

        // Validation du formulaire
        document.getElementById('orderForm').addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('clientName').value;
            const email = document.getElementById('clientEmail').value;
            const phone = document.getElementById('clientPhone').value;
            const product = document.getElementById('selectedProduct').value;
            const transactionId = document.getElementById('transactionID').value;
            const idLength = transactionId.length;

            if (!/^\d+$/.test(transactionId)) {
                idError.textContent = "L'ID doit contenir uniquement des chiffres";
                idError.style.display = 'block';
                return;
            } else if (idLength < 9) {
                idError.textContent = "Nombre de chiffres insuffisant (minimum 9)";
                idError.style.display = 'block';
                return;
            } else if (idLength > 14) {
                idError.textContent = "Nombre de chiffres trop élevé (maximum 14)";
                idError.style.display = 'block';
                return;
            }

            if (!name || !email || !phone || !product || !transactionId) {
                errorMessage.style.display = 'block';
                return;
            }

            errorMessage.style.display = 'none';
            idError.style.display = 'none';
            
            orderFormContainer.style.display = 'none';
            confirmationMessage.style.display = 'block';
            
            startCountdown();
            
            fetch(this.action, {
                method: "POST",
                body: new FormData(this),
                headers: { 
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(response => {
                if (!response.ok) throw new Error("Erè nan fòm lan");
            }).catch(error => {
                console.error("Erè:", error);
            });
        });
