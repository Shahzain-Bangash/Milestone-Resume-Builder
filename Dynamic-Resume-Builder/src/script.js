let skillCounter = 1;
const addEducation = () => {
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
    educationEntry.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', () => updatePreview(collectFormData()));
    });
    (_a = educationEntry.querySelector('.remove-btn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => educationEntry.remove());
    container.appendChild(educationEntry);
};
const addWorkExperience = () => {
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
    workEntry.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', () => updatePreview(collectFormData()));
    });
    (_a = workEntry.querySelector('.remove-btn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => workEntry.remove());
    container.appendChild(workEntry);
};
const addSkill = () => {
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
    skillCounter++;
    (_a = skillEntry.querySelector('.skill-name')) === null || _a === void 0 ? void 0 : _a.addEventListener('input', () => updatePreview(collectFormData()));
    (_b = skillEntry.querySelector('.remove-btn')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
        skillEntry.remove();
        skillCounter--;
    });
    container.appendChild(skillEntry);
};
const collectFormData = () => {
    const getData = (id) => { var _a; return ((_a = document.getElementById(id)) === null || _a === void 0 ? void 0 : _a.value) || ''; };
    const collectEducation = () => Array.from(document.querySelectorAll('.education-entry'))
        .map(entry => {
        var _a, _b, _c;
        return ({
            degree: ((_a = entry.querySelector('.degree')) === null || _a === void 0 ? void 0 : _a.value) || '',
            institution: ((_b = entry.querySelector('.institution')) === null || _b === void 0 ? void 0 : _b.value) || '',
            year: ((_c = entry.querySelector('.year')) === null || _c === void 0 ? void 0 : _c.value) || ''
        });
    });
    const collectSkills = () => Array.from(document.querySelectorAll('.skill-entry'))
        .map(entry => { var _a; return ((_a = entry.querySelector('.skill-name')) === null || _a === void 0 ? void 0 : _a.value) || ''; });
    const collectWorkExperience = () => Array.from(document.querySelectorAll('.work-entry'))
        .map(entry => {
        var _a, _b, _c;
        return ({
            jobTitle: ((_a = entry.querySelector('.job-title')) === null || _a === void 0 ? void 0 : _a.value) || '',
            company: ((_b = entry.querySelector('.company')) === null || _b === void 0 ? void 0 : _b.value) || '',
            duration: ((_c = entry.querySelector('.duration')) === null || _c === void 0 ? void 0 : _c.value) || ''
        });
    });
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
};
const updatePreview = (data) => {
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
    const skillsList = document.getElementById('preview-skills-list');
    if (skillsList) {
        skillsList.innerHTML = data.skills
            .map(skill => `
        <div class="skill-item">
          <p>${skill}</p>
        </div>
      `).join('');
    }
    const educationList = document.getElementById('preview-education-list');
    if (educationList) {
        educationList.innerHTML = data.education
            .map(edu => `
        <div class="education-item">
          <span>Degree Title:</span> <h4>${edu.degree}</h4><br/>
          <span>Institution:</span> <p>${edu.institution}</p><br/>
          <span>Year:</span> <p>${edu.year}</p><br/>
        </div>
      `).join('');
    }
    const workList = document.getElementById('preview-work-list');
    if (workList) {
        workList.innerHTML = data.workExperience
            .map(work => `
        <div class="work-item">
          <span>Job Title:</span> <h4>${work.jobTitle}</h4><br/>
          <span>Company:</span> <p>${work.company}</p><br/>
          <span>Duration:</span> <p>${work.duration}</p><br/>
        </div>
      `).join('');
    }
};
const generateCV = () => {
    updatePreview(collectFormData());
    setTimeout(() => window.print(), 100);
};
document.addEventListener('DOMContentLoaded', () => {
    var _a, _b, _c, _d;
    (_a = document.querySelector('.generate-btn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', generateCV);
    (_b = document.querySelector('#add-education')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', addEducation);
    (_c = document.querySelector('#add-work-experience')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', addWorkExperience);
    (_d = document.querySelector('#add-skills')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', addSkill);
    document.querySelectorAll('input, textarea').forEach(element => {
        element.addEventListener('input', () => updatePreview(collectFormData()));
    });
});
export { generateCV, addEducation, addWorkExperience, addSkill };
