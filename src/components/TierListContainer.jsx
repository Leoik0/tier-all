import React from "react";
import TierRow from "./TierRow";

const TierListContainer = ({
  tiers,
  setTiers,
  moveImage,
  reorderImages,
  updateTitle,
  updateColor,
  clearImages,
  removeTier,
}) => {
  const moveTier = (index, direction) => {
    setTiers((prevTiers) => {
      const targetIndex = index + direction;
      if (targetIndex < 0 || targetIndex >= prevTiers.length) return prevTiers;

      const newTiers = [...prevTiers];
      const [movedTier] = newTiers.splice(index, 1);
      newTiers.splice(targetIndex, 0, movedTier);

      console.log(
        "Novo estado:",
        newTiers.map((t) => t.title)
      );
      return newTiers;
    });
  };

  const addTier = () => {
    const newTier = { title: "A", images: [], color: "bg-blue-400" }; // Novo tier
    setTiers((prevTiers) => [...prevTiers, newTier]); // Adiciona ao estado
  };

  return (
    <div className="flex flex-col w-full h-auto gap-0.5 bg-black border-2 border-black ">
      {tiers.map((tier, index) => (
        <TierRow
          key={`${tier.title}-${index}`}
          index={index}
          title={tier.title}
          images={tier.images}
          moveImage={moveImage}
          reorderImages={reorderImages}
          updateTitle={updateTitle}
          moveTier={moveTier}
          color={tier.color}
          updateColor={updateColor}
          clearImages={clearImages}
          removeTier={removeTier}
          addTier={addTier}
        />
      ))}
    </div>
  );
};

export default TierListContainer;
