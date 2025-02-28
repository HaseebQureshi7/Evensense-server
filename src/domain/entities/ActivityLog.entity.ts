export interface ActivityLog {
    id: number;
    action: string;
    details?: string;
    user_id: number;
    project_id: number;
    created_at: Date;
}
