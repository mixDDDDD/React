import { ReactNode } from 'react';
import styles from './Layout.module.css';

type LayoutProps = {
  children: ReactNode;
  userName?: string;
  onLogout?: () => void;
  onLoginClick?: () => void;
};

function Layout({ children, userName, onLogout, onLoginClick }: LayoutProps) {
  const isLoggedIn = Boolean(userName);

  return (
    <div className={styles.layout}>
      {/* ... твой header как есть ... */}
      <header className={styles.header}>
        {/* логотип и меню */}
        <div className={styles['header__right']}>
          {isLoggedIn ? (
            <>
              <span className={styles['header__user-name']}>{userName}</span>
              <button
                type="button"
                className={styles['header__profile-button']}
                onClick={onLogout}
              >
                Выйти
              </button>
            </>
          ) : (
            <button
              type="button"
              className={styles['header__profile-button']}
              onClick={onLoginClick}
            >
              Войти
            </button>
          )}
          {/* иконка */}
        </div>
      </header>

      <main className={styles['layout__content']}>
        {children}
      </main>
    </div>
  );
}

export default Layout;