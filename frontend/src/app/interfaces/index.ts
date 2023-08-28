export interface Task {
    id?: string;
    title: string;
    note?: string;
    category: string;
    priority: string;
    completed?: boolean;
    due_date: Date | null;
    created_at?: Date;
    subtasks: SubTask[];
}

export interface SubTask {
    id?: string;
    title: string;
    completed: boolean;
    created_at?: Date;
    // subtasks: Array<SubTask>;
}

export interface Response {
    status: boolean;
    message: string;
}

export interface TaskFormData {
    id?: string;
    title?: string;
    note?: string | null;
    priority?: string;
    category?: string;
    completed?: boolean;
    due_date?: Date | string | null;
    subtasks?: Array<SubTask> | [];
}

export interface SubTaskFormData {
    id?: string;
    title?: string | "";
    completed?: boolean;
    subtasks?: Array<SubTask> | [];
}

export interface MenuListItem {
    title: string;
    key: string;
    icon: React.FC; // Declare the type of the icon as React.FC
}

export interface PrioriyListItem {
    name: string;
    key: string;
    color: string;
}