import React, { useState, useEffect } from 'react';
import ContactForm from './ContactForm/ContactFofm';
import ContactList from './ContactList/ContactList';
import styles from './App.module.css';


export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const storedContacts = localStorage.getItem("contacts");
    return storedContacts ? JSON.parse(storedContacts) : [];
  });

  const [filter, setFilter] = useState("");

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSubmit = (newContact) => {
    if (contacts.some((contact) => contact.name.toLowerCase() === newContact.name.toLowerCase())) {
      alert(`Contact with name "${newContact.name}" already exists!`);
      return;
    }
    setContacts((prevContacts) => [...prevContacts, newContact]);
  };

  const handleDeleteContact = (id) => {
    setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== id));
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );
  
    return (
      <div className={styles.container}>
      <h1 className={styles.title}>Phonebook</h1>
      <ContactForm onSubmit={handleSubmit} />
      <h2 className={styles.subtitle}>Contacts</h2>
      <input
        type="text"
        placeholder="Search contacts"
        value={filter}
        onChange={handleFilterChange}
        className={styles.input}
      />
      <ContactList contacts={filteredContacts} onDeleteContact={handleDeleteContact} />
    </div>
    );
  }

