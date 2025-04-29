import { useState, useRef, useEffect } from "react";

const App = () => {

  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [pass, setPass] = useState("")
  const [specializzazione, setSpecializzazione] = useState("Seleziona");
  const [anniEsperienza, setAnniEsperienza] = useState("")
  const [descrizione, setDescrizione] = useState("")
  const [errors, setErrors] = useState({});

  function handleSubmit(event) {
    event.preventDefault();

    const newErrors = {};
    if (!name) newErrors.name = "Il nome è obbligatorio";
    if (!username) newErrors.username = "L'username è obbligatorio";
    if (!pass) newErrors.pass = "La password è obbligatoria";
    if (specializzazione === "Seleziona") newErrors.specializzazione = "Seleziona una specializzazione";
    if (!anniEsperienza) newErrors.anniEsperienza = "Indica gli anni di esperienza";
    if (!descrizione) newErrors.descrizione = "Scrivi una descrizione";
    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) return;
    console.log("INVIO DEL FORM:");
    console.log("- name:", name);
    console.log("- user:", username);
    console.log("- pass:", pass);
    console.log("- spec:", specializzazione);
    console.log("- esperienza:", anniEsperienza);
    console.log("- descr:", descrizione);

    resetOrTest("reset")
  }

  function resetOrTest(mode) {
    if (mode === "test") {
      setName("Mario Rossi");
      setUsername("Maros");
      setPass("Mariorossi123!");
      setSpecializzazione("Frontend");
      setAnniEsperienza("5");
      setDescrizione("It's a me, Mario!");
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
            min={3}
            placeholder="Inserisci nome e cognome"
            className="form-control mb-3"
            value={name}
            onChange={e => { setName(e.target.value) }}
          />


          {/* username */}
          {errors.username && <small className="text-danger">{errors.username}</small>}
          <input
            type="text"
            min={1}
            placeholder="Inserisci un username"
            className="form-control mb-3"
            value={username}
            onChange={e => { setUsername(e.target.value) }}
          />

          {/* password */}
          {errors.pass && <small className="text-danger">{errors.pass}</small>}
          <input
            type="password"
            min={1}
            placeholder="Inserisci una password"
            className="form-control mb-3"
            value={pass}
            onChange={e => { setPass(e.target.value) }}
          />

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
            min={0}
            placeholder="Inserisci un anni di specializzazione"
            className="form-control mb-3"
            value={anniEsperienza}
            onChange={e => { setAnniEsperienza(e.target.value) }}
          />

          {/* texarea della descrizione*/}
          {errors.descrizione && <small className="text-danger">{errors.descrizione}</small>}
          <textarea
            type="text"
            min={1}
            placeholder="Inserisci la tua storia"
            className="form-control mb-3"
            value={descrizione}
            onChange={e => { setDescrizione(e.target.value) }}
          />

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



📌 Milestone 2: Validare in tempo reale
Aggiungere la validazione in tempo reale dei seguenti campi:

✅ Username: Deve contenere solo caratteri alfanumerici e almeno 6 caratteri (no spazi o simboli).
✅ Password: Deve contenere almeno 8 caratteri, 1 lettera, 1 numero e 1 simbolo.
✅ Descrizione: Deve contenere tra 100 e 1000 caratteri (senza spazi iniziali e finali).

Suggerimento: Per semplificare la validazione, puoi definire tre stringhe con i caratteri validi e usare .includes() per controllare se i caratteri appartengono a una di queste categorie:

const letters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()-_=+[]{}|;:'\\",.<>?/`~";
Per ciascuno dei campi validati in tempo reale, mostrare un messaggio di errore (rosso) nel caso non siano validi, oppure un messaggio di conferma (verde) nel caso siano validi.

📌 Milestone 3: Convertire i Campi Non Controllati
Non tutti i campi del form necessitano di essere aggiornati a ogni carattere digitato. Alcuni di essi non influenzano direttamente l’interfaccia mentre l’utente li compila, quindi è possibile gestirli in modo più efficiente.

Analizza il form: Identifica quali campi devono rimanere controllati e quali invece possono essere non controllati senza impattare l’esperienza utente.
Converti i campi non controllati: Usa useRef() per gestirli e recuperare il loro valore solo al momento del submit.
Assicurati che la validazione continui a funzionare: Anche se un campo non è controllato, deve comunque essere validato correttamente quando l’utente invia il form.
*/