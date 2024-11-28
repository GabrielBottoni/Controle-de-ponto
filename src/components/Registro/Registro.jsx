import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid"; 
import styles from "../estilos/Formulario.module.css";

const Registro = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error("Por favor, preencha todos os campos!");
      return;
    }

    const db = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = db.find((u) => u.email === email);
    if (userExists) {
      toast.error("Esse email já está registrado!");
      return;
    }

    const newUser = {
      id: uuidv4(), 
      name,
      email,
      password,
      pontos: [] 
    };

    localStorage.setItem("users", JSON.stringify([...db, newUser]));
    toast.success("Usuário registrado com sucesso!");

    // Adicionando atraso antes de redirecionar para a página de login
    setTimeout(() => {
      navigate("/");
    }, 3000); // Espera de 3 segundos
  };

  return (
    <div className={styles.container}>
      <div className={styles.formcontainer}>
        <form onSubmit={handleRegister}>
          <h1>Registre-se</h1>
          <div className={styles.inputField}>
            <label htmlFor="name">Nome</label>
            <input
              id="name"
              type="text"
              placeholder="Digite seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={styles.inputField}>
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
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
          </div>
          <div className={styles.formButtonsContainer}>
            <button className={styles.submitButton} type="submit">
              Registrar
            </button>
            <div className={styles.signupLink}>
              <p>
                Já tem uma conta? <Link to="/">Login</Link>
              </p>
            </div>
          </div>
        </form>
        <ToastContainer position="top-center" autoClose={3000} />
      </div>
    </div>
  );
};

export default Registro;
