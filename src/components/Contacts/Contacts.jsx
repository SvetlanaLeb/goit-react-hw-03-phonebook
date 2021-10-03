import PropTypes from 'prop-types';
import s from './Contacts.module.css';

const Contacts = ({ data, onDeleteContact }) => (
    <ul className={s.list}>
        {data.map(({ id, name, number }) => {
            return (
                <li key={id} className={s.listItem}>
                    <p className={s.name}>
                        {name}: <span className={s.number}>{number}</span>
                    </p>
                    <button
                        className={s.button}
                        onClick={() => onDeleteContact(id)}
                    >
                        Delete
                    </button>
                </li>
            );
        })}
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
