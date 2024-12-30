// Add Education Entry
window.addEducation = function () {
    var _a;
    const container = document.getElementById('education-container');
    if (!container)
        return;
    const educationEntry = document.createElement('div');
    educationEntry.className = 'education-entry';
    educationEntry.innerHTML = `
      <input type="text" class="degree" placeholder="Degree Title">
      <input type="text" class="institution" placeholder="Institution">
      <input type="text" class="year" placeholder="Year">
      <button type="button" class="remove-btn">Remove</button>
  `;
    // Add input listeners to new fields
    educationEntry.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', () => {
            const data = collectFormData();
            updatePreview(data);
        });
    });
    // Add remove button listener
    (_a = educationEntry.querySelector('.remove-btn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
        educationEntry.remove();
    });
    container.appendChild(educationEntry);
};
// Add Work Experience Entry
window.addWorkExperience = function () {
    var _a;
    const container = document.getElementById('work-container');
    if (!container)
        return;
    const workEntry = document.createElement('div');
    workEntry.className = 'work-entry';
    workEntry.innerHTML = `
      <input type="text" class="job-title" placeholder="Job Title">
      <input type="text" class="company" placeholder="Company">
      <input type="text" class="duration" placeholder="Duration">
      <button type="button" class="remove-btn">Remove</button>
  `;
    // Add input listeners to new fields
    workEntry.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', () => {
            const data = collectFormData();
            updatePreview(data);
        });
    });
    // Add remove button listener
    (_a = workEntry.querySelector('.remove-btn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
        workEntry.remove();
    });
    container.appendChild(workEntry);
};
// Add Skill Entry
let skillCounter = 1; // Initialize the counter
window.addSkill = function () {
    var _a, _b;
    const container = document.getElementById('skills-container');
    if (!container)
        return;
    const skillEntry = document.createElement('div');
    skillEntry.className = 'skill-entry';
    skillEntry.innerHTML = `
      <input type="text" class="skill-name" placeholder="Skill ${skillCounter}">
      <button type="button" class="remove-btn">Remove</button>
  `;
    // Increment the counter after adding the skill entry
    skillCounter++;
    // Add input listener for real-time preview
    (_a = skillEntry.querySelector('.skill-name')) === null || _a === void 0 ? void 0 : _a.addEventListener('input', () => {
        const data = collectFormData(); // Collect updated form data
        updatePreview(data); // Update the preview
    });
    // Add remove button listener
    (_b = skillEntry.querySelector('.remove-btn')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
        skillEntry.remove();
        // Decrement the counter when an item is removed
        skillCounter--;
    });
    container.appendChild(skillEntry);
};
// Collect Form Data
function collectFormData() {
    const getData = (id) => {
        const element = document.getElementById(id);
        return element ? element.value : '';
    };
    const collectEducation = () => {
        const entries = document.querySelectorAll('.education-entry');
        return Array.from(entries).map(entry => {
            var _a, _b, _c;
            return ({
                degree: ((_a = entry.querySelector('.degree')) === null || _a === void 0 ? void 0 : _a.value) || '',
                institution: ((_b = entry.querySelector('.institution')) === null || _b === void 0 ? void 0 : _b.value) || '',
                year: ((_c = entry.querySelector('.year')) === null || _c === void 0 ? void 0 : _c.value) || ''
            });
        });
    };
    const collectSkills = () => {
        const entries = document.querySelectorAll('.skill-entry');
        return Array.from(entries).map(entry => { var _a; return ((_a = entry.querySelector('.skill-name')) === null || _a === void 0 ? void 0 : _a.value) || ''; });
    };
    const collectWorkExperience = () => {
        const entries = document.querySelectorAll('.work-entry');
        return Array.from(entries).map(entry => {
            var _a, _b, _c;
            return ({
                jobTitle: ((_a = entry.querySelector('.job-title')) === null || _a === void 0 ? void 0 : _a.value) || '',
                company: ((_b = entry.querySelector('.company')) === null || _b === void 0 ? void 0 : _b.value) || '',
                duration: ((_c = entry.querySelector('.duration')) === null || _c === void 0 ? void 0 : _c.value) || ''
            });
        });
    };
    return {
        name: getData('name'),
        email: getData('email'),
        phone: getData('phone'),
        location: getData('location'),
        linkedin: getData('linkedin'),
        aboutMe: getData('aboutMe'),
        education: collectEducation(),
        workExperience: collectWorkExperience(),
        skills: collectSkills()
    };
}
// Update Preview
function updatePreview(data) {
    const updateElement = (id, text) => {
        const element = document.getElementById(id);
        if (element)
            element.textContent = text;
    };
    updateElement('preview-name', data.name || 'Your Name');
    updateElement('preview-email', data.email);
    updateElement('preview-phone', data.phone);
    updateElement('preview-location', data.location);
    updateElement('preview-linkedin', data.linkedin);
    updateElement('preview-about-text', data.aboutMe);
    // Update skills
    const skillsList = document.getElementById('preview-skills-list');
    if (skillsList) {
        skillsList.innerHTML = data.skills
            .map((skill, index) => `  <!-- index + 1 for counting -->
           <div class="skill-item">
             </span> <p>${skill}</p>
           </div>
         `)
            .join('');
    }
    // Update education
    const educationList = document.getElementById('preview-education-list');
    if (educationList) {
        educationList.innerHTML = data.education
            .map(edu => `
        <div class="education-item">
          <span>Degree Title:<span/> <h4>${edu.degree}</h4> <br/>
          <span>Institution:<span/> <p>${edu.institution}</p> <br/>
          <span>Year:<span/> <p>${edu.year}</p> <br/>
        </div>
      `)
            .join('');
    }
    // Update work experience
    const workList = document.getElementById('preview-work-list');
    if (workList) {
        workList.innerHTML = data.workExperience
            .map(work => `
        <div class="work-item">
          <span>Job Title:<span/> <h4>${work.jobTitle}</h4> <br/>
          <span>Company:<span/> <p>${work.company}</p>   <br/>
          <span>Duration:<span/> <p>${work.duration}</p>  </br>
        </div>
      `)
            .join('');
    }
}
// Generate CV
window.generateCV = function () {
    const data = collectFormData();
    updatePreview(data);
    // Add a small delay before printing to ensure preview is updated
    setTimeout(() => {
        window.print();
    }, 100);
};
// Initialize event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Attach event listeners to the buttons
    const generateButton = document.querySelector('.generate-btn');
    const addEducationButton = document.querySelector('#add-education');
    const addWorkExperienceButton = document.querySelector('#add-work-experience');
    const addSkillButton = document.querySelector('#add-skills');
    // Handle button clicks
    if (generateButton) {
        generateButton.addEventListener('click', () => {
            window.generateCV();
        });
    }
    if (addEducationButton) {
        addEducationButton.addEventListener('click', () => {
            window.addEducation();
        });
    }
    if (addWorkExperienceButton) {
        addWorkExperienceButton.addEventListener('click', () => {
            window.addWorkExperience();
        });
    }
    if (addSkillButton) {
        addSkillButton.addEventListener('click', () => {
            window.addSkill();
        });
    }
    // Add input event listeners for real-time preview
    document.querySelectorAll('input, textarea').forEach((element) => {
        element.addEventListener('input', () => {
            const data = collectFormData();
            updatePreview(data);
        });
    });
});
export {};
