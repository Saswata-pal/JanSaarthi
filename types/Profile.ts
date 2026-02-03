export interface Profile {
    id: string;
    userId: string;
    name: string;
    email: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    pincode?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ProfileUpdateInput {
    name?: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    pincode?: string;
}

export interface ProfileFormData {
    category: string;
    incomeSource: string;
    age: number;
    gender: string;
    caste?: string;
}
