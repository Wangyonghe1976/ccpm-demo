import { FC } from 'react'
import styles from './Header.module.css'

interface HeaderProps {
  title?: string
  onMenuClick?: () => void
}

export const Header: FC<HeaderProps> = ({ title = 'AI Assistant Notes', onMenuClick }) => {
  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        <button className={styles.menuButton} onClick={onMenuClick} aria-label="Toggle menu">
          ☰
        </button>
        <h1 className={styles.title}>{title}</h1>
      </div>
      <div className={styles.rightSection}>
        <span className={styles.status}>Ready</span>
      </div>
    </header>
  )
}