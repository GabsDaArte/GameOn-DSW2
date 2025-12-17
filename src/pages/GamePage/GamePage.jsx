import { useParams, useNavigate } from 'react-router-dom';
import { getGameImage } from '../../utils/gameImages';

function GamePage({ sessions }) {
  const { gameName } = useParams();
  const navigate = useNavigate();

  const gameSessions = sessions.filter(
    s => s.jogo.toLowerCase() === gameName.toLowerCase()
  );

  const headerImage = getGameImage(gameName);

  return (
    <div style={{ color: 'white', maxWidth: '1200px', margin: '0 auto' }}>
      {/* HEADER */}
      <div style={{
          height: '200px',
          borderRadius: '16px',
          backgroundImage: `url(${headerImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          marginBottom: '30px',
          border: '1px solid #333',
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', borderRadius: '16px' }}></div>
        <h1 style={{ position: 'absolute', bottom: 20, left: 30, fontSize: '3rem', margin: 0, textShadow: '0 2px 10px black' }}>
            {gameName}
        </h1>
      </div>

      <h2 style={{ marginBottom: '20px' }}>Sessões Disponíveis ({gameSessions.length})</h2>

      {/* GRID COM VISUAL SIDEBAR */}
      {gameSessions.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', background: '#1e1e1e', borderRadius: '12px' }}>
              <p style={{ color: '#aaa', fontSize: '1.2rem' }}>Nenhuma sessão encontrada.</p>
              <button onClick={() => navigate('/')} style={{ marginTop: 20, padding: '10px 20px', background: '#8257e5', border: 'none', color: 'white', borderRadius: 6, cursor: 'pointer' }}>Voltar</button>
          </div>
      ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
              {gameSessions.map(session => {
                  const participantes = session.participantes || [];
                  const isHost = participantes[0].includes("(Você)");
                  const maxVisible = 4;
                  const extraCount = participantes.length - maxVisible;
                  const visibleParticipants = participantes.slice(0, maxVisible);

                  return (
                      <div 
                        key={session.id}
                        onClick={() => navigate(`/session/${session.id}`)}
                        style={{
                            position: 'relative',
                            height: '160px',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            cursor: 'pointer',
                            background: '#000',
                            border: isHost ? '1px solid #FFD700' : '1px solid transparent',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
                        }}
                      >
                          {/* Fundo */}
                          <div style={{
                              position: 'absolute', inset: 0,
                              backgroundImage: `url(${headerImage})`,
                              backgroundSize: 'cover', backgroundPosition: 'center',
                              filter: 'brightness(0.4)'
                          }}></div>

                          {/* Overlay */}
                          <div style={{
                              position: 'relative', zIndex: 1, padding: '16px', height: '100%',
                              display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box'
                          }}>
                              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                  <span style={{background: 'rgba(0,0,0,0.6)', padding: '4px 8px', borderRadius: 4, fontSize: '0.8rem', fontWeight: 'bold', border: '1px solid #444'}}>
                                      {new Date(session.data).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}
                                  </span>
                                  {isHost && <span style={{color: '#FFD700', fontSize: '0.8rem'}}>👑 Host</span>}
                              </div>

                              <div>
                                  <h3 style={{margin: '0', fontSize: '1.1rem', textShadow: '0 2px 4px black'}}>{session.titulo}</h3>
                                  <span style={{fontSize: '0.8rem', color: '#ccc'}}>{session.jogo}</span>
                              </div>

                              {/* Stack Avatars */}
                              <div style={{display: 'flex', alignItems: 'center', paddingLeft: 8}}>
                                  {visibleParticipants.map((nome, i) => (
                                      <img 
                                          key={i}
                                          src={nome.includes("(Você)") ? "https://github.com/shadcn.png" : `https://api.dicebear.com/7.x/avataaars/svg?seed=${nome}`}
                                          style={{width: 32, height: 32, borderRadius: '50%', border: '2px solid #1e1e1e', marginLeft: -10, background: '#333', zIndex: 10-i}}
                                      />
                                  ))}
                                  {extraCount > 0 && (
                                      <div style={{width: 32, height: 32, borderRadius: '50%', background: '#444', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: -10, border: '2px solid #1e1e1e', fontSize: '0.7rem', zIndex: 5}}>
                                          +{extraCount}
                                      </div>
                                  )}
                              </div>
                          </div>
                      </div>
                  )
              })}
          </div>
      )}
    </div>
  );
}
export default GamePage;