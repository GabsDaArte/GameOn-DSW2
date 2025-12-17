import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Home from './pages/Home/Home';
import SessionDetails from './pages/SessionDetails/SessionDetails';
import CreateSessionModal from './components/CreateSessionModal/CreateSessionModal';
import Login from './pages/Login/Login';
import GamePage from './pages/GamePage/GamePage';

function Layout() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  // Estados
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Estado para busca
  const [searchTerm, setSearchTerm] = useState('');
  
  // Estado para edição
  const [sessionToEdit, setSessionToEdit] = useState(null);

  // Carrega usuário logado
  const user = JSON.parse(localStorage.getItem('gameon_user'));

  // Nome de exibição
  const userName = user ? user.name : "Você"; 

  // Dados
  const [sessions, setSessions] = useState(() => {
    const saved = localStorage.getItem("gameon_sessions");
    if (saved) return JSON.parse(saved);

    // Dados iniciais
    return [
      { 
        id: 1, 
        titulo: "Sessão do Faker", 
        jogo: "League of Legends", 
        data: "2025-12-12T20:00",
        maxJogadores: "5",
        descricao: "Sessão Aleatória de teste.",
        participantes: ["Faker", `${userName} (Você)`, "Keria"] 
      },
      { 
        id: 2, 
        titulo: "Minha Ranked", 
        jogo: "Valorant", 
        data: "2025-12-12T22:00",
        maxJogadores: "5",
        descricao: "Sessão competitiva.",
        participantes: [`${userName} (Você)`] 
      }
    ];
  });

  // Salva no LocalStorage sempre que 'sessions' mudar
  useEffect(() => {
    localStorage.setItem("gameon_sessions", JSON.stringify(sessions));
  }, [sessions]);


  // Criar ou Editar
  const handleSaveSession = (sessionData) => {
    const nameWithTag = `${userName} (Você)`;

    if (sessionToEdit) {
        const updatedSessions = sessions.map(s => 
            s.id === sessionToEdit.id ? { ...s, ...sessionData } : s
        );
        setSessions(updatedSessions);
    } else {
        const newSession = { 
            ...sessionData, 
            id: Date.now(),
            participantes: [nameWithTag]
        };
        setSessions([...sessions, newSession]);
    }
    setIsModalOpen(false);
    setSessionToEdit(null);
  };

  // Funções para abrir o modal
  const handleOpenCreate = () => {
      setSessionToEdit(null);
      setIsModalOpen(true);
  };

  const handleOpenEdit = (session) => {
      setSessionToEdit(session);
      setIsModalOpen(true);
  };

  // Entrar na Sessão
  const handleJoinSession = (sessionId) => {
    const nameWithTag = `${userName} (Você)`;
    const updatedSessions = sessions.map(session => {
        if (session.id === sessionId) {
            if (session.participantes.length >= session.maxJogadores) return session;
            if (session.participantes.includes(nameWithTag)) return session;
            return { ...session, participantes: [...session.participantes, nameWithTag] };
        }
        return session;
    });
    setSessions(updatedSessions);
  };

  // Sair da Sessão
  const handleLeaveSession = (sessionId) => {
    const nameWithTag = `${userName} (Você)`;
    const updatedSessions = sessions.map(session => {
        if (session.id === sessionId) {
            return { ...session, participantes: session.participantes.filter(p => p !== nameWithTag) };
        }
        return session;
    });
    setSessions(updatedSessions);
  };

  // Deletar Sessão
  const handleDeleteSession = (sessionId) => {
    const updatedSessions = sessions.filter(s => s.id !== sessionId);
    setSessions(updatedSessions);
  };

  // Searchbar
  const filteredSessions = sessions.filter(s => 
      s.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.jogo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  
  const handleLogout = () => { 
      localStorage.removeItem('gameon_user'); 
      window.location.href = '/login'; 
  };
  
  const handleLoginSuccess = () => { window.location.reload(); };

  if (!user && !isLoginPage) return <Navigate to="/login" />;
  if (user && isLoginPage) return <Navigate to="/" />;

  return (
    <>
      {!isLoginPage && (
          <Navbar 
            onOpenMenu={toggleSidebar} 
            user={user} 
            onLogout={handleLogout}
            onSearch={setSearchTerm}
          />
      )}
      
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        
        {!isLoginPage && (
            <Sidebar 
                isOpen={isSidebarOpen} 
                onOpenModal={handleOpenCreate} 
                sessions={filteredSessions}
                currentUser={`${userName} (Você)`}
            />
        )}
        
        <div style={{ flex: 1, padding: isLoginPage ? 0 : '20px', overflowX: 'hidden' }}>
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLoginSuccess} />} />

            <Route path="/" element={<Home sessions={sessions} />} />

            <Route 
                path="/game/:gameName" 
                element={<GamePage sessions={sessions} />} 
            />
            
            <Route 
                path="/session/:id" 
                element={
                    <SessionDetails 
                        sessions={sessions} 
                        onJoin={handleJoinSession} 
                        onLeave={handleLeaveSession}
                        onDelete={handleDeleteSession}
                        onEdit={handleOpenEdit}
                        currentUser={`${userName} (Você)`}
                        userAvatar={user?.avatarSeed}
                    />
                } 
            />
          </Routes>
        </div>
      </div>

      {isModalOpen && (
          <CreateSessionModal 
              isOpen={isModalOpen} 
              onClose={() => setIsModalOpen(false)} 
              onSave={handleSaveSession} 
              initialData={sessionToEdit}
          />
      )}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;