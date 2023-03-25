import api from ".";

export async function getPosts() {
  try {
    const response = await api.get("/posts");
    if (response?.status == 200) {
      return { success: true, data: response?.data };
    }
  } catch (err) {
    return { error: true, message: err?.message || "Could not fetch posts!" };
  }
}

export async function deletePost(id) {
  try {
    const response = await api.delete(`/posts/${id}`);
    // console.log("deletePost", id, response);
    if (response?.status == 200) {
      return { success: true, data: response?.data };
    }
  } catch (err) {
    return {
      error: true,
      message: err?.message || `Could not delete post id:${id}`,
    };
  }
}

export async function editPost(id, body) {
  try {
    const response = await api.patch(`/posts/${id}`, body);
    console.log("editPost", id, response);
    if (response?.status == 200) {
      return { success: true, data: response?.data };
    }
  } catch (err) {
    return {
      error: true,
      message: err?.message || `Could not edit post id:${id}`,
    };
  }
}
