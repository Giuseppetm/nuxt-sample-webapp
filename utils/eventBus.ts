import mitt from 'mitt';

export enum EventType {
    // Used to open delivery addresses dialog
    OPEN_DELIVERY_ADDRESSES = 'openDeliveryAddresses',
};

export const emitter = mitt();
