import { useState, useRef, useEffect } from "react";
import { supabase } from "../utils/supabase";
import toast from "react-hot-toast";

const defaultCreateState = {
  title: "",
  introduction: "",
  additional_info: "",
  slug: "",
  alt_text: "",
  ingredients: [""],
  instructions: [""],
  img_cover: null,
  video_url: null,
  category: "",
  author_id: null,
  country_code: "",
  tags: [],
  createdAt: "",
  status: "draft",
};

export const useCreateArticle = (editMode = false, existingArticle = null) => {
  const [createArticle, setCreateArticle] = useState(defaultCreateState);
  const [imagePreview, setImagePreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [inputTag, setInputTag] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const validateArticle = (article) => {
    const validateErrors = [];

    if (!article.title?.trim()) validateErrors.push("Title is required");
    if (!article.introduction?.trim())
      validateErrors.push("Introduction is required");
    if (!article.slug?.trim()) validateErrors.push("Slug is required");
    if (!article.category) validateErrors.push("Category is required");
    if (!article.country_code) validateErrors.push("Country is required");
    if (!article.ingredients?.some((ing) => ing.trim()))
      validateErrors.push("At least one ingredient is required");
    if (!article.instructions?.some((inst) => inst.trim()))
      validateErrors.push("At least one instruction is required");
    if (!article.img_cover) validateErrors.push("Image is required");

    return validateErrors;
  };

  const onCreateChange = (e) => {
    const updatedArticle = {
      ...createArticle,
      [e.target.name]: e.target.value,
    };

    setCreateArticle(updatedArticle);
  };

  const onIntroductionChange = (htmlString) => {
    setCreateArticle((prev) => ({
      ...prev,
      introduction: htmlString,
    }));
  };

  const onAdditionalInfoChange = (htmlString) => {
    setCreateArticle((prev) => ({
      ...prev,
      additional_info: htmlString,
    }));
  };

  const handleIngredient = () => {
    setCreateArticle((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, ""],
    }));
  };

  const handleInstruction = () => {
    setCreateArticle((prev) => ({
      ...prev,
      instructions: [...prev.instructions, ""],
    }));
  };

  const handleAddTag = () => {
    if (!inputTag.trim()) return;

    const newTags = inputTag
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "" && !createArticle.tags.includes(tag));

    setCreateArticle((prev) => ({
      ...prev,
      tags: [...prev.tags, ...newTags],
    }));
    setInputTag("");
  };

  const handleRemoveTag = (indexToRemove) => {
    setCreateArticle((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleCategorySelect = (selectCategory) => {
    setCreateArticle((prev) => ({
      ...prev,
      category: selectCategory,
    }));
    setIsCategoryOpen(false);
  };

  const handleCountrySelect = (countryCode) => {
    setCreateArticle((prev) => ({
      ...prev,
      country_code: countryCode,
    }));
    setIsCountryOpen(false);
  };

  const getSelectedCategoryName = (categorySelection) => {
    const selected = categorySelection.find(
      (cat) => cat.value === createArticle.category,
    );
    return selected ? selected.name : "Select category";
  };

  const getSelectedCountryName = (selectedCountry) => {
    const selected = selectedCountry.find(
      (cat) => cat.code === createArticle.country_code,
    );

    return selected ? selected.name : "Select your country";
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      processImageFile(file);
    }
  };

  const processImageFile = async (file) => {
    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);

      const fileExt = file.name.split(".").pop();
      const fileNameWithoutExt =
        file.name.substring(0, file.name.lastIndexOf(".")) || file.name;
      let fileName;

      if (editMode && existingArticle?.id) {
        const sanitizedName = fileNameWithoutExt
          .toLowerCase()
          .replace(/[^a-z0-9]/g, "-")
          .replace(/-+/g, "-");
        fileName = `${sanitizedName}.${fileExt}`;

        if (existingArticle.img_cover) {
          const oldFileName = existingArticle.img_cover.split("/").pop();
          if (oldFileName !== fileName) {
            await supabase.storage.from("assets").remove([oldFileName]);
          }
        }
      } else {
        const sanitizedName = fileNameWithoutExt
          .toLowerCase()
          .replace(/[^a-z0-9]/g, "-")
          .replace(/-+/g, "-");

        fileName = `${Date.now()}-${sanitizedName}.${fileExt}`;
      }

      const { error } = await supabase.storage
        .from("assets")
        .upload(fileName, file, {
          upsert: editMode && existingArticle?.id,
        });

      if (error) throw error;

      const {
        data: { publicUrl },
      } = supabase.storage.from("assets").getPublicUrl(fileName);

      setCreateArticle((prev) => ({
        ...prev,
        img_cover: publicUrl,
      }));
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      processImageFile(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setCreateArticle((prev) => ({
      ...prev,
      img_cover: null,
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClickUploadFile = () => {
    fileInputRef.current?.click();
  };

  const handleClickUploadVideo = () => {
    videoInputRef.current?.click();
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      processVideoFile(file);
    }
  };

  const processVideoFile = async (file) => {
    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        setVideoPreview(reader.result);
      };
      reader.readAsDataURL(file);

      const fileNameWithoutExt =
        file.name.substring(0, file.name.lastIndexOf(".")) || file.name;
      const fileExt = file.name.split(".").pop();

      const sanitizedName = fileNameWithoutExt
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "-")
        .replace(/-+/g, "-");
      const fileName = `${Date.now()}-${sanitizedName}.${fileExt}`;

      const { error } = await supabase.storage
        .from("videos")
        .upload(fileName, file);

      if (error) throw error;

      const {
        data: { publicVideo },
      } = supabase.storage.from("videos").getPublicUrl(fileName);

      setCreateArticle((prev) => ({
        ...prev,
        video_url: publicVideo,
      }));
    } catch (error) {
      console.error("Error uploading video:", error);
      toast.error("Failed to upload video");
    }
  };

  const handleRemoveVideo = () => {
    if (videoPreview) {
      URL.revokeObjectURL(videoPreview);
    }

    setCreateArticle((prev) => ({
      ...prev,
      video_url: null,
    }));

    setVideoPreview(null);
    if (videoInputRef.current) {
      videoInputRef.current.value = "";
    }
  };

  useEffect(() => {
    return () => {
      if (videoPreview) {
        URL.revokeObjectURL(videoPreview);
      }
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [videoPreview, imagePreview]);

  return {
    createArticle,
    onCreateChange,
    onIntroductionChange,
    onAdditionalInfoChange,
    imagePreview,
    videoPreview,
    isDragging,
    inputTag,
    isCategoryOpen,
    isCountryOpen,
    defaultCreateState,
    validateArticle,
    handleIngredient,
    handleInstruction,
    handleAddTag,
    handleRemoveTag,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleClickUploadFile,
    handleClickUploadVideo,
    handleCategorySelect,
    handleCountrySelect,
    setCreateArticle,
    setInputTag,
    setIsCategoryOpen,
    setIsCountryOpen,
    fileInputRef,
    videoInputRef,
    getSelectedCategoryName,
    getSelectedCountryName,
    handleImageChange,
    handleRemoveImage,
    handleRemoveVideo,
    handleVideoChange,
  };
};
