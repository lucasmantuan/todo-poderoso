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

            if (/poderoso/i.test(mensagem) && /funciona/i.test(mensagem)) {
                setTimeout(() => {
                    setResposta("Pressione [Esc] para ativar, digite a resposta e pressione [Esc] novamente. Enquanto resposta é digitada uma outra frase é exibida. Em seguida complete a frase com a sua pergunta e pressione [Enter]. Pronto, agora você pode enganar os amigos!");
                }, 1000)
            } else {
                if (oculta.length === 0) {
                    setTimeout(() => {
                        setResposta("Não consegui processar a resposta...");
                    }, 1000)
                } else {
                    setTimeout(() => {
                        setResposta(oculta.toString().replace(/,/g, ""));
                        setOculta([])
                        setMensagem("")
                    }, 1000)
                }
            }
        }
    }

    return (
        <div className="App">
            <div>
                <h1 className="titulo crt">Todo Poderoso!</h1>
                <p className="texto">Faça qualquer pergunta para o <strong className="crt">Todo Poderoso!</strong> e pressione [Enter] para obter a resposta.</p>
                <p className="texto-pequeno">Para saber como ele funciona, faça a pergunta certa.</p>
                <input className="input" type="text" value={mensagem} onChange={(event) => substituir(event)} onKeyDown={(event) => processar(event)} spellCheck="false" autoFocus />
                <p className="resposta">Resposta: {resposta}</p>
            </div>
        </div>
    );
}

export default App;
