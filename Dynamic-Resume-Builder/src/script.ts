
export{}

// This will add to the global window object

declare global {
  interface Window {
    generateCV: () => void;
    addEducation: () => void;
    addWorkExperience: () => void;
    addSkill: () => void;
  }
}

// Type definitions

interface Education {
  degree: string;
  institution: string;
  year: string;
}

interface WorkExperience {
  jobTitle: string;
  company: string;
  duration: string;
}

interface CVData {
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

// Add Education Entry

window.addEducation = function (): void {
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

  // Add input listeners to new fields

  educationEntry.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', () => {
      const data = collectFormData();
      updatePreview(data);
    });
  });

  // Add remove button listener

  educationEntry.querySelector('.remove-btn')?.addEventListener('click', () => {
    educationEntry.remove();
  });

  container.appendChild(educationEntry);
};

// Add Work Experience Entry

window.addWorkExperience = function (): void {
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

  // Add input listeners to new fields

  workEntry.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', () => {
      const data = collectFormData();
      updatePreview(data);
    });
  });

  // Add remove button listener

  workEntry.querySelector('.remove-btn')?.addEventListener('click', () => {
    workEntry.remove();
  });

  container.appendChild(workEntry);
};

// Add Skill Entry

let skillCounter = 1; // Initialize the counter

window.addSkill = function (): void {
  const container = document.getElementById('skills-container');
  if (!container) return;

  const skillEntry = document.createElement('div');
  skillEntry.className = 'skill-entry';
  skillEntry.innerHTML = `
      <input type="text" class="skill-name" placeholder="Skill ${skillCounter}">
      <button type="button" class="remove-btn">Remove</button>
  `;

  // Increment the counter after adding the skill entry

  skillCounter++;

  // Add input listener for real-time preview

  skillEntry.querySelector('.skill-name')?.addEventListener('input', () => {
    const data = collectFormData(); // Collect updated form data
    updatePreview(data); // Update the preview
  });

  // Add remove button listener

  skillEntry.querySelector('.remove-btn')?.addEventListener('click', () => {
    skillEntry.remove();
    // Decrement the counter when an item is removed

    skillCounter--;
  });

  container.appendChild(skillEntry);
};



// Collect Form Data

function collectFormData(): CVData {
  const getData = (id: string): string => {
    const element = document.getElementById(id) as HTMLInputElement | null;
    return element ? element.value : '';
  };

  const collectEducation = (): Education[] => {
    const entries = document.querySelectorAll('.education-entry');
    return Array.from(entries).map(entry => ({
      degree: (entry.querySelector('.degree') as HTMLInputElement)?.value || '',
      institution: (entry.querySelector('.institution') as HTMLInputElement)?.value || '',
      year: (entry.querySelector('.year') as HTMLInputElement)?.value || ''
    }));
  };

  const collectSkills = (): string[] => {
    const entries = document.querySelectorAll('.skill-entry');
    return Array.from(entries).map(entry => 
      (entry.querySelector('.skill-name') as HTMLInputElement)?.value || ''
    );
  };

  const collectWorkExperience = (): WorkExperience[] => {
    const entries = document.querySelectorAll('.work-entry');
    return Array.from(entries).map(entry => ({
      jobTitle: (entry.querySelector('.job-title') as HTMLInputElement)?.value || '',
      company: (entry.querySelector('.company') as HTMLInputElement)?.value || '',
      duration: (entry.querySelector('.duration') as HTMLInputElement)?.value || ''
    }));
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
    skills:collectSkills()
  };
}

// Update Preview

function updatePreview(data: CVData): void {
  const updateElement = (id: string, text: string) => {
    const element = document.getElementById(id);
    if (element) element.textContent = text;
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

window.generateCV = function (): void {
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

  const generateButton = document.querySelector('.generate-btn') as HTMLButtonElement;
  const addEducationButton = document.querySelector('#add-education') as HTMLButtonElement;
  const addWorkExperienceButton = document.querySelector('#add-work-experience') as HTMLButtonElement;
  const addSkillButton = document.querySelector('#add-skills') as HTMLButtonElement;

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
