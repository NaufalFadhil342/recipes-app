import { useState, useRef, useEffect } from "react";

export const useCreateArticle = () => {
  const [createArticle, setCreateArticle] = useState({
    title: "",
    content: "",
    slug: "",
    img_url: null,
    video_url: null,
    category: "",
    tags: [],
    createdAt: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [inputTag, setInputTag] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const onCreateChange = (e) => {
    setCreateArticle((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
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

  const handleCategorySelect = (categoryValue) => {
    setCreateArticle((prev) => ({
      ...prev,
      category: categoryValue,
    }));
    setIsCategoryOpen(false);
  };

  const getSelectedCategoryName = (categorySelection) => {
    const selected = categorySelection.find(
      (cat) => cat.value === createArticle.category,
    );
    return selected ? selected.name : "Select category";
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file) => {
    // if (!file.type.startsWith("image/")) {
    //   alert("Please upload an image file");
    //   return;
    // }

    // if (file.size > 5 * 1024 * 1024) {
    //   alert("File size must be less than 5MB");
    //   return;
    // }

    // Set file ke state
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
    handleAddTag,
    handleRemoveTag,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleClickUploadFile,
    handleClickUploadVideo,
    handleCategorySelect,
    setCreateArticle,
    setInputTag,
    setIsCategoryOpen,
    fileInputRef,
    videoInputRef,
    getSelectedCategoryName,
    handleImageChange,
    handleRemoveImage,
    handleRemoveVideo,
    handleVideoChange,
  };
};
