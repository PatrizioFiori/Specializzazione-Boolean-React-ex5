
/*
📌 Milestone 1: Creare un Form con Campi Controllati
Crea un form di registrazione con i seguenti campi controllati (gestiti con useState) validali e stampali

📌 Milestone 2: Validare in tempo reale utilizzando .includes()

📌 Milestone 3: Convertire i Campi Non Controllati utilizzando useRef() per recuperare il valore al momento del submit
*/


import { useState, useRef, useEffect } from "react";

const App = () => {

  const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()-_=+[]{}|;:',.<>?/`~";

  const [username, setUsername] = useState("")
  const [pass, setPass] = useState("")
  const [specializzazione, setSpecializzazione] = useState("Seleziona");
  const [descrizione, setDescrizione] = useState("")
  const [errors, setErrors] = useState({});
  const refName = useRef()
  const refanniEpserienza = useRef()


  function aggiornamentoAndValidation(valore, key) {
    valore = valore.trim();
    const newErrors = {};

    if (key === "username") {
      setUsername(valore);
      if (valore.length < 6) {
        newErrors[key] = "L'user deve essere più di 6 caratteri";
      } else if (![...valore].every(char => letters.includes(char))) {
        newErrors[key] = "L'user deve includere solo lettere";
      } else {
        newErrors[key] = "";
      }
    }

    if (key === "pass") {
      setPass(valore);
      const includeLettere = [...valore].some(char => letters.includes(char));
      const includeNumero = [...valore].some(char => numbers.includes(char));
      const includeSimbolo = [...valore].some(char => symbols.includes(char));
      newErrors[key] = (includeLettere && includeNumero && includeSimbolo)
        ? ""
        : "Deve includere una lettera, un numero e un simbolo";
    }

    if (key === "descrizione") {
      setDescrizione(valore);
      newErrors[key] = (valore.length >= 100 && valore.length <= 1000)
        ? ""
        : "Numero di caratteri compreso tra 100 e 1000";
    }

    setErrors(prev => ({ ...prev, ...newErrors }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newErrors = {};
    const requiredFields = [
      { key: "name", value: refName.current.value.trim(), message: "Il nome è obbligatorio" },
      { key: "username", value: username.trim(), message: "L'username è obbligatorio" },
      { key: "pass", value: pass.trim(), message: "La password è obbligatoria" },
      { key: "specializzazione", value: specializzazione !== "Seleziona", message: "Seleziona una specializzazione" },
      { key: "anniEsperienza", value: refanniEpserienza.current.value.trim(), message: "Indica gli anni di esperienza" },
      { key: "descrizione", value: descrizione.trim(), message: "Scrivi una descrizione" }
    ];


    requiredFields.forEach(({ key, value, message }) => {
      if (!value) newErrors[key] = message;
    });

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    console.log("INVIO DEL FORM:", {
      name: refName.current.value,
      username,
      pass,
      specializzazione,
      anniEsperienza: refanniEpserienza.current.value,
      descrizione
    });

    resetOrTest("reset");

  }


  function resetOrTest(mode) {
    const isTest = mode === "test";
    refName.current.value = isTest ? "Mario Rossi" : "";
    setUsername(isTest ? "Marossi" : "");
    setPass(isTest ? "Mariorossi123!" : "");
    setSpecializzazione(isTest ? "Frontend" : "Seleziona");
    refanniEpserienza.current.value = isTest ? "5" : "";
    setDescrizione(isTest ? "Mi chiamo Mario e ho lavorato nel settore IT per oltre 10 anni. Ho esperienza sia nel frontend che nel backend..." : "");
    setErrors({});
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <form className="d-flex flex-column w-100 p-4 rounded shadow bg-white" onSubmit={e => handleSubmit(e)} style={{ maxWidth: '400px' }}>

          <h2>Registrati</h2>
          <hr className="p-1" />

          {/* nome e cognome */}
          {errors.name && <small className="text-danger">{errors.name}</small>}
          <input
            type="text"
            name="name"
            placeholder="Inserisci nome e cognome"
            className="form-control mb-3"
            ref={refName}
          />


          {/* username */}
          {errors.username && <small className="text-danger">{errors.username}</small>}
          <input
            type="text"
            name="username"
            placeholder="Inserisci un username"
            className="form-control mb-3"
            value={username}
            onChange={e => { aggiornamentoAndValidation(e.target.value, e.target.name) }} />

          {/* password */}
          {errors.pass && <small className="text-danger">{errors.pass}</small>}
          <input
            type="password"
            name="pass"
            placeholder="Inserisci una password"
            className="form-control mb-3"
            value={pass}
            onChange={e => { aggiornamentoAndValidation(e.target.value, e.target.name) }} />

          {/* select di specializzazione */}
          {errors.specializzazione && <small className="text-danger">{errors.specializzazione}</small>}
          <select className="form-select mb-3" value={specializzazione} onChange={e => setSpecializzazione(e.target.value)}>
            <option disabled value="Seleziona">Seleziona una specializzazione</option>
            <option value="FullStack">FullStack</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
          </select>

          {/* anni di esperienza */}
          {errors.anniEsperienza && <small className="text-danger">{errors.anniEsperienza}</small>}
          <input
            type="number"
            name="anniEsperienza"
            min={0}
            placeholder="Inserisci un anni di specializzazione"
            className="form-control mb-3"
            ref={refanniEpserienza}
          />

          {/* texarea della descrizione*/}
          {errors.descrizione && <small className="text-danger">{errors.descrizione}</small>}
          <textarea
            type="text"
            name="descrizione"
            placeholder="Parla di te"
            className="form-control mb-3"
            value={descrizione}
            onChange={e => { aggiornamentoAndValidation(e.target.value, e.target.name) }} />

          {/* btn di invio e reset */}
          <div className="d-flex justify-content-center gap-2 mt-3">
            <button type="submit" className="btn btn-success">Confirm</button>
            <button type="button" className="btn btn-danger" onClick={() => resetOrTest("reset")}>Reset</button>
            <button type="button" className="btn btn-warning" onClick={() => resetOrTest("test")}>TEST</button>

          </div>

        </form>

      </div>


    </>
  )
}

export default App




