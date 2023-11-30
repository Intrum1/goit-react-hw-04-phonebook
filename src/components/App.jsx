import React, { Component } from 'react';
import ContactForm from './ContactForm/ContactFofm';
import ContactList from './ContactList/ContactList';
import styles from './App.module.css';
import { Filter } from './Filter/Filter';

export class App extends Component {
  // Состояние для управления списком контактов и вводом фильтра
  state = {
    contacts: [
      {id: 'id-1', name: 'Volodymyr Zelenskyi', number: '777-77-77' },
      {id: 'id-2', name: 'Oleksandr Makedonskyi', number: '999-99-99'},
      {id: 'id-3', name: 'Bonopart Napoleon', number: '222-22-22'},
      {id: 'id-4', name: 'Oleksandr Repeta', number: '111-11-11'},
    ],
    filter: '',
  };

componentDidMount() {
  const savedContacts = JSON.parse(localStorage.getItem('contacts'));

  if (savedContacts) {
    this.setState({ contacts: savedContacts})
  }
}

componentDidUpdate(prevProps, prevState) {
  if (prevState.contacts !==this.state.contacts) {
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }
}


  // Обрабатывает изменения ввода фильтра
  handleFilterChange = e => {
    this.setState({ filter: e.target.value });
  };
  // Обрабатывает отправку формы для добавления нового контакта
  handleSubmit = newContact => {
    const { contacts } = this.state;

    // Проверяет, существует ли контакт с таким же именем
    if (
      contacts.some(
        contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
      )
    ) {
      alert(`Contact with name "${newContact.name}" already exists!`);
      return;
    }
    // Добавляет новый контакт в состояние
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };
  // Обрабатывает удаление контакта
  handleDeleteContact = id => {
    // Фильтрует контакт с указанным идентификатором
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    // Фильтрует контакты на основе введенного фильтра
    const { contacts, filter } = this.state;
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    // Рендерит основной интерфейс приложения
    return (
      <div className="container">
        <h1 className={styles.title}>Phonebook</h1>
        <ContactForm onSubmit={this.handleSubmit} />
        <h2 className={styles.subtitle}>Contacts</h2>
        <Filter onChange={this.changeFilter} />

        <ContactList
          contacts={filteredContacts}
          onDeleteContact={this.handleDeleteContact}
        />
      </div>
    );
  }
}
