document.addEventListener('DOMContentLoaded', function() {

    
    const hoverCards = document.querySelectorAll('.skill-card, .portfolio-card');
    
    hoverCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('hover-active');
        });
        card.addEventListener('mouseleave', () => {
            card.classList.remove('hover-active');
        });
        
        card.style.cursor = 'pointer'; 
    });
    
    const form = document.getElementById('contactForm');

    if (form) {
        const submitBtn = document.getElementById('submitBtn');
        const agreementCheckbox = document.getElementById('agreement');
        const alertContainer = document.getElementById('alertContainer');
        const messageInput = document.getElementById('message');

        function checkValidity() {
            const isMessageLongEnough = messageInput.value.length >= 10;
            
            if (!isMessageLongEnough && messageInput.value.length > 0) {
                messageInput.setCustomValidity("Pesan minimal 10 karakter.");
            } else {
                messageInput.setCustomValidity(""); 
            }
            const isFormValid = form.checkValidity();
            submitBtn.disabled = !isFormValid || !agreementCheckbox.checked;
        }

        form.addEventListener('input', checkValidity);
        agreementCheckbox.addEventListener('change', checkValidity);
        form.addEventListener('submit', function (event) {
            event.preventDefault(); 
            event.stopPropagation(); 
            
            checkValidity();

            if (form.checkValidity() && agreementCheckbox.checked) {
                alertContainer.innerHTML = `
                    <div class="alert alert-success alert-dismissible fade show bg-info text-dark border-0" role="alert">
                        <strong>Success!</strong> Pesan Anda berhasil terkirim. (Demo: Tidak ada pengiriman ke server)
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                `;
                form.reset(); 
                form.classList.remove('was-validated'); 
                submitBtn.disabled = true; 
            } else {
                alertContainer.innerHTML = `
                    <div class="alert alert-danger alert-dismissible fade show bg-danger text-white border-0" role="alert">
                        <strong>Error!</strong> Mohon lengkapi semua field yang wajib diisi.
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                `;
            }

            form.classList.add('was-validated'); 
        }, false);
        
        checkValidity(); 
    }
});