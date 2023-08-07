export interface Task {
    id?: number;
    title: string;
    note?: string;
    completed?: boolean;
}

export interface Response {
    status: boolean;
    message: string;
}