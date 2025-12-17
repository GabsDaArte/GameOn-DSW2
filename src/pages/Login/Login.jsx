import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [isLoginMode, setIsLoginMode] = useState(true);

  const [nick, setNick] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nick || !password) { alert("Preencha os campos!"); return; }
    if (!isLoginMode && (password !== confirmPassword)) { alert("Senhas não batem!"); return; }

    const user = {
        name: nick,
        avatarSeed: `user_${nick.toLowerCase().replace(/\s/g, '')}`, 
        id: Date.now()
    };
    localStorage.setItem('gameon_user', JSON.stringify(user));
    if(onLogin) onLogin(user);
    navigate('/');
  };

  return (
    <div className={styles.loginContainer}>
      
      {/* LOGO */}
      <h1 className={styles.externalLogo}>GameOn</h1>

      <div className={styles.loginWrapper}>
        <div className={styles.loginCard}>
            
            {/* SUBTÍTULO */}
            <h2 className={styles.welcomeText}>
                {isLoginMode ? "Bem-vindo de volta, Gamer!" : "Crie sua conta e jogue agora."}
            </h2>
            
            <div className={styles.toggleContainer}>
                <button className={`${styles.toggleBtn} ${isLoginMode ? styles.active : ''}`} onClick={() => setIsLoginMode(true)}>Login</button>
                <button className={`${styles.toggleBtn} ${!isLoginMode ? styles.active : ''}`} onClick={() => setIsLoginMode(false)}>Cadastrar-se</button>
            </div>

            <form onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                    <input type="text" placeholder="Nome de usuário" className={styles.input} value={nick} onChange={(e) => setNick(e.target.value)} />
                </div>

                {!isLoginMode && (
                    <div className={styles.inputGroup}>
                        <input type="email" placeholder="E-mail" className={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                )}

                <div className={styles.inputGroup}>
                    <input type="password" placeholder="Senha" className={styles.input} value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                {!isLoginMode && (
                    <div className={styles.inputGroup}>
                        <input type="password" placeholder="Confirmar Senha" className={styles.input} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                )}

                {isLoginMode && <a href="#" className={styles.forgotPass}>Esqueceu a senha?</a>}

                <button type="submit" className={styles.btnAction}>
                    {isLoginMode ? "Logar" : "Cadastrar"}
                </button>
            </form>
        </div>
      </div>
    </div>
  );
}

export default Login;