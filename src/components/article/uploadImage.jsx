import { Icon } from "@iconify/react";

const UploadImage = (props) => {
  return (
    <div className="w-full h-auto">
      <h3 className="text-xl font-semibold mb-4">Cover Image</h3>
      <input
        ref={props.fileInputRef}
        type="file"
        className="hidden"
        accept="image/*"
        onChange={props.handleImageChange}
      />
      {!props.imagePreview ? (
        <div
          className={`relative border-2 border-dashed rounded-lg p-12 text-center transition-colors cursor-pointer
                  ${
                    props.isDragging
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 hover:border-gray-400 bg-gray-50"
                  }`}
          onDragOver={props.handleDragOver}
          onDragLeave={props.handleDragLeave}
          onDrop={props.handleDrop}
          onClick={props.handleClickUpload}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
              <Icon
                icon="material-symbols:upload-rounded"
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
              src={props.imagePreview}
              alt="Preview"
              className="w-full h-auto max-h-96 object-cover"
            />
            <button
              type="button"
              onClick={props.handleRemoveImage}
              className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-colors"
            >
              <Icon icon="material-symbols:close-rounded" className="size-6" />
            </button>
          </div>
          <button
            type="button"
            onClick={props.handleClickUpload}
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
