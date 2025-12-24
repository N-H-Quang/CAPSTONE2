import { useState } from "react";
import { UserResponse } from "@/@type/response.type";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog2";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import adminApi from "@/apis/admin.api";
import { toast } from "react-toastify";

interface UserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user?: UserResponse;
  mode: "add" | "edit";
}

function UserDialog({ open, onOpenChange, user, mode }: UserDialogProps) {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    taiKhoan: user?.taiKhoan || "",
    matKhau: "",
    email: user?.email || "",
    soDt: user?.soDt || "",
    hoTen: user?.hoTen || "",
    maLoaiNguoiDung: user?.maLoaiNguoiDung || "KhachHang",
  });

  const mutation = useMutation({
    mutationFn: (data: typeof formData & { maNhom: string }) =>
      mode === "add" ? adminApi.addUser(data) : adminApi.updateUser(data),
    onSuccess: () => {
      toast.success(`User ${mode === "add" ? "added" : "updated"} successfully!`);
      queryClient.invalidateQueries({ queryKey: ["users"] });
      onOpenChange(false);
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { content?: string } } };
      toast.error(err?.response?.data?.content || `Failed to ${mode} user`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ ...formData, maNhom: "GP01" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{mode === "add" ? "Add New User" : "Edit User"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Username *
            </label>
            <input
              type="text"
              name="taiKhoan"
              value={formData.taiKhoan}
              onChange={handleChange}
              disabled={mode === "edit"}
              required
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Password {mode === "edit" && "(leave blank to keep current)"}
            </label>
            <input
              type="password"
              name="matKhau"
              value={formData.matKhau}
              onChange={handleChange}
              required={mode === "add"}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="hoTen"
              value={formData.hoTen}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Phone *
            </label>
            <input
              type="tel"
              name="soDt"
              value={formData.soDt}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Role *
            </label>
            <select
              name="maLoaiNguoiDung"
              value={formData.maLoaiNguoiDung}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="KhachHang">User</option>
              <option value="QuanTri">Admin</option>
            </select>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="bg-gray-700 text-white hover:bg-gray-600"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={mutation.isPending}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {mutation.isPending ? "Saving..." : mode === "add" ? "Add" : "Update"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default UserDialog;
