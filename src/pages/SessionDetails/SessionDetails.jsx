import { useParams, Link, useNavigate } from 'react-router-dom';
import { getGameImage } from '../../utils/gameImages';

function SessionDetails({ sessions, onJoin, onLeave, onDelete, onEdit, currentUser, userAvatar }) {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const session = sessions.find(s => s.id === Number(id));

  if (!session) {
    return (
        <div style={{color: 'white', padding: 20}}>
            Sessão não encontrada. <Link to="/" style={{color:'#8257e5'}}>Voltar</Link>
        </div>
    );
  }

  const participantes = session.participantes || [];
  const isHost = participantes[0] === currentUser;
  const isJoined = participantes.includes(currentUser);
  const maxPlayers = session.maxJogadores || 5; 
  const isFull = participantes.length >= maxPlayers;

  const handleDeleteClick = () => {
      if(window.confirm("Tem certeza?")) { onDelete(session.id); navigate('/'); }
  }

  const bgImage = getGameImage(session.jogo);

  return (
    <div style={{ color: 'white', maxWidth: '900px', width: '100%' }}>
      <Link to="/" style={{ color: '#a1a1aa', textDecoration: 'none', marginBottom: '20px', display: 'block' }}>
        &larr; Voltar para Home
      </Link>

      {/* BANNER */}
      <div style={{ 
          width: '100%', 
          height: '250px', 
          borderRadius: '16px', 
          marginBottom: '30px',
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
          overflow: 'hidden'
      }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #121212 0%, transparent 100%)' }}></div>
          <div style={{ position: 'absolute', bottom: 20, left: 20 }}>
             <span style={{ 
                background: '#8257e5', 
                padding: '6px 16px', 
                borderRadius: '20px', 
                fontWeight: 'bold', 
                fontSize: '0.9rem',
                boxShadow: '0 2px 10px rgba(0,0,0,0.5)'
             }}>
                {session.jogo}
             </span>
          </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h1 style={{ fontSize: '3rem', margin: '0 0 10px', lineHeight: 1 }}>{session.titulo}</h1>
        <span style={{ color: '#a1a1aa', marginTop: 15 }}>
            {new Date(session.data).toLocaleString()}
        </span>
      </div>

      <div style={{ marginBottom: '30px', marginTop: '20px' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', color: '#fff' }}>Sobre a Sessão</h3>
          <p style={{ color: '#a1a1aa', lineHeight: '1.6', fontSize: '1rem', background: '#1e1e1e', padding: '20px', borderRadius: '12px', border: '1px solid #333' }}>
              {session.descricao || "Sem descrição."}
          </p>
      </div>

      <div style={{ background: '#1e1e1e', padding: '30px', borderRadius: '12px', border: '1px solid #333' }}>
         <h2 style={{marginTop: 0}}>
            Participantes ({participantes.length} / {maxPlayers})
         </h2>
         
         <ul style={{ listStyle: 'none', padding: 0, margin: '20px 0' }}>
            {participantes.map((nome, index) => {
                const isMe = nome === currentUser;
                const avatarSrc = isMe 
                    ? `https://api.dicebear.com/7.x/avataaars/svg?seed=${userAvatar}`
                    : `https://api.dicebear.com/7.x/avataaars/svg?seed=${nome}`;

                return (
                    <li key={index} style={{ padding: '15px', borderBottom: '1px solid #333', display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <div style={{ position: 'relative' }}>
                            <img 
                                src={avatarSrc}
                                alt="Avatar"
                                style={{ width: '50px', height: '50px', borderRadius: '50%', border: index === 0 ? '2px solid #FFD700' : '2px solid #555', display: 'block' }} 
                            />
                            {index === 0 && (
                                <div style={{ position: 'absolute', top: '-14px', left: '-10px', transform: 'rotate(-20deg)', filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.8))' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#FFD700" viewBox="0 0 24 24"><path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11h-14zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z"/></svg>
                                </div>
                            )}
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                             <span style={{ fontSize: '1.1rem', color: index === 0 ? '#FFD700' : 'white', fontWeight: index === 0 ? 'bold' : 'normal' }}>
                                {nome}
                            </span>
                            {index === 0 && <span style={{fontSize: '0.8rem', color: '#FFD700'}}>Host da Sala</span>}
                        </div>
                    </li>
                );
            })}
         </ul>
         
         <div style={{ marginTop: '30px' }}>
            {isHost ? (
                <div style={{ display: 'flex', gap: '15px' }}>
                    <button onClick={() => onEdit(session)} style={{ flex: 1, padding: '15px', background: '#333', border: '1px solid #555', color: 'white', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
                        EDITAR
                    </button>
                    <button onClick={handleDeleteClick} style={{ flex: 1, padding: '15px', background: '#ef4444', border: 'none', color: 'white', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
                        DELETAR SESSÃO
                    </button>
                </div>
            ) : (
                <>
                    {isJoined ? (
                        <button onClick={() => onLeave(session.id)} style={{ width: '100%', padding: '15px', background: 'transparent', border: '1px solid #ef4444', color: '#ef4444', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
                            SAIR DA SESSÃO
                        </button>
                    ) : (
                        <button onClick={() => onJoin(session.id)} disabled={isFull} style={{ width: '100%', padding: '15px', background: isFull ? '#333' : 'linear-gradient(90deg, #8A2BE2 0%, #00BFFF 100%)', border: 'none', color: isFull ? '#888' : 'white', fontWeight: 'bold', fontSize: '1.1rem', borderRadius: '8px', cursor: isFull ? 'not-allowed' : 'pointer' }}>
                            {isFull ? "Sala Cheia" : "ENTRAR NA SALA"}
                        </button>
                    )}
                </>
            )}
         </div>
      </div>
    </div>
  );
}
export default SessionDetails;