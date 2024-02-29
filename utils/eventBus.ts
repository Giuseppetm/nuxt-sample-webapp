import mitt from 'mitt';

export enum EventType {
    // Used to open delivery address dialog
    OPEN_DELIVERY_ADDRESS = 'openDeliveryAddress',
};

export const emitter = mitt();
