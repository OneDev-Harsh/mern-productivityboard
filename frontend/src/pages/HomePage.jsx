import { useEffect, useState } from "react";
import Navbar from "../components/Navbar"
import axios from "axios"
import toast from "react-hot-toast";
import { Link } from "react-router";

const URL = import.meta.env.MODE === "development" ? "http://localhost:9669/api/notes" : "/api/notes";

const HomePage = () => {

    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const res = await axios.get(URL)
                if (res) {
                    toast.success("Notes loaded successfully.")
                }
                console.log(res.data)
                setNotes(res.data)
            } catch (error) {
                toast.error("Failed to load notes.")
            } finally{
                setLoading(false)
            }
        }
        fetchNotes();
    }, [])

    return (
    <div className="min-h-screen bg-base-200">
        <Navbar />

        <div className="p-6">
        {/* Loading State */}
        {loading && (
            <div className="text-center text-lg text-gray-400">
            Loading Notes...
            </div>
        )}

        {/* Notes Grid */}
        {notes.length > 0 && (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {notes.map((note) => (
                <Link
                to={`/note/${note._id}`} // 👈 navigate to detail page
                key={note.id}
                className="card bg-base-100 shadow-xl border border-base-300 hover:shadow-2xl transition cursor-pointer"
                >
                <div className="card-body">
                    <h2 className="card-title text-primary">{note.title}</h2>
                    <p className="text-gray-400 line-clamp-3">{note.content}</p>
                    <p className="text-xs text-gray-500 mt-2">
                        Created At: {new Date(note.createdAt).toLocaleString()}
                    </p>
                </div>
                </Link>
            ))}
            </div>
        )}

        {/* Empty State */}
        {!loading && notes.length === 0 && (
            <div className="text-center text-gray-500 mt-10">
            No notes yet. Create your first one! 🚀
            </div>
        )}
        </div>
    </div>
    );

};

export default HomePage