import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TierListContainer from "./components/TierListContainer";
import ContainerImgs from "./components/ContainerImgs";

const App = () => {
  const initialTiers = [
    { title: "S", images: [], color: "bg-red-400 " }, // Vermelho fraco
    { title: "A", images: [], color: "bg-orange-300" }, // Laranja média
    { title: "B", images: [], color: "bg-yellow-600" }, // Laranja fraco
    { title: "C", images: [], color: "bg-yellow-400" }, // Amarelo mediano
    { title: "D", images: [], color: "bg-green-400" }, // Verde lima
  ];

  const updateColor = (tierTitle, newColor) => {
    setTiers((prevTiers) =>
      prevTiers.map((tier) =>
        tier.title === tierTitle ? { ...tier, color: newColor } : tier
      )
    );
  };

  const removeTier = (tierTitle) => {
    setTiers((prevTiers) =>
      prevTiers.filter((tier) => tier.title !== tierTitle)
    );
  };

  const clearImages = (tierTitle) => {
    setTiers((prevTiers) =>
      prevTiers.map((tier) =>
        tier.title === tierTitle ? { ...tier, images: [] } : tier
      )
    );
  };

  const updateTitle = (oldTitle, newTitle) => {
    setTiers((prevTiers) =>
      prevTiers.map((tier) =>
        tier.title === oldTitle ? { ...tier, title: newTitle } : tier
      )
    );
  };

  const [tiers, setTiers] = useState(initialTiers);
  const [containerImages, setContainerImages] = useState([]);

  const handleImageUpload = (newImages) => {
    setContainerImages((prev) => [...prev, ...newImages]);
  };

  const moveImage = (image, fromTier, toTier) => {
    setTiers((prevTiers) => {
      return prevTiers.map((tier) => {
        if (tier.title === fromTier) {
          return {
            ...tier,
            images: tier.images.filter((img) => img !== image),
          };
        }
        if (tier.title === toTier && !tier.images.includes(image)) {
          return { ...tier, images: [...tier.images, image] };
        }
        return tier;
      });
    });

    setContainerImages((prev) => {
      if (fromTier === "container") {
        return prev.filter((img) => img !== image);
      }
      if (toTier === "container" && !prev.includes(image)) {
        return [...prev, image];
      }
      return prev;
    });
  };

  const reorderImages = (draggedImage, tierTitle, targetIndex) => {
    setTiers((prevTiers) => {
      return prevTiers.map((tier) => {
        if (tier.title === tierTitle) {
          let updatedImages = tier.images.filter((img) => img !== draggedImage);
          updatedImages.splice(targetIndex, 0, draggedImage);
          return { ...tier, images: updatedImages };
        }
        return tier;
      });
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen h-full w-7xl  gap-4 mx-auto flex flex-col justify-evenly items-center ">
        <h1>Tier All</h1>
        <TierListContainer
          tiers={tiers}
          setTiers={setTiers}
          moveImage={moveImage}
          reorderImages={reorderImages}
          updateTitle={updateTitle}
          updateColor={updateColor}
          clearImages={clearImages}
          removeTier={removeTier}
        />
        <ContainerImgs
          images={containerImages}
          onImageUpload={handleImageUpload}
          moveImage={moveImage}
        />
      </div>
    </DndProvider>
  );
};

export default App;
