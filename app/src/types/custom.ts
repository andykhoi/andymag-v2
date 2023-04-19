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


