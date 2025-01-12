export const uploadCloudinary = async ({ file, userId }) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "upload_preset",
    import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
  );
  formData.append(
    "folder",
    `${import.meta.env.VITE_CLOUDINARY_FOLDER}-${userId}`
  );

  try {
    const response = await fetch(import.meta.env.VITE_CLOUDINARY_UPLOAD_URL, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Cloudinary Hatası:", error);
      throw new Error(error.message || "Yükleme Hatası");
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error("Yükleme Hatası:", error);
    throw error;
  }
};

export const removeFolder = async (folder) => {
  const formData = new FormData();
  formData.append("folder", folder);

  try {
    const response = await fetch(
      import.meta.env.VITE_CLOUDINARY_DELETE_FOLDER_URL,
      {
        method: "DELETE",
        body: formData,
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.error("Cloudinary Hatası:", error);
      throw new Error(error.message || "Silme Hatası");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Silme Hatası:", error);
    throw error;
  }
};
