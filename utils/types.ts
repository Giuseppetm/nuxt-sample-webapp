export interface DeliveryAddress {
    city: string,
    address: string,
    note: string
};

export interface Product {
    id: number,
    title: string,
    description: string,
    discountPercentage: number,
    price: number,
    rating: number
};

export interface User {
    id: number,
    username: string,
    email: string,
    firstName: string,
    lastName: string,
    image: string
};
