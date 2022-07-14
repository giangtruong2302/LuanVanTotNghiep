import axios from "../../../../axios";

const handleCreateNewBlog = (
  title,
  content,
  BlogImage,
  fileName,
  managerId,
  centerId
) => {
  // console.log("first", userEmail, userPassword);
  return axios.post(`/api/admin/create-new-blog`, {
    title,
    content,
    BlogImage,
    fileName,
    managerId,
    centerId,
  });
};
const handleDeleteBlog = (id) => {
  return axios.delete(`/api/admin/delete-blog`, { data: { id: id } });
};
const handleUpdateBlog = (
  title,
  Content,
  BlogImage,
  fileName,

  CenterId,
  id
) => {
  return axios.put(`/api/admin/update-blog`, {
    title,
    Content,
    BlogImage,
    fileName,

    CenterId,
    id,
  });
};
export { handleCreateNewBlog, handleDeleteBlog, handleUpdateBlog };
