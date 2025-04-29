import { useState, useRef, useEffect } from "react";

const App = () => {

  const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()-_=+[]{}|;:',.<>?/`~";


  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [pass, setPass] = useState("")
  const [specializzazione, setSpecializzazione] = useState("Seleziona");
  const [anniEsperienza, setAnniEsperienza] = useState("")
  const [descrizione, setDescrizione] = useState("")
  const [errors, setErrors] = useState({});

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
      { key: "name", value: name, message: "Il nome è obbligatorio" },
      { key: "username", value: username, message: "L'username è obbligatorio" },
      { key: "pass", value: pass, message: "La password è obbligatoria" },
      { key: "specializzazione", value: specializzazione !== "Seleziona", message: "Seleziona una specializzazione" },
      { key: "anniEsperienza", value: anniEsperienza, message: "Indica gli anni di esperienza" },
      { key: "descrizione", value: descrizione, message: "Scrivi una descrizione" }
    ];

    requiredFields.forEach(({ key, value, message }) => {
      if (!value) newErrors[key] = message;
    });

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    console.log("INVIO DEL FORM:", { name, username, pass, specializzazione, anniEsperienza, descrizione });
    resetOrTest("reset");
  }


  function resetOrTest(mode) {
    if (mode === "test") {
      setName("Mario Rossi");
      setUsername("Marossi");
      setPass("Mariorossi123!");
      setSpecializzazione("Frontend");
      setAnniEsperienza("5");
      setDescrizione("Mi chiamo Mario e ho lavorato nel settore IT per oltre 10 anni. Ho esperienza sia nel frontend che nel backend...");
      setErrors({})
    } else if (mode === "reset") {
      setName("");
      setUsername("");
      setPass("");
      setSpecializzazione("Seleziona");
      setAnniEsperienza("");
      setDescrizione("");
      setErrors({});
    }
  }


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
            value={name}
            onChange={e => setName(e.target.value)}
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
            value={anniEsperienza}
            onChange={e => setAnniEsperienza(e.target.value)} />

          {/* texarea della descrizione*/}
          {errors.descrizione && <small className="text-danger">{errors.descrizione}</small>}
          <textarea
            type="text"
            name="descrizione"
            placeholder="Inserisci la tua storia"
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





/*
📌 Milestone 1: Creare un Form con Campi Controllati
Crea un form di registrazione con i seguenti campi controllati (gestiti con useState) validali e stampali

📌 Milestone 2: Validare in tempo reale utilizzando .includes()


📌 Milestone 3: Convertire i Campi Non Controllati utilizzando useRef() per recuperare il loro valore al momento del submit
Non tutti i campi del form necessitano di essere aggiornati a ogni carattere digitato. Alcuni di essi non influenzano direttamente l’interfaccia mentre l’utente li compila, quindi è possibile gestirli in modo più efficiente.

Analizza il form: Identifica quali campi devono rimanere controllati e quali invece possono essere non controllati senza impattare l’esperienza utente.
Converti i campi non controllati: Usa useRef() per gestirli e recuperare il loro valore solo al momento del submit.
Assicurati che la validazione continui a funzionare: Anche se un campo non è controllato, deve comunque essere validato correttamente quando l’utente invia il form.
*/