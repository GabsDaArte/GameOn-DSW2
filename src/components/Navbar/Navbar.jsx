import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

// Lista de Jogos
const SUGGESTED_GAMES = [
  "League of Legends", "Valorant", "Overwatch 2", "Counter-Strike 2",
  "Fortnite", "Minecraft", "Dota 2", "Rocket League", "The Witcher 3", "Elden Ring"
];

function Navbar({ onOpenMenu, user, onLogout, onSearch }) {
  const [searchValue, setSearchValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const avatarUrl = user 
    ? `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.avatarSeed}`
    : "https://github.com/shadcn.png";

  const handleSearchChange = (e) => {
      const val = e.target.value;
      setSearchValue(val);
      onSearch(val);

      if (val.length > 0) {
          const filtered = SUGGESTED_GAMES.filter(g => g.toLowerCase().includes(val.toLowerCase()));
          setSuggestions(filtered);
      } else {
          setSuggestions([]);
      }
  };

  const selectSuggestion = (game) => {
      setSearchValue(game);
      onSearch(game);
      setSuggestions([]);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.leftSection}>
        <button className={styles.hamburger} onClick={onOpenMenu}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>
        <div className={styles.logoContainer}>
          <Link to="/" className={styles.logoText}>GameOn</Link>
        </div>
      </div>

      <div className={styles.searchWrapper}>
        <div className={styles.searchInner}>
           <svg className={styles.searchIcon} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
           
           <input 
             type="text" 
             placeholder="Buscar sessão..." 
             className={styles.searchInput}
             value={searchValue}
             onChange={handleSearchChange}
             onBlur={() => setTimeout(() => setSuggestions([]), 200)}
           />
        </div>
        
        {/* DROPDOWN DE SUGESTÕES */}
        {suggestions.length > 0 && (
            <ul className={styles.suggestionsDropdown}>
                {suggestions.map((game, idx) => (
                    <li key={idx} onClick={() => selectSuggestion(game)}>
                        {game}
                    </li>
                ))}
            </ul>
        )}
      </div>

      <div className={styles.profileContainer} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        {user && <span style={{ fontWeight: 'bold', color: '#fff', fontSize: '1rem' }}>{user.name}</span>}
        <div className={styles.avatarContainer}>
            <div className={styles.avatar}>
               <img src={avatarUrl} alt="Perfil" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
            </div>
        </div>
        <button onClick={onLogout} style={{background: 'transparent', border: '1px solid #3f3f46', color: '#ef4444', padding: '6px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 'bold'}}>
            Sair
        </button>
      </div>
    </nav>
  );
}
export default Navbar;