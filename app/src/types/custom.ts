import { Users } from './schema'

export type Activity = NavigationActivity

export interface Preferences {
	autoCollapseHeader: boolean
	fontSize: 'sm' | 'md' | 'lg'
}

interface ActivityBase {
	tags: string[]
	timestamp: string
}

type NavigationActivity = ActivityBase & {
	type: 'navigation'
}

export interface Formatting {
	fontScale: 'sm' | 'md' | 'lg'
}

export type UserData = Pick<Users, 'formatting' | 'settings' | 'activity'>



