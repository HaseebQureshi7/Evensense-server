export interface Project {
    id?: number;
    name: string;
    description: string;
    user_id: number;
    deadline?: Date;
    project_logo?: string;
    est_deadline?: Date;
    start_date?: Date;
    tech_stack?: Date;
    project_architecture?: string[];
    document_links?: string[];
    project_links?: string[];
    created_at?: Date;
}