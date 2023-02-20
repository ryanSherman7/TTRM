export default interface UserInterface {
    userName: string,
    email: string,
    firstName: string
    lastName: string,
    recoveryEmail: string,
    active: boolean
    lastLogin: Date
    permissionLevel: string
}