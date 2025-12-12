import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import Home from './pages/Home/Home'
import SessionDetails from './pages/SessionDetails/SessionDetails'
import CreateSessionModal from './components/CreateSessionModal/CreateSessionModal'

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 1. CARREGA DADOS DO LOCALSTORAGE OU INICIA PADRÃO
  const [sessions, setSessions] = useState(() => {
    const saved = localStorage.getItem("gameon_sessions");
    if (saved) return JSON.parse(saved);
    return [
      { 
        id: 1, 
        titulo: "Ranked sem estresse", 
        jogo: "Valorant", 
        data: "2025-12-12T21:00", 
        maxJogadores: "5",
        participantes: ["Host (Você)"] 
      }
    ];
  });

  // 2. SALVA AUTOMATICAMENTE QUANDO MUDA
  useEffect(() => {
    localStorage.setItem("gameon_sessions", JSON.stringify(sessions));
  }, [sessions]);

  // --- AÇÕES DO SISTEMA ---

  // CRIAR
  const handleAddNewSession = (newSession) => {
    const sessionWithId = { 
        ...newSession, 
        id: Date.now(),
        participantes: ["Host (Você)"] // Quem cria já é o Host
    };
    setSessions([...sessions, sessionWithId]);
    setIsModalOpen(false);
  };

  // ENTRAR
  const handleJoinSession = (sessionId) => {
    const updatedSessions = sessions.map(session => {
        if (session.id === sessionId) {
            // Regras de bloqueio
            if (session.participantes.length >= session.maxJogadores) return session;
            if (session.participantes.includes("Novo Jogador")) return session;

            return {
                ...session,
                participantes: [...session.participantes, "Novo Jogador"]
            };
        }
        return session;
    });
    setSessions(updatedSessions);
  };

  // SAIR
  const handleLeaveSession = (sessionId) => {
    const updatedSessions = sessions.map(session => {
        if (session.id === sessionId) {
            return {
                ...session,
                participantes: session.participantes.filter(p => p !== "Novo Jogador")
            };
        }
        return session;
    });
    setSessions(updatedSessions);
  };

  // DELETAR
  const handleDeleteSession = (sessionId) => {
    const updatedSessions = sessions.filter(s => s.id !== sessionId);
    setSessions(updatedSessions);
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <BrowserRouter>
      <Navbar onOpenMenu={toggleSidebar} />
      
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 73px)' }}>
        
        <Sidebar 
            isOpen={isSidebarOpen} 
            onOpenModal={() => setIsModalOpen(true)} 
            sessions={sessions} 
        />
        
        <div style={{ flex: 1, padding: '20px', overflowX: 'hidden' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            
            {/* ROTA DE DETALHES COM TODAS AS FUNÇÕES */}
            <Route 
                path="/session/:id" 
                element={
                    <SessionDetails 
                        sessions={sessions} 
                        onJoin={handleJoinSession} 
                        onLeave={handleLeaveSession}
                        onDelete={handleDeleteSession}
                    />
                } 
            />
          </Routes>
        </div>

      </div>

      <CreateSessionModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onSave={handleAddNewSession} 
      />
        
    </BrowserRouter>
  )
}

export default App