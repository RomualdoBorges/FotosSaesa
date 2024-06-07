import React from "react";
import styles from "./Confirm.module.css";
import Logo from "../../Components/Logo";
import Message from "../../Components/Message";
import { useNavigate } from "react-router-dom";

const Confirm = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      {/* Logo */}
      <Logo />

      {/* Mensagem de cadastro confirmado */}
      <Message />

      {/* Botao de novo cadastro */}
      <button className={styles.button} onClick={() => navigate("/")}>
        Novo Cadastro
      </button>
    </div>
  );
};

export default Confirm;
