const str = window.location;
const url = new URL(str);
const orderId = url.searchParams.get("confirmationId");
const orderIdElement = document.getElementById("orderId");
orderIdElement.innerHTML = orderId;

console.log(orderId);
