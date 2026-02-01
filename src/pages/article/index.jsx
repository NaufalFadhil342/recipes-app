import Create from "./create";
import { useCreateArticle } from "../../hooks/useCreateArticle";
import RecipeBtn from "./create/recipeBtn";
import { Icons } from "../../icons";
import { recipeIcons } from "../../data/recipeIconsData";

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
  } = useCreateArticle();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.group("📋 Article Data Check");
    console.log("Title:", createArticle.title);
    console.log("Slug:", createArticle.slug);
    console.log("Category:", createArticle.category);
    console.log("Tags:", createArticle.tags);
    console.log("Content length:", createArticle.content?.length);
    console.log("Image file:", createArticle.img_url);
    console.log("Video file:", createArticle.video_url);
    console.groupEnd();

    const mockArticleData = {
      title: createArticle.title,
      slug: createArticle.slug,
      category: createArticle.category,
      tags: createArticle.tags,
      created_at: createArticle.createdAt || new Date().toISOString(),
      img_url: createArticle.img_url ? createArticle.img_url.name : null,
      video_url: createArticle.video_url ? createArticle.video_url.name : null,
      content: createArticle.content,
    };

    console.log("📤 Mock data to be inserted:", mockArticleData);
    console.log("📊 JSON Preview:", JSON.stringify(mockArticleData, null, 2));

    // try {
    //   // const response = await supabase.from("articles").insert([]);
    //   const response = await Object.fromEntries(formData);

    //   if (response.error) {
    //     console.error("Error creating article:", response.error);
    //   }

    //   console.log("Article created successfully:", response);
    // } catch (error) {
    //   console.error("Unexpected error:", error);
    // }
  };

  return (
    <section className="w-full h-auto my-28 px-12 md:px-20">
      <form className="w-full h-auto mt-10" onSubmit={handleSubmit}>
        <div className="w-full h-auto flex items-center justify-between gap-3">
          <h2 className="text-4xl font-semibold flex items-center gap-2">
            <Icons
              iconsName={recipeIcons.phNote}
              className="size-8 text-stone-600 hidden xs:block"
            />
            <>Create Article</>
          </h2>
          <div className="w-auto h-auto hidden sm:flex items-center gap-4">
            <RecipeBtn />
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
            inputTag={inputTag}
            setInputTag={setInputTag}
            setIsCategoryOpen={setIsCategoryOpen}
            getSelectedCategoryName={getSelectedCategoryName}
            handleCategorySelect={handleCategorySelect}
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
        <div className="w-auto h-auto flex sm:hidden items-center gap-4 mt-8">
          <RecipeBtn />
        </div>
      </form>
    </section>
  );
};

export default Article;
