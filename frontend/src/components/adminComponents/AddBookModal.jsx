// import React, { useState } from "react";

// const AddBookModal = ({ onClose }) => {
//   const [formData, setFormData] = useState({
//     title: "",
//     author: "",
//     genre: "",
//     quantity: 1,
//     available: 1,
//     publishedDate: "",
//     description: "",
//     dueDays: 14,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: name === "quantity" || name === "available" || name === "dueDays"
//         ? parseInt(value)
//         : value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // 📤 Send formData to backend API
//     console.log("Submitted Book:", formData);
//     onClose(); // close modal after submit
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
//       <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg relative">
//         <h2 className="text-xl font-bold mb-4">Add New Book</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium">Title</label>
//             <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
//           </div>
//           <div>
//             <label className="block text-sm font-medium">Author</label>
//             <input type="text" name="author" value={formData.author} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
//           </div>
//           {/* <div>
//             <label className="block text-sm font-medium">Genre</label>
//             <input type="text" name="genre" value={formData.genre} onChange={handleChange} className="w-full border rounded px-3 py-2" />
//           </div> */}
//           <div>
//   <label className="block text-sm font-medium">Genre</label>
//   <select
//     name="genre"
//     value={formData.genre}
//     onChange={handleChange}
//     className="w-full border rounded px-3 py-2"
//   >
//     <option value="">Select Genre</option>
//     <option value="Fiction">Fiction</option>
//     <option value="Non-Fiction">Non-Fiction</option>
//     <option value="Mystery">Mystery</option>
//     <option value="Fantasy">Fantasy</option>
//     <option value="Science Fiction">Science Fiction</option>
//     <option value="Biography">Biography</option>
//     <option value="History">History</option>
//     <option value="Romance">Romance</option>
//     <option value="Self-help">Self-help</option>
//     <option value="Poetry">Poetry</option>
//     <option value="Horror">Horror</option>
//     <option value="Thriller">Thriller</option>
//     <option value="Children">Children</option>
//     <option value="Young Adult">Young Adult</option>
//     <option value="Comics/Graphic Novels">Comics/Graphic Novels</option>
//   </select>
// </div>

//           <div className="flex gap-4">
//             <div className="flex-1">
//               <label className="block text-sm font-medium">Quantity</label>
//               <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
//             </div>
//             <div className="flex-1">
//               <label className="block text-sm font-medium">Available</label>
//               <input type="number" name="available" value={formData.available} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
//             </div>
//           </div>
//           <div>
//             <label className="block text-sm font-medium">Published Date</label>
//             <input type="date" name="publishedDate" value={formData.publishedDate} onChange={handleChange} className="w-full border rounded px-3 py-2" />
//           </div>
//           <div>
//             <label className="block text-sm font-medium">Due Days</label>
//             <input type="number" name="dueDays" value={formData.dueDays} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
//           </div>
//           <div>
//             <label className="block text-sm font-medium">Description</label>
//             <textarea name="description" value={formData.description} onChange={handleChange} className="w-full border rounded px-3 py-2" rows="3" />
//           </div>

//           <div className="flex justify-end gap-4 mt-6">
//             <button type="button" onClick={onClose} className="px-4 py-2 border rounded hover:bg-gray-100">Cancel</button>
//             <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Add Book</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddBookModal;
import React, { useState } from "react";
import { useAddBookMutation, useEditBookMutation } from "../../services/adminApi";
import { toast } from "sonner";

const AddBookModal = ({ onClose ,bookToEdit }) => {
    const [addBook]=useAddBookMutation()
    const [editBook]=useEditBookMutation()
     const isEdit = Boolean(bookToEdit);

  const [formData, setFormData] = useState({
    title: bookToEdit?.title || "",
    author: bookToEdit?.author || "",
    genre: bookToEdit?.genre || "",
    quantity: bookToEdit?.quantity || 0,
    available: bookToEdit?.available || 0,
    publishedDate: bookToEdit?.publishedDate?.substring(0, 10) || "",
    description: bookToEdit?.description || "",
    dueDays: bookToEdit?.dueDays || 7,
  });
  const genres = [
    "Fiction", "Non-fiction", "Science", "History", "Biography",
    "Fantasy", "Mystery", "Romance", "Technology", "Self-help",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(isEdit){
         const response=await editBook({ id: bookToEdit._id, formData })
        if(response.data){
            toast.success('book edit successfully')
        }
    }else{
        const response=await addBook(formData)
        if(response.data){
            toast.success('book added successfully')
        }
    }
    onClose()
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-xl p-6 overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Add New Book</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full border bg-white border-gray-300 p-2 rounded"
              placeholder="Enter book title"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Author</label>
            <input
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
              className="w-full border bg-white border-gray-300 p-2 rounded"
              placeholder="Author name"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Genre</label>
            <select
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              className="w-full border bg-white border-gray-300 p-2 rounded"
              required
            >
              <option value="">Select genre</option>
              {genres.map((g, idx) => (
                <option key={idx} value={g}>{g}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block font-medium mb-1">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
                className="w-full border bg-white border-gray-300 p-2 rounded"
                min="1"
              />
            </div>

            <div className="flex-1">
              <label className="block font-medium mb-1">Available</label>
              <input
                type="number"
                name="available"
                value={formData.available}
                onChange={handleChange}
                required
                className="w-full border bg-white border-gray-300 p-2 rounded"
                min="1"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1">Published Date</label>
            <input
              type="date"
              name="publishedDate"
              value={formData.publishedDate}
              onChange={handleChange}
              className="w-full border bg-white border-gray-300 p-2 rounded"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Due Days</label>
            <input
              type="number"
              name="dueDays"
              value={formData.dueDays}
              onChange={handleChange}
              required
              className="w-full border bg-white border-gray-300 p-2 rounded"
              min="1"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full border bg-white border-gray-300 p-2 rounded resize-none"
              placeholder="Optional description..."
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Add Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBookModal;
