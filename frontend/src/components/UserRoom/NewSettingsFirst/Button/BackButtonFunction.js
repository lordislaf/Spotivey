export function goBackToLogin(navigate) {
    navigate('/login')
}

export function backButtonPressed(navigate) {
    navigate(-1)/* '/user', {state: { push: true }})*/
}