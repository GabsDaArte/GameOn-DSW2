import { Link } from 'react-router-dom';
import styles from './Sidebar.module.css';

function Navbar({ onOpenMenu }) {
  return (
    <nav className={styles.navbar}>
      <div className={styles.leftSection}>
        <button className={styles.hamburger} onClick={onOpenMenu}>
          {/* ... SVG hamburguer ... */}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>

        <div className={styles.logoContainer}>
          <Link to="/" className={styles.logoText}>GameOn</Link>
        </div>
      </div>

      {/* SEARCHBAR COM ICONE E GRADIENTE */}
      <div className={styles.searchWrapper}>
        <div className={styles.searchInner}>
           {/* Ícone de Lupa */}
           <svg className={styles.searchIcon} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
           
           <input 
             type="text" 
             placeholder="Buscar sessão..." 
             className={styles.searchInput}
           />
        </div>
      </div>

      <div className={styles.profileContainer}>
        {/* BOTÃO RESET (Pode remover depois) */}
        <button onClick={() => { localStorage.clear(); window.location.reload(); }} style={{marginRight: 10, background: 'red', border: 'none', color: 'white', borderRadius: 4, cursor: 'pointer'}}>RESET</button>
        
        {/* AVATAR COM BORDA GRADIENTE */}
        <div className={styles.avatarContainer}>
            <div className={styles.avatar}>
               <img src="https://github.com/shadcn.png" alt="Perfil" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
            </div>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;