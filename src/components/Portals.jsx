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
  addTier,
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
        <div className="fixed inset-0 flex justify-center items-center  animate-fadeIn">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-[90%] max-w-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
              Configurações da Tier
            </h2>

            {/* Mudar Nome da Tier */}
            <div className="mb-4">
              <label className="block mb-2 text-gray-700 font-medium">
                Nome da Tier:
              </label>
              <input
                type="text"
                className="border border-gray-300 p-2 w-full rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <button
                onClick={handleTitleChange}
                className="mt-2 p-2 bg-blue-500 text-white w-full rounded-lg hover:opacity-80 transition"
              >
                Atualizar Nome
              </button>
            </div>

            {/* Mudar Cor da Tier */}
            <div className="mb-4">
              <label className="block mb-2 text-gray-700 font-medium">
                Cor da Tier:
              </label>
              <input
                type="color"
                value={newColor}
                onChange={(e) => setNewColor(e.target.value)}
                className="w-full h-10 cursor-pointer border border-gray-300 rounded-lg"
              />
              <button
                onClick={handleColorChange}
                className="mt-2 p-2 bg-blue-500 text-white w-full rounded-lg hover:opacity-80 transition"
              >
                Atualizar Cor
              </button>
            </div>

            {/* Botões de Ação */}
            <div className="flex flex-col gap-2">
              <button
                onClick={() => removeTier(tier.title)}
                className="p-2 bg-red-500 text-white rounded-lg hover:opacity-80 transition"
              >
                Deletar Tier
              </button>

              <button
                onClick={() => clearImages(tier.title)}
                className="p-2 bg-yellow-500 text-white rounded-lg hover:opacity-80 transition"
              >
                Remover Imagens
              </button>

              <button
                onClick={addTier}
                className="p-2 bg-green-500 text-white rounded-lg hover:opacity-80 transition"
              >
                Adicionar Nova Tier
              </button>

              <button
                onClick={onClose}
                className="p-2 bg-gray-500 text-white rounded-lg hover:opacity-80 transition"
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
