import styles from './style.module.css';

function MainLayout({ children }) {
  const { container, wrapLayout } = styles;
  return (
    <main className={wrapLayout}>
      <div className={container}>{children}</div>
    </main>
  );
}

export default MainLayout;
