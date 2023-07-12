const one = document.querySelector(".one");
const two = document.querySelector(".two");
const three = document.querySelector(".three");
const four = document.querySelector(".four");
const five = document.querySelector(".five");

window.addEventListener("load", function() {
    console.log("Window loaded");

    fetch("orders.csv")
        .then(response => response.text())
        .then(data => {
            console.log("CSV data fetched");
            console.log("CSV data:", data);
            const parsedData = parseCSVData(data);
            console.log("Parsed data:", parsedData);
            const urlParams = new URLSearchParams(window.location.search);
            const orderId = urlParams.get("orderId");
            console.log("Order ID from URL:", orderId);

            const order = parsedData.find(item => item.OrderID === orderId);
            console.log("Order:", order);
            if (order) {
                const orderStatus = order.OrderStatus;
                console.log("Order status from CSV:", orderStatus);
                const statusIndex = getStatusIndex(orderStatus);
                if (statusIndex > 0) {
                    updateProgressBar(statusIndex);
                    console.log("Progress bar updated");
                }
            }
        })
        .catch(error => {
            console.error("Error fetching CSV data:", error);
        });
});

function parseCSVData(csvData) {
    const lines = csvData.split("\n");
    const headers = lines[0].split(",");
    const parsedData = [];

    for (let i = 1; i < lines.length; i++) {
        const fields = lines[i].split(",");
        if (fields.length === headers.length) {
            const item = {};
            for (let j = 0; j < headers.length; j++) {
                const field = fields[j].replace(/"/g, ""); // Remove quotes from the field value
                item[headers[j]] = field;
            }
            parsedData.push(item);
        }
    }

    return parsedData;
}

function getStatusIndex(status) {
    switch (status) {
        case "1":
            return 1;
        case "2":
            return 2;
        case "3":
            return 3;
        case "4":
            return 4;
        case "5":
            return 5;
        default:
            return 0;
    }
}

function updateProgressBar(index) {
    one.classList.remove("active");
    two.classList.remove("active");
    three.classList.remove("active");
    four.classList.remove("active");
    five.classList.remove("active");

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
