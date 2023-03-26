import { ChangeEvent, FC, FormEvent, ReactNode, useEffect, useState } from 'react'
import { useSignUp } from '@clerk/nextjs'
import { SignUpCreateParams, SignUpResource } from '@clerk/types'

type credentialInputValuesType = Partial<Pick<SignUpCreateParams, 'emailAddress' | 'password' | 'username'> & { name: string }>

export const SignUpForm: FC = () => {
	const { isLoaded, signUp } = useSignUp()

	const [credentialInputValues, setCredentialInputValues] = useState<credentialInputValuesType | null>(null)

	const onCredentialInputChange = (e: ChangeEvent<HTMLInputElement>, fieldName: string) => {
		const value = e.target.value
		setCredentialInputValues(prev => {
			return {
				...prev,
				[fieldName]: value
			}
		})
	}
	const extractParams = () => {
		const params: SignUpCreateParams = {}
		params.emailAddress = credentialInputValues?.emailAddress
		params.firstName = credentialInputValues?.name?.split(' ')[0]
		params.lastName = credentialInputValues?.name?.split(' ')[1]
		params.username = credentialInputValues?.username
		params.password = credentialInputValues?.password
		return params
	}

	const submitCredentials = async (e: FormEvent) => {
		e.preventDefault()
		const params = extractParams()
		try {
			const check = await signUp?.update(params)
			console.log(check)
		} catch (error) {
			console.log(error)
		}
		
	}

	// build form
	useEffect(() => {
		if (isLoaded && signUp && !credentialInputValues) {
			const initSignUp = async () => {
				// return await signUp.create({})
				const test = await signUp.create({})
				console.log(test)
				return test
			}
			const initCredentialInputValues = (signUpInstance: SignUpResource) => {
				setCredentialInputValues(() => {
					const credentialInputValues: credentialInputValuesType = {}
					signUpInstance.requiredFields.forEach(field => {
						if (field === 'first_name' || field === 'last_name') {
							credentialInputValues.name = '' // this will be set twice .. fine
						} else if (field === 'email_address') {
							credentialInputValues.emailAddress = ''
						} else if (field === 'username') {
							credentialInputValues.username = '' 
						} else if (field === 'password') {
							credentialInputValues.password = ''
						}
					})
					return credentialInputValues
				})
			}
			const init = async () => {
				const signUpInstance = await initSignUp()
				initCredentialInputValues(signUpInstance)
			}

			init()
		}
	}, [signUp, isLoaded, credentialInputValues])

	return (
		<div>
			{
				credentialInputValues && 
				<form onSubmit={submitCredentials}>
					{ Object.keys(credentialInputValues).map(fieldName => {
						if (fieldName === 'emailAddress') {
							return (
								<div key={fieldName}>
									<input placeholder={fieldName} type='email' onChange={e => onCredentialInputChange(e, fieldName)} required/>
								</div>
							)
						} else if (fieldName === 'password') {
							return (
								<div key={fieldName}>
									<input placeholder={fieldName} type='password' onChange={e => onCredentialInputChange(e, fieldName)} required/>
								</div>
							)
						} else {
							return (
								<div key={fieldName}>
									<input placeholder={fieldName} type='text' onChange={e => onCredentialInputChange(e, fieldName)}  required/>
								</div>
							)
						}
					})}
					<button type='submit'>continue</button>
				</form>
			}
		</div>
	)
}




















// import { FC, ReactNode, useEffect, useState } from 'react'
// import { useSignUp } from '@clerk/nextjs'
// import { useClerk } from '@clerk/nextjs'

// export const SignUpForm: FC = () => {
// 	const { isLoaded: clerkIsLoaded, signUp } = useSignUp()
// 	const { client } = useClerk()

// 	const [signUpcredentialInputValues, setSignUpcredentialInputValues] = useState<{[fieldName: string]: string} | null>(null)

// 	const signUpInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
// 		const { value } = e.target
// 		setSignUpcredentialInputValues(prev => {
// 			return {
// 				...prev,
// 				[fieldName]: value
// 			}
// 		})
// 	}

// 	const loadSignUp = async () => {
// 		try {
// 			await signUp?.create({})
// 			setSignUpcredentialInputValues(() => {
// 				const values: {[fieldName: string]: string} = {}
// 				let doesNameFieldExist = false
// 				signUp?.requiredFields.forEach(field => {
// 					if (field === 'last_name' || field === 'first_name') {
// 						if (!doesNameFieldExist) {
// 							values.name = ''
// 							doesNameFieldExist = true
// 						}
// 						return
// 					} else {
// 						values[field] = ''
// 					}
// 				})
// 				return values
// 			})
// 		} catch (error) {
// 			console.log(error)
// 		}
// 	}

// 	useEffect(() => {
// 		if (clerkIsLoaded) {
// 			// this will run every time sign up object updates
// 			loadSignUp()
// 		}
// 	}, [clerkIsLoaded])

// 	return (
// 		<form>
// 			{
// 				signUpcredentialInputValues && Object.keys(signUpcredentialInputValues).map((inputName) => {
// 					return (
// 						<div key={inputName}>
// 							<input type="text" value={signUpcredentialInputValues[inputName]} onChange={(e) => signUpInputChangeHandler(e, inputName)} />
// 						</div>
// 					)
// 				})
// 			}
// 		</form>
// 	)
// }

