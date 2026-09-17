export type Gender = "male" | "female";

export interface UserIdentity {
    firstName: string;
    lastName: string;
    middleName?: string;
    birthDate?: string;
}

export interface UserService {
    rank?: string;
    position: string;
    department: string;
    serviceStartDate?: string;
}

export interface UserMeasurements {
    gender?: Gender;
    height?: number;
    weight?: number;
    clothingSize?: string;
    shoeSize?: string;
    headSize?: string;
}

export interface User {
    id: string;
    badgeNumber: string;

    identity: UserIdentity;
    service: UserService;
    measurements: UserMeasurements;
}

export interface AuthCredentials {
    badgeNumber: string;
    password: string;
}
