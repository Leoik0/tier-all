import { useState } from "react";
import ReactDOM from "react-dom";

const Portals = ({
  isOpen,
  onClose,
  tier,
  updateTitle,
  removeTier,
  updateColor,
  clearImages,
  addTier, // Adicionando a prop addTier
}) => {
  const [newTitle, setNewTitle] = useState(tier.title);
  const [newColor, setNewColor] = useState(tier.color);

  const handleTitleChange = () => {
    updateTitle(tier.title, newTitle);
    onClose();
  };

  const handleColorChange = () => {
    updateColor(tier.title, newColor);
    onClose();
  };

  return isOpen
    ? ReactDOM.createPortal(
        <div className="fixed inset-0 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-2xl mb-4">Configurações da Tier</h2>

            {/* Mudar Nome da Tier */}
            <div className="mb-4">
              <label className="block mb-2">Nome da Tier:</label>
              <input
                type="text"
                className="border p-2 w-full"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <button
                onClick={handleTitleChange}
                className="mt-2 p-2 bg-blue-500 text-white w-full"
              >
                Atualizar Nome
              </button>
            </div>

            {/* Mudar Cor da Tier */}
            <div className="mb-4">
              <label className="block mb-2">Cor da Tier:</label>
              <input
                type="color"
                value={newColor}
                onChange={(e) => setNewColor(e.target.value)}
                className="w-full"
              />
              <button
                onClick={handleColorChange}
                className="mt-2 p-2 bg-blue-500 text-white w-full"
              >
                Atualizar Cor
              </button>
            </div>

            {/* Botões */}
            <div className="flex justify-between">
              <button
                onClick={() => removeTier(tier.title)}
                className="p-2 bg-red-500 text-white"
              >
                Deletar Tier
              </button>

              <button
                onClick={() => {
                  console.log("Chamando clearImages para", tier.title);
                  clearImages(tier.title);
                }}
                className="p-2 bg-yellow-500 text-white"
              >
                Remover Imagens
              </button>

              {/* Botão para adicionar nova Tier */}
              <button
                onClick={addTier}
                className="p-2 bg-green-500 text-white w-full mt-4"
              >
                Adicionar Nova Tier
              </button>
            </div>

            <div className="mt-4">
              <button
                onClick={onClose}
                className="p-2 bg-gray-500 text-white w-full"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>,
        document.body
      )
    : null;
};

export default Portals;
