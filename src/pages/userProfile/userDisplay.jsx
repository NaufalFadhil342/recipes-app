import { useEdit } from "../../hooks/useEdit";
import { Icons } from "../../icons";
import { recipeIcons } from "../../data/recipeIconsData";

const UserDisplay = () => {
  const {
    handleClose,
    error,
    handleSubmit,
    formData,
    loading,
    imagePreview,
    handleChange,
    handleClickUpload,
    handleRemoveImage,
    handleImageChange,
    fileInputRef,
  } = useEdit();

  return (
    <div
      className="w-full h-full fixed z-10 bg-stone-800/70 top-0 left-0 flex items-center justify-center py-20 px-20"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-8 mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Edit Profile</h2>
          <button
            onClick={handleClose}
            className="size-10 rounded-full hover:bg-stone-100 flex items-center justify-center transition-colors"
          >
            <Icons iconsName={recipeIcons.riClose} className="size-6" />
          </button>
        </div>
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="w-full">
            <label className="block text-stone-600 text-sm mb-2">
              Display Name
            </label>
            <input
              type="text"
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter display name"
            />
          </div>
          <div className="flex gap-4">
            <div className="w-full">
              <label className="block text-stone-600 text-sm mb-2">
                Image Profile
              </label>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
              {!imagePreview ? (
                <div
                  className="border-2 border-dashed rounded-full w-50 h-48 text-center transition-colors cursor-pointer mt-4 hover:border-primary flex flex-col items-center justify-center"
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
                      <p className="text-lg font-medium text-stone-700">
                        Upload Image
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <div className="w-full h-auto">
                    <div className="w-50 h-48 rounded-full overflow-hidden">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-3 left-2/5 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-colors"
                    >
                      <Icons
                        iconsName={recipeIcons.riClose}
                        className="size-6"
                      />
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
          </div>
          <div className="mt-12">
            <label className="block text-stone-600 text-sm mb-2">
              Profession
            </label>
            <input
              type="text"
              name="profession"
              value={formData.profession}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter profession"
            />
          </div>

          <div className="flex gap-4 justify-end pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-2 rounded-lg border border-stone-300 hover:bg-stone-50 transition-colors hover:cursor-pointer"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 rounded-lg bg-primary text-inherit hover:bg-dark hover:cursor-pointer transition-colors disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserDisplay;
