
export interface Education {
  degree: string;
  institution: string;
  year: string;
}

export interface WorkExperience {
  jobTitle: string;
  company: string;
  duration: string;
}

export interface CVData {
  name: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  aboutMe: string;
  education: Education[];
  workExperience: WorkExperience[];
  skills: string[];
}

let skillCounter = 1;

const addEducation = (): void => {
  const container = document.getElementById('education-container');
  if (!container) return;

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

  educationEntry.querySelector('.remove-btn')?.addEventListener('click', () => 
    educationEntry.remove()
  );

  container.appendChild(educationEntry);
};

const addWorkExperience = (): void => {
  const container = document.getElementById('work-container');
  if (!container) return;

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

  workEntry.querySelector('.remove-btn')?.addEventListener('click', () => 
    workEntry.remove()
  );

  container.appendChild(workEntry);
};

const addSkill = (): void => {
  const container = document.getElementById('skills-container');
  if (!container) return;

  const skillEntry = document.createElement('div');
  skillEntry.className = 'skill-entry';
  skillEntry.innerHTML = `
    <input type="text" class="skill-name" placeholder="Skill ${skillCounter}">
    <button type="button" class="remove-btn">Remove</button>
  `;

  skillCounter++;

  skillEntry.querySelector('.skill-name')?.addEventListener('input', () => 
    updatePreview(collectFormData())
  );

  skillEntry.querySelector('.remove-btn')?.addEventListener('click', () => {
    skillEntry.remove();
    skillCounter--;
  });

  container.appendChild(skillEntry);
};

const collectFormData = (): CVData => {
  const getData = (id: string): string => 
    (document.getElementById(id) as HTMLInputElement)?.value || '';

  const collectEducation = (): Education[] => 
    Array.from(document.querySelectorAll<HTMLElement>('.education-entry'))
      .map(entry => ({
        degree: (entry.querySelector('.degree') as HTMLInputElement)?.value || '',
        institution: (entry.querySelector('.institution') as HTMLInputElement)?.value || '',
        year: (entry.querySelector('.year') as HTMLInputElement)?.value || ''
      }));

  const collectSkills = (): string[] => 
    Array.from(document.querySelectorAll<HTMLElement>('.skill-entry'))
      .map(entry => (entry.querySelector('.skill-name') as HTMLInputElement)?.value || '');

  const collectWorkExperience = (): WorkExperience[] => 
    Array.from(document.querySelectorAll<HTMLElement>('.work-entry'))
      .map(entry => ({
        jobTitle: (entry.querySelector('.job-title') as HTMLInputElement)?.value || '',
        company: (entry.querySelector('.company') as HTMLInputElement)?.value || '',
        duration: (entry.querySelector('.duration') as HTMLInputElement)?.value || ''
      }));

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

const updatePreview = (data: CVData): void => {
  const updateElement = (id: string, text: string): void => {
    const element = document.getElementById(id);
    if (element) element.textContent = text;
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

const generateCV = (): void => {
  updatePreview(collectFormData());
  setTimeout(() => window.print(), 100);
};

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.generate-btn')?.addEventListener('click', generateCV);
  document.querySelector('#add-education')?.addEventListener('click', addEducation);
  document.querySelector('#add-work-experience')?.addEventListener('click', addWorkExperience);
  document.querySelector('#add-skills')?.addEventListener('click', addSkill);

  document.querySelectorAll('input, textarea').forEach(element => {
    element.addEventListener('input', () => updatePreview(collectFormData()));
  });
});

export { generateCV, addEducation, addWorkExperience, addSkill };