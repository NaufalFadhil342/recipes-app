import { useRef, useEffect } from "react";
import UploadImage from "./uploadImage";
import UploadVideo from "./uploadVideo";
import Editor from "./editor";
import ArticleDetail from "./articleDetail";

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
  isCountryOpen,
  inputTag,
  setInputTag,
  setIsCategoryOpen,
  setIsCountryOpen,
  getSelectedCategoryName,
  getSelectedCountryName,
  handleCategorySelect,
  handleCountrySelect,
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
  const countryRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setIsCategoryOpen(false);
      }
      if (countryRef.current && !countryRef.current.contains(event.target)) {
        setIsCountryOpen(false);
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
          <input
            type="text"
            className="w-full h-auto outline-none"
            placeholder="Alternative text (ex. rendang)"
            name="alt_text"
            value={createArticle.alt_text}
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
          <h3 className="text-xl font-semibold">Media (Image & Video)</h3>
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
        <ArticleDetail
          categoryRef={categoryRef}
          countryRef={countryRef}
          canEnterTag={canEnterTag}
          createArticle={createArticle}
          inputTag={inputTag}
          isCategoryOpen={isCategoryOpen}
          getSelectedCategoryName={getSelectedCategoryName}
          handleAddTag={handleAddTag}
          handleCategorySelect={handleCategorySelect}
          handleCountrySelect={handleCountrySelect}
          handleRemoveTag={handleRemoveTag}
          onCreateChange={onCreateChange}
          setInputTag={setInputTag}
          setIsCategoryOpen={setIsCategoryOpen}
          setIsCountryOpen={setIsCountryOpen}
          getSelectedCountryName={getSelectedCountryName}
          isCountryOpen={isCountryOpen}
        />
      </div>
    </div>
  );
};

export default Create;
