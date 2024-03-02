export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'en',
    messages: {
        it: {
            seo: {
                brandName: 'Nuxt Sample WebApp',
                homepage: {
                    title: 'Homepage',
                    description: 'Questa pagina contiene una tabella di dati che consente di eseguire operazioni CRUD.'
                },
                login: {
                    title: 'Login',
                    description: 'Questa pagina consente di eseguire il login a questa web-app.'
                },
                registration: {
                    title: 'Registrazione',
                    description: 'Questa pagina consente di registrarsi a questa web-app.'
                }
            },
            localization: {
                language: 'Lingua',
                italian: 'Italiano',
                english: 'Inglese'
            }
        },
        en: {
            seo: {
                brandName: 'Nuxt Sample WebApp',
                homepage: {
                    title: 'Homepage',
                    description: 'This page contains a data table that allows to perform CRUD operations.'
                },
                login: {
                    title: 'Login',
                    description: 'This page allows you to perform the login to this web-app.'
                },
                registration: {
                    title: 'Registration',
                    description: 'This page allows you to register to this web-app.'
                }
            },
            localization: {
                language: 'Language',
                italian: 'Italian',
                english: 'English'
            }
        }
    }
}));
