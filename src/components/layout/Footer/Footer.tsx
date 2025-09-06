import { FC } from 'react'
import styles from './Footer.module.css'

interface FooterProps {
  version?: string
}

export const Footer: FC<FooterProps> = ({ version = '1.0.0' }) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <span className={styles.text}>
          AI Assistant Note Integration v{version}
        </span>
        <span className={styles.copyright}>
          © 2025 All rights reserved
        </span>
      </div>
    </footer>
  )
}