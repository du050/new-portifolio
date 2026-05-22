export interface CreateContactRequest {
    readonly name: string;
    readonly email: string;
    readonly subject: string;
    readonly message: string;
}
export interface ContactMessage {
    readonly id: string;
    readonly name: string;
    readonly email: string;
    readonly subject: string;
    readonly message: string;
    readonly createdAt: string;
}
