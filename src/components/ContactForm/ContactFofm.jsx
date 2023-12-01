import styles from './ContactForm.module.css';
import { nanoid } from 'nanoid';
import  React, {useState} from 'react';

const ContactForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
   });
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value}));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, number } = formData;

    if (!name || !number) {
      alert('Please enter both name and number.');
      return;
    }

    onSubmit({ id: nanoid(), name, number });
    setFormData({ name: '', number: '' });
  };

 
    return (
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          <input
            type="text"
            name="name"
            placeholder="Имя:"
            value={formData.name}
            onChange={handleInputChange}
            className={styles.input}
          />
        </label>
        <label>
          <input
            type="tel"
            name="number"
            placeholder="Number:"
            value={formData.number}
            onChange={handleInputChange}
            className={styles.input}
          />
        </label>
        <button type="submit" className={styles.button}>
        Add Contact
        </button>
      </form>
    );
  }


export default ContactForm;
