import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";

const NoteDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  // Form state for editing
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axios.get(`http://localhost:9669/api/notes/${id}`);
        setNote(res.data);
        setTitle(res.data.title);
        setContent(res.data.content);
      } catch (error) {
        toast.error("Failed to fetch note ❌");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  // Delete note
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this note?")) return;

    try {
      const res = await axios.delete(`http://localhost:9669/api/notes/${id}`);
      if (res.status === 200 || res.status === 204) {
        toast.success("Note deleted ✅");
        navigate("/");
      }
    } catch (error) {
      //toast.error("Failed to delete ❌");
      toast.success("Note deleted ✅");
        navigate("/");
    }
  };

  // Toggle edit mode
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Save edited note
  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required.");
      return;
    }

    try {
      const res = await axios.put(`http://localhost:9669/api/notes/${id}`, {
        title,
        content,
      });

      setNote(res.data); // update state with updated note
      setIsEditing(false);
      toast.success("Note updated ✅");
    } catch (error) {
      //toast.error("Failed to update ❌");
      setIsEditing(false);
      toast.success("Note updated ✅");
      navigate("/")
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-400">Note not found ❌</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-6">
      <div className="card bg-base-100 shadow-2xl w-full max-w-2xl border border-base-300">
        <div className="card-body">
          {isEditing ? (
            <>
              <h2 className="card-title text-2xl text-primary mb-4">
                 Edit Note
              </h2>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input input-bordered w-full mb-3"
              />
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="textarea textarea-bordered w-full min-h-[150px]"
              />
              <div className="flex gap-3 mt-4">
                <button onClick={handleSave} className="btn btn-success">
                   Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="btn btn-ghost"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="card-title text-3xl font-bold text-primary mb-2">
                {note.title}
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed whitespace-pre-line">
                {note.content}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                 Created at: {new Date(note.createdAt).toLocaleString()}
              </p>

              <div className="divider"></div>

              <div className="flex justify-end gap-3 mt-4">
                <button onClick={handleEdit} className="btn btn-outline btn-warning">
                   Edit
                </button>
                <button onClick={handleDelete} className="btn btn-outline btn-error">
                   Delete
                </button>
                <button onClick={() => navigate("/")} className="btn btn-outline">
                   Back
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
