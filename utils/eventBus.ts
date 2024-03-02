import mitt, { type Emitter } from 'mitt';

export enum EventType {
    // Used to open delivery address dialog
    OPEN_DELIVERY_ADDRESS = 'openDeliveryAddress',
    // Used to receive a message to print in the snackbar
    SNACKBAR_MESSAGE = 'snackbarMessage'
};

export const emitter = mitt();
