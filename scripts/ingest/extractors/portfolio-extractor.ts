import {
  myExperience,
  myStack,
  myServices,
  myShowCases,
  testimonials,
  myServicesPlans,
  faqData,
  counterLists,
} from '@/data';
import { ExtractedContent, SectionType } from '@/types';

export function extractExperience(): ExtractedContent[] {
  return myExperience.map(exp => ({
    id: `experience-${exp.id}`,
    section: SectionType.EXPERIENCE,
    title: exp.title,
    content: `
Role: ${exp.title}
Company: ${exp.company} (${exp.label})
Period: ${exp.year}
Description: ${exp.description}
Company Website: ${exp.link || 'Not available'}
    `.trim(),
    metadata: {
      source: '/data/index.tsx#myExperience',
      entities: [exp.company, exp.title],
      keywords: ['experience', 'work', 'job', exp.company.toLowerCase(), exp.title.toLowerCase()],
    },
  }));
}

export function extractServices(): ExtractedContent[] {
  return myServices.map(service => ({
    id: `service-${service.id}`,
    section: SectionType.SERVICES,
    title: service.title,
    content: `
Service: ${service.title}
Description: ${service.description}
    `.trim(),
    metadata: {
      source: '/data/index.tsx#myServices',
      entities: [service.title],
      keywords: ['service', 'offer', 'provide', service.title.toLowerCase()],
    },
  }));
}

export function extractServicePlans(): ExtractedContent[] {
  return myServicesPlans.map(plan => ({
    id: `service-plan-${plan.id}`,
    section: SectionType.SERVICES,
    title: plan.service,
    content: `
Service: ${plan.service}
Price: ${plan.price} per hour
Description: ${plan.description}
Completed Works: ${plan.completedWorks}
Experience: ${plan.experience}
Total Hours Worked: ${plan.totalHoursWorked}
Booking Link: ${plan.link}
    `.trim(),
    metadata: {
      source: '/data/index.tsx#myServicesPlans',
      entities: [plan.service],
      keywords: ['price', 'rate', 'cost', 'hire', 'hourly', plan.service.toLowerCase()],
    },
  }));
}

export function extractProjects(): ExtractedContent[] {
  return myShowCases.map(project => ({
    id: `project-${project.id}`,
    section: SectionType.PROJECTS,
    title: project.title,
    content: `
Project: ${project.title}
Description: ${project.description}
Type: ${project.type}
Theme: ${project.theme}
Pages: ${project.pages}
Link: ${project.link}
    `.trim(),
    metadata: {
      source: '/data/index.tsx#myShowCases',
      entities: [project.title, project.type],
      keywords: ['project', 'portfolio', 'work', 'showcase', project.title.toLowerCase()],
    },
  }));
}

export function extractSkills(): ExtractedContent[] {
  return myStack.map(skill => ({
    id: `skill-${skill.id}`,
    section: SectionType.SKILLS,
    title: skill.title,
    content: `
Technology: ${skill.title}
Category: ${skill.description}
Documentation: ${skill.link}
    `.trim(),
    metadata: {
      source: '/data/index.tsx#myStack',
      entities: [skill.title],
      keywords: ['skill', 'technology', 'stack', 'expertise', skill.title.toLowerCase()],
    },
  }));
}

export function extractTestimonials(): ExtractedContent[] {
  return testimonials.map(testimonial => ({
    id: `testimonial-${testimonial.id}`,
    section: SectionType.TESTIMONIALS,
    title: `Testimonial from ${testimonial.name}`,
    content: `
Client: ${testimonial.name}
Location: ${testimonial.location}
Feedback: "${testimonial.description}"
    `.trim(),
    metadata: {
      source: '/data/index.tsx#testimonials',
      entities: [testimonial.name],
      keywords: ['testimonial', 'review', 'feedback', 'client', 'recommendation'],
    },
  }));
}

