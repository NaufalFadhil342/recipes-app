import { useEdit } from "../../hooks/useEdit";
import { Icons } from "../../icons";
import { recipeIcons } from "../../data/recipeIconsData";

const PersonalInformation = () => {
  const {
    formData,
    loading,
    error,
    user,
    handleChange,
    handleSubmit,
    handleClose,
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
          <div className="flex gap-4">
            <div className="w-full">
              <label className="block text-stone-600 text-sm mb-2">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter first name"
              />
            </div>
            <div className="w-full">
              <label className="block text-stone-600 text-sm mb-2">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter last name"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-full">
              <label className="block text-stone-600 text-sm mb-2">Email</label>
              <input
                type="email"
                value={user?.email}
                disabled
                className="w-full px-4 py-2 border border-stone-300 rounded-lg bg-stone-50 text-stone-500 cursor-not-allowed"
              />
            </div>
            <div className="w-full">
              <label className="block text-stone-600 text-sm mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter phone number"
              />
            </div>
          </div>

          <div>
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

export default PersonalInformation;
