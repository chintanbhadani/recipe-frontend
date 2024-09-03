import { PlusCircleIcon } from "@heroicons/react/24/outline";

const ImageComponent = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between">
        <p>No image</p>
        <PlusCircleIcon className="h-5 w-5 text-black-400" aria-hidden="true" />
      </div>
      <div>Add an Image</div>
    </div>
  );
};

export default ImageComponent;
