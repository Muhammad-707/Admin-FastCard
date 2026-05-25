import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Eye, EyeOff } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/reducer/authSlice"; 
import type { AppDispatch, RootState } from "@/store/store";

import i1 from "@/assets/Group 1116606595 (2).png"

export default function LogIn() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  
  const { isLoading } = useSelector((state: RootState) => state.auth);

  const validationSchema = Yup.object({
    name: Yup.string().min(2, "Минимум 2 символа").required("Обязательное поле"),
    email: Yup.string().email("Некорректный email").required("Обязательное поле"),
    password: Yup.string().min(6, "Минимум 6 символов").required("Обязательное поле"),
  });

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const resultAction = await dispatch(loginUser({ name: values.name, email: values.email }));
      
      if (loginUser.fulfilled.match(resultAction)) {
        localStorage.setItem("userName", values.name);
        
        navigate("/dashboard", { replace: true });
      }
    },
  });

  return (
    <div className="flex min-h-screen w-full bg-white">
      <div className="grid w-full grid-cols-1 lg:grid-cols-2">
        <div className="relative hidden flex-col items-center justify-center bg-[#1e2640] p-12 lg:flex select-none">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent pointer-events-none" />
          <div className="relative z-10 text-center">
            <h1 className="text-3xl font-medium tracking-wide text-white/90">Welcome to admin panel</h1>
            <div>
              <img className="object-cover w-[400px]" src={i1} alt="" />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center p-8 sm:p-12 lg:p-16">
          <div className="w-full max-w-md">
            <h2 className="mb-6 text-3xl font-bold tracking-tight text-slate-900">Log in</h2>
            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <div>
                <input id="name" name="name" type="text" placeholder="Name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}
                  className={`w-full rounded-md border px-4 py-3.5 text-base outline-none transition-all placeholder:text-gray-400 focus:ring-1 ${formik.touched.name && formik.errors.name ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-200 focus:border-blue-500 focus:ring-blue-500"}`}
                />
              </div>
              <div>
                <input id="email" name="email" type="email" placeholder="Email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}
                  className={`w-full rounded-md border px-4 py-3.5 text-base outline-none transition-all placeholder:text-gray-400 focus:ring-1 ${formik.touched.email && formik.errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-200 focus:border-blue-500 focus:ring-blue-500"}`}
                />
              </div>
              <div>
                <div className="relative">
                  <input id="password" name="password" type={showPassword ? "text" : "password"} placeholder="Password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}
                    className={`w-full rounded-md border pl-4 pr-12 py-3.5 text-base outline-none transition-all placeholder:text-gray-400 focus:ring-1 ${formik.touched.password && formik.errors.password ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-200 focus:border-blue-500 focus:ring-blue-500"}`}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="text-center">
                <a href="#forgot" className="text-sm font-semibold text-blue-600 hover:text-blue-700">Forgot password?</a>
              </div>

              <button type="submit" disabled={isLoading}
                className="mt-2 w-full rounded-md bg-[#2563eb] py-3.5 text-base font-semibold text-white shadow-sm hover:bg-blue-700 transition-all active:scale-[0.99] disabled:opacity-50"
              >
                {isLoading ? "Loading..." : "Log in"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}