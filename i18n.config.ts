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
            },
            snackbar: {
                success: {
                    logout: 'Logout effettuato con successo.',
                    login: 'Login effettuato con successo.',
                    registration: 'Registrazione effettuata con successo.',
                    deliveryAddress: {
                        edit: 'Indirizzo di spedizione modificato con successo.'
                    },
                    products: {
                        create: 'Prodotto creato con successo.',
                        edit: 'Prodotto modificato con successo.',
                        delete: 'Prodotto eliminato con successo.'
                    }
                },
                error: {
                    logout: `È stato riscontrato un errore durante il logout.`,
                    login: `È stato riscontrato un errore durante il login.`,
                    registration: `È stato riscontrato un errore durante la registrazione.`,
                    deliveryAddress: {
                        edit: `È stato riscontrato un errore durante la modifica dell'indirizzo di spedizione.`
                    },
                    products: {
                        retrieve: `È stato riscontrato un errore durante il reperimento dei dati riguardanti i prodotti.`,
                        create: `È stato riscontrato un errore durante l'inserimento del nuovo prodotto.`,
                        edit: `È stato riscontrato un errore durante la modifica del prodotto.`,
                        delete: `È stato riscontrato un errore durante l'eliminazione del prodotto.`
                    }
                }
            },
            header: {
                avatar: {
                    deliveryAddress: 'Indirizzo di spedizione',
                    logout: 'Logout'
                },
                deliveryAddress: {
                    title: 'Gestisci il tuo indirizzo di spedizione',
                    description: {
                        new: 'Non è stato ancora inserito un indirizzo di consegna. Compilare il modulo sottostante.',
                        edit: 'Inserire un nuovo indirizzo'
                    },
                    form: {
                        city: {
                            value: 'Città',
                            placeholder: 'Inserisci la città',
                            required: 'La città è obbligatoria.'
                        },
                        postalCode: {
                            value: 'Codice postale',
                            placeholder: 'Inserisci il codice postale',
                            required: 'Il codice postale è obbligatorio.'
                        },
                        address: {
                            value: 'Indirizzo',
                            placeholder: `Inserisci l'indirizzo`,
                            required: `L'indirizzo è obbligatorio.`
                        },
                        note: {
                            value: 'Note (opzionali)',
                            placeholder: 'Inserisci eventuali note (opzionali)'
                        }
                    },
                    editButton: 'Modifica indirizzo',
                    saveButton: 'Salva indirizzo'
                }
            },
            homepage: {
                title: 'Questa è una semplice applicazione web con alcune funzionalità.',
                description: 'In basso è presente una tabella di prodotti che consente di eseguire operazioni CRUD.',
                dataTable: {
                    search: 'Cerca un prodotto',
                    addProduct: 'Aggiungi un prodotto',
                    itemsPerPage: 'Elementi per pagina',
                    noDataAvailable: 'Nessun prodotto disponibile.',
                    error: 'È stato riscontrato un errore; ricarica la pagina.',
                    headers: {
                        id: 'ID',
                        title: 'Titolo',
                        description: 'Descrizione',
                        discountPercentage: 'Sconto in percentuale',
                        price: 'Prezzo',
                        actions: 'Azioni'
                    },
                    dialog: {
                        create: {
                            title: 'Inserisci un nuovo prodotto',
                            description: 'Compila il form sottostante con le informazioni richieste.',
                            button: 'Aggiungi'
                        },
                        edit: {
                            title: 'Modifica il prodotto',
                            description: 'Modifica le informazioni riguardo questo prodotto',
                            button: 'Modifica'
                        },
                        delete: {
                            title: 'Eliminare il prodotto?',
                            button: {
                                cancel: 'Annulla',
                                delete: 'Elimina'
                            }
                        },
                        form: {
                            title: {
                                value: 'Titolo',
                                placeholder: 'Inserisci il titolo del prodotto',
                                required: 'Il titolo del prodotto è obbligatorio.'
                            },
                            description: {
                                value: 'Descrizione',
                                placeholder: 'Inserisci la descrizione del prodotto',
                                required: 'La descrizione del prodotto è obbligatoria.'
                            },
                            discountPercentage: {
                                value: 'Percentuale di sconto',
                                placeholder: 'Inserisci la percentuale di sconto del prodotto',
                                required: 'La percentuale di sconto del prodotto è obbligatoria.',
                                valid: 'La percentuale di sconto del prodotto non è valida.'
                            },
                            price: {
                                value: 'Prezzo',
                                placeholder: 'Inserisci il prezzo del prodotto',
                                required: 'Il prezzo del prodotto è obbligatorio.',
                                valid: 'Il prezzo del prodotto non è valida.'
                            }
                        },
                        resetFields: 'Azzera i campi'
                    }
                }
            },
            registration: {
                title: {
                    p1: 'Crea un',
                    p2: 'nuovo account'
                },
                form: {
                    name: {
                        value: 'Nome',
                        placeholder: 'Inserisci il tuo nome',
                        required: 'Il nome è obbligatorio.'
                    },
                    surname: {
                        value: 'Cognome',
                        placeholder: 'Inserisci il tuo cognome',
                        required: 'Il cognome è obbligatorio.'
                    },
                    email: {
                        value: 'E-mail',
                        placeholder: 'Inserisci la tua e-mail',
                        required: `L'e-mail è obbligatoria.`,
                        valid: `L'e-mail inserita non è valida.`
                    },
                    password: {
                        value: 'Password',
                        placeholder: 'Inserisci la password',
                        required: `La password è obbligatoria.`
                    },
                    confirmPassword: {
                        value: 'Conferma la password',
                        placeholder: 'Re-inserisci la password',
                        required: `La conferma della password è obbligatoria.`,
                        valid: `La password confermata non corrisponde.`
                    }
                },
                button: 'Registrati',
                login: {
                    p1: 'Se hai già un account',
                    p2: 'clicca qui',
                    p3: 'per effettuare il login.'
                }
            },
            login: {
                title: {
                    p1: 'Per continuare effettua il',
                    p2: 'login'
                },
                form: {
                    username: {
                        value: 'Nome utente',
                        placeholder: 'Inserisci il tuo nome utente',
                        required: 'Il nome utente è obbligatorio.'
                    },
                    password: {
                        value: 'Password',
                        placeholder: 'Inserisci la password',
                        required: `La password è obbligatoria.`
                    }
                },
                button: 'Login',
                registration: {
                    p1: 'Per creare un nuovo account',
                    p2: 'clicca qui'
                }
            },
            footer: {
                madeBy: 'Sviluppato da',
                author: 'Giuseppe Del Campo'
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
            },
            snackbar: {
                success: {
                    logout: 'Logout performed successfully.',
                    login: 'Successfully logged in.',
                    registration: 'Registration made successfully.',
                    deliveryAddress: {
                        edit: 'Delivery address successfully edited.'
                    },
                    products: {
                        create: 'Product successfully created.',
                        edit: 'Product successfully edited.',
                        delete: 'Product successfully deleted.'
                    }
                },
                error: {
                    logout: `An error has occurred during logout.`,
                    login: `An error has occurred during login.`,
                    registration: `An error has occurred during registration.`,
                    deliveryAddress: {
                        edit: `An error has occurred while editing the delivery address.`
                    },
                    products: {
                        retrieve: `An error has occurred while retrieving data regarding products.`,
                        create: `An error has occurred while entering the new product.`,
                        edit: `An error has occurred while editing the product.`,
                        delete: `An error has occurred while deleting the product.`
                    }
                }
            },
            header: {
                avatar: {
                    deliveryAddress: 'delivery address',
                    logout: 'Logout'
                },
                deliveryAddress: {
                    title: 'Manage your shipping address',
                    description: {
                        new: 'You have not yet entered a delivery address. Please fill out the form below.',
                        edit: 'Enter a new address'
                    },
                    form: {
                        city: {
                            value: 'City',
                            placeholder: 'Enter city',
                            required: 'City is required.'
                        },
                        postalCode: {
                            value: 'Postal code',
                            placeholder: 'Enter postal code',
                            required: 'Postcode is mandatory.'
                        },
                        address: {
                            value: `Address`,
                            placeholder: `Enter address`,
                            required: `Address is mandatory.`
                        },
                        notes: {
                            value: `Notes (optional)`,
                            placeholder: `Enter any notes (optional)`
                        }
                    },
                    editButton: 'Edit address',
                    saveButton: 'Save address'
                }
            },
            homepage: {
                title: 'This is a simple web application with some functionality.',
                description: 'Down below there is a product table that allows you to perform CRUD operations.',
                dataTable: {
                    search: 'Search for a product',
                    addProduct: 'Add a product',
                    itemsPerPage: 'Items per page',
                    noDataAvailable: 'There are no products available.',
                    error: 'An error has occurred; please reload the page.',
                    headers: {
                        id: 'ID',
                        title: 'Title',
                        description: 'Description',
                        discountPercentage: 'Discount in percentage',
                        price: 'Price',
                        actions: 'Actions'
                    },
                    dialog: {
                        create: {
                            title: 'Enter a new product',
                            description: 'Fill out the form below with the required information.',
                            button: 'Add'
                        },
                        edit: {
                            title: 'Edit product',
                            description: 'Edit the information about this product',
                            button: 'Edit'
                        },
                        delete: {
                            title: 'Delete the product?',
                            button: {
                                cancel: 'Cancel',
                                delete: 'Delete'
                            }
                        },
                        form: {
                            title: {
                                value: 'Title',
                                placeholder: 'Enter the title of the product',
                                required: 'The product title is mandatory.'
                            },
                            description: {
                                value: 'Description',
                                placeholder: 'Enter product description',
                                required: 'The product description is mandatory.'
                            },
                            discountPercentage: {
                                value: 'Discount percentage',
                                placeholder: 'Enter the discount percentage of the product',
                                required: 'The discount percentage of the product is mandatory.',
                                valid: 'Product discount percentage is invalid.'
                            },
                            price: {
                                value: 'Price',
                                placeholder: 'Enter the price of the product',
                                required: 'Product price is required.',
                                valid: 'Product price is invalid.'
                            }
                        },
                        resetFields: 'Reset fields'
                    }
                }
            },
            registration: {
                title: {
                    p1: 'Create a',
                    p2: 'new account'
                },
                form: {
                    name: {
                        value: 'Name',
                        placeholder: 'Enter your name',
                        required: 'Name is required.'
                    },
                    surname: {
                        value: 'Last name',
                        placeholder: 'Enter your last name',
                        required: 'Last name is mandatory.'
                    },
                    email: {
                        value: 'Email',
                        placeholder: `Enter your e- mail`,
                        required: `The email is required.`,
                        valid: `The e- mail you entered is invalid.`
                    },
                    password: {
                        value: `Password`,
                        placeholder: `Enter password`,
                        required: `The password is mandatory.`
                    },
                    confirmPassword: {
                        value: `Confirm password`,
                        placeholder: `Re-enter password`,
                        required: `Confirm password is mandatory.`,
                        valid: `The confirmed password does not match.`
                    }
                },
                button: `Register`,
                login: {
                    p1: `If you already have an account`,
                    p2: 'click here',
                    p3: 'to login.'
                }
            },
            login: {
                title: {
                    p1: 'To continue you must',
                    p2: 'log in'
                },
                form: {
                    username: {
                        value: 'Username',
                        placeholder: 'Enter your username',
                        required: 'Username is mandatory.'
                    },
                    password: {
                        value: 'Password',
                        placeholder: `Enter your password`,
                        required: `The password is mandatory.`
                    }
                },
                button: `Login`,
                registration: {
                    p1: 'To create a new account',
                    p2: 'click here'
                }
            },
            footer: {
                madeBy: 'Developed by',
                author: 'Giuseppe Del Campo'
            }
        }
    }
}));
