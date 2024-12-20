// Select the skills section and toggle button
var skillsSection = document.getElementById("skills-section");
var toggleButton = document.getElementById("toggle-button");
// Function to toggle visibility
var toggleVisibility = function () {
    if (skillsSection.style.display === "none") {
        skillsSection.style.display = "block";
    }
    else {
        skillsSection.style.display = "none";
    }
};
// Add event listener to the button
toggleButton.addEventListener("click", toggleVisibility);
