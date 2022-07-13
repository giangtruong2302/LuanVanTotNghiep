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

export { handleCreateNewBlog };
