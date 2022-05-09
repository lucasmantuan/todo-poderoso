import { useState } from "react";
import "./App.css";

function App() {
    const [mensagem, setMensagem] = useState("")
    const [oculta, setOculta] = useState([])
    const [resposta, setResposta] = useState("")
    const [ativado, setAtivado] = useState(false)

    document.onkeydown = (event) => {
        if (event.key === "Escape") {
            if (!ativado) {
                setAtivado(true)
            } else {
                setAtivado(false)
            }
        }
    }

    const substituir = (event) => {
        if (ativado) {
            let tamanho = event.target.value.length
            let letra = event.target.value[tamanho - 1]
            let frase = "Todo Poderoso computador, por favor me diga"
            let pedaco = frase.substring(0, tamanho)
            setOculta([...oculta, letra])
            setMensagem(pedaco)
        } else if (!ativado) {
            setMensagem(event.target.value)
        }
    }

    const processar = (event) => {
        if (event.key === "Enter") {
            setResposta("Processsando...");
            
            setTimeout( () => {
                setResposta("Resposta: " + oculta.toString().replace(/,/g, ""));
                setOculta([])
                setMensagem("")
            }, 1000)
            
        }
    }

    return (
        <div className="App">
            <div>
                <h1 className="titulo">Todo Poderoso!</h1>
                <p className="texto">Faça sua pergunta e pressione Enter para obter a resposta.</p>
                <input className="input" type="text" value={mensagem} onChange={(event) => substituir(event)} onKeyDown={(event) => processar(event)} autoFocus />
                <p className="resposta">{resposta}</p>
            </div>
        </div>
    );
}

export default App;
