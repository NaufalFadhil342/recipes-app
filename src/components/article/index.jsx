import Create from "./create";
import { Icon } from "@iconify/react";
import { useCreateArticle } from "../../hooks/useCreateArticle";

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
  } = useCreateArticle();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Testing: Log semua data sebelum proses
    console.group("📋 Article Data Check");
    console.log("Title:", createArticle.title);
    console.log("Slug:", createArticle.slug);
    console.log("Category:", createArticle.category);
    console.log("Tags:", createArticle.tags);
    console.log("Content length:", createArticle.content?.length);
    console.log("Image file:", createArticle.img_url);
    console.log("Video file:", createArticle.video_url);
    console.groupEnd();

    // Testing: Preview data yang akan dikirim
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
    <section className="w-full h-auto my-28 px-20">
      <form className="w-full h-auto mt-10" onSubmit={handleSubmit}>
        <div className="w-full h-auto flex items-center justify-between gap-3">
          <h2 className="text-4xl font-semibold flex items-center gap-2">
            <Icon icon="ph:note" className="size-8 text-stone-600" />
            <>Create Article</>
          </h2>
          <div className="w-auto h-auto flex items-center gap-4">
            <button
              type="button"
              className="w-auto h-auto flex items-center gap-2 hover:cursor-pointer"
            >
              <Icon
                icon="iconamoon:eye-light"
                className="size-5 text-stone-600"
              />
              <>Preview</>
            </button>
            <button
              type="submit"
              className="w-auto h-12 flex items-center gap-2 px-4 rounded-md bg-primary hover:bg-dark hover:cursor-pointer transition-all duration-150 ease-in-out"
            >
              <Icon icon="lucide:save" className="size-5 text-stone-600" />
              <>Publish</>
            </button>
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
      </form>
    </section>
  );
};

export default Article;
