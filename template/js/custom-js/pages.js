// Add your custom JavaScript for storefront pages here.
window.$ecomConfig.set('default_img_size', 'zoom')
const nameIf = window.ecomPassport.customer.display_name ? window.ecomPassport.customer.display_name : ' entre ou cadastre-se'
document.getElementById('nameIf').innerHTML = 'Olá ' + nameIf