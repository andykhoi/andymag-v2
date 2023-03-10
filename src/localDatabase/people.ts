// use this file as the local database of people in magnolia 
export interface Person {
	first_name: string
	last_name: string
	user_id: string
	links: {
		instagram: string
		twitter: string
		facebook: string
		website: string
	}
	role: string // what does person do with Andy Mag
	description: string // general information
}

export const people = {} // dictionary of people