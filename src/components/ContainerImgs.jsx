import { useDrag, useDrop } from "react-dnd";

const ContainerImgs = ({ images, onImageUpload, moveImage }) => {
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 50) {
      alert("Você só pode adicionar até 50 imagens.");
      return;
    }
    const newImages = files.map((file) => URL.createObjectURL(file));
    onImageUpload(newImages);
  };

  const [, drop] = useDrop({
    accept: "image",
    drop: (item) => moveImage(item.image, item.fromTier, "container"),
  });

  return (
    <div ref={drop} className="w-full p-4 bg-neutral-900 shadow-md rounded-lg">
      <h2 className="text-2xl text-white font-semibold mb-4">
        Upload de Imagens
      </h2>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4 border p-2 w-full text-white bg-neutral-800"
      />
      <div className="flex flex-wrap gap-2">
        {images.map((image, index) => (
          <DraggableImage
            key={index}
            image={image}
            fromTier="container"
            moveImage={moveImage}
          />
        ))}
      </div>
    </div>
  );
};

const DraggableImage = ({ image, fromTier, moveImage }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "image",
    item: { image, fromTier },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className="w-32 h-28 cursor-pointer"
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

export default ContainerImgs;
