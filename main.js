const one = document.querySelector(".one");
const two = document.querySelector(".two");
const three = document.querySelector(".three");
const four = document.querySelector(".four");
const five = document.querySelector(".five");
const notactive = document.querySelector(".notactive");

const customerId = window.location.href.split("/")[4];
const orderId = window.location.href.split("/")[5];

one = function() {
    one.classList.add("active");
    two.classList.remove("active");
    three.classList.remove("active");
    four.classList.remove("active");
    five.classList.remove("active");
};

two = function() {
    one.classList.add("active");
    two.classList.add("active");
    three.classList.remove("active");
    four.classList.remove("active");
    five.classList.remove("active");
};
three = function() {
    one.classList.add("active");
    two.classList.add("active");
    three.classList.add("active");
    four.classList.remove("active");
    five.classList.remove("active");
};
four = function() {
    one.classList.add("active");
    two.classList.add("active");
    three.classList.add("active");
    four.classList.add("active");
    five.classList.remove("active");
};
five = function() {
    one.classList.add("active");
    two.classList.add("active");
    three.classList.add("active");
    four.classList.add("active");
    five.classList.add("active");
};

notactive = function() {
    one.classList.remove("active");
    two.classList.remove("active");
    three.classList.remove("active");
    four.classList.remove("active");
    five.classList.remove("active");
};



const getOrderStatus = function() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "/orders.csv");
  xhr.responseType = "text";
  xhr.onload = function() {
    const csvData = xhr.responseText;
    const orders = csvData.split("\n");
    for (const order of orders) {
      const columns = order.split(",");
      const orderStatus = columns[2];

      // Check if the order ID matches the current order ID
      if (orderId === columns[1]) {
        // Update the progress bar
        if (orderStatus === "Order Confirmed") {
          one();
        }
        if (orderStatus === "Enroute to Load Zone") {
          two();
        }
        if (orderStatus === "Material Loaded") {
          three();
        }
        if (orderStatus === "Enroute to Offload Zone") {
          four();
        }
        if (orderStatus === "Order Delivered") {
          five();
        }
        else {
          notactive();
        }
      }
    }
  };
  xhr.send();
};

window.onload = getOrderStatus;
