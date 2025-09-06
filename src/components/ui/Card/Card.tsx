import { FC } from 'react'
import styles from './Card.module.css'

interface CardProps {
  children?: React.ReactNode
  className?: string
  title?: string
  actions?: React.ReactNode
}

export const Card: FC<CardProps> = ({ children, className = '', title, actions }) => {
  return (
    <div className={`${styles.card} ${className}`}>
      {title && (
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          {actions && <div className={styles.actions}>{actions}</div>}
        </div>
      )}
      <div className={styles.content}>
        {children}
      </div>
    </div>
  )
}