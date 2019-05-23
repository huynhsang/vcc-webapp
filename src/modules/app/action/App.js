// Export Constants
export const IS_AUTHENTICATED = 'IS_AUTHENTICATED';
export const FAILED_AUTHENTICATION = 'FAILED_AUTHENTICATION';

// Export Actions
export function isAuthenticated() {
	return {
		type: IS_AUTHENTICATED
	}
}

export function failedAuthentication() {
	return {
		type: FAILED_AUTHENTICATION
	}
}