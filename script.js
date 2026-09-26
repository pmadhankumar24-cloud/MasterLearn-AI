// =====================================================
// MASTERLEARN AI
// COMPLETE JAVASCRIPT
// Login + Dashboard
// =====================================================


// =========================
// LOGIN
// =========================

function login() {

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");

    // Safety check
    if (!nameInput || !emailInput) {
        return;
    }

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();


    // Validation
    if (!name) {
        alert("Please enter your name.");
        nameInput.focus();
        return;
    }

    if (!email) {
        alert("Please enter your email.");
        emailInput.focus();
        return;
    }


    // Simple email validation
    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        emailInput.focus();
        return;
    }


    // Save user information
    localStorage.setItem(
        "masterlearn_user",
        name
    );

    localStorage.setItem(
        "masterlearn_email",
        email
    );


    // Go to dashboard
    window.location.href = "dashboard.html";
}



// =========================
// DASHBOARD
// =========================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        // Get saved user
        const name =
            localStorage.getItem(
                "masterlearn_user"
            );


        // Dashboard elements
        const welcomeName =
            document.getElementById(
                "welcomeName"
            );

        const userName =
            document.getElementById(
                "userName"
            );

        const userAvatar =
            document.getElementById(
                "userAvatar"
            );


        // Show user information
        if (name) {

            if (welcomeName) {
                welcomeName.textContent = name;
            }

            if (userName) {
                userName.textContent = name;
            }

            if (userAvatar) {

                userAvatar.textContent =
                    name
                        .charAt(0)
                        .toUpperCase();
            }

        } else {

            // If user is not logged in,
            // send them back to login page

            if (
                welcomeName ||
                userName ||
                userAvatar
            ) {

                window.location.href =
                    "index.html";
            }
        }


        // =========================
        // LANGUAGE SELECTOR
        // =========================

        const languageSelect =
            document.getElementById(
                "language"
            );


        if (languageSelect) {

            // Get previously selected language
            const savedLanguage =
                localStorage.getItem(
                    "masterlearn_language"
                );


            if (savedLanguage) {

                languageSelect.value =
                    savedLanguage;
            }


            // Save language when changed
            languageSelect.addEventListener(
                "change",
                function () {

                    localStorage.setItem(
                        "masterlearn_language",
                        languageSelect.value
                    );

                }
            );
        }

    }
);



// =========================
// LOGOUT
// =========================

function logout() {

    const confirmLogout =
        confirm(
            "Are you sure you want to logout?"
        );


    if (!confirmLogout) {
        return;
    }


    // Remove saved user data
    localStorage.removeItem(
        "masterlearn_user"
    );

    localStorage.removeItem(
        "masterlearn_email"
    );

    localStorage.removeItem(
        "masterlearn_language"
    );


    // Return to login
    window.location.href =
        "index.html";
}