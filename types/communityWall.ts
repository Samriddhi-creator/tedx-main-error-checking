export interface CommunityWallNoteBackend {
    _id: string;
    username: string;
    message: string;
    color: string;
    likes: number;
    rotation: number;
    createdAt?: string;
    updatedAt?: string;
}
