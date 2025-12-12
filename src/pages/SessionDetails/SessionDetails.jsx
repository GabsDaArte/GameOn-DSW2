import { useParams, Link, useNavigate } from 'react-router-dom';

// Recebemos agora onLeave e onDelete também
function SessionDetails({ sessions, onJoin, onLeave, onDelete }) {
  const { id } = useParams();
  const navigate = useNavigate(); // Usamos para redirecionar após deletar
  
  const session = sessions.find(s => s.id === Number(id));

  if (!session) {
    return (
        <div style={{color: 'white', padding: 20}}>
            Sessão não encontrada ou deletada. 
            <br/>
            <Link to="/" style={{color: '#8257e5'}}>Voltar para Home</Link>
        </div>
    );
  }

  // --- LÓGICA DE PERMISSÃO ---
  // Assumimos que o "Host (Você)" é sempre o primeiro da lista
  const isHost = session.participantes[0] === "Host (Você)";
  
  // Verifica se "Novo Jogador" (você visitante) está na lista
  const isJoined = session.participantes.includes("Novo Jogador");
  
  const isFull = session.participantes.length >= session.maxJogadores;

  // Função auxiliar para deletar e voltar pra home
  const handleDeleteClick = () => {
      if(window.confirm("Tem certeza que deseja apagar esta sessão?")) {
          onDelete(session.id);
          navigate('/'); // Redireciona para a home
      }
  }

  return (
    <div style={{ color: 'white', maxWidth: '800px' }}>
      <Link to="/" style={{ color: '#a1a1aa', textDecoration: 'none', marginBottom: '20px', display: 'block' }}>
        &larr; Voltar para Home
      </Link>

      <h1 style={{ fontSize: '3rem', margin: '0 0 10px' }}>{session.titulo}</h1>
      
      {/* Header com Jogo e Data */}
      <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginBottom: '40px' }}>
        <span style={{ background: '#8257e5', padding: '5px 15px', borderRadius: '20px', fontWeight: 'bold', fontSize: '0.9rem' }}>
            {session.jogo}
        </span>
        <span style={{ color: '#a1a1aa' }}>
            {new Date(session.data).toLocaleString()}
        </span>
      </div>

      <div style={{ background: '#1e1e1e', padding: '30px', borderRadius: '12px', border: '1px solid #333' }}>
         <h2 style={{marginTop: 0}}>
            Participantes ({session.participantes.length} / {session.maxJogadores})
         </h2>
         
         {/* LISTA DE PARTICIPANTES (CÓDIGO DA COROA QUE JÁ FIZEMOS) */}
         <ul style={{ listStyle: 'none', padding: 0, margin: '20px 0' }}>
            {session.participantes.map((nome, index) => (
                <li key={index} style={{ padding: '12px', borderBottom: '1px solid #333', display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ position: 'relative' }}>
                        <img 
                            src={index === 0 ? "https://github.com/shadcn.png" : `https://api.dicebear.com/7.x/avataaars/svg?seed=${nome}`}
                            alt="Avatar"
                            style={{ width: '45px', height: '45px', borderRadius: '50%', border: index === 0 ? '2px solid #FFD700' : '2px solid #555', display: 'block' }} 
                        />
                        {index === 0 && (
                            <div style={{ position: 'absolute', top: '-12px', left: '-8px', transform: 'rotate(-20deg)', filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.8))' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#FFD700" viewBox="0 0 24 24"><path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11h-14zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z"/></svg>
                            </div>
                        )}
                    </div>
                    <span style={{ fontSize: '1.1rem', color: index === 0 ? '#FFD700' : 'white', fontWeight: index === 0 ? 'bold' : 'normal' }}>
                        {nome}
                    </span>
                </li>
            ))}
         </ul>
         
         {/* --- ÁREA DE BOTÕES DINÂMICOS --- */}
         <div style={{ marginTop: '30px' }}>

            {/* CENÁRIO 1: É O HOST (Dono da Sala) */}
            {isHost ? (
                <div style={{ display: 'flex', gap: '15px' }}>
                    <button 
                        onClick={() => alert("Editar Sessão (Em breve...)")} 
                        style={{ flex: 1, padding: '15px', background: '#333', border: '1px solid #555', color: 'white', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        EDITAR
                    </button>
                    <button 
                        onClick={handleDeleteClick}
                        style={{ flex: 1, padding: '15px', background: '#ef4444', border: 'none', color: 'white', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        DELETAR SESSÃO
                    </button>
                </div>
            ) : (
                /* CENÁRIO 2: NÃO É HOST (Visitante) */
                <>
                    {isJoined ? (
                        /* Se já entrou: Botão de SAIR (Vermelho/Laranja) */
                        <button 
                            onClick={() => onLeave(session.id)}
                            style={{ width: '100%', padding: '15px', background: 'transparent', border: '1px solid #ef4444', color: '#ef4444', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
                        >
                            SAIR DA SESSÃO
                        </button>
                    ) : (
                        /* Se não entrou: Botão de ENTRAR (Azul) */
                        <button 
                            onClick={() => onJoin(session.id)}
                            disabled={isFull}
                            style={{
                                width: '100%',
                                padding: '15px',
                                background: isFull ? '#333' : 'linear-gradient(90deg, #8A2BE2 0%, #00BFFF 100%)',
                                border: 'none',
                                color: isFull ? '#888' : 'white',
                                fontWeight: 'bold',
                                fontSize: '1.1rem',
                                borderRadius: '8px',
                                cursor: isFull ? 'not-allowed' : 'pointer'
                            }}
                        >
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