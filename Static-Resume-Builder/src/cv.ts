// Select the skills section and toggle button
const skillsSection = document.getElementById("skills-section") as HTMLElement;
const toggleButton = document.getElementById("toggle-button") as HTMLButtonElement;

// Function to toggle visibility
const toggleVisibility = () => {
    if (skillsSection.style.display === "none") {
        skillsSection.style.display = "block";
    } else {
        skillsSection.style.display = "none";
    }
};

// Add event listener to the button
toggleButton.addEventListener("click", toggleVisibility);
