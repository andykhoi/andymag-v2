import { Users } from '../types/schema'
import { Activity, Preferences } from '../../../types/custom'
import { EnrichedUserData } from '@/contexts/UserContext'

type AnonUserDataInput = Partial<Pick<Users, 'activity' | 'preferences'>>

// type EnrichedUserData = {
// 	activity: Activity[]
// 	preferences: Preferences
// }

export const getAnonData: () => EnrichedUserData | null = () => {
	return JSON.parse(window.localStorage.getItem('anon_AM_user') as string)
}

export const setAnonData: (data: AnonUserDataInput) => EnrichedUserData = (data) => {
	const old = window.localStorage.getItem('anon_AM_user')
	if (!old) {
		window.localStorage.setItem('anon_AM_user', JSON.stringify(data))
	} else {
		const update = {...JSON.parse(old), ...data }
		window.localStorage.setItem('anon_AM_user', JSON.stringify(update))
	}

	return JSON.parse(window.localStorage.getItem('anon_AM_user') as string)
}

export const initAnonData = () => {
	return setAnonData({
		preferences: {
			autoCollapseHeader: false,
			fontSize: 'md'
		},
		activity: []
	})
}

// import { Users } from '../types/schema'
// import { Activity, Preferences } from '../../../types/custom'
// import { EnrichedUserData } from '@/contexts/UserContext'

// type AnonUserDataInput = Partial<Pick<Users, 'activity' | 'preferences'>>

// // type EnrichedUserData = {
// // 	activity: Activity[]
// // 	preferences: Preferences
// // }

// export const getAnonData: () => EnrichedUserData | null = () => {
// 	return JSON.parse(window.localStorage.getItem('anon_AM_user') as string)
// }

// export const setAnonData: (data: AnonUserDataInput) => EnrichedUserData = (data) => {
// 	const old = window.localStorage.getItem('anon_AM_user')
// 	if (!old) {
// 		window.localStorage.setItem('anon_AM_user', JSON.stringify(data))
// 	} else {
// 		const update = {...JSON.parse(old), ...data }
// 		window.localStorage.setItem('anon_AM_user', JSON.stringify(update))
// 	}

// 	return JSON.parse(window.localStorage.getItem('anon_AM_user') as string)
// }

// export const initAnonData = () => {
// 	return setAnonData({
// 		preferences: {
// 			autoCollapseHeader: false,
// 			fontSize: 'md'
// 		},
// 		activity: []
// 	})
// }