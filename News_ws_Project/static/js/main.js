const ws = new WebSocket(`ws://${window.location.host}/ws`);

ws.onopen = () => {
    updateStatus("🟢 Подключено", "alert-success");
    console.log("✅ WebSocket подключён");
    setInterval(() => {
        ws.send("ping");
    }, 10000);
};

ws.onmessage = (event) => {
    if (event.data === "pong") {
        console.log("✅ Получен pong");
        return;
    }

    const newsList = document.getElementById("news-list");
    const li = document.createElement("li");
    li.className = getAlertClass(event.data);
    li.textContent = event.data;
    li.style.opacity = 0;
    newsList.prepend(li);

    // Анимация появления
    setTimeout(() => {
        li.style.opacity = 1;
    }, 100);
};

ws.onclose = () => {
    updateStatus("🔴 Отключено", "alert-danger");
    console.log("❌ WebSocket отключён");
};

function updateStatus(text, cls) {
    const status = document.getElementById("status");
    status.textContent = text;
    status.className = `alert ${cls} text-center`;
}

function getAlertClass(message) {
    if (message.includes("🔥")) {
        return "list-group-item list-group-item-danger";
    } else if (message.includes("✅")) {
        return "list-group-item list-group-item-success";
    } else if (message.includes("⚠")) {
        return "list-group-item list-group-item-warning";
    } else {
        return "list-group-item list-group-item-info";
    }
}

document.getElementById("clear-btn").addEventListener("click", () => {
    document.getElementById("news-list").innerHTML = "";
});
