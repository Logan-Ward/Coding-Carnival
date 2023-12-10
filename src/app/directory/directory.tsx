// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './directory.module.scss';

function Directory() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={styles.ul}>
          <li className={styles.li}>
            <a href="/About" className={styles.a}>About Me</a>
          </li>
          <li className={styles.li}>
            <a href="/EdificeBuild" className={styles.a}>Edifice Build</a>
          </li>
          <li className={styles.li}>
            <a href="/LeChat" className={styles.a}>Le Chat</a>
          </li>
          {/* <li className={styles.li}>
            <a href="/About" className={styles.a}>D&D Craft&Cast</a>
          </li> */}
          {/* <li className={styles.li}>
            <a className={styles.a}>Warframe Project?</a>
          </li> */}
        </ul>
      </nav>
    </header>
  );
}

export default Directory;
