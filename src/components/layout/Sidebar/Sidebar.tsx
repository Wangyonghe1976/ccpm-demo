import { FC } from 'react'
import styles from './Sidebar.module.css'

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
  children?: React.ReactNode
}

export const Sidebar: FC<SidebarProps> = ({ isOpen = true, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className={styles.overlay} onClick={onClose} />
      )}
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <div className={styles.content}>
          {children}
        </div>
      </aside>
    </>
  )
}