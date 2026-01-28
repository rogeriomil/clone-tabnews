import React, { useState, useEffect } from "react";

// --- CONFIGURAÇÃO CHAVE ---
// Defina a data e hora exata de início do relacionamento.
// O formato ISO 8601 é o mais recomendado: "YYYY-MM-DDTHH:mm:ss"
// Exemplo: "2018-10-27T14:30:00" (27 de Outubro de 2018, às 14:30:00)
const DATA_INICIO_RELACIONAMENTO = new Date("2022-02-26T00:00:00").getTime();

// Define as constantes de tempo em milissegundos para facilitar o cálculo
const MS_SEGUNDO = 1000;
const MS_MINUTO = MS_SEGUNDO * 60;
const MS_HORA = MS_MINUTO * 60;
const MS_DIA = MS_HORA * 24;

// Função auxiliar para calcular a diferença de tempo e formatar
function calcularDuracao() {
  const agora = new Date().getTime();
  const diferencaMs = agora - DATA_INICIO_RELACIONAMENTO;

  // Garante que a diferença não é negativa
  if (diferencaMs < 0) {
    return { dias: 0, horas: 0, minutos: 0, segundos: 0 };
  }

  // --- CÁLCULO DA DURAÇÃO ---

  // 1. Dias
  const dias = Math.floor(diferencaMs / MS_DIA);
  // O restante dos milissegundos que não completaram um dia
  const restanteMsAposDias = diferencaMs % MS_DIA;

  // 2. Horas
  const horas = Math.floor(restanteMsAposDias / MS_HORA);
  // O restante dos milissegundos que não completaram uma hora
  const restanteMsAposHoras = restanteMsAposDias % MS_HORA;

  // 3. Minutos
  const minutos = Math.floor(restanteMsAposHoras / MS_MINUTO);
  // O restante dos milissegundos que não completaram um minuto
  const restanteMsAposMinutos = restanteMsAposHoras % MS_MINUTO;

  // 4. Segundos
  const segundos = Math.floor(restanteMsAposMinutos / MS_SEGUNDO);

  return { dias, horas, minutos, segundos };
}

export default function RelacionamentoContador() {
  // Inicializa o estado com a primeira duração calculada
  const [duracao, setDuracao] = useState(calcularDuracao());

  // UseEffect para configurar o intervalo de atualização
  useEffect(() => {
    // Configura o intervalo para rodar a cada 1000ms (1 segundo)
    const intervaloId = setInterval(() => {
      // Recalcula e atualiza o estado a cada segundo
      setDuracao(calcularDuracao());
    }, 1000);

    // Função de limpeza: IMPORTANTE para parar o intervalo quando o componente for desmontado
    return () => clearInterval(intervaloId);
  }, []); // O array vazio [] garante que o useEffect rode APENAS na montagem

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif" }}>
      <h1>💖 Eu te amo há... 💖</h1>

      {/* Exibição formatada dos valores */}
      <div style={{ fontSize: "2em", fontWeight: "bold", margin: "20px 0" }}>
        <span>{duracao.dias}</span> dias, <span>{duracao.horas}</span> horas,{" "}
        <span>{duracao.minutos}</span> minutos e <span>{duracao.segundos}</span>{" "}
        segundos!
      </div>
    </div>
  );
}

export { RelacionamentoContador };
