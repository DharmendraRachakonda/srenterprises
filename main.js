const one = document.querySelector(".one");
const two = document.querySelector(".two");
const three = document.querySelector(".three");
const four = document.querySelector(".four");
const five = document.querySelector(".five");

const getOrderStatus = function(orderId) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "/orders.csv");
  xhr.responseType = "text";
  xhr.onload = function() {
    const csvData = xhr.responseText;
    const orders = csvData.split("\n");
    for (const order of orders) {
      const columns = order.split(",");
      if (columns[1] === orderId) {
        const orderStatus = columns[2];
        updateProgress(orderStatus);
      }
    }
  };
  xhr.send();
};

const updateProgress = function(orderStatus) {
  switch (orderStatus) {
    case "Order Confirmed":
      one.classList.add("active");
      break;
    case "Enroute to Load Zone":
      two.classList.add("active");
      break;
    case "Material Loaded":
      three.classList.add("active");
      break;
    case "Enroute to Offload Zone":
      four.classList.add("active");
      break;
    case "Order Delivered":
      five.classList.add("active");
      break;
    default:
      break;
  }
