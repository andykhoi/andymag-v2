import { ChangeEvent, Dispatch, FC, FormEvent, SetStateAction, useState } from 'react'
import { useSignUp } from '@clerk/nextjs'
import { SignUpCreateParams, SignUpResource, CodeVerificationAttemptParam, ClerkAPIError } from '@clerk/types'
import { Spinner } from '../Spinner'

export const SignUpForm: FC = () => {
	const { isLoaded, signUp, setActive } = useSignUp()

	const [emailAddress, setEmailAddress] = useState<string>('')
	const [emailAddressError, setEmailAddressError] = useState<string>('')
	
	const [password, setPassword] = useState<string>('')
	const [passwordError, setPasswordError] = useState<string>('')

	const [name, setName] = useState<string>('')
	const [nameError, setNameError] = useState<string>('')

	const [username, setUsername] = useState<string>('')
	const [usernameError, setUsernameError] = useState<string>('')

	const [code, setCode] = useState<string>('')
	const [codeError, setCodeError] = useState<string>('')

	const [clerkError, setClerkError] = useState<string>('')

	const [loading, setLoading] = useState<boolean>(false)
	const [stage, setStage] = useState<'credentials' | 'verification'>('credentials')

	// const onCredentialInputChange = (e: ChangeEvent<HTMLInputElement>, setter: Dispatch<SetStateAction<string>>) => {
	// 		// reset errors
	// 		resetCredentialErrors()

	// 		setter(() => e.target.value)
	// }

	// const resetCredentialErrors = () => {
	// 	setEmailAddressError(() => '')
	// 	setNameError(() => '')
	// 	setUsernameError(() => '')
	// 	setPasswordError(() => '')
	// }

	const extractParams = () => {
		const params: SignUpCreateParams = {}
		params.emailAddress = emailAddress
		params.firstName = name?.split(' ')[0]
		params.lastName = name?.split(' ')[1]
		params.username = username
		params.password = password
		return params
	}

	const validateInputs = (): {
		name: string
		emailAddress: string
		username: string
		password: string
	} | null => {
		// let valid = true
		let errors: {
			name: string
			emailAddress: string
			username: string
			password: string
		} = {
			name: '',
			emailAddress: '',
			username: '',
			password: '',
		}
		
		if (name?.split(' ').length !== 2) {
			errors.name = 'Please provide a first and last name'
			// setNameError(() => 'Please provide a first and last name')
			// valid = false
		}

		const regex = /^[a-zA-Z0-9_-]+$/
		if (!regex.test(username)) {
			errors.username = 'Username can only contains letters, numbers and \'_\' or \'-\''
		}

		let valid = true;
		let key: keyof typeof errors
		for (key in errors) {
			if (errors[key]) {
				valid = false
			}
		}
		return valid ? null : errors
		// return valid
	}

	
	const trySignUpWithCredentials = async (params: SignUpCreateParams): Promise<[undefined | SignUpResource, ClerkAPIError[] | null]> => {
		try {
			const signUpWithCredentials = await signUp?.create(params)
			// if (!signUpWithCredentials) return [undefined, 'Undefined sign up object']
			
			// if (signUpWithCredentials.missingFields.length > 0) {
			// 	// setClerkError(() => 'Please fill out the missing fields')
			// 	return [undefined, 'Please fill out the missing fields']
			// }

			// signUpWithCredentials.prepareEmailAddressVerification()
			// setStage(() => 'verification')
			return [signUpWithCredentials, null]
		} catch (e: any) {
			// setClerkError(e)
			return [signUp, e.errors as ClerkAPIError[]]
		}
	}

	const trySendingVerificationEmail = async (signUpInstance: SignUpResource): Promise<[undefined | SignUpResource, ClerkAPIError[] | null]> => {
		try {
			const sendingVerificationEmail = await signUpInstance.prepareEmailAddressVerification()
			return [sendingVerificationEmail, null]

		} catch (e: any) {
			return [signUp, e.errors as ClerkAPIError[]]
		}
	}

	const continueHandler = async (e: FormEvent) => {
		e.preventDefault()
		if (!isLoaded || loading || !signUp) return 
		
		setLoading(() => true)

		const inputErrors = validateInputs()
		if (inputErrors) {
			for (const field in inputErrors) {
				if (field === 'name') {
					setNameError(() => inputErrors[field])
				} else if (field === 'username') {
					setUsernameError(() => inputErrors[field])
				} else if (field === 'emailAddress') {
					setEmailAddressError(() => inputErrors[field])
				} else if (field === 'password') {
					setPasswordError(() => inputErrors[field])
				}
			}
			setLoading(() => false)
			return
		}

		const params = extractParams()
		const [signUpWithCredentials, clerkParamErrors] = await trySignUpWithCredentials(params)
		
		if (clerkParamErrors) {
			clerkParamErrors.forEach(({ 
				message,
				meta
			} ) => {
				if (meta?.paramName === 'username') {
					setUsernameError(() => message)
				} else if (meta?.paramName === 'last_name') {
					setNameError(() => message)
				} else if (meta?.paramName === 'first_name') {
					setNameError(() => message)
				} else if (meta?.paramName === 'password') {
					setPasswordError(() => message)
				} else if (meta?.paramName === 'email_address') {
					setEmailAddressError(() => message)
				}
			})
			setLoading(() => false)
			return
		}
		
		const [sendingVerificationEmail, clerkEmailErrors] = signUpWithCredentials ? await trySendingVerificationEmail(signUpWithCredentials) : [undefined, null]
		if (clerkEmailErrors || !sendingVerificationEmail || !sendingVerificationEmail?.verifications.emailAddress.status) {
			setClerkError(() => 'Please try again.')
			setLoading(() => false)
			return
		}

		setStage(() => 'verification')
		setLoading(() => false)
	}

	const tryVerifyingEmail = async (params: CodeVerificationAttemptParam): Promise<[undefined | SignUpResource, ClerkAPIError[] | null]> => {
		if (!signUp) return [undefined, null]

		try {
			const verifyingEmail = await signUp.attemptEmailAddressVerification(params)
			if (verifyingEmail.verifications.emailAddress.error) {
				return [verifyingEmail, [verifyingEmail.verifications.emailAddress.error]]
			}

			return [verifyingEmail, null]
		} catch (e: any) {
			return [signUp, e.errors as ClerkAPIError[]]
		}
	}

	const verificationHandler = async (e: FormEvent) => {
		e.preventDefault()
		if (!isLoaded || loading || !signUp || stage !== 'verification') return 
		
		setLoading(() => true)
		const [verifyingEmail, clerkVerifyingErrors] = await tryVerifyingEmail({ code })
		if (clerkVerifyingErrors) {
			setClerkError(() => clerkVerifyingErrors.map(err => err.message).join(', '))
			setLoading(() => false)
			return
		}


		// at this point the sign up should be complete
		if (verifyingEmail && verifyingEmail.status === 'complete') {
			setActive({ session: verifyingEmail.createdSessionId })
		}
	
		setLoading(() => false)
	}

	return (
		<div>
			{
				stage === 'credentials' &&
				<>
					<form onSubmit={continueHandler}>
						<div>
							<input
								placeholder='First and last name'
								type='text' value={name}
								// onFocus={() => setNameError(() => '')}
								onChange={e => {
									setName(e.target.value)
									setNameError(() => '')
								}}
								// onChange={e => onCredentialInputChange(e, setName)}
								required
							/>
							{ nameError && <p>{nameError}</p> }
						</div>
						<div>
							<input
								placeholder='Username'
								type='text'
								value={username}
								// onFocus={() => setUsernameError(() => '')}
								onChange={e => {
									setUsername(e.target.value)
									setUsernameError(() => '')
								}}
								// onChange={e => onCredentialInputChange(e, setUsername)}
								required
							/>
							{ usernameError && <p>{usernameError}</p> }
						</div>
						<div>
							<input
								placeholder='Email'
								type='email'
								value={emailAddress}
								// onFocus={() => setEmailAddressError(() => '')}
								onChange={e => {
									setEmailAddress(e.target.value)
									setEmailAddressError(() => '')
								}}
								// onChange={e => onCredentialInputChange(e, setEmailAddress)}
								required
							/>
							{ emailAddressError && <p>{emailAddressError}</p> }
						</div>
						<div>
							<input
								placeholder='Password'
								type='password'
								value={password}
								// onFocus={() => setPasswordError(() => '')}
								onChange={e => {
									setPassword(e.target.value)
									setPasswordError(() => '')
								}}
								// onChange={e => onCredentialInputChange(e, setPassword)}
								required
							/>
							{ passwordError && <p>{passwordError}</p> }
						</div>
						<button type='submit'>
							<div>
								{ loading ?  <Spinner /> : 'Continue' }
							</div>
						</button>
					</form>
					<style jsx>{`
						input {
							display: flex;
							flex-direction: column;
						}
					`}</style>
				</>
			}
			{
				stage === 'verification' && 
				<>
					<form onSubmit={verificationHandler}>
						<div>
							<input
								placeholder='Verification Code'
								type='text'
								value={code}
								onFocus={() => setCodeError(() => '')}
								onChange={e => setCode(e.target.value)}
								required
							/>
							{ codeError && <p>{codeError}</p> }
						</div>
						<button type='submit'>
							<div>
								{ loading ?  <Spinner /> : 'Verify' }
							</div>
						</button>
					</form>
				</>
			}
		</div>

	)
}










