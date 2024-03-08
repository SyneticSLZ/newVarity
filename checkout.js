// const stripe = Stripe('pk_live_51MNx4UKJeZAyw8f4Lec7u9jtEoGifaJPvGAsW5OOUP3v943UwPN07TloLoOKJPJm85dpGPhGaufUXAU10IepmPVp00Z98Rt01D');

// function checkout() {

//     console.log("sennding cart items to server")
//     document.getElementById('overlay1').style.display = 'block';
//     hideSidebar();
//     // Enable the skeleton loader UI for the optimal loading experience.
//     const loader = 'auto';
//     // const response = await fetch('/checkout');
//     const cart = JSON.parse(localStorage.getItem('cart'));
//     console.log(cart);
//     fetch('https://dapp-synetic.onrender.com/checkout', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ cart })
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log(data);
//         alert(data);
//         const clientSecret = response.clientSecret;
//         const appearance = { /* ... */ };
//         // Create an elements group from the Stripe instance, passing the clientSecret (obtained in step 2), loader, and appearance (optional).
//         const elements = stripe.elements({clientSecret, appearance, loader});
    
//         // Create Element instances
//         const expressCheckoutElement = elements.create('expressCheckout', options)
//         expressCheckoutElement.mount('#express-checkout-element')
//         const linkAuthenticationElement = elements.create("linkAuthentication" , {defaultValues: {email: "foo@bar.com"}});
//         const addressElement = elements.create("address", {
//             mode: 'shipping',
//             defaultValues: {
//             name: 'Jane Doe',
//             address: {
//                 line1: '354 Oyster Point Blvd',
//                 line2: '',
//                 city: 'South San Francisco',
//                 state: 'CA',
//                 postal_code: '94080',
//                 country: 'US',
//         }}});
//         // Mount the Element to its corresponding DOM node
//         addressElement.mount("#address-element");
    
//         const paymentElement = elements.create('payment', {
//         defaultValues: {
//             billingDetails: {
//             name: 'John Doe',
//             phone: '888-888-8888',
//         },},});
    
//         linkAuthenticationElement.on('change', (event) => {
//             const email = event.value.email;
//         });
    
//         addressElement.on('change', (event) => {
//             const address = event.value;
//         })
    
//         linkAuthenticationElement.mount("#link-authentication-element");
//         addressElement.mount("#address-element");
//         paymentElement.mount("#payment-element");    
//         // Render the form using the clientSecret



//     })
//     .catch(error => {
//         console.error('Error:', error);
//         alert('connection to payment provider failed');
//     });




// };

// const form = document.getElementById('payment-form');

//     form.addEventListener('submit', async (event) => {
//     event.preventDefault();

//     const {error} = await stripe.confirmPayment({
//         elements,
//         confirmParams: {
//         return_url: "https://example.com/order/123/complete",
//         }
//     });

//     if (error) {
//         // Show error to your customer (for example, payment details incomplete)
//         console.log(error.message);
//     } else {
//         // Your customer will be redirected to your `return_url`. For some payment
//         // methods like iDEAL, your customer will be redirected to an intermediate
//         // site first to authorize the payment, then redirected to the `return_url`.
//     }
//     });