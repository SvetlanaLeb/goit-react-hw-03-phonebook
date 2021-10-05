import PropTypes from 'prop-types';
import s from './ContactsItem.module.css';

const ContactsItem = ({ id, name, number, onDeleteContact }) => (
    <li className={s.listItem}>
        <p className={s.name}>
            {name}: <span className={s.number}>{number}</span>
        </p>
        <button className={s.button} onClick={() => onDeleteContact(id)}>
            Delete
        </button>
    </li>
);

ContactsItem.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    onDeleteContact: PropTypes.func.isRequired,
};

export default ContactsItem;
