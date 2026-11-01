const menuToggle = document.getElementById("menuToggle");
const siteNav = document.getElementById("siteNav");

menuToggle.addEventListener("click", () => {
    siteNav.classList.toggle("open");
});

document.querySelectorAll(".nav a").forEach(link => {
    link.addEventListener("click", () => siteNav.classList.remove("open"));
});

const amountButtons = document.querySelectorAll(".amount");
const customAmount = document.getElementById("customAmount");
let selectedAmount = 25;

amountButtons.forEach(button => {
    button.addEventListener("click", () => {
        amountButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        selectedAmount = Number(button.dataset.amount);
        customAmount.value = "";
    });
});

customAmount.addEventListener("input", () => {
    if (customAmount.value) {
        amountButtons.forEach(btn => btn.classList.remove("active"));
        selectedAmount = Number(customAmount.value);
    }
});

document.querySelectorAll(".donate-shop").forEach(button => {
    button.addEventListener("click", () => {
        const shop = button.dataset.shop;
        document.getElementById("shop").value = shop;
        document.getElementById("donate").scrollIntoView({ behavior: "smooth" });
    });
});

const donationForm = document.getElementById("donationForm");
const modal = document.getElementById("donationModal");
const selectedShop = document.getElementById("selectedShop");
const selectedAmountText = document.getElementById("selectedAmount");

donationForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const shop = document.getElementById("shop").value;
    const amount = customAmount.value ? Number(customAmount.value) : selectedAmount;

    if (!amount || amount < 1) {
        customAmount.focus();
        return;
    }

    selectedShop.textContent = shop;
    selectedAmountText.textContent = `$${amount.toLocaleString()}`;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
});

function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
}

document.getElementById("modalClose").addEventListener("click", closeModal);
document.getElementById("modalDone").addEventListener("click", closeModal);

modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
});
