export interface Product {
    id: number,
    title: string,
    description: string,
    discountPercentage: number,
    price: number
};

export interface User {
    id: number,
    username: string,
    email: string,
    firstName: string,
    lastName: string,
    image: string,
    address: Address
};

export interface Address {
    address: string,
    city: string,
    postalCode: number,
    note: string
};

export enum Snackbar {
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
    STANDARD = 'STANDARD'
};
