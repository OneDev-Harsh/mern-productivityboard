import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate} from "react-router";

const URL = import.meta.env.MODE === "development" ? "http://localhost:9669/api/notes" : "/api/notes";

const CreatePage = ({ notes, setNotes }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!title.trim() || !content.trim()){
            toast.error("All fields are required.")
            return;
        }

        setLoading(true);

        try {
            await axios.post(URL, {
                title,
                content,
            })
            toast.success("Toast created successfully.")
            navigate("/")
        } catch (error) {
            toast.error("Failed to create a note.")
        } finally {
            setLoading(false)
        }
    }

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-6">
      <div className="card bg-base-100 shadow-xl w-full max-w-lg">
        <div className="card-body">
          <h2 className="card-title text-2xl text-primary mb-4">
            Create New Note
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title Input */}
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input input-bordered w-full"
            />

            {/* Content Input */}
            <textarea
              placeholder="Write your note here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="textarea textarea-bordered w-full min-h-[150px]"
            ></textarea>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Create Note"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
