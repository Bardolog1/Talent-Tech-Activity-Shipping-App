const product = document.querySelector('#name');
const weight = document.querySelector('#weight');
const destination = document.querySelector('#destination');
const distance = document.querySelector('#distance');
const recipient = document.querySelector('#recipient');

const submit = document.querySelector('#submit');

submit.addEventListener('click', (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
       swal({
            title: '¡Error!',
            text: 'Por favor, llena todos los campos',
            icon: 'error'
        });
       
        return;
    }
    
    const shippingCost = calculateShipping();
    const time = calculateTime(distance.value);
    const shippingDetails = {
        product: product.value,
        weight: weight.value,
        destination: destination.value,
        distance: distance.value,
        recipient: recipient.value,
        shippingCost,
        time
    }
    swal({
        title: '¡Cotización exitosa!',
        text: `Tu envío de ${shippingDetails.product} para ${shippingDetails.recipient} a la ciudad de ${shippingDetails.destination} ha sido cotizado exitosamente 🚚
            Costo de envio $${Math.round(shippingDetails.shippingCost)} COP 💸
            Entrega estimada en ${Math.round(shippingDetails.time)} horas ⌛`,
        icon: 'success'
        
    });
    clearInputs();
}
);
    

function calculateShipping() {
    const tarifaConst = 5000; 
    const factorPeso = 2000; 
    const factorDistancia = 100; 
    const weightValue = weight.value;
    const distanceValue = distance.value;
    const shippingCost = tarifaConst + (weightValue * factorPeso) + (distanceValue * factorDistancia);
    return shippingCost; 
}

function calculateTime(distance) {
    const velocityProm = 60; 
    const tiempoEstimado = distance / velocityProm;
    return tiempoEstimado;
}

function validateForm() {
    if (product.value === '' || weight.value === '' || destination.value === '' || distance.value === '' || recipient.value === '') {
        return false;
    }
    return true;
}
function clearInputs() {
    product.value = '';
    weight.value = '';
    destination.value = '';
    distance.value = '';
    recipient.value = '';
}