"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { forgotPassword as forgotPasswordApi } from "../../api/auth";

export default function ForgotPassword() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      await forgotPasswordApi({ phone: data.phone });
      setSuccess("Reset instructions have been sent to your phone.");
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=DM+Sans:wght@300;400;500&display=swap');

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .login-root {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #0284c7, #7dd3fc);
          overflow: hidden;
          font-family: 'DM Sans', sans-serif;
        }

        .login-circle {
          position: absolute;
          border-radius: 50%;
          background: rgba(255,255,255,0.1);
        }

        .login-card {
          position: relative;
          z-index: 10;
          width: 360px;
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(12px);
          border-radius: 18px;
          padding: 32px 28px;
          box-shadow: 0 10px 40px rgba(3,105,161,0.2);
          animation: fadeIn 0.6s ease;
        }

        .logo-font {
          font-family: 'Playfair Display', serif;
          font-size: 26px;
          text-align: center;
          color: #0369a1;
          margin-bottom: 8px;
        }

        .logo-font span { color: #38bdf8; }

        .login-input:focus {
          border-color: #0ea5e9 !important;
          box-shadow: 0 0 0 2px rgba(14,165,233,0.15);
        }
      `}</style>

      <div className="login-root">
        <div
          className="login-circle"
          style={{ width: 200, height: 200, top: 30, left: 40 }}
        />
        <div
          className="login-circle"
          style={{ width: 150, height: 150, bottom: 40, right: 60 }}
        />

        <div className="login-card">
          <Link href="/" className="no-underline">
            <div className="logo-font">
              BASO<span>BAS</span>
            </div>
          </Link>

          <p className="text-center text-[13px] text-slate-500 mb-6">
            Enter your phone number to reset your password
          </p>

          {error && (
            <div className="mb-3 p-2 bg-red-50 text-red-600 text-[12px] rounded-lg text-center">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-3 p-2 bg-green-50 text-green-600 text-[12px] rounded-lg text-center">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="mb-3">
              <label className="block text-[12px] text-slate-500 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                className="login-input w-full px-3 py-1 rounded-lg border border-sky-200 outline-none text-[14px] transition-all"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Please enter a valid 10-digit phone number",
                  },
                })}
              />
              {errors.phone && (
                <p className="text-red-500 text-[11px] mt-0.5">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-1 bg-sky-500 hover:bg-sky-600 disabled:bg-sky-300 text-white rounded-[25px] text-[14px] font-medium cursor-pointer transition-colors border-none"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          <p className="text-center text-[13px] text-slate-500 mt-3">
            Remembered your password?{" "}
            <Link
              href="/auth/login"
              className="text-sky-600 font-medium no-underline hover:underline"
            >
              Back to Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}