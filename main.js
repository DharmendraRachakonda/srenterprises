const one = document.querySelector(".one");
const two = document.querySelector(".two");
const three = document.querySelector(".three");
const four = document.querySelector(".four");
const five = document.querySelector(".five");

// Event listeners for progress bar clicks
one.addEventListener("click", function() {
    updateProgressBar(1);
});

two.addEventListener("click", function() {
    updateProgressBar(2);
});

three.addEventListener("click", function() {
    updateProgressBar(3);
});

four.addEventListener("click", function() {
    updateProgressBar(4);
});

five.addEventListener("click", function() {
    updateProgressBar(5);
});

// Load CSV data on window load
window.addEventListener("load", function() {
    Papa.parse("data.csv", {
        header: true,
        download: true,
        complete: function(results) {
            const data = results.data;
            const urlParams = new URLSearchParams(window.location.search);
            const orderId = urlParams.get("orderId");

            // Find the matching order in the CSV data
            const order = data.find(item => item.OrderID === orderId);
            if (order) {
                const orderStatus = order.OrderStatus;
                const statusIndex = getStatusIndex(orderStatus);
                if (statusIndex > 0) {
                    // Update progress bar based on the status index
                    updateProgressBar(statusIndex);
                }
            }
        }
    });
});

// Helper function to get the index of the status
function getStatusIndex(status) {
    switch (status) {
        case "Order Confirmed":
            return 1;
        case "Enroute to Load Zone":
            return 2;
        case "Material Loaded":
            return 3;
        case "Enroute to Offload Zone":
            return 4;
        case "Order Delivered":
            return 5;
        default:
            return 0;
    }
}

// Helper function to update the progress bar based on the selected index
function updateProgressBar(index) {
    // Remove 'active' class from all progress elements
    one.classList.remove("active");
    two.classList.remove("active");
    three.classList.remove("active");
    four.classList.remove("active");
    five.classList.remove("active");

    // Add 'active' class to the selected progress element
    switch (index) {
        case 1:
            one.classList.add("active");
            break;
        case 2:
            one.classList.add("active");
            two.classList.add("active");
            break;
        case 3:
            one.classList.add("active");
            two.classList.add("active");
            three.classList.add("active");
            break;
        case 4:
            one.classList.add("active");
            two.classList.add("active");
            three.classList.add("active");
            four.classList.add("active");
            break;
        case 5:
            one.classList.add("active");
            two.classList.add("active");
            three.classList.add("active");
            four.classList.add("active");
            five.classList.add("active");
            break;
        default:
            break;
    }
}