// import { FC, useEffect, useState, ChangeEvent, FormEvent } from 'react'
// import { SignUpCreateParams, SignUpResource } from '@clerk/types'
// import { useClerk } from '@clerk/nextjs'
// import { useSignUp } from '@clerk/nextjs'

// type CredentialInputValuesType = Partial<Pick<SignUpCreateParams, 'emailAddress' | 'password' | 'username'> & { name: string }>


// export const SignUpForm: FC = () => {
// 	const { isLoaded, signUp } = useSignUp()

// 	const [stage, setStage] = useState<'credentials' | 'verification'>('credentials')
// 	const [credentialInputValues, setCredentialInputValues] = useState<CredentialInputValuesType>({})
// 	const [verificationCode, setVerificationCode] = useState<string | null>(null)

// 	const requiredFields = signUp ? signUp.requiredFields.join(',') : null

// 	const onCredentialInputChange = (e: ChangeEvent<HTMLInputElement>, fieldName: string) => {
// 		const value = e.target.value
// 		setCredentialInputValues(prev => {
// 			return {
// 				...prev,
// 				[fieldName]: value
// 			}
// 		})
// 	}

// 	const extractParams = () => {
// 		const params: SignUpCreateParams = {}
// 		params.emailAddress = credentialInputValues?.emailAddress
// 		params.firstName = credentialInputValues?.name?.split(' ')[0]
// 		params.lastName = credentialInputValues?.name?.split(' ')[1]
// 		params.username = credentialInputValues?.username
// 		params.password = credentialInputValues?.password
// 		return params
// 	}

