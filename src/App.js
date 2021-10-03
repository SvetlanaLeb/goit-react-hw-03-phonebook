import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Phonebook from './components/Phonebook/Phonebook';
import Container from './components/Container/Container';
import Contacts from './components/Contacts/Contacts';
import Filter from './components/Filter/Filter';

class App extends Component {
    state = {
        contacts: [
            { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
            { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
            { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
            { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
        ],
        filter: '',
    };
    componentDidMount() {
        const contacts = localStorage.getItem('contacts');
        const parsedContacts = JSON.parse(contacts);
        if (parsedContacts) {
            this.setState({ contacts: parsedContacts });
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.contacts !== prevState.contacts) {
            localStorage.setItem(
                'contacts',
                JSON.stringify(this.state.contacts),
            );
        }
    }

    formSubmitHandler = ({ name, number }) => {
        const normalizedName = name.toLowerCase();

        const checkedForName = this.state.contacts.find(
            contact => normalizedName === contact.name.toLowerCase(),
        );

        if (checkedForName) {
            return toast.error(`${name} is already in contacts`);
        }

        const newContact = {
            id: uuidv4(),
            name,
            number,
        };

        this.setState(({ contacts }) => ({
            contacts: [newContact, ...contacts],
        }));
    };

    FilterHandler = ({ name }) => {
        this.setState({ filter: name });
    };

    changeFilter = e => {
        this.setState({ filter: e.currentTarget.value });
    };

    getVisibleContacts = () => {
        const { contacts, filter } = this.state;
        const normalizedFilter = filter.toLowerCase();
        return contacts.filter(contact =>
            contact.name.toLowerCase().includes(normalizedFilter),
        );
    };

    deleteContact = contactId => {
        this.setState(({ contacts }) => ({
            contacts: contacts.filter(contact => contact.id !== contactId),
        }));
    };

    render() {
        const { contacts, filter } = this.state;
        const visibleContacts = this.getVisibleContacts();

        return (
            <Container>
                <h1>Phonebook</h1>
                <Phonebook
                    onSubmit={this.formSubmitHandler}
                    contacts={contacts}
                />
                <h2>Contacts</h2>
                <ToastContainer />
                <Filter value={filter} onChange={this.changeFilter} />
                <Contacts
                    data={visibleContacts}
                    onDeleteContact={this.deleteContact}
                />
            </Container>
        );
    }
}

export default App;
