import { useState } from "react";
import { useNavigate } from "react-router";
import { recipeIcons } from "../../data/recipeIconsData";
import { Icons } from "../../icons";
import toast from "react-hot-toast";
import { useCreateArticle } from "../../hooks/useCreateArticle";
import { supabase } from "../../utils/supabase";
import ArticleForm from "./articleForm";
import RecipeBtn from "./create/recipeBtn";
import { useAuth } from "../../hooks/useAuth";

const createActions = [
  { name: "Save Draft", action: "draft", label: "Save recipe as draft" },
  { name: "Publish Now", action: "publish", label: "Publish recipe now" },
];

const Create = () => {
  const { user } = useAuth();
  const [currentAction, setCurrentAction] = useState(null);
  const [errors, setErrors] = useState([]);
  const {
    createArticle,
    validateArticle,
    setCreateArticle,
    defaultCreateState,
    onCreateChange,
    onAdditionalInfoChange,
    onIntroductionChange,
    isCategoryOpen,
    isCountryOpen,
    isDragging,
    handleAddTag,
    handleCategorySelect,
    handleDragLeave,
    handleDrop,
    handleClickUploadFile,
    handleClickUploadVideo,
    handleCountrySelect,
    handleDragOver,
    handleImageChange,
    handleIngredient,
    handleInstruction,
    handleRemoveImage,
    handleRemoveTag,
    handleRemoveVideo,
    handleVideoChange,
    fileInputRef,
    videoInputRef,
    imagePreview,
    videoPreview,
    inputTag,
    setInputTag,
    getSelectedCategoryName,
    getSelectedCountryName,
    setIsCategoryOpen,
    setIsCountryOpen,
  } = useCreateArticle();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateSubmit = async (isDraft) => {
    if (isSubmitting) return;

    const validationErrors = validateArticle(createArticle);

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix the errors before submitting.");
      return;
    }

    setErrors([]);
    setCurrentAction(isDraft ? "draft" : "publish");
    setIsSubmitting(true);

    try {
      const recipeData = {
        author_id: user?.id,
        title: createArticle.title,
        introduction: createArticle.introduction,
        additional_info: createArticle.additional_info,
        alt_text: createArticle.alt_text,
        img_cover: createArticle.img_cover,
        video_url: createArticle.video_url,
        ingredients: createArticle.ingredients,
        instructions: createArticle.instructions,
        category: createArticle.category,
        slug: createArticle.slug,
        tags: createArticle.tags,
        country_code: createArticle.country_code,
        is_draft: isDraft,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from("recipes")
        .insert(recipeData)
        .select();

      setCreateArticle(defaultCreateState);

      if (error) console.error("Error inserting recipe:", error);
      if (isDraft) {
        toast.success("Draft saved successfully");
        navigate("/my-recipes/draft");
      } else {
        toast.success("Recipe published successfully");
        navigate("/my-recipes/publish");
      }
    } catch (error) {
      console.error("Error saving recipe:", error);
      toast.error(
        isDraft
          ? "Failed to save recipe, try again."
          : "Failed to publish recipe, try again.",
      );
    } finally {
      setIsSubmitting(false);
      setCurrentAction(null);
    }
  };

  return (
    <form className="w-full h-auto my-28 px-12 md:px-20">
      <div className="w-full h-auto flex items-center justify-between gap-3">
        <h2 className="text-4xl font-semibold flex items-center gap-2">
          <Icons
            iconsName={recipeIcons.phNote}
            className="size-8 text-stone-600 hidden xs:block"
          />
          <>Create Article</>
        </h2>
        <div className="w-auto h-auto hidden sm:block">
          <RecipeBtn
            options={createActions}
            handleSubmit={handleCreateSubmit}
            isSubmitting={isSubmitting}
            currentAction={currentAction}
          />
        </div>
      </div>
      <div className="w-full h-auto mt-10">
        <ArticleForm
          handleAddTag={handleAddTag}
          createArticle={createArticle}
          onCreateChange={onCreateChange}
          onIntroductionChange={onIntroductionChange}
          onAdditionalInfoChange={onAdditionalInfoChange}
          imagePreview={imagePreview}
          videoPreview={videoPreview}
          fileInputRef={fileInputRef}
          videoInputRef={videoInputRef}
          isCategoryOpen={isCategoryOpen}
          isCountryOpen={isCountryOpen}
          inputTag={inputTag}
          isDragging={isDragging}
          errors={errors}
          setCreateArticle={setCreateArticle}
          setInputTag={setInputTag}
          setIsCategoryOpen={setIsCategoryOpen}
          setIsCountryOpen={setIsCountryOpen}
          getSelectedCategoryName={getSelectedCategoryName}
          getSelectedCountryName={getSelectedCountryName}
          handleCategorySelect={handleCategorySelect}
          handleCountrySelect={handleCountrySelect}
          handleClickUploadFile={handleClickUploadFile}
          handleClickUploadVideo={handleClickUploadVideo}
          handleIngredient={handleIngredient}
          handleInstruction={handleInstruction}
          handleDragLeave={handleDragLeave}
          handleDragOver={handleDragOver}
          handleDrop={handleDrop}
          handleImageChange={handleImageChange}
          handleRemoveImage={handleRemoveImage}
          handleRemoveTag={handleRemoveTag}
          handleRemoveVideo={handleRemoveVideo}
          handleVideoChange={handleVideoChange}
        />
      </div>
      <div className="w-auto h-auto mt-8 block sm:hidden">
        <RecipeBtn
          options={createActions}
          handleSubmit={handleCreateSubmit}
          isSubmitting={isSubmitting}
          currentAction={currentAction}
        />
      </div>
    </form>
  );
};

export default Create;
