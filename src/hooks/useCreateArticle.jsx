import { useState, useRef, useEffect } from "react";

const defaultCreateState = {
  title: "",
  content: "",
  slug: "",
  alt_text: "",
  img_url: null,
  video_url: null,
  category: "",
  country: "",
  tags: [],
  createdAt: "",
  status: "draft",
};

export const useCreateArticle = () => {
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
    const errors = [];

    if (!article.title?.trim()) errors.push("Title is required");
    if (!article.content?.trim()) errors.push("Content is required");
    if (!article.slug?.trim()) errors.push("Slug is required");
    if (!article.category) errors.push("Category is required");
    if (!article.country) errors.push("Country is required");

    return errors;
  };

  const onCreateChange = (e) => {
    const updatedArticle = {
      ...createArticle,
      [e.target.name]: e.target.value,
    };

    setCreateArticle(updatedArticle);
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

  const handleCountrySelect = (selectCountry) => {
    setCreateArticle((prev) => ({
      ...prev,
      country: selectCountry,
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
      (cat) => cat.name === createArticle.country,
    );

    return selected ? selected.name : "Select your country";
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file) => {
    setCreateArticle((prev) => ({
      ...prev,
      img_url: file,
    }));

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
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
      processFile(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setCreateArticle((prev) => ({
      ...prev,
      img_url: null,
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

    if (!file) return;
    setCreateArticle((prev) => ({
      ...prev,
      video_url: file,
    }));

    if (!file.type.startsWith("video/")) {
      alert("Please upload a valid video file");
      return;
    }

    if (videoPreview) {
      URL.revokeObjectURL(videoPreview);
    }

    setCreateArticle((prev) => ({
      ...prev,
      video_url: file,
    }));

    setVideoPreview(URL.createObjectURL(file));
    e.target.value = "";
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
    imagePreview,
    videoPreview,
    isDragging,
    inputTag,
    isCategoryOpen,
    isCountryOpen,
    defaultCreateState,
    validateArticle,
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
