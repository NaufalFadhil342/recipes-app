import { Icons } from "../../../icons";
import { recipeIcons } from "../../../data/recipeIconsData";

const UploadImage = ({
  fileInputRef,
  handleImageChange,
  imagePreview,
  isDragging,
  handleDragOver,
  handleDragLeave,
  handleDrop,
  handleClickUpload,
  handleRemoveImage,
}) => {
  return (
    <div className="w-full h-auto">
      <h3 className="text-xl font-semibold mb-4">Image</h3>
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleImageChange}
      />
      {!imagePreview ? (
        <div
          className={`relative border-2 border-dashed rounded-lg p-12 text-center transition-colors cursor-pointer
                  ${
                    isDragging
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 hover:border-gray-400 bg-gray-50"
                  }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClickUpload}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
              <Icons
                iconsName={recipeIcons.mysUpload}
                className="size-10 text-stone-400"
              />
            </div>
            <div>
              <p className="text-lg font-medium text-gray-700">
                Drop your image here, or{" "}
                <span className="text-blue-600">browse</span>
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Supports: JPG, PNG, VIF (Max 5MB)
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative">
          <div className="relative rounded-lg overflow-hidden">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-auto max-h-96 object-cover"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-colors"
            >
              <Icons iconsName={recipeIcons.riClose} className="size-6" />
            </button>
          </div>
          <button
            type="button"
            onClick={handleClickUpload}
            className="mt-6 w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium"
          >
            Change Image
          </button>
        </div>
      )}
    </div>
  );
};

export default UploadImage;
