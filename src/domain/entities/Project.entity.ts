export class Project{
    constructor (
        public name: string,
        public description: string,
        public user_id : number,
        public deadline?: string,
        public project_logo?: string,
        public est_deadline?: string,
        public start_date?: string,
        public id?: number,
        public created_at?: Date,
    ) {}
}