import React from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../estilos/Formulario.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loggedUser = localStorage.getItem("loggedUser");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      navigate("/home", { state: { user } });
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error("Por favor, preencha todos os campos!");
      return;
    }

    try {
      const users = JSON.parse(localStorage.getItem("users")) || [];

      const user = users.find(
        (u) => u.email === username && u.password === password
      );

      if (user) {
        localStorage.setItem("loggedUser", JSON.stringify(user));
        toast.success("Login realizado com sucesso!");

        // Adicionando atraso antes de redirecionar para a página inicial
        setTimeout(() => {
          navigate("/home", { state: { user } });
        }, 3000); // Atraso de 3 segundos
      } else {
        toast.error("Email ou senha inválidos!");
      }
    } catch (error) {
      toast.error("Erro ao acessar os dados.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formcontainer}>
        <form onSubmit={handleSubmit}>
          <h1>Acesse o sistema</h1>
          <div className={styles.inputField}>
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              placeholder="Digite seu e-mail"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <FaUser className={styles.icon} />
          </div>
          <div className={styles.inputField}>
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FaLock className={styles.icon} />
          </div>
          <div className={styles.recallForget}>
            <label>
              <input type="checkbox" />
              Lembre de mim
            </label>
            <Link to="/">Esqueceu a senha?</Link>
          </div>
          <div className={styles.formButtonsContainer}>
            <button className={styles.submitButton} type="submit">
              Entrar
            </button>
            <div className={styles.signupLink}>
              <p>
                Não tem uma conta? <Link to="/Registro">Registrar</Link>
              </p>
            </div>
          </div>
        </form>
        <ToastContainer position="top-center" autoClose={3000} />
      </div>
    </div>
  );
};

export default Login;
