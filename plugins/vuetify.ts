import '@mdi/font/css/materialdesignicons.css';

import 'vuetify/styles';
import { createVuetify, type ThemeDefinition } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg';

const customTheme: ThemeDefinition = {
    dark: false,
    colors: {
        text: '#151515',
        secondary: '#656565',
        tertiary: '#c5c5c5',
        primary: '#4734F6',
        error: '#B00020',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',
    }
};

export default defineNuxtPlugin((app) => {
    const vuetify = createVuetify({
        theme: {
            defaultTheme: 'customTheme',
            themes: {
                customTheme
            },
        },
        icons: {
            defaultSet: 'mdi',
            aliases,
            sets: {
                mdi: mdi
            }
        }
    });
    app.vueApp.use(vuetify);
});
