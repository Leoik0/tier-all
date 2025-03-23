import { useRef, useState } from "react";
import { useDrop } from "react-dnd";
import DraggableImage from "./DraggableImage";
import { FaArrowDown, FaArrowUp, FaCog } from "react-icons/fa";
import Portals from "./Portals";

const TierRow = ({
  index,
  title,
  images,
  moveImage,
  reorderImages,
  updateTitle,
  moveTier,
  color, // Recebe a cor da tier
  removeTier,
  updateColor,
  clearImages,
  addTier,
}) => {
  const titleRef = useRef(null);
  const [tierTitle, setTierTitle] = useState(title);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [, drop] = useDrop({
    accept: "image",
    drop: (item) => {
      if (!images.includes(item.image)) {
        moveImage(item.image, item.fromTier, tierTitle);
      }
    },
  });

  const handleBlur = () => {
    const newTitle = titleRef.current.innerText.trim();
    if (newTitle !== tierTitle) {
      setTierTitle(newTitle);
      updateTitle(title, newTitle);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      titleRef.current.blur();
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div ref={drop} className="flex items-center w-full">
      {/* Título da Tier com cor definida diretamente */}
      <div
        className={`flex items-center justify-center w-32  min-h-28 h-full p-4 ${color}`}
        style={{ backgroundColor: color }}
      >
        <span
          ref={titleRef}
          contentEditable
          suppressContentEditableWarning
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="font-bold text-lg text-white cursor-pointer focus:outline-none"
        >
          {tierTitle}
        </span>
      </div>

      {/* Área onde as imagens ficam organizadas corretamente */}
      <div className="flex flex-wrap w-full min-h-28 bg-neutral-900 gap-0.5">
        {images.map((image, index) => (
          <DraggableImage
            key={image}
            image={image}
            fromTier={tierTitle}
            moveImage={moveImage}
            reorderImages={reorderImages}
          />
        ))}
      </div>

      {/* Botões de Configuração e Mover */}
      <div className="flex items-center justify-center w-24 h-28 bg-black gap-2">
        <FaCog
          onClick={openModal}
          className="cursor-pointer text-white text-3xl"
        />
        <div className="h-full flex flex-col items-center justify-evenly gap-2">
          <FaArrowUp
            className="cursor-pointer text-3xl text-white"
            onClick={() => moveTier(index, -1)} // Move para cima
          />
          <FaArrowDown
            className="cursor-pointer text-3xl text-white"
            onClick={() => moveTier(index, 1)} // Move para baixo
          />
        </div>
      </div>

      {/* Modal */}
      <Portals
        isOpen={isModalOpen}
        onClose={closeModal}
        tier={{ title: tierTitle, color }}
        updateTitle={updateTitle}
        removeTier={removeTier}
        updateColor={updateColor}
        clearImages={() => clearImages(tierTitle)}
        addTier={addTier}
      />
    </div>
  );
};

export default TierRow;
