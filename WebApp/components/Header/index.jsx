import format from 'date-fns/format';
import en from 'date-fns/locale/en-US';


import styles from './styles.module.scss'

export default function Header() {

    const currentDate = format(new Date(), 'EEEEEE, d MMMM', {
        locale: en,
    })

    return (
        <header className={styles.headerContainer}>
            <img src="/logo.png" alt="pokemon" />
            <p>Welcome to the Pokemon world</p>
            <span>{currentDate}</span>
        </header>
    );

}