// 	const submitCredentials = async (e: FormEvent) => {
// 		e.preventDefault()
// 		const params = extractParams()
// 		console.log(params)
// 		try {
// 			const check = await signUp?.update(params)
// 			console.log(check)
// 		} catch (error) {
// 			console.log(error)
// 		}
// 	}

// 	useEffect(() => {
// 		if (requiredFields) {
// 			console.log('run')
// 			const initCredentialInputValues = () => {
// 				setCredentialInputValues(() => {
// 					const credentialInputValues: CredentialInputValuesType = {}
// 					requiredFields?.split(',').forEach(field => {
// 						if (field === 'first_name' || field === 'last_name') {
// 							credentialInputValues.name = '' // this will be set twice .. fine
// 						} else if (field === 'email_address') {
// 							credentialInputValues.emailAddress = ''
// 						} else if (field === 'username') {
// 							credentialInputValues.username = '' 
// 						} else if (field === 'password') {
// 							credentialInputValues.password = ''
// 						}
// 					})
// 					// reorder the property names
// 					const reordered: CredentialInputValuesType = {
// 						name: credentialInputValues.name,
// 						username: credentialInputValues.username,
// 						emailAddress: credentialInputValues.emailAddress,
// 						password: credentialInputValues.password
// 					}
// 					return reordered
// 				})
// 			}

// 			initCredentialInputValues()
// 		}
// 	}, [requiredFields])

// 	return (
// 		<div>
// 			<form onSubmit={e => submitCredentials(e)}>
// 			{
// 				(Object.keys(credentialInputValues) as Array<keyof typeof credentialInputValues>)
// 				.map(fieldName => {
// 					if (!credentialInputValues[fieldName] === undefined) return
// 					if (fieldName === 'emailAddress') {
// 						return (
// 							<div key={fieldName}>
// 								<input placeholder={'Email'} type='email' onChange={e => onCredentialInputChange(e, fieldName)} required/>
// 							</div>
// 						)
// 					} else if (fieldName === 'password') {
// 						return (
// 							<div key={fieldName}>
// 								<input placeholder={'Password'} type='password' onChange={e => onCredentialInputChange(e, fieldName)} required/>
// 							</div>
// 						)
// 					} else if (fieldName === 'name') {
// 						return (
// 							<div key={fieldName}>
// 								<input placeholder={'First and last name'} type='text' onChange={e => onCredentialInputChange(e, fieldName)} required/>
// 							</div>
// 						)
// 					} else if (fieldName === 'username') {
// 						return (
// 							<div key={fieldName}>
// 								<input placeholder={'Username'} type='text' onChange={e => onCredentialInputChange(e, fieldName)} required/>
// 							</div>
// 						)
// 					}
// 				})
// 			}
// 			<button type='submit'>continue</button>
// 			</form>
			
// 		</div>
// 	)
// }















// import { ChangeEvent, FC, FormEvent, ReactNode, useEffect, useState } from 'react'
// import { useSignUp } from '@clerk/nextjs'
// import { SignUpCreateParams, SignUpResource } from '@clerk/types'

