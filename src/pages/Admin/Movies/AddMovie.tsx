import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Upload } from "lucide-react";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import adminApi from "@/apis/admin.api";

function AddMovie() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    tenPhim: "",
    trailer: "",
    moTa: "",
    ngayKhoiChieu: "",
    hot: false,
    dangChieu: false,
    sapChieu: false,
    danhGia: 5,
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const addMovieMutation = useMutation({
    mutationFn: (data: FormData) => adminApi.addMovie(data),
    onSuccess: () => {
      toast.success("Movie added successfully!");
      navigate("/admin/movies/list");
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { content?: string } } };
      toast.error(err?.response?.data?.content || "Failed to add movie");
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!imageFile) {
      toast.error("Please select a movie poster");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("tenPhim", formData.tenPhim);
    formDataToSend.append("trailer", formData.trailer);
    formDataToSend.append("moTa", formData.moTa);
    formDataToSend.append("ngayKhoiChieu", formData.ngayKhoiChieu);
    formDataToSend.append("hot", String(formData.hot));
    formDataToSend.append("dangChieu", String(formData.dangChieu));
    formDataToSend.append("sapChieu", String(formData.sapChieu));
    formDataToSend.append("danhGia", String(formData.danhGia));
    formDataToSend.append("maNhom", "GP01");
    formDataToSend.append("File", imageFile);

    addMovieMutation.mutate(formDataToSend);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="p-6">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="outline"
            onClick={() => navigate("/admin/movies/list")}
            className="bg-gray-800 text-white hover:bg-gray-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-white">Add New Movie</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Image Upload */}
            <div className="lg:col-span-1">
              <div className="bg-gray-800 rounded-lg p-6">
                <label className="block text-white font-semibold mb-4">
                  Movie Poster
                </label>
                <div className="relative">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-96 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-96 bg-gray-700 rounded-lg flex flex-col items-center justify-center">
                      <Upload className="w-12 h-12 text-gray-500 mb-2" />
                      <p className="text-gray-400">Upload movie poster</p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="lg:col-span-2">
              <div className="bg-gray-800 rounded-lg p-6">
                <div className="space-y-6">
                  {/* Movie Name */}
                  <div>
                    <label className="block text-white font-semibold mb-2">
                      Movie Name *
                    </label>
                    <input
                      type="text"
                      name="tenPhim"
                      value={formData.tenPhim}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter movie name"
                    />
                  </div>

                  {/* Trailer URL */}
                  <div>
                    <label className="block text-white font-semibold mb-2">
                      Trailer URL *
                    </label>
                    <input
                      type="url"
                      name="trailer"
                      value={formData.trailer}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://www.youtube.com/watch?v=..."
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-white font-semibold mb-2">
                      Description *
                    </label>
                    <textarea
                      name="moTa"
                      value={formData.moTa}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter movie description"
                    />
                  </div>

                  {/* Release Date */}
                  <div>
                    <label className="block text-white font-semibold mb-2">
                      Release Date *
                    </label>
                    <input
                      type="date"
                      name="ngayKhoiChieu"
                      value={formData.ngayKhoiChieu}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Rating */}
                  <div>
                    <label className="block text-white font-semibold mb-2">
                      Rating (1-10) *
                    </label>
                    <input
                      type="number"
                      name="danhGia"
                      min="1"
                      max="10"
                      step="0.1"
                      value={formData.danhGia}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Checkboxes */}
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 text-white cursor-pointer">
                      <input
                        type="checkbox"
                        name="hot"
                        checked={formData.hot}
                        onChange={handleInputChange}
                        className="w-5 h-5 rounded bg-gray-700 border-gray-600 text-blue-600 focus:ring-blue-500"
                      />
                      <span>Hot Movie</span>
                    </label>
                    <label className="flex items-center gap-3 text-white cursor-pointer">
                      <input
                        type="checkbox"
                        name="dangChieu"
                        checked={formData.dangChieu}
                        onChange={handleInputChange}
                        className="w-5 h-5 rounded bg-gray-700 border-gray-600 text-blue-600 focus:ring-blue-500"
                      />
                      <span>Now Showing</span>
                    </label>
                    <label className="flex items-center gap-3 text-white cursor-pointer">
                      <input
                        type="checkbox"
                        name="sapChieu"
                        checked={formData.sapChieu}
                        onChange={handleInputChange}
                        className="w-5 h-5 rounded bg-gray-700 border-gray-600 text-blue-600 focus:ring-blue-500"
                      />
                      <span>Coming Soon</span>
                    </label>
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex gap-4 pt-4">
                    <Button
                      type="submit"
                      disabled={addMovieMutation.isPending}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                    >
                      {addMovieMutation.isPending ? "Adding..." : "Add Movie"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate("/admin/movies/list")}
                      disabled={addMovieMutation.isPending}
                      className="bg-gray-700 text-white hover:bg-gray-600"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddMovie;
