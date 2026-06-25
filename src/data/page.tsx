// src/data/page.tsx

export interface Speaker {
  id: number;
  displayName: string;
  image: string;
  description: string;
}

export interface SpeakerPageData {
  pageId: number;

  mainSpeaker: {
    name: string;
    displayName: string;
    image: string;
    description: string;
  };
  sidebarSpeakers: Speaker[];
}

export const SPEAKER_PAGES: SpeakerPageData[] = [
  {
    pageId: 1,
   
    mainSpeaker: {
      name: "SPEAKER 1",
      displayName: "Elon Musk",
      image: "https://i.pinimg.com/webp/1200x/88/94/52/8894528940b3d7eb88a241e3c34f4e25.webp",
      description: "Elon Musk is a billionaire entrepreneur and investor who has founded or led several influential technology companies, with work spanning electric vehicles, aerospace, renewable energy, and AI.",
    },
    sidebarSpeakers: [
      { id: 101, displayName: "Steve Jobs", image: "https://i.pinimg.com/736x/91/93/6d/91936d05a8336a0f3c115cdf64429477.jpg", description: "Famous for inspiring keynote presentations and product launches." },
      { id: 102, displayName: "Mark Zuckerberg", image: "https://i.pinimg.com/736x/7e/7d/bb/7e7dbb12b2ddffb2f46a2867537db6db.jpg", description: "Often discusses social technology, AI, and virtual reality." },
      { id: 103, displayName: "Jeff bezos", image: "https://i.pinimg.com/webp/736x/61/ac/54/61ac540d84604d0486669f358bc858aa.webp", description: "Speaks about entrepreneurship, customer focus, and long-term thinking." },
    ]
  },
  {
    pageId: 2,

    mainSpeaker: {
      name: "SPEAKER 2",
      displayName: "Sundar Pichai",
      image: "https://i.pinimg.com/736x/70/b7/78/70b778f20ded9570612b0b32cbb4c694.jpg",
      description: "Focuses on technology, AI, and digital transformation.",
    },
    sidebarSpeakers: [
      { id: 201, displayName: "Amitabh bachchan", image: "https://i.pinimg.com/736x/0b/47/89/0b4789216b0681982b090037fc7b7837.jpg", description: "A legendary Indian actor celebrated for his powerful screen presence, distinctive voice, and decades-long contribution to the film industry." },
      { id: 202, displayName: "priyanka chopra", image: "https://i.pinimg.com/736x/60/f9/cb/60f9cbf04723cc8b3c7cd1b372ea72f1.jpg", description: "An Indian actor recognized for his versatility, exceptional dancing skills, and performances in action and drama films." },
      { id: 203, displayName: "deepika padukone", image: "https://i.pinimg.com/webp/736x/7b/6d/09/7b6d0987bc5830b76f5b92f4fc95167e.webp", description: "An Indian actor recognized for his versatility, exceptional dancing skills, and performances in action and drama films." },
    ]
  },
  {
    pageId: 3,
 
    mainSpeaker: {
      name: "SPEAKER 3",
      displayName: "Tina dabi",
      image: "https://i.pinimg.com/1200x/b8/d4/e3/b8d4e3a8fb3c423e6f11c355cdba26a9.jpg",
      description: "An IAS officer known for securing the top rank in the 2015 Civil Services Examination and serving in various administrative roles.",
    },
    sidebarSpeakers: [
      { id: 301, displayName: "Manoj kumar sharma", image: "https://images.indianexpress.com/2026/05/Manoj-Kumar-Sharma.jpg?w=1200", description: "Shares motivational insights based on his journey." },
      { id: 302, displayName: "kiran bedi", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFqSDTuSgrA5PRMoWoPRcZ98KtwsAorql-qg&s", description: "Frequently invited to speak with students and aspirants." },
    ]
  }
];