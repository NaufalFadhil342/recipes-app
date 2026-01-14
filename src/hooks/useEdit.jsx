import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "./useAuth";
import { supabase } from "../api/supabase";

export const useEdit = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef();

  const [formData, setFormData] = useState({
    firstName: user?.user_metadata?.first_name || "",
    lastName: user?.user_metadata?.last_name || "",
    displayName: user?.user_metadata?.display_name || "",
    phone: user?.phone || "",
    profession: user?.user_metadata?.profession || "",
    avatarUrl: user?.user_metadata?.avatar_url || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log("File selected:", file);

    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      avatarUrl: file,
    }));

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setFormData((prev) => ({
      ...prev,
      avatarUrl: "",
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClickUpload = () => {
    fileInputRef.current?.click();
  };

  const uploadImage = async () => {
    if (!(formData.avatarUrl instanceof File)) {
      return formData.avatarUrl || "";
    }

    const fileExt = formData.avatarUrl.name.split(".").pop();
    const fileName = `${user.id}-${Date.now()}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, formData.avatarUrl, {
        cacheControl: "3600",
        upsert: true,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      throw new Error(`Failed to upload image: ${uploadError.message}`);
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("avatars").getPublicUrl(filePath);

    return publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const avatarUrl = await uploadImage();

      const { data, error: updateError } = await supabase.auth.updateUser({
        data: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: formData.phone,
          profession: formData.profession,
          display_name: formData.displayName,
          avatar_url: avatarUrl,
        },
      });

      if (updateError) throw updateError;
      const {
        data: { user: updatedUser },
      } = await supabase.auth.getUser();
      const { data: publicUserData } = await supabase
        .from("users")
        .select("*")
        .eq("id", updatedUser.id)
        .single();

      console.log("Profile updated:", data);
      console.log("Updated user:", updatedUser);
      console.log("Public users data:", publicUserData);

      navigate("/profile");
      return { success: true, data };
    } catch (err) {
      console.error("Error updating profile:", err);
      setError(err.message || "Failed to update profile");
      return { success: false, error: err };
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    navigate("/profile");
  };

  const resetForm = () => {
    setFormData({
      firstName: user?.user_metadata?.first_name || "",
      lastName: user?.user_metadata?.last_name || "",
      displayName: user?.user_metadata?.display_name || "",
      phone: user?.phone || "",
      profession: user?.user_metadata?.profession || "",
      avatarUrl: user?.user_metadata?.avatar_url || "",
    });
    setError(null);
  };

  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  return {
    formData,
    loading,
    error,
    user,
    imagePreview,
    fileInputRef,
    handleChange,
    handleImageChange,
    handleClickUpload,
    handleRemoveImage,
    handleSubmit,
    handleClose,
    resetForm,
  };
};
