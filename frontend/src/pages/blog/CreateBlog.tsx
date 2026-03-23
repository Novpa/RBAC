import { useFormik } from "formik";
import { createBlogSchema } from "../../lib/schemas/createBlogSchema";
import type { BlogType } from "../../types/blogTypes";
import { MdOutlineSubtitles } from "react-icons/md";
import { createBlog } from "../../services/blogService";

function CreateBlog() {
  const formik = useFormik({
    initialValues: {
      title: "",
      blogBody: "",
    },

    validationSchema: createBlogSchema,

    onSubmit: (values: BlogType) => {
      console.log(values);

      createBlog(values);
    },
  });

  return (
    <main className="h-dvh flex justify-center items-center">
      <div className="w-[50%]">
        <div className="flex justify-center items-center">
          <h1 className="text-3xl">Create Blog</h1>
        </div>

        {/* form */}
        <div>
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-5 justify-center items-center pt-10">
            {/* email */}

            <div>
              <label className="input">
                <MdOutlineSubtitles className="text-stone-400 text-xl" />
                <input
                  id="title"
                  name="title"
                  type="text"
                  className="grow input-lg"
                  placeholder="Title"
                  onChange={formik.handleChange}
                  value={formik.values.title}
                />
              </label>
              {formik.errors.title && (
                <p className="text-red-800 text-sm pt-3">
                  {formik.errors.title}
                </p>
              )}
            </div>

            {/* password */}
            <div>
              <textarea
                id="blogBody"
                name="blogBody"
                className="textarea textarea-lg"
                placeholder="Blog body"
                onChange={formik.handleChange}
                value={formik.values.blogBody}></textarea>

              {formik.errors.blogBody && (
                <p className="text-red-800 text-sm pt-3">
                  {formik.errors.blogBody}
                </p>
              )}
            </div>

            <button type="submit" className="btn btn-outline">
              Create blog
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default CreateBlog;