export function extractFAQ(): ExtractedContent[] {
  return faqData.map((faq, index) => ({
    id: `faq-${index}`,
    section: SectionType.FAQ,
    title: faq.question,
    content: `
Question: ${faq.question}
Answer: ${faq.answer}
    `.trim(),
    metadata: {
      source: '/data/index.tsx#faqData',
      entities: [],
      keywords: ['faq', 'question', 'answer', 'help', 'support'],
    },
  }));
}

export function extractStats(): ExtractedContent[] {
  const statsContent = counterLists.map(stat => 
    `${stat.title}: ${stat.value}`
  ).join('\n');
  
  return [{
    id: 'stats-overview',
    section: SectionType.ABOUT,
    title: 'Portfolio Statistics',
    content: `
Portfolio Statistics and Achievements:
${statsContent}
    `.trim(),
    metadata: {
      source: '/data/index.tsx#counterLists',
      entities: [],
      keywords: ['stats', 'numbers', 'clients', 'experience', 'projects', 'achievements'],
    },
  }];
}

export function extractAbout(): ExtractedContent[] {
  return [{
    id: 'about-main',
    section: SectionType.ABOUT,
    title: 'About Syed Aasim Shah',
    content: `
Name: Syed Aasim Shah
Role: Senior MERN Stack Developer / Full-Stack Developer
Location: Rawalpindi, Pakistan

Professional Summary:
I craft high-performance web apps, seamless APIs, and dynamic full-stack solutions—turning ideas into reality!

Specialization:
- MERN Stack Development (MongoDB, Express, React, Node.js)
- API Development (RESTful and GraphQL)
- Cloud & DevOps (AWS, Docker, CI/CD)
- Complete Project Development (Website, Admin Dashboard, Mobile Apps)

Key Statistics:
- Happy Clients: 45+
- Years of Experience: 5+
- Completed Projects: 40+

Availability: Available for work

Education & Background:
Experienced developer with 5+ years of expertise in building scalable web applications, APIs, and cloud-based solutions.
    `.trim(),
    metadata: {
      source: 'app/page.tsx + components/Hero/Hero.tsx',
      entities: ['Aasim Shah', 'Syed Aasim Shah'],
      keywords: ['about', 'developer', 'mern', 'fullstack', 'senior', 'profile', 'bio'],
    },
  }];
}

export function extractContact(): ExtractedContent[] {
  return [{
    id: 'contact-info',
    section: SectionType.CONTACT,
    title: 'Contact Information',
    content: `
Contact Syed Aasim Shah:

Email: contact@aasimshah.com
Phone: +92-348-3360070

Freelance Platforms:
- Upwork: https://www.upwork.com/freelancers/aasimshah
- Fiverr: https://www.fiverr.com/users/aaasimmshah

Social Media:
- GitHub: https://www.github.com/aasim-shah
- LinkedIn: Available on the website
- Twitter: @aasimshah
- Instagram: @aasimshah

Schedule a Meeting:
You can schedule a 15-minute call via Cal.com integration on the website.

Business Location:
Bahria Town Phase 7, Rawalpindi, Pakistan

Availability: Available for work and new projects

How to Hire:
You can reach out via email, phone, or through Upwork/Fiverr for project inquiries and collaborations.
    `.trim(),
    metadata: {
      source: 'multiple sources',
      entities: ['contact@aasimshah.com', 'Syed Aasim Shah'],
      keywords: ['contact', 'email', 'phone', 'hire', 'reach', 'schedule', 'call', 'meeting'],
    },
  }];
}

export async function extractAllContent(): Promise<ExtractedContent[]> {
  console.log('🔍 Starting content extraction...');
  
  const allContent: ExtractedContent[] = [
    ...extractAbout(),
    ...extractExperience(),
    ...extractServices(),
    ...extractServicePlans(),
    ...extractProjects(),
    ...extractSkills(),
    ...extractTestimonials(),
    ...extractFAQ(),
    ...extractStats(),
    ...extractContact(),
  ];
  
  console.log(`✅ Extracted ${allContent.length} content items`);
  
  return allContent;
}
