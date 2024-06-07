import React, { useState } from "react";
import styles from "./Form.module.css";
import { useNavigate } from "react-router-dom";
import Logo from "../../Components/Logo";
import Input from "../../Components/Input";
import InputFile from "../../Components/InputFile";
import Preview from "../../Components/Preview";
import Button from "../../Components/Button";

const Form = () => {
  const navigate = useNavigate();

  //Estado da pre-visualizacao
  const [previews, setPreviews] = useState([]);

  //Estados do Formulario
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [osNumber, setOsNumber] = useState("");

  //Estados de Validacao
  const [validOs, setValidOs] = useState(false);
  const [validImg, setValidImg] = useState(false);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files).slice(0, 3);
    setSelectedFiles(files);

    const filePreviews = files.map((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise((resolve) => {
        reader.onloadend = () => {
          resolve(reader.result);
        };
      });
    });

    Promise.all(filePreviews).then((previews) => {
      setPreviews(previews);
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      osNumber: osNumber,
      images: selectedFiles,
    };

    const isValid = osNumber.length > 0 && selectedFiles.length === 3;

    if (!isValid) {
      if (osNumber.length === 0) {
        setValidOs(true);
      } else {
        setValidOs(false);
      }

      if (selectedFiles.length !== 3) {
        setValidImg(true);
      } else {
        setValidImg(false);
      }

      return;
    }

    // Se as duas condições forem válidas, envia o formulário
    console.log(formData);

    // Limpeza dos campos ao enviar o formulário
    setValidImg(false);
    setValidOs(false);
    navigate("/confirm");
  };
  return (
    <div className={styles.container}>
      {/* Logo */}
      <Logo />

      <form onSubmit={handleSubmit}>
        {/* Input para ordem de servico */}
        <Input
          id="osNumber"
          label="Informe o número da Ordem de Serviço:"
          value={osNumber}
          onChange={(event) => setOsNumber(event.target.value)}
          validOs={validOs}
        />

        {/* Input para imagens */}
        <InputFile
          id="fileInput"
          label="Adicionar Fotos"
          validImg={validImg}
          onChange={handleFileChange}
        />

        {/* Pre-visualizacao da imagem */}
        {previews.length > 0 && <Preview previews={previews} />}

        {/* Botao de submit */}
        <Button>Enviar</Button>
      </form>
    </div>
  );
};

export default Form;
