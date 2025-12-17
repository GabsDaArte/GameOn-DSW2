import { useState, useEffect } from 'react';
import styles from './CreateSessionModal.module.css';

const ALL_GAMES = [
  "League of Legends", "Valorant", "Overwatch 2", "Counter-Strike 2",
  "Fortnite", "Minecraft", "Dota 2", "Rocket League", 
  "Call of Duty: Warzone", "Apex Legends", "The Witcher 3", "Elden Ring"
];

function CreateSessionModal({ onClose, onSave, initialData }) {
  const [gameInput, setGameInput] = useState('');
  const [title, setTitle] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [players, setPlayers] = useState('5');
  const [description, setDescription] = useState('');

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredGames, setFilteredGames] = useState([]);

  // Data mínima
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  const minDate = now.toISOString().slice(0, 16);

  // Carrega dados iniciais ao abrir
  useEffect(() => {
      if (initialData) {
          setGameInput(initialData.jogo || '');
          setTitle(initialData.titulo || '');
          setDateTime(initialData.data || '');
          setPlayers(initialData.maxJogadores || '5');
          setDescription(initialData.descricao || '');
      } else {
          // Valores padrão
          setGameInput('');
          setTitle('');
          setDateTime('');
          setPlayers('5');
          setDescription('');
      }
  }, [initialData]);

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

  const handleConfirm = () => {
    if (!gameInput || !title || !dateTime) {
        alert("Preencha os campos obrigatórios!");
        return;
    }

    onSave({
        jogo: gameInput,
        titulo: title,
        data: dateTime,
        maxJogadores: players,
        descricao: description
    });
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        
        <h2 className={styles.title}>
            {initialData ? "Editar Sessão" : "Nova Sessão"}
        </h2>

        <form>
          {/* JOGO */}
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

          {/* TÍTULO */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Título da Sessão</label>
            <input 
                type="text" 
                className={styles.input}
                value={title}
                onChange={(e) => setTitle(e.target.value)} 
            />
          </div>

          {/* DATA E JOGADORES */}
          <div className={styles.row}>
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

            <div className={styles.formGroup}>
                <label className={styles.label}>Máx. Jogadores</label>
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

          {/* DESCRIÇÃO */}
          <div className={styles.formGroup}>
              <label className={styles.label}>Descrição / Regras</label>
              <textarea 
                  className={styles.input}
                  style={{height: 100, resize: 'none', paddingTop: 10}}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
              />
          </div>

          <div className={styles.actions}>
            <button type="button" className={styles.btnCancel} onClick={onClose}>
              Cancelar
            </button>
            <button type="button" className={styles.btnConfirm} onClick={handleConfirm}>
              {initialData ? "Salvar Alterações" : "Criar Sessão"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateSessionModal;