export interface DeliveryAddress {
    city: string,
    address: string,
    note: string
};

export interface Model {
    id: number,
    title: string,
    description: string,
    discountPercentage: number,
    price: number,
    rating: number
};
