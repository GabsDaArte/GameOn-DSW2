import { useRef } from 'react';
import styles from './Home.module.css';
import { getGameImage } from '../../utils/gameImages'; 

function Home() {
  const carouselRef = useRef(null);

  // Funções que estavam dando erro "unused"
  const handleLeftClick = (e) => {
    e.preventDefault();
    if(carouselRef.current) {
        carouselRef.current.scrollLeft -= carouselRef.current.offsetWidth;
    }
  };

  const handleRightClick = (e) => {
    e.preventDefault();
    if(carouselRef.current) {
        carouselRef.current.scrollLeft += carouselRef.current.offsetWidth;
    }
  };

  // Lista fixa para evitar o erro do Math.random
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

  return (
    <div className={styles.homeContainer}>
      
      {/* SEÇÃO 1: LANÇAMENTOS (Carrossel) */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Lançamentos</h2>
        
        <div className={styles.carouselWrapper}>
            {/* BOTÃO ESQUERDA - Com onClick corrigido */}
            <button className={styles.arrowBtn} onClick={handleLeftClick} style={{left: '-20px'}}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
            </button>

            <div className={styles.carouselContainer} ref={carouselRef}>
                <div className={styles.carouselItem}>
                    <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/924970/header.jpg" alt="Back 4 Blood" className={styles.carouselImage} />
                    <span className={styles.carouselTitle}>Back 4 Blood</span>
                </div>
                
                <div className={styles.carouselItem}>
                    <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2420110/header.jpg" alt="Horizon" className={styles.carouselImage} />
                    <span className={styles.carouselTitle}>Horizon Forbidden West</span>
                </div>

                <div className={styles.carouselItem}>
                    <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1475810/header.jpg" alt="Ghostwire" className={styles.carouselImage} />
                    <span className={styles.carouselTitle}>Ghostwire: Tokyo</span>
                </div>

                <div className={styles.carouselItem}>
                    <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1245620/header.jpg" alt="Elden Ring" className={styles.carouselImage} />
                    <span className={styles.carouselTitle}>Elden Ring</span>
                </div>

                 <div className={styles.carouselItem}>
                    <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/534380/header.jpg" alt="Dying Light 2" className={styles.carouselImage} />
                    <span className={styles.carouselTitle}>Dying Light 2</span>
                </div>
            </div>

            {/* BOTÃO DIREITA - Com onClick corrigido */}
            <button className={styles.arrowBtn} onClick={handleRightClick} style={{right: '-20px'}}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </button>
        </div>
      </section>

      {/* SEÇÃO 2: MAIS JOGADOS (Grid Corrigida) */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Mais Jogados</h2>
            <a href="#" className={styles.seeAll}>Ver todos</a>
        </div>
        
        <div className={styles.gamesGrid}>
            {popularGames.map((gameObj, index) => (
                <div className={styles.gameCard} key={index}>
                    <div className={styles.imageWrapper}>
                        <img 
                            src={getGameImage(gameObj.name)} 
                            alt={gameObj.name} 
                            className={styles.cardImg} 
                        />
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