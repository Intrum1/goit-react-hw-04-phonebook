import styles from './ContactList.module.css'


const ContactList = ({ contacts, onDeleteContact }) => {

    return (
      <ul className={styles.contactList}>
        {contacts.map((contact) => (
          <li key={contact.id} className={styles.contactItem}>
            {contact.name}: {contact.number}
            <button onClick={() => onDeleteContact(contact.id)} className={styles.button}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    );
  }


export default ContactList;