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
        role: "Organizer",
        img: "/aaaasd - Kavya.jpeg",
        linkedin: "https://in.linkedin.com/in/kavya-mahajan-ab19752b3"
    },
    {
        id: 2,
        name: "Ashmit Malik",
        role: "Organizer",
        img: "/IMG-20260219-WA0014 - Ashmit Malik.jpg",
        linkedin: "https://www.linkedin.com/in/ashmit-malik-3b891924a"
    },
];

const Team: TeamDepartment[] = [
    {
        id: "prod",
        title: "Production",
        members: [
            { id: 1, name: "Kartik Sen", img: "/f5ebed45-3fb0-4eb3-bc66-7d314d68e3f6 - KARTIK SEN.jpeg", role: "Production Lead" ,linkedin:"https://www.linkedin.com/in/kars13105"},
            { id: 2, name: "Riddhesh Dalal", img: "/IMG_20260612_140019 - Riddhesh Dalal copy.jpg", role: "Production Team",linkedin:"https://www.linkedin.com/in/riddhesh-dalal" },
        ]
    },
    {
        id: "design",
        title: "Design",
        members: [
            { id: 1, name: "Anura Saoji", img: "/IMG-20251229-WA0022 - Anura Saoji.jpeg", role: "Design Lead",linkedin:"https://www.linkedin.com/in/anurasaoji?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
           
            { id: 2, name: "Darshini Shah", img: "/IMG-20260719-WA0023 - Darshini shah.jpg", role: "Design Team" , linkedin:"https://www.linkedin.com/in/shah-darshini/" },
        ]
    },
    {
        id: "web",
        title: "Web Development",
        members: [
            { id: 1, name: "Hardik Batwal", img: "/hardikbatwal.png", role: "Web Lead", linkedin: "https://www.linkedin.com/in/hardik-batwal-a534a231a/" },
            { id: 2, name: "Mrinal Satyarthi", img: "/IMG-20260714-WA0006 - Mrinal Satyarthi.jpg", role: "Web Team", linkedin: "https://linkedin.com/in/mrinal-satyarthi" },
        ]
    },
    {
        id: "pnc",
        title: "Planning and Curation",
        members: [
            { id: 1, name: "Surili Pathak", img: "/IMG-20260723-WA0062 - Surili Pathak.jpg", role: "Planning and Curation Coordinator",linkedin:"https://www.linkedin.com/in/surili-pathak-4867bb31a?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
            { id: 2, name: "Parth Sehgal", img: "/parthSehgal.png", role: "Planning and Curation Coordinator" ,linkedin:"https://www.linkedin.com/in/parth-sehgal-60b928372/"},
            { id: 3, name: "Shreyas Das", img: "/pic.png", role: "Planning and Curation Coordinator",linkedin:"" },
        ]
    },
    {
        id: "mpr",
        title: "Media and Public Relations",
        members: [
            { id: 1, name: "Vishmith Shetty", img: "/pic.png", role: "Media Lead",linkedin:"" },
            { id: 2, name: "Priyam Das", img: "/IMG-20251013-WA0173 - Priyam Das.jpg", role: "PR Team",linkedin:"" },
            { id: 3, name: "Pratichi Maheshwari", img: "/20260405_185144.jpg - Pratichi (1).jpeg", role: "PR Team" ,linkedin:"https://www.linkedin.com/in/pratichi-maheshwari"},
        ]
    },
    {
        id: "spons",
        title: "Sponsorship",
        members: [
            { id: 1, name: "Vidhi Patel", img: "/Screenshot 2026-07-28 at 6.04.31 PM.png", role: "Sponsorship Coordinator" ,linkedin:"https://www.linkedin.com/in/vidhi-patel-5a1893310"},
            { id: 2, name: "Devyansh Pandey", img: "/devyanshPandey.png", role: "Sponsorship Coordinator",linkedin:"https://www.linkedin.com/in/devyansh-pandey-a66426360?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
            { id: 3, name: "Tushar Bharti", img: "/tusharBharti.png", role: "Sponsorship Coordinator",linkedin:"https://www.linkedin.com/in/tushar-bharti-5a0446309" },
        ]
    },
    {
        id: "rsp",
        title: "Registration, Security and Planning",
        members: [
            { id: 1, name: "Parnava Maitra", img: "/Pranva-maitra.png", role: "RSP Lead" ,   linkedin: "https://www.linkedin.com/in/parnava-maitra-84778b357?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
            { id: 2, name: "Abhijeet S. Jadaun", img: "/TedX_Pic - Abhijeet Singh (1).jpg", role: "RSP Team" ,linkedin:"https://www.linkedin.com/in/abhijeet-singh-jadaun-1a796525b"},
            { id: 3, name: "Ayush Gupta", img: "/IMG_20260721_195558 - Ayush Gupta.jpg", role: "RSP Team",linkedin:"https://www.linkedin.com/in/ayush-gupta-675549320" },
        ]
    },
    {
        id: "hospi",
        title: "Hospitality",
        members: [
            { id: 1, name: "Yahya Dawoodi", img: "/IMG-20250824-WA0115 - Yahya Dawoodi.jpg", role: "Hospitality Lead",linkedin:"https://www.linkedin.com/in/yahyadawoodi" },
            { id: 2, name: "Shikhar Verma", img: "/IMG_7978 - Shikhar Verma.png", role: "Hospitality Team" ,linkedin:"https://www.linkedin.com/in/shikhar-verma-702a82308?utm_source=share_via&utm_content=profile&utm_medium=member_ios"},
            { id: 3, name: "Charu Garg", img: "/Screenshot_2026-07-23-15-36-44-753_com.miui.gallery - Charu Garg.jpg", role: "Hospitality Team",linkedin:"https://www.linkedin.com/in/charu-garg-16767a30a/" },
        ]
    },
];

export const team: TeamDepartment[] = Team.reverse();