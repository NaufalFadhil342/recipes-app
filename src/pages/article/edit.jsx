import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import ArticleForm from "./articleForm";
import RecipeBtn from "./create/recipeBtn";
import { Icons } from "../../icons";
import { recipeIcons } from "../../data/recipeIconsData";
import { useCreateArticle } from "../../hooks/useCreateArticle";
import toast from "react-hot-toast";
import { supabase } from "../../utils/supabase";
import Loading from "../../UI/loading";

const editActions = [
  { name: "Update & Save", action: "draft", label: "Update and save changes" },
  {
    name: "Update & Publish",
    action: "publish",
    label: "Update and publish now",
  },
];

const Edit = () => {
  const [currentAction, setCurrentAction] = useState(null);
  const [errors, setErrors] = useState([]);
  const { authorId, slug } = useParams();
  const [editArticle, setEditArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const {
    createArticle,
    validateArticle,
    setCreateArticle,
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
  } = useCreateArticle(true, editArticle);

  useEffect(() => {
    const fetchDraftArticle = async () => {
      setLoading(true);

      try {
        const { data, error } = await supabase
          .from("recipes")
          .select("*")
          .eq("author_id", authorId)
          .eq("slug", slug)
          .single();

        if (error) {
          console.error("Error fetchin draft:", error);
          setErrors([{ message: "Failed to load recipe" }]);
          return;
        }

        setEditArticle(data);
      } catch (error) {
        console.error("Unexpected error fetching draft:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDraftArticle();
  }, [slug, authorId]);

  useEffect(() => {
    if (editArticle) {
      const editableFields = {
        title: editArticle.title,
        introduction: editArticle.introduction,
        ingredients: editArticle.ingredients,
        instructions: editArticle.instructions,
        additional_info: editArticle.additional_info,
        alt_text: editArticle.alt_text,
        img_cover: editArticle.img_cover,
        category: editArticle.category,
        video_url: editArticle.video_url,
        country_code: editArticle.country_code,
        slug: editArticle.slug,
        tags: editArticle.tags,
      };

      setCreateArticle(editableFields);
    }
  }, [editArticle]);

  if (loading)
    return (
      <div className="w-full h-auto my-20 flex items-center justify-center">
        <Loading />
      </div>
    );

  const handleEditSubmit = async (isDraft) => {
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
      const updatedData = {
        title: createArticle.title,
        introduction: createArticle.introduction,
        ingredients: createArticle.ingredients,
        instructions: createArticle.instructions,
        additional_info: createArticle.additional_info,
        alt_text: createArticle.alt_text,
        img_cover: createArticle.img_cover,
        video_url: createArticle.video_url,
        category: createArticle.category,
        country_code: createArticle.country_code,
        slug: createArticle.slug,
        tags: createArticle.tags,
        is_draft: isDraft,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from("recipes")
        .update(updatedData)
        .eq("id", editArticle.id);

      if (error) {
        console.error("Error updating recipe:", error);
        toast.error(
          isDraft
            ? "Failed to update recipe, try again."
            : "Failed to publish recipe, try again.",
        );
        return;
      }

      toast.success(
        isDraft
          ? "Recipe updated and saved as draft."
          : "Recipe updated and published.",
      );
      if (isDraft) {
        navigate("/my-recipes/draft");
      } else {
        navigate("/my-recipes/publish");
      }
    } catch (error) {
      console.error("Unexpected error during updating recipe:", error);
    } finally {
      setIsSubmitting(false);
      setCurrentAction(null);
    }
  };

  return (
    <form className="w-full h-auto my-28 px-12 md:px-20">
      <div className="w-full h-auto flex items-center justify-between gap-8">
        <h2 className="w-full text-4xl font-semibold flex items-center gap-2">
          <Icons
            iconsName={recipeIcons.phNote}
            className="size-8 text-stone-600 hidden xs:block"
          />
          <>Edit Article</>
        </h2>
        <div className="w-full h-auto hidden sm:flex justify-end">
          <RecipeBtn
            options={editActions}
            handleSubmit={handleEditSubmit}
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
          options={editActions}
          handleSubmit={handleEditSubmit}
          isSubmitting={isSubmitting}
          currentAction={currentAction}
        />
      </div>
    </form>
  );
};

export default Edit;
