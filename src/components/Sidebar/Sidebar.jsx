import { useNavigate } from 'react-router-dom';
import styles from './Sidebar.module.css';
import { getGameImage } from '../../utils/gameImages'; 

function Sidebar({ isOpen, onOpenModal, sessions, currentUser }) {
  const navigate = useNavigate();
  const sidebarClasses = isOpen ? styles.sidebar : `${styles.sidebar} ${styles.sidebarClosed}`;

  const myName = currentUser || "Você";

  const formatTime = (dateString) => {
    if(!dateString) return "--:--";
    return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const mySessions = sessions.filter(session => {
      const parts = session.participantes || [];
      return parts.includes(myName);
  });

  mySessions.sort((a, b) => new Date(a.data) - new Date(b.data));

  return (
    <aside className={sidebarClasses}>
      <div className={styles.header}><h3>Minhas Sessões</h3></div>
      
      <div className={styles.sessionList}>
        {mySessions.length === 0 ? (
            <div className={styles.emptyState}>
                <p>🚫</p>
                <span>Você não está em nenhuma sessão.</span>
                <small>Entre em uma ou crie a sua!</small>
            </div>
        ) : (
            mySessions.map((session) => {
                const participantes = session.participantes || [];
                const isHost = participantes[0] === myName;
                const maxVisible = 4;
                const extraCount = participantes.length - maxVisible;
                const visibleParticipants = participantes.slice(0, maxVisible);

                return (
                    <div 
                        className={styles.sessionCard} 
                        key={session.id}
                        onClick={() => navigate(`/session/${session.id}`)}
                        style={{ 
                            border: isHost ? '1px solid #FFD700' : '1px solid #8A2BE2',
                            cursor: 'pointer'
                        }}
                    >
                        <div 
                            className={styles.cardBackground}
                            style={{ backgroundImage: `url(${getGameImage(session.jogo)})` }}
                        ></div>
                        
                        <div className={styles.cardOverlay}>
                            <div className={styles.cardHeader}>
                                <div className={styles.timeBadge}>{formatTime(session.data)}</div>
                                {isHost && <span style={{color: '#FFD700', fontSize: '0.8rem'}}>👑 Host</span>}
                            </div>

                            <div className={styles.cardInfo}>
                                <strong>{session.titulo}</strong>
                                <span className={styles.gameName}>{session.jogo}</span>
                            </div>
                            
                            <div className={styles.avatarStack}>
                                {visibleParticipants.map((nome, idx) => (
                                    <img 
                                        key={idx}
                                        src={nome.includes("(Você)") ? "https://github.com/shadcn.png" : `https://api.dicebear.com/7.x/avataaars/svg?seed=${nome}`}
                                        className={styles.stackAvatar}
                                        title={nome}
                                        style={{ zIndex: 10 - idx }}
                                    />
                                ))}
                                {participantes.length > maxVisible && (
                                    <div className={styles.stackCounter} style={{ zIndex: 5 }}>+{extraCount}</div>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })
        )}
        <button className={styles.createButton} onClick={onOpenModal}>+ Criar Sessão</button>
      </div>
    </aside>
  );
}
export default Sidebar;