// type CredentialInputValuesType = Partial<Pick<SignUpCreateParams, 'emailAddress' | 'password' | 'username'> & { name: string }>

// interface SignUpFormProps {
// 	mode: 'sign-up' | 'sign-in'
// }

// export const SignUpForm: FC<SignUpFormProps> = ({
// 	mode
// }) => {
// 	const { isLoaded, signUp } = useSignUp()

// 	const [credentialInputValues, setCredentialInputValues] = useState<CredentialInputValuesType | null>(null)

// 	const onCredentialInputChange = (e: ChangeEvent<HTMLInputElement>, fieldName: string) => {
// 		const value = e.target.value
// 		setCredentialInputValues(prev => {
// 			return {
// 				...prev,
// 				[fieldName]: value
// 			}
// 		})
// 	}
	
// 	const extractParams = () => {
// 		const params: SignUpCreateParams = {}
// 		params.emailAddress = credentialInputValues?.emailAddress
// 		params.firstName = credentialInputValues?.name?.split(' ')[0]
// 		params.lastName = credentialInputValues?.name?.split(' ')[1]
// 		params.username = credentialInputValues?.username
// 		params.password = credentialInputValues?.password
// 		return params
// 	}

// 	const submitCredentials = async (e: FormEvent) => {
// 		e.preventDefault()
// 		const params = extractParams()
// 		try {
// 			const check = await signUp?.update(params)
// 			console.log(check)
// 		} catch (error) {
// 			console.log(error)
// 		}
		
// 	}

// 	// build form
// 	useEffect(() => {
// 		if (isLoaded && signUp && !credentialInputValues) {
// 			const initSignUp = async () => {
// 				// return await signUp.create({})
// 				console.log('run')
// 				const newSignUp = await signUp.create({})
// 				console.log(newSignUp)
// 				return newSignUp
// 			}
// 			const initCredentialInputValues = (signUpInstance: SignUpResource) => {
// 				setCredentialInputValues(() => {
// 					const credentialInputValues: CredentialInputValuesType = {}
// 					signUpInstance.requiredFields.forEach(field => {
// 						if (field === 'first_name' || field === 'last_name') {
// 							credentialInputValues.name = '' // this will be set twice .. fine
// 						} else if (field === 'email_address') {
// 							credentialInputValues.emailAddress = ''
// 						} else if (field === 'username') {
// 							credentialInputValues.username = '' 
// 						} else if (field === 'password') {
// 							credentialInputValues.password = ''
// 						}
// 					})
// 					// reorder the property names
// 					const reordered: CredentialInputValuesType = {
// 						name: credentialInputValues.name,
// 						username: credentialInputValues.username,
// 						emailAddress: credentialInputValues.emailAddress,
// 						password: credentialInputValues.password
// 					}
// 					return reordered
// 				})
// 			}
// 			const init = async () => {
// 				const signUpInstance = await initSignUp()
// 				initCredentialInputValues(signUpInstance)
// 			}

// 			init()
// 		}
// 	}, [signUp, isLoaded, credentialInputValues])

// 	// trigger that will reset sign up
// 	useEffect(() => {
// 		if (mode !== 'sign-up') {
// 			setCredentialInputValues(() => null)
// 		}
// 	}, [mode])

// 	return (
// 		<div>
// 			{
// 				credentialInputValues && 
// 				<form onSubmit={submitCredentials}>
// 					<div className='InputWrapper'>
// 					{ (Object.keys(credentialInputValues) as Array<keyof typeof credentialInputValues>).map(fieldName => {
// 						if (!credentialInputValues[fieldName] === undefined) return
// 						if (fieldName === 'emailAddress') {
// 							return (
// 								<div key={fieldName}>
// 									<input placeholder={'Email'} type='email' onChange={e => onCredentialInputChange(e, fieldName)} required/>
// 								</div>
// 							)
// 						} else if (fieldName === 'password') {
// 							return (
// 								<div key={fieldName}>
// 									<input placeholder={'Password'} type='password' onChange={e => onCredentialInputChange(e, fieldName)} required/>
// 								</div>
// 							)
// 						} else if (fieldName === 'name') {
// 							return (
// 								<div key={fieldName}>
// 									<input placeholder={'First and last name'} type='text' onChange={e => onCredentialInputChange(e, fieldName)} required/>
// 								</div>
// 							)
// 						} else if (fieldName === 'username') {
// 							return (
// 								<div key={fieldName}>
// 									<input placeholder={'Username'} type='text' onChange={e => onCredentialInputChange(e, fieldName)} required/>
// 								</div>
// 							)
// 						}
// 					})}
// 					</div>
// 					<button type='submit'>continue</button>
// 				</form>
// 			}
// 		</div>
// 	)
// }




















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

