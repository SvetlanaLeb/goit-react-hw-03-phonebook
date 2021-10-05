import PropTypes from 'prop-types';
import s from './Contacts.module.css';
import ContactsItem from '../ContactsItem/ContactsItem';

const Contacts = ({ data, onDeleteContact }) => (
    <ul className={s.list}>
        {data.map(({ id, name, number }) => (
            <ContactsItem
                key={id}
                id={id}
                name={name}
                number={number}
                onDeleteContact={onDeleteContact}
            />
        ))}
    </ul>
);

Contacts.propTypes = {
    data: PropTypes.oneOfType([
        PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired,
                number: PropTypes.string.isRequired,
            }),
        ),
        PropTypes.array,
    ]),
    onDeleteContact: PropTypes.func.isRequired,
};

export default Contacts;
