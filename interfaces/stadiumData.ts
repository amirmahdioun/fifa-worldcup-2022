export interface StadiumDataI {
    id: string,
    stadium_name: string,
    subtitle?: string,
    matches_planned: string[],
    description: string,
    capacity: number,
    image: string,
    top_view: string,
    location: string,
    detail: string
}