/* =========================
   MOBILE NAVIGATION
========================= */

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const navItems = document.querySelectorAll(".nav-link:not(.dropdown-toggle)");

menuToggle.addEventListener("click", function (event) {
    event.stopPropagation();
    const isOpen = navLinks.classList.toggle("active");
    menuToggle.classList.toggle("active");
    menuToggle.setAttribute("aria-expanded", isOpen);
});

navItems.forEach(function (link) {
    link.addEventListener("click", function () {
        navLinks.classList.remove("active");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
    });
});

document.addEventListener("click", function (event) {
    const clickedInsideNavbar = event.target.closest(".navbar");
    if (!clickedInsideNavbar) {
        navLinks.classList.remove("active");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        submenu.classList.remove("active");
        dropdownToggle.setAttribute("aria-expanded", "false");
    }
});

/* =========================
   ACTIVE NAVIGATION LINK
========================= */

const sections = document.querySelectorAll("section[id]");
const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            navItems.forEach(function (link) {
                link.classList.remove("active");
            });
            dropdownToggle.classList.remove("active");

            if (entry.target.id === "services") {
                dropdownToggle.classList.add("active");
            } else {
                const activeLink = document.querySelector(
                    `.nav-link[href="#${entry.target.id}"]`
                );
                if (activeLink) {
                    activeLink.classList.add("active");
                }
            }
        }
    });
}, { threshold: 0.25 });

sections.forEach(function (section) {
    observer.observe(section);
});

/* =========================
   SERVICES DROPDOWN
========================= */

const dropdownToggle = document.querySelector(".dropdown-toggle");
const submenu = document.getElementById("services-submenu");

if (dropdownToggle && submenu) {
    dropdownToggle.addEventListener("click", function (event) {
        event.stopPropagation();
        const isOpen = submenu.classList.toggle("active");
        dropdownToggle.setAttribute("aria-expanded", isOpen);
    });

    submenu.querySelectorAll(".submenu-link").forEach(function (link) {
        link.addEventListener("click", function () {
            submenu.classList.remove("active");
            dropdownToggle.setAttribute("aria-expanded", "false");
            navLinks.classList.remove("active");
            menuToggle.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });
}

/* =========================
   ESCAPE KEY
========================= */

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        navLinks.classList.remove("active");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        submenu.classList.remove("active");
        dropdownToggle.setAttribute("aria-expanded", "false");
    }
});

/* =========================
   APPOINTMENT DATE
========================= */

const appointmentDate = document.getElementById("appointment-date");
if (appointmentDate) {
    const today = new Date().toISOString().split("T")[0];
    appointmentDate.setAttribute("min", today);
}

/* =========================
   WHATSAPP APPOINTMENT
========================= */

const appointmentForm = document.getElementById("appointment-form");
if (appointmentForm) {
    appointmentForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const name = document.getElementById("patient-name").value.trim();
        const phone = document.getElementById("patient-phone").value.trim();
        const date = document.getElementById("appointment-date").value;
        const department = document.getElementById("department").value;
        const message = document.getElementById("message").value.trim();
        const formattedDate = date
            ? new Date(date + "T00:00:00").toLocaleDateString("en-PK", {
                day: "numeric",
                month: "long",
                year: "numeric"
            })
            : "";

        const whatsappNumber = "923001234567";
        const whatsappMessage =
            `Hello NovaCare Clinic,
I would like to request an appointment.

Name: ${name}
Phone: ${phone}
Date: ${formattedDate}
Department: ${department}
Message: ${message || "No additional message."}

Thank you.`;

        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
        window.open(whatsappURL, "_blank");
    });
}