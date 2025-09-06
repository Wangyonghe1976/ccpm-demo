import { FC } from 'react'
import styles from './Main.module.css'

interface MainProps {
  children?: React.ReactNode
  className?: string
}

export const Main: FC<MainProps> = ({ children, className = '' }) => {
  return (
    <main className={`${styles.main} ${className}`}>
      {children}
    </main>
  )
}