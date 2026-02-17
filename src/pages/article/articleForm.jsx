import { useState, useRef, useEffect } from "react";
import Accordion from "./create/accordion";
import Title from "./create/title";
import Editor from "./editor";
import Ingredients from "./create/ingredients";
import Instructions from "./create/instructions";
import UploadImage from "./create/uploadImage";
import UploadVideo from "./create/uploadVideo";
import Metadata from "./metadata";

const ArticleForm = ({
  setIsCategoryOpen,
  setIsCountryOpen,
  handleAddTag,
  errors,
  createArticle,
  onCreateChange,
  onIntroductionChange,
  handleIngredient,
  handleInstruction,
  setCreateArticle,
  onAdditionalInfoChange,
  imagePreview,
  videoPreview,
  handleDragOver,
  handleDragLeave,
  handleDrop,
  handleClickUploadFile,
  handleClickUploadVideo,
  handleRemoveImage,
  handleRemoveVideo,
  handleImageChange,
  handleVideoChange,
  fileInputRef,
  videoInputRef,
  isDragging,
  inputTag,
  isCategoryOpen,
  isCountryOpen,
  getSelectedCategoryName,
  getSelectedCountryName,
  handleCategorySelect,
  handleCountrySelect,
  handleRemoveTag,
  setInputTag,
}) => {
  const [isAccordionActive, setIsAccordionActive] = useState(0);
  const categoryRef = useRef(null);
  const countryRef = useRef(null);

  const accordionActive = (index) => {
    setIsAccordionActive(isAccordionActive === index ? null : index);
  };

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
    <section className="w-full h-auto">
      {errors?.length > 0 && (
        <div className="w-full p-6 bg-red-100 rounded-xl mb-10">
          <ul className="list-disc list-inside">
            {errors?.map((error, index) => (
              <li key={index} className="text-red-600 font-medium">
                {error}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="w-full h-auto grid lg:grid-cols-[2fr_1fr] gap-10">
        <div className="w-full h-auto flex flex-col gap-10">
          <Accordion
            title="Basic Info"
            index={0}
            accordionActive={accordionActive}
            isAccordionActive={isAccordionActive}
          >
            <Title
              title={createArticle.title}
              altText={createArticle.alt_text}
              onChange={onCreateChange}
            />
            <div className="w-full h-auto mt-10">
              <Editor
                value={createArticle.introduction}
                onChangeEvent={onIntroductionChange}
                placeholder="Write introduction for the recipe..."
              />
            </div>
          </Accordion>
          <Accordion
            title="Recipe Details"
            index={1}
            accordionActive={accordionActive}
            isAccordionActive={isAccordionActive}
          >
            <div className="w-full h-auto bg-white p-6 rounded-xl flex flex-col gap-6">
              <Ingredients
                ingredients={createArticle.ingredients}
                handleIngredient={handleIngredient}
                setCreateArticle={setCreateArticle}
              />
              <Instructions
                instructions={createArticle.instructions}
                handleInstruction={handleInstruction}
                setCreateArticle={setCreateArticle}
              />
            </div>
          </Accordion>
          <Accordion
            title="Additional Info"
            accordionActive={accordionActive}
            index={2}
            isAccordionActive={isAccordionActive}
          >
            <Editor
              value={createArticle.additional_info}
              onChangeEvent={onAdditionalInfoChange}
              placeholder="Add additional information about the recipe..."
            />
          </Accordion>
          <Accordion
            title="Media"
            index={3}
            accordionActive={accordionActive}
            isAccordionActive={isAccordionActive}
          >
            <div className="w-full bg-white p-6 px-8 pb-8 rounded-xl flex flex-col items-start gap-10">
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
          </Accordion>
        </div>
        <div className="w-full h-fit lg:sticky top-8 self-start">
          <Metadata
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
    </section>
  );
};

export default ArticleForm;
