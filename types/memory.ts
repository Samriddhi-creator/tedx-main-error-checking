export interface Memory {
    _id: string;
    name: string;
    roleCategory: "Organizer" | "Coordinator" | "Subcoordinator";
    customRoleTitle?: string;
    memoryText: string;
    likes: number;
    createdAt: string;
    updatedAt: string;
}