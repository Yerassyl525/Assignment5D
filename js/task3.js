const form = document.getElementById("fanForm");
const fields = ["name", "email", "age", "date", "message"];
const errorSummary = document.getElementById("errorSummary");

form.noValidate = true;

function checkField(field) {
    const input = document.getElementById(field);
    const error = document.getElementById(field + "Error");
    const value = input.value.trim();
    let message = "";

    if (value === "") {
        message = "This field is required.";
    } else if (field === "name" &&
        (!/^[A-Za-z ]+$/.test(value) || value.length < 2)) {
        message = "Use at least 2 English letters.";
    } else if (field === "email" &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        message = "Enter a valid email.";
    } else if (field === "age" &&
        (!Number.isInteger(Number(value)) || Number(value) < 13 || Number(value) > 100)) {
        message = "Age must be from 13 to 100.";
    } else if (field === "date" &&
        value > new Date().toISOString().split("T")[0]) {
        message = "Birthday cannot be in the future.";
    } else if (field === "message" && value.length < 10) {
        message = "Message must have at least 10 characters.";
    }

    input.setAttribute("aria-invalid", message ? "true" : "false");
    error.textContent = message;
    return message === "";
}

function checkCharacter() {
    const selected = document.querySelector("input[name='character']:checked");
    document.getElementById("characterError").textContent =
        selected ? "" : "Choose your favorite character.";
    return selected !== null;
}

function updatePreview() {
    document.getElementById("previewName").textContent =
        document.getElementById("name").value || "Not entered";
    document.getElementById("previewEmail").textContent =
        document.getElementById("email").value || "Not entered";
    document.getElementById("previewAge").textContent =
        document.getElementById("age").value || "Not entered";

    const character = document.querySelector("input[name='character']:checked");
    document.getElementById("previewCharacter").textContent =
        character ? character.value : "Not selected";

    document.getElementById("previewMessage").textContent =
        document.getElementById("message").value || "Not entered";
    document.getElementById("previewFan").textContent =
        document.getElementById("fan").checked ? "Yes" : "No";
    document.getElementById("previewColor").style.backgroundColor =
        document.getElementById("color").value;
}

fields.forEach(function(field) {
    const input = document.getElementById(field);

    input.addEventListener("blur", function() {
        checkField(field);
    });

    input.addEventListener("input", function() {
        if (input.hasAttribute("aria-invalid")) {
            checkField(field);
        }
        updatePreview();
    });
});

document.querySelectorAll("input[name='character']").forEach(function(input) {
    input.addEventListener("change", function() {
        checkCharacter();
        updatePreview();
    });
});

document.getElementById("fan").addEventListener("change", updatePreview);
document.getElementById("color").addEventListener("input", updatePreview);

form.addEventListener("submit", function(event) {
    event.preventDefault();

    let errors = 0;

    fields.forEach(function(field) {
        if (!checkField(field)) errors++;
    });

    if (!checkCharacter()) errors++;

    if (errors > 0) {
        errorSummary.textContent = "Please fix " + errors + " error(s).";
        const firstInvalid = form.querySelector("[aria-invalid='true']");
        if (firstInvalid) firstInvalid.focus();
        else document.querySelector("input[name='character']").focus();
        return;
    }

    errorSummary.textContent = "";
    const result = document.getElementById("finalProfile");
    result.textContent = "";

    fields.forEach(function(field) {
        const line = document.createElement("p");
        line.textContent = field + ": " + document.getElementById(field).value;
        result.appendChild(line);
    });

    const character = document.querySelector("input[name='character']:checked");
    const characterLine = document.createElement("p");
    characterLine.textContent = "Favorite character: " + character.value;
    result.appendChild(characterLine);

    const fanLine = document.createElement("p");
    fanLine.textContent = "Fan: " +
        (document.getElementById("fan").checked ? "Yes" : "No");
    result.appendChild(fanLine);

    document.getElementById("successMessage").hidden = false;
    form.reset();
    updatePreview();
});

form.addEventListener("reset", function() {
    fields.forEach(function(field) {
        document.getElementById(field).removeAttribute("aria-invalid");
        document.getElementById(field + "Error").textContent = "";
    });

    document.getElementById("characterError").textContent = "";
    errorSummary.textContent = "";
    document.getElementById("successMessage").hidden = true;
    updatePreview();
});

updatePreview();