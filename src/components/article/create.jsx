import { useRef, useEffect } from "react";
import UploadImage from "./uploadImage";
import UploadVideo from "./uploadVideo";
import Editor from "./editor";
import Category from "./create/category";

const categorySelection = [
  { id: 1, name: "Asean", value: "asean" },
  { id: 2, name: "Asian", value: "asian" },
  { id: 3, name: "European", value: "european" },
  { id: 4, name: "American", value: "american" },
  { id: 5, name: "Eastern", value: "eastern" },
];

const Create = ({
  createArticle,
  handleAddTag,
  onCreateChange,
  imagePreview,
  videoPreview,
  fileInputRef,
  videoInputRef,
  isCategoryOpen,
  isDragging,
  inputTag,
  setInputTag,
  setIsCategoryOpen,
  getSelectedCategoryName,
  handleCategorySelect,
  handleClickUploadFile,
  handleClickUploadVideo,
  handleDragLeave,
  handleDragOver,
  handleDrop,
  handleImageChange,
  handleRemoveImage,
  handleRemoveTag,
  handleRemoveVideo,
  handleVideoChange,
}) => {
  const categoryRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setIsCategoryOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const canEnterTag = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <div className="w-full h-auto grid lg:grid-cols-[2fr_1fr] gap-10">
      <div className="w-full h-auto flex flex-col gap-10">
        <div className="w-full h-auto p-6 px-8 pb-8 rounded-xl bg-white flex flex-col gap-6">
          <input
            type="text"
            className="w-full h-auto text-4xl font-bold pb-2 outline-none leading-none placeholder:text-stone-400/70 text-stone-600 border-b-2 border-stone-600/15"
            placeholder="Recipe title"
            name="title"
            value={createArticle.title}
            onChange={onCreateChange}
          />
        </div>
        <div className="w-full h-auto">
          <Editor
            value={createArticle.content}
            onChangeEvent={onCreateChange}
          />
        </div>
        <div className="w-full bg-white p-6 px-8 pb-8 rounded-xl flex flex-col items-start gap-10">
          <h3 className="text-xl font-semibold">Media</h3>
          <UploadImage
            imagePreview={imagePreview}
            handleDragOver={handleDragOver}
            handleDragLeave={handleDragLeave}
            handleDrop={handleDrop}
            handleClickUpload={handleClickUploadFile}
            fileInputRef={fileInputRef}
            handleImageChange={handleImageChange}
            handleRemoveImage={handleRemoveImage}
            isDragging={isDragging}
          />
          <UploadVideo
            videoPreview={videoPreview}
            handleDragOver={handleDragOver}
            handleDragLeave={handleDragLeave}
            handleDrop={handleDrop}
            handleClickUpload={handleClickUploadVideo}
            videoInputRef={videoInputRef}
            handleVideoChange={handleVideoChange}
            handleRemoveVideo={handleRemoveVideo}
            isDragging={isDragging}
          />
        </div>
      </div>
      <div className="w-full h-fit lg:sticky top-8 self-start">
        <div className="w-full h-auto bg-white p-6 px-8 rounded-xl lg:max-h-[calc(100vh-3rem)] lg:overflow-y-auto">
          <h2 className="text-xl font-semibold">Article Details</h2>
          <div className="mt-6 flex flex-col w-full h-auto gap-6">
            <div className="w-full h-auto">
              <Category
                categoryRef={categoryRef}
                categorySelection={categorySelection}
                createArticle={createArticle}
                getSelectedCategoryName={getSelectedCategoryName}
                handleCategorySelect={handleCategorySelect}
                isCategoryOpen={isCategoryOpen}
                setIsCategoryOpen={setIsCategoryOpen}
              />
            </div>
            <div className="w-full h-auto">
              <label className="font-medium">Slug</label>
              <input
                type="text"
                placeholder="Enter-recipe-slug"
                className="border-b-2 border-stone-600/15 w-full py-3 mt-2 placeholder:text-stone-300 outline-none hover:border-primary focus:border-primary"
                name="slug"
                value={createArticle.slug}
                onChange={onCreateChange}
              />
            </div>
            <div className="w-full h-auto">
              <label className="font-medium">Tags</label>
              <div className="w-full flex items-end justify-between gap-4 mt-2">
                <input
                  type="text"
                  placeholder="pasta, barbeque, rendang"
                  className="w-full py-3 border-b-2 border-stone-600/15 outline-none hover:border-primary focus:border-primary"
                  value={inputTag}
                  onChange={(e) => setInputTag(e.target.value)}
                  onKeyDown={canEnterTag}
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="w-auto h-10 px-4 rounded-md bg-stone-300 hover:bg-[#c2bebb] transition-all duration-150"
                >
                  Generate
                </button>
              </div>
              <div className="w-full h-auto flex gap-2 mt-4 flex-wrap">
                {createArticle.tags.length > 0 &&
                  createArticle.tags.map((tag, index) => (
                    <div
                      key={index}
                      className="w-auto h-6 rounded-full px-3 py-4 bg-primary/20 flex items-center gap-2"
                    >
                      <span className="text-sm capitalize">{tag}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(index)}
                        className="text-xs hover:text-red-600"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
              </div>
            </div>
            <div className="w-full h-auto">
              <label className="font-medium">Created At</label>
              <input
                type="date"
                className="w-full h-auto mt-2 py-3 border-b-2 border-stone-600/15 placeholder:text-stone-300 outline-none hover:border-primary focus:border-primary"
                name="createdAt"
                value={createArticle.createdAt}
                onChange={onCreateChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
