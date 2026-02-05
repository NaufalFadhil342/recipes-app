import Create from "./create";
import { useCreateArticle } from "../../hooks/useCreateArticle";
import RecipeBtn from "./create/recipeBtn";
import { Icons } from "../../icons";
import { recipeIcons } from "../../data/recipeIconsData";

const publishOptions = [
  { name: "Save Draft", action: "draft" },
  { name: "Publish Now", action: "publish" },
];

const Article = () => {
  const {
    createArticle,
    handleAddTag,
    onCreateChange,
    imagePreview,
    videoPreview,
    fileInputRef,
    videoInputRef,
    isCategoryOpen,
    isCountryOpen,
    inputTag,
    defaultCreateState,
    validateArticle,
    setInputTag,
    setIsCategoryOpen,
    setIsCountryOpen,
    setCreateArticle,
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
  } = useCreateArticle();

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const now = new Date().toISOString();

      const savedArticle = {
        ...createArticle,
        savedAt: now,
        updatedAt: now,
        status: "draft",
      };

      const savedArticlesStr = localStorage.getItem("savedArticles");

      const savedArticles = savedArticlesStr
        ? JSON.parse(savedArticlesStr)
        : [];
      const existingIndex = savedArticles.findIndex(
        (article) => article.slug === savedArticle.slug,
      );

      if (existingIndex >= 0) {
        savedArticles[existingIndex] = savedArticle;
      } else {
        savedArticles.push(savedArticle);
      }

      localStorage.setItem("savedArticles", JSON.stringify(savedArticles));

      setCreateArticle(defaultCreateState);
      alert("Draft saved successfully! ✅");

      return savedArticle;
    } catch (error) {
      console.error("Error saving draft:", error);
      alert("Failed to save draft. Please try again.");
    }
  };

  const handlePublish = async (e) => {
    e.preventDefault();

    try {
      const errors = validateArticle(createArticle);
      if (errors.length > 0) {
        alert(`Please fix the following errors:\n${errors.join("\n")}`);
        return;
      }

      const now = new Date().toISOString();

      const publishedArticle = {
        ...createArticle,
        publishedAt: now,
        updatedAt: now,
        createdAt: createArticle.createdAt || now,
        status: "published",
      };

      console.log("📤 Mock data to be inserted:", publishedArticle);
      console.log(
        "📊 JSON Preview:",
        JSON.stringify(publishedArticle, null, 2),
      );

      const savedArticlesStr = localStorage.getItem("savedArticles");
      if (savedArticlesStr) {
        const savedArticles = JSON.parse(savedArticlesStr);
        const filtered = savedArticles.filter(
          (article) => article.slug !== publishedArticle.slug,
        );
        localStorage.setItem("savedArticles", JSON.stringify(filtered));
      }

      alert("Article published successfully! 🎉");
      setCreateArticle(defaultCreateState);
    } catch (error) {
      console.error("Error publishing article:", error);
      alert("Failed to publish article. Please try again.");
    }
  };

  return (
    <section className="w-full h-auto my-28 px-12 md:px-20">
      <form className="w-full h-auto mt-10">
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
              publishOptions={publishOptions}
              handleSave={handleSave}
              handlePublish={handlePublish}
            />
          </div>
        </div>
        <div className="w-full h-auto mt-10">
          <Create
            handleAddTag={handleAddTag}
            createArticle={createArticle}
            onCreateChange={onCreateChange}
            imagePreview={imagePreview}
            videoPreview={videoPreview}
            fileInputRef={fileInputRef}
            videoInputRef={videoInputRef}
            isCategoryOpen={isCategoryOpen}
            isCountryOpen={isCountryOpen}
            inputTag={inputTag}
            setInputTag={setInputTag}
            setIsCategoryOpen={setIsCategoryOpen}
            setIsCountryOpen={setIsCountryOpen}
            getSelectedCategoryName={getSelectedCategoryName}
            getSelectedCountryName={getSelectedCountryName}
            handleCategorySelect={handleCategorySelect}
            handleCountrySelect={handleCountrySelect}
            handleClickUploadFile={handleClickUploadFile}
            handleClickUploadVideo={handleClickUploadVideo}
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
            publishOptions={publishOptions}
            handleSave={handleSave}
            handlePublish={handlePublish}
          />
        </div>
      </form>
    </section>
  );
};

export default Article;
