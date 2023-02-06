export interface eventsDBSchema {
    event_name : string
    event_description: string
    poster_url: string
    speakers_details : [
        {
            name : string 
            designation: string
            details: string	} ,
    ]
    event_date : Date
    is_active : boolean
    venue: string
    sponsors_details:[
        {
                name:string
                place:string
                details: string 
        }
    ]
    duration: Number
    prerequisites: string
    cost: number
    registration_url:string
}
