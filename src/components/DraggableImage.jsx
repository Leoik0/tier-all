import { useDrag, useDrop } from "react-dnd";
import { useRef } from "react";

const DraggableImage = ({
  image,
  fromTier,
  moveImage,
  reorderImages,
  index,
  images,
}) => {
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "image",
    item: { image, fromTier, index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop({
    accept: "image",
    hover: (draggedItem, monitor) => {
      if (!ref.current) return;

      const draggedIndex = draggedItem.index;
      const targetIndex = index;

      if (draggedIndex === targetIndex) return; // Se for a mesma posição, não faz nada

      // Pega a posição do mouse em relação ao item sobreposto
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleX =
        (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
      const mouseX = monitor.getClientOffset().x - hoverBoundingRect.left;

      // Define se a imagem dropada deve ir para a esquerda ou direita
      if (draggedIndex < targetIndex && mouseX < hoverMiddleX) return;
      if (draggedIndex > targetIndex && mouseX > hoverMiddleX) return;

      reorderImages(draggedItem.image, fromTier, targetIndex);

      draggedItem.index = targetIndex; // Atualiza o índice do item arrastado
    },
  });

  drag(drop(ref)); // Conecta drag & drop no mesmo elemento

  return (
    <div
      ref={ref}
      className="w-32 h-28 cursor-pointer "
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <img
        src={image}
        alt="Draggable"
        className="w-full h-full object-cover "
      />
    </div>
  );
};

export default DraggableImage;
