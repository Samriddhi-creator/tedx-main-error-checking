import { api } from "@/lib/axios";
import { Memory } from "@/types/memory";

const unwrapMemories = (payload: unknown): Memory[] => {
    if (Array.isArray(payload)) {
        return payload as Memory[];
    }
    if (payload && typeof payload === "object") {
        const obj = payload as Record<string, unknown>;
        if (Array.isArray(obj.data)) return obj.data as Memory[];
        if (Array.isArray(obj.memories)) return obj.memories as Memory[];
    }
    console.warn("Unexpected /api/memories response shape:", payload);
    return [];
};

const unwrapMemory = (payload: unknown): Memory => {
    if (payload && typeof payload === "object") {
        const obj = payload as Record<string, unknown>;
        if (obj.data && typeof obj.data === "object" && !Array.isArray(obj.data)) {
            return obj.data as Memory;
        }
        if (obj.memory && typeof obj.memory === "object") {
            return obj.memory as Memory;
        }
    }
    return payload as Memory;
};

export const getMemories = async (): Promise<Memory[]> => {
    const res = await api.get("/api/memories");
    return unwrapMemories(res.data);
};

export const createMemory = async (data: {
    name: string;
    roleCategory: string;
    customRoleTitle?: string;
    memoryText: string;
}): Promise<Memory> => {
    const res = await api.post("/api/memories", data);
    return unwrapMemory(res.data);
};

export const likeMemory = async (id: string): Promise<Memory> => {
    const res = await api.patch(`/api/memories/${id}/like`);
    return unwrapMemory(res.data);
};

export const unlikeMemory = async (id: string): Promise<Memory> => {
    const res = await api.patch(`/api/memories/${id}/unlike`);
    return unwrapMemory(res.data);
};