import styles from './ContactForm.module.css';
import { nanoid } from 'nanoid';
const { Component } = require('react');

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { name, number } = this.state;

    if (!name || !number) {
      alert('Пожалуйста, введите и имя, и номер.');
      return;
    }

    this.props.onSubmit({ id: nanoid(), name, number });
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className={styles.form}>
        <label>
          <input
            type="text"
            name="name"
            placeholder="Имя:"
            value={name}
            onChange={this.handleChange}
            className={styles.input}
          />
        </label>
        <label>
          <input
            type="tel"
            name="number"
            placeholder="Номер:"
            value={number}
            onChange={this.handleChange}
            className={styles.input}
          />
        </label>
        <button type="submit" className={styles.button}>
          Добавить контакт
        </button>
      </form>
    );
  }
}

export default ContactForm;
