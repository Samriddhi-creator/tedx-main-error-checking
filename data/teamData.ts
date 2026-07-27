export interface TeamMember {
    id: number;
    name: string;
    img: string;
    role?: string;
    linkedin?: string;
}

export interface TeamDepartment {
    id: string;
    title: string;
    members: TeamMember[];
}

export const organizers: TeamMember[] = [
    {
        id: 1,
        name: "Kavya Mahajan",
        role: "Lead Organizer",
        img: "/pic.png",
        linkedin: "https://www.linkedin.com"
    },
    {
        id: 2,
        name: "Ashmit Malik",
        role: "Co-Organizer",
        img: "/pic.png",
        linkedin: "https://www.linkedin.com"
    },
];

const Team: TeamDepartment[] = [
    {
        id: "prod",
        title: "Production",
        members: [
            { id: 1, name: "Kartik Sen", img: "/pic.png", role: "Production Lead" },
            { id: 2, name: "Riddhesh Dalal", img: "/pic.png", role: "Production Team" },
        ]
    },
    {
        id: "design",
        title: "Design",
        members: [
            { id: 1, name: "Anura Saoji", img: "/pic.png", role: "Design Lead" },
            { id: 2, name: "Darshini Shah", img: "/pic.png", role: "Design Team" },
        ]
    },
    {
        id: "web",
        title: "Web Development",
        members: [
            { id: 1, name: "Hardik Batwal", img: "/pic.png", role: "Web Lead", linkedin: "https://www.linkedin.com" },
            { id: 2, name: "Mrinal Satyarthi", img: "/pic.png", role: "Web Team", linkedin: "https://www.linkedin.com" },
        ]
    },
    {
        id: "pnc",
        title: "Planning and Curation",
        members: [
            { id: 1, name: "Surili Pathak", img: "/pic.png", role: "Curation Lead" },
            { id: 2, name: "Parth Sehgal", img: "/pic.png", role: "Curation Team" },
            { id: 3, name: "Shreyas Das", img: "/pic.png", role: "Curation Team" },
        ]
    },
    {
        id: "mpr",
        title: "Media and Public Relations",
        members: [
            { id: 1, name: "Vishmith Shetty", img: "/pic.png", role: "Media Lead" },
            { id: 2, name: "Priyam Das", img: "/pic.png", role: "PR Team" },
            { id: 3, name: "Pratichi Maheshwari", img: "/pic.png", role: "PR Team" },
        ]
    },
    {
        id: "spons",
        title: "Sponsorship",
        members: [
            { id: 1, name: "Vidhi Patel", img: "/pic.png", role: "Sponsorship Lead" },
            { id: 2, name: "Devyansh Pandey", img: "/pic.png", role: "Sponsorship Team" },
            { id: 3, name: "Tushar BHarti", img: "/pic.png", role: "Sponsorship Team" },
        ]
    },
    {
        id: "rsp",
        title: "Registration, Security and Planning",
        members: [
            { id: 1, name: "Parnava Maitra", img: "/pic.png", role: "RSP Lead" },
            { id: 2, name: "Abhijeet S. Jadaun", img: "/pic.png", role: "RSP Team" },
            { id: 3, name: "Ayush Gupta", img: "/pic.png", role: "RSP Team" },
        ]
    },
    {
        id: "hospi",
        title: "Hospitality",
        members: [
            { id: 1, name: "Yahya Dawoodi", img: "/pic.png", role: "Hospitality Lead" },
            { id: 2, name: "Shikhar Verma", img: "/pic.png", role: "Hospitality Team" },
            { id: 3, name: "Charu Garg", img: "/pic.png", role: "Hospitality Team" },
        ]
    },
];

export const team: TeamDepartment[] = Team.reverse();