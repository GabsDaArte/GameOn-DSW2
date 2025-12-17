import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
import { getGameImage } from '../../utils/gameImages'; 

function Home({ sessions }) {
  const navigate = useNavigate();
  const carouselRef = useRef(null);

  const handleLeftClick = (e) => {
    e.preventDefault();
    if(carouselRef.current) carouselRef.current.scrollLeft -= carouselRef.current.offsetWidth;
  };

  const handleRightClick = (e) => {
    e.preventDefault();
    if(carouselRef.current) carouselRef.current.scrollLeft += carouselRef.current.offsetWidth;
  };

  const popularGames = [
    { name: "League of Legends", sessions: "1.2k" }, 
    { name: "Valorant", sessions: "850" }, 
    { name: "Overwatch 2", sessions: "500" }, 
    { name: "The Witcher 3", sessions: "320" }, 
    { name: "Elden Ring", sessions: "290" },
    { name: "Counter-Strike 2", sessions: "1.5k" },
    { name: "Minecraft", sessions: "900" },
    { name: "Fortnite", sessions: "1.1k" }
  ];

  const releases = [
      "Back 4 Blood",
      "Horizon Forbidden West",
      "Ghostwire: Tokyo",
      "Elden Ring",
      "Dying Light 2"
  ];

  return (
    <div className={styles.homeContainer}>
      
      {/* SESSÕES ATIVAS */}
      {sessions && sessions.length > 0 && (
        <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Sessões Ativas</h2>
            <div className={styles.gamesGrid}>
                {sessions.slice(0, 4).map(session => {
                    const participantes = session.participantes || [];
                    const isHost = participantes[0].includes("(Você)");
                    const isMe = participantes.some(p => p.includes("(Você)"));
                    const visibleParticipants = participantes.slice(0, 4);

                    return (
                        <div 
                            key={session.id} 
                            className={styles.sessionCard}
                            onClick={() => navigate(`/session/${session.id}`)}
                            style={{ border: isHost ? '1px solid #FFD700' : (isMe ? '1px solid #8A2BE2' : '1px solid transparent') }}
                        >
                            <div className={styles.cardBackground} style={{ backgroundImage: `url(${getGameImage(session.jogo)})` }}></div>
                            <div className={styles.cardOverlay}>
                                <div className={styles.cardHeader}>
                                    <span className={styles.timeBadge}>{new Date(session.data).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                                    {isHost && <span style={{color: '#FFD700', fontSize: '0.8rem', fontWeight:'bold'}}>👑 Host</span>}
                                </div>
                                <div className={styles.cardInfo}>
                                    <h3>{session.titulo}</h3>
                                    <span className={styles.gameName}>{session.jogo}</span>
                                </div>
                                <div className={styles.avatarStack}>
                                    {visibleParticipants.map((nome, idx) => (
                                        <img key={idx} src={nome.includes("(Você)") ? "https://github.com/shadcn.png" : `https://api.dicebear.com/7.x/avataaars/svg?seed=${nome}`} className={styles.stackAvatar} style={{ zIndex: 10 - idx }} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
      )}

      {/* LANÇAMENTOS */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Lançamentos</h2>
        <div className={styles.carouselWrapper}>
             <button className={styles.arrowBtn} onClick={handleLeftClick} style={{left: '-20px'}}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg></button>
            
            <div className={styles.carouselContainer} ref={carouselRef}>
                {releases.map((gameName, index) => (
                    <div 
                        key={index}
                        className={styles.carouselItem}
                        onClick={() => navigate(`/game/${gameName}`)}
                    >
                        <img 
                            src={getGameImage(gameName)} 
                            alt={gameName}
                            className={styles.carouselImage} 
                        />
                        <span className={styles.carouselTitle}>{gameName}</span>
                    </div>
                ))}
            </div>

            <button className={styles.arrowBtn} onClick={handleRightClick} style={{right: '-20px'}}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg></button>
        </div>
      </section>

      {/* MAIS JOGADOS */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Mais Jogados</h2>
        </div>
        
        <div className={styles.gamesGrid}>
            {popularGames.map((gameObj, index) => (
                <div 
                    className={styles.gameCard} 
                    key={index}
                    onClick={() => navigate(`/game/${gameObj.name}`)}
                >
                    <div className={styles.imageWrapper}>
                        <img src={getGameImage(gameObj.name)} alt={gameObj.name} className={styles.cardImg} />
                    </div>
                    <h3>{gameObj.name}</h3>
                    <p>{gameObj.sessions} Sessões</p>
                </div>
            ))}
        </div>
      </section>

    </div>
  );
}

export default Home;