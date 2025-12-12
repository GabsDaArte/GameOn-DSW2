import { useState } from 'react';
import styles from './CreateSessionModal.module.css';

const ALL_GAMES = [
  "League of Legends", "Valorant", "Overwatch 2", "Counter-Strike 2",
  "Fortnite", "Minecraft", "Dota 2", "Rocket League", 
  "Call of Duty: Warzone", "Apex Legends", "The Witcher 3", "Elden Ring"
];

function CreateSessionModal({ isOpen, onClose, onSave }) {
  // 1. Estados para CADA campo do formulário
  const [gameInput, setGameInput] = useState('');
  const [title, setTitle] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [players, setPlayers] = useState('5'); // Começa com 5 por padrão

  // Estados visuais
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredGames, setFilteredGames] = useState([]);

  // Lógica da Data Mínima (que fizemos antes)
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  const minDate = now.toISOString().slice(0, 16);

  if (!isOpen) return null;

  // Lógica do Autocomplete de Jogos
  const handleGameChange = (e) => {
    const userInput = e.target.value;
    setGameInput(userInput);
    const filtered = ALL_GAMES.filter((game) =>
      game.toLowerCase().includes(userInput.toLowerCase())
    );
    setFilteredGames(filtered);
    setShowSuggestions(true);
  };

  const selectGame = (gameName) => {
    setGameInput(gameName);
    setShowSuggestions(false);
  };

  // 2. FUNÇÃO DE SALVAR (Onde a mágica acontece)
  const handleCreateSession = () => {
    // Validação simples
    if (!gameInput || !title || !dateTime) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    // Cria o objeto final com os dados
    const novaSessao = {
        jogo: gameInput,
        titulo: title,
        data: dateTime,
        maxJogadores: players,
        participantes: ["Host(Você)"]
    };

    onSave(novaSessao);
    
    // Aqui depois vamos colocar a lógica para salvar no banco ou na lista
    
    onClose(); // Fecha o modal
    
    // Limpar o formulário (opcional)
    setGameInput('');
    setTitle('');
    setDateTime('');
    setPlayers('5');
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        
        <h2 className={styles.title}>Nova Sessão</h2>

        <form>
          {/* CAMPO JOGO */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Qual jogo será jogado?</label>
            <input 
              type="text" 
              placeholder="Digite o nome do jogo..." 
              className={styles.input}
              value={gameInput}
              onChange={handleGameChange}
              onFocus={() => setShowSuggestions(true)}
            />
            
            {showSuggestions && gameInput && (
              <ul className={styles.suggestionsList}>
                {filteredGames.map((game, index) => (
                    <li key={index} className={styles.suggestionItem} onClick={() => selectGame(game)}>
                      {game}
                    </li>
                ))}
              </ul>
            )}
          </div>

          {/* CAMPO TÍTULO - Agora com State */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Título da Sessão</label>
            <input 
                type="text" 
                placeholder="Ex: Ranked Duo Prata" 
                className={styles.input}
                value={title}
                onChange={(e) => setTitle(e.target.value)} 
            />
          </div>

          <div className={styles.row}>
            {/* CAMPO DATA - Agora com State e MinDate */}
            <div className={styles.formGroup}>
                <label className={styles.label}>Data e Horário</label>
                <input 
                    type="datetime-local" 
                    className={styles.input}
                    min={minDate}
                    value={dateTime}
                    onChange={(e) => setDateTime(e.target.value)}
                />
            </div>

            {/* CAMPO JOGADORES - Agora com State */}
            <div className={styles.formGroup}>
                <label className={styles.label}>Numero total deJogadores</label>
                <input 
                    type="number" 
                    min="2" 
                    max="10" 
                    className={styles.input} 
                    value={players}
                    onChange={(e) => setPlayers(e.target.value)}
                />
            </div>
          </div>

          <div className={styles.actions}>
            <button type="button" className={styles.btnCancel} onClick={onClose}>
              Cancelar
            </button>
            {/* Botão agora chama a função handleCreateSession */}
            <button 
                type="button" 
                className={styles.btnConfirm}
                onClick={handleCreateSession}
            >
              Criar Sessão
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default CreateSessionModal;