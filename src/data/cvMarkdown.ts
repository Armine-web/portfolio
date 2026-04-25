import { cvData } from './cvData';

export const cvMarkdown = `
# ${cvData.name}
### ${cvData.role}
📍 ${cvData.location}

---

### 🛠 Technical Skills
- **Languages:** ${cvData.techStack.languages.join(', ')}
- **Frameworks:** ${cvData.techStack.frameworks.join(', ')}
- **State Management:** ${cvData.techStack.stateManagement.join(', ')}
- **UI & Styling:** ${cvData.techStack.uiLibraries.join(', ')}
- **Tools:** ${cvData.techStack.tools.join(', ')}
- **Additional:** ${cvData.techStack.additional.join(', ')}

---

### 💼 Professional Experience

${cvData.experience.map(exp => `
#### **${exp.role}** | ${exp.company}
*${exp.period}*
${exp.responsibilities.map(res => `- ${res}`).join('\n')}
`).join('\n')}

---

### 🎓 Education & Certifications

${cvData.education.map(edu => `
- **${edu.title}** – ${edu.institution} (${edu.period})
  *${edu.description || ''}*
`).join('\n')}

---

### 🌐 Languages
${cvData.languages.map(lang => `- **${lang.name}:** ${lang.level}`).join('\n')}

---

### 📞 Contact Information
- **Phone:** ${cvData.contact.phone}
- **Email:** ${cvData.contact.email}
- **GitHub:** [Link](${cvData.contact.github})
- **LinkedIn:** [Link](${cvData.contact.linkedin})
- **Telegram:** ${cvData.contact.telegram}
`;