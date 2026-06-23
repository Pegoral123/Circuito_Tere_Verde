import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  const [showModal, setShowModal] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const ios =
      /iPad|iPhone|iPod/.test(navigator.userAgent) &&
      !(window as any).MSStream;

    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as any).standalone;

    setIsIOS(ios);

    // Não mostra se já está instalado
    if (standalone) return;

    const handler = (e: Event) => {
      e.preventDefault();

      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowModal(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    // iPhone não possui beforeinstallprompt
    if (ios) {
      setShowModal(true);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const installApp = async () => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();

    const choice = await deferredPrompt.userChoice;

    if (choice.outcome === "accepted") {
      console.log("Aplicativo instalado");
    }

    setDeferredPrompt(null);
    setShowModal(false);
  };

  if (!showModal) return null;

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2>Instalar Aplicativo</h2>

        {isIOS ? (
          <>
            <p>
              Para instalar no iPhone:
            </p>

            <ol style={{ textAlign: "left" }}>
              <li>Toque em Compartilhar ⬆️</li>
              <li>Selecione "Adicionar à Tela de Início"</li>
              <li>Confirme em "Adicionar"</li>
            </ol>
          </>
        ) : (
          <>
            <p>
              Instale o aplicativo para acessar mais rápido e usar recursos offline.
            </p>

            <button
              onClick={installApp}
              style={buttonStyle}
            >
              Instalar
            </button>
          </>
        )}

        <button
          onClick={() => setShowModal(false)}
          style={closeButtonStyle}
        >
          Fechar
        </button>
      </div>
    </div>
  );
}

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
};

const modalStyle: React.CSSProperties = {
  background: "#fff",
  padding: "24px",
  borderRadius: "12px",
  width: "90%",
  maxWidth: "400px",
  textAlign: "center",
};

const buttonStyle: React.CSSProperties = {
  padding: "12px 24px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "16px",
  background:"green",
  color: "white"

};

const closeButtonStyle: React.CSSProperties = {
  marginTop: "12px",
  padding: "10px 20px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};