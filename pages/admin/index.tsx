"use client";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Header } from "../../components/Header/Header";
import { useApp } from "../../context/AppContext";
import Link from "next/link";

export default function AdminPage() {
  const { theme } = useApp();
  const isDark = theme === "dark";
  const router = useRouter();

  // Auto redirect to manage posts for now
  useEffect(() => {
    router.replace("/admin/manage-posts");
  }, [router]);

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        isDark ? "bg-gray-900" : "bg-white"
      }`}
    >
      <Header />

      <main className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1
              className={`text-5xl font-light mb-4 ${
                isDark ? "text-white" : "text-black"
              }`}
            >
              Admin Dashboard
            </h1>
            <p
              className={`text-xl font-light max-w-2xl mx-auto ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Manage your blog posts and content
            </p>
          </div>

          {/* Admin Menu */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Manage Posts Card */}
            <Link
              href="/admin/manage-posts"
              className={`p-8 rounded-2xl border transition-all duration-300 hover:scale-105 ${
                isDark
                  ? "bg-gray-800 border-gray-700 hover:border-blue-500"
                  : "bg-white border-gray-200 hover:border-blue-500 hover:shadow-lg"
              }`}
            >
              <div className="text-center">
                <div
                  className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                    isDark ? "bg-blue-600" : "bg-blue-100"
                  }`}
                >
                  <svg
                    className={`w-8 h-8 ${
                      isDark ? "text-white" : "text-blue-600"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3
                  className={`text-2xl font-light mb-2 ${
                    isDark ? "text-white" : "text-black"
                  }`}
                >
                  Manage Posts
                </h3>
                <p
                  className={`font-light ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  View, edit, delete and manage all your blog posts
                </p>
              </div>
            </Link>

            {/* Create New Post Card */}
            <Link
              href="/admin/create-post"
              className={`p-8 rounded-2xl border transition-all duration-300 hover:scale-105 ${
                isDark
                  ? "bg-gray-800 border-gray-700 hover:border-green-500"
                  : "bg-white border-gray-200 hover:border-green-500 hover:shadow-lg"
              }`}
            >
              <div className="text-center">
                <div
                  className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                    isDark ? "bg-green-600" : "bg-green-100"
                  }`}
                >
                  <svg
                    className={`w-8 h-8 ${
                      isDark ? "text-white" : "text-green-600"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </div>
                <h3
                  className={`text-2xl font-light mb-2 ${
                    isDark ? "text-white" : "text-black"
                  }`}
                >
                  Create New Post
                </h3>
                <p
                  className={`font-light ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Write and publish a new blog post
                </p>
              </div>
            </Link>
          </div>

          {/* Quick Stats */}
          <div
            className={`mt-12 p-6 rounded-2xl border ${
              isDark
                ? "bg-gray-800 border-gray-700"
                : "bg-gray-50 border-gray-200"
            }`}
          >
            <h3
              className={`text-xl font-light mb-4 text-center ${
                isDark ? "text-white" : "text-black"
              }`}
            >
              Quick Access
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/blog"
                className={`px-4 py-2 rounded-lg font-light transition-colors duration-300 ${
                  isDark
                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                View Blog
              </Link>
              <Link
                href="/"
                className={`px-4 py-2 rounded-lg font-light transition-colors duration-300 ${
                  isDark
                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                Go to Homepage
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
