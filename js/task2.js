const characters = [
    { id: 1, name: "Dante", type: "Hybrid", weapon: "Rebellion", power: 100, image: "images/characters/d32bf7a1cbdcd4944012c573710b53b5.jpg", unlocked: true },
    { id: 2, name: "Nero", type: "Hybrid", weapon: "Red Queen", power: 90, image: "images/characters/5a3702d72fbfefa4a6cca01b8ee75b25.jpg", unlocked: true },
    { id: 3, name: "Vergil", type: "Hybrid", weapon: "Yamato", power: 98, image: "images/characters/1e70a994c64d6eb00a7494025111d7bd.jpg", unlocked: false },
    { id: 4, name: "V", type: "Human", weapon: "Cane", power: 75, image: "images/characters/0bb7edbab3d0a4105b23736fd45ff22e.jpg", unlocked: true },
    { id: 5, name: "Trish", type: "Demon", weapon: "Sparda", power: 85, image: "images/characters/trish.jpg", unlocked: true },
    { id: 6, name: "Lady", type: "Human", weapon: "Kalina Ann", power: 80, image: "images/characters/lady.jpg", unlocked: true },
    { id: 7, name: "Urizen", type: "Demon", weapon: "Demonic Power", power: 99, image: "images/characters/ur.jpg", unlocked: false },
    { id: 8, name: "Nico", type: "Human", weapon: "Mechanical Tools", power: 60, image: "images/characters/nico.jpg ", unlocked: true },
    { id: 9, name: "Cavaliere Angelo", type: "Demon", weapon: "Electric Sword", power: 88, image: "images/characters/11.jpg", unlocked: false },
    { id: 10, name: "Morrison", type: "Human", weapon: "Support", power: 50, image: "images/characters/morrison.jpg", unlocked: true }
];

const characterList = document.getElementById("characterList");
const searchInput = document.getElementById("searchInput");
const typeFilter = document.getElementById("typeFilter");
const noResults = document.getElementById("noResults");
const totalCount = document.getElementById("totalCount");
const averagePower = document.getElementById("averagePower");
const actionMessage = document.getElementById("actionMessage");
const actionArea = document.getElementById("actionArea");

function renderCharacters() {
    const searchText = searchInput.value.toLowerCase();
    const selectedType = typeFilter.value;

    const filteredCharacters = characters.filter(function(character) {
        const matchesName = character.name.toLowerCase().includes(searchText);
        const matchesType = selectedType === "all" || character.type === selectedType;
        return matchesName && matchesType;
    });

    characterList.innerHTML = "";

    for (const character of filteredCharacters) {
        const card = document.createElement("article");
        card.className = "character-card";
        card.dataset.id = character.id;

        const image = document.createElement("img");
        image.src = character.image;
        image.alt = character.name;
        image.className = "character-image";

        image.addEventListener("error", function() {
            image.hidden = true;
            const fallback = document.createElement("p");
            fallback.textContent = character.name;
            fallback.className = "image-fallback";
            image.after(fallback);
        }, { once: true });

        const name = document.createElement("h3");
        name.textContent = character.name;

        const type = document.createElement("p");
        type.textContent = "Type: " + character.type;

        const weapon = document.createElement("p");
        weapon.textContent = "Weapon: " + character.weapon;

        const power = document.createElement("p");
        power.textContent = "Power: " + character.power + "/100";

        const button = document.createElement("button");
        button.className = "unlock-button";
        button.dataset.action = "unlock";
        button.dataset.id = character.id;
        button.textContent = character.unlocked ? "View character" : "Unlock character";

        card.append(image, name, type, weapon, power, button);
        characterList.append(card);
    }

    noResults.hidden = filteredCharacters.length !== 0;
    totalCount.textContent = filteredCharacters.length;

    let powerSum = 0;
    for (const character of filteredCharacters) {
        powerSum += character.power;
    }

    averagePower.textContent = filteredCharacters.length ?
        (powerSum / filteredCharacters.length).toFixed(1) :
        "0";

    actionMessage.textContent = "Select a character to view access information.";
    actionArea.textContent = "";
}

searchInput.addEventListener("input", renderCharacters);
typeFilter.addEventListener("change", renderCharacters);

characterList.addEventListener("click", function(event) {
    const button = event.target.closest("button[data-action='unlock']");

    if (!button) {
        return;
    }

    const character = characters.find(function(item) {
        return item.id === Number(button.dataset.id);
    });

    if (!character) {
        return;
    }

    actionArea.textContent = "";

    if (character.unlocked === true) {
        actionMessage.textContent = character.name + " is available in the database.";
    } else {
        actionMessage.textContent = character.name + " is locked. Reason: this character is restricted in this demo catalog.";
    }
});

renderCharacters();