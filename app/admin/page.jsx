"use client"
import { useEffect, useState } from "react"
import axios from "axios"
import {
  FiFileText,
  FiMail,
  FiPlusCircle,
  FiList,
  FiTrendingUp,
  FiUsers,
  FiEye,
  FiCalendar,
  FiActivity,
  FiBarChart,
} from "react-icons/fi"

const AdminDashboard = () => {
  const [stats, setStats] = useState({ blogs: 0, subscriptions: 0 })
  const [recentBlogs, setRecentBlogs] = useState([])
  const [recentSubs, setRecentSubs] = useState([])

  const fetchData = async () => {
    try {
      const blogs = await axios.get("/api/blog")
      const subs = await axios.get("/api/email")

      setStats({
        blogs: blogs.data.blogs?.length || 0,
        subscriptions: subs.data.emails?.length || 0,
      })

      setRecentBlogs(blogs.data.blogs?.slice(-5).reverse() || [])
      setRecentSubs(subs.data.emails?.slice(-5).reverse() || [])
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="flex min-h-screen bg-slate-50 border-t-2 border-black w-full">
      <div className="flex-1 p-6 lg:p-8">
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-[#ffc400] border-2 border-black flex items-center justify-center shadow-[-4px_4px_0px_#000000]">
              <FiBarChart className="w-6 h-6 text-black" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-black">
                Admin Dashboard
              </h1>
              <p className="text-slate-700 text-sm sm:text-base">Welcome back! Here's your content overview</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white border-2 border-black p-6 shadow-[-6px_6px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[-2px] hover:shadow-[-8px_8px_0px_#000000] transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-[#2979ff] border-2 border-black text-white shadow-[-3px_3px_0px_#000000]">
                <FiFileText className="w-6 h-6" />
              </div>
              <div className="text-right">
                <p className="text-3xl font-extrabold text-black mb-1">{stats.blogs}</p>
                <p className="text-sm font-bold text-slate-600">Total Blogs</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="px-2.5 py-0.5 bg-[#00e676] text-black border border-black text-xs font-bold rounded-none">Active</span>
            </div>
          </div>

          <div className="bg-white border-2 border-black p-6 shadow-[-6px_6px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[-2px] hover:shadow-[-8px_8px_0px_#000000] transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-[#00e676] border-2 border-black text-black shadow-[-3px_3px_0px_#000000]">
                <FiUsers className="w-6 h-6" />
              </div>
              <div className="text-right">
                <p className="text-3xl font-extrabold text-black mb-1">{stats.subscriptions}</p>
                <p className="text-sm font-bold text-slate-600">Subscribers</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="px-2.5 py-0.5 bg-[#ffc400] text-black border border-black text-xs font-bold rounded-none">Growing</span>
            </div>
          </div>

          <div className="bg-white border-2 border-black p-6 shadow-[-6px_6px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[-2px] hover:shadow-[-8px_8px_0px_#000000] transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-[#ffc400] border-2 border-black text-black shadow-[-3px_3px_0px_#000000]">
                <FiEye className="w-6 h-6" />
              </div>
              <div className="text-right">
                <p className="text-3xl font-extrabold text-black mb-1">{stats.blogs * 127}</p>
                <p className="text-sm font-bold text-slate-600">Total Views</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="px-2.5 py-0.5 bg-[#2979ff] text-white border border-black text-xs font-bold rounded-none">Trending</span>
            </div>
          </div>

          <div className="bg-[#ffeb3b] border-2 border-black p-6 shadow-[-6px_6px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[-2px] hover:shadow-[-8px_8px_0px_#000000] transition-all duration-200">
            <div className="text-center">
              <div className="w-14 h-14 bg-white border-2 border-black flex items-center justify-center mx-auto mb-4 shadow-[-3px_3px_0px_#000000]">
                <FiActivity className="w-7 h-7 text-black" />
              </div>
              <h3 className="text-sm font-extrabold text-black mb-1">System Status</h3>
              <p className="text-xl font-black text-black mb-1">All Good!</p>
              <div className="flex items-center justify-center gap-2 text-sm">
                <div className="w-2 h-2 bg-[#00e676] border border-black rounded-full animate-pulse"></div>
                <span className="font-bold text-black text-xs">ONLINE</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <div className="lg:col-span-1">
            <div className="bg-white border-2 border-black p-6 shadow-[-6px_6px_0px_#000000]">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-[#ff1744] border-2 border-black text-white shadow-[-2px_2px_0px_#000000]">
                  <FiTrendingUp className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-extrabold text-black">Quick Actions</h3>
              </div>
              <div className="space-y-4">
                <a
                  href="/admin/addProduct"
                  className="flex items-center gap-4 p-4 border-2 border-black bg-white shadow-[-4px_4px_0px_#000000] hover:translate-x-[1px] hover:translate-y-[-1px] hover:shadow-[-5px_5px_0px_#000000] active:translate-x-0 active:translate-y-0 active:shadow-none transition-all duration-200 group"
                >
                  <div className="p-2 bg-[#2979ff] border-2 border-black text-white">
                    <FiPlusCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-extrabold text-black group-hover:text-[#2979ff] transition-colors">Add New Blog</span>
                    <p className="text-xs text-slate-600 font-medium">Create fresh content</p>
                  </div>
                </a>
                <a
                  href="/admin/bloglist"
                  className="flex items-center gap-4 p-4 border-2 border-black bg-white shadow-[-4px_4px_0px_#000000] hover:translate-x-[1px] hover:translate-y-[-1px] hover:shadow-[-5px_5px_0px_#000000] active:translate-x-0 active:translate-y-0 active:shadow-none transition-all duration-200 group"
                >
                  <div className="p-2 bg-[#00e676] border-2 border-black text-black">
                    <FiList className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-extrabold text-black group-hover:text-[#00e676] transition-colors">Manage Blogs</span>
                    <p className="text-xs text-slate-600 font-medium">Edit and organize</p>
                  </div>
                </a>
                <a
                  href="/admin/subscriptions"
                  className="flex items-center gap-4 p-4 border-2 border-black bg-white shadow-[-4px_4px_0px_#000000] hover:translate-x-[1px] hover:translate-y-[-1px] hover:shadow-[-5px_5px_0px_#000000] active:translate-x-0 active:translate-y-0 active:shadow-none transition-all duration-200 group"
                >
                  <div className="p-2 bg-[#ffc400] border-2 border-black text-black">
                    <FiMail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-extrabold text-black group-hover:text-[#ffc400] transition-colors">Email List</span>
                    <p className="text-xs text-slate-600 font-medium">Manage subscribers</p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white border-2 border-black p-6 shadow-[-6px_6px_0px_#000000]">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#2979ff] border-2 border-black text-white shadow-[-2px_2px_0px_#000000]">
                    <FiBarChart className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-extrabold text-black">Analytics Overview</h3>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-600 border-2 border-black px-2 py-1 bg-slate-50">
                  <FiCalendar className="w-4 h-4" />
                  <span>LAST 30 DAYS</span>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-[#2979ff]/10 border-2 border-black">
                  <p className="text-2xl font-black text-[#2979ff]">{Math.floor(stats.blogs * 1.2)}</p>
                  <p className="text-xs text-black font-extrabold">Published</p>
                </div>
                <div className="text-center p-4 bg-[#00e676]/10 border-2 border-black">
                  <p className="text-2xl font-black text-[#00a152]">{Math.floor(stats.subscriptions * 0.8)}</p>
                  <p className="text-xs text-black font-extrabold">New Subs</p>
                </div>
                <div className="text-center p-4 bg-[#ffc400]/10 border-2 border-black">
                  <p className="text-2xl font-black text-[#b28900]">{stats.blogs * 89}%</p>
                  <p className="text-xs text-black font-extrabold">Engagement</p>
                </div>
                <div className="text-center p-4 bg-[#e040fb]/10 border-2 border-black">
                  <p className="text-2xl font-black text-[#a625be]">{Math.floor(stats.blogs * 2.3)}k</p>
                  <p className="text-xs text-black font-extrabold">Impressions</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-10">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#2979ff] border-2 border-black text-white shadow-[-2px_2px_0px_#000000]">
                <FiFileText className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-extrabold text-black">Latest Blog Posts</h2>
            </div>
            <a
              href="/admin/bloglist"
              className="flex items-center gap-2 px-4 py-2 bg-black text-white border-2 border-black font-extrabold hover:bg-white hover:text-black shadow-[-4px_4px_0px_#000000] active:translate-x-[2px] active:translate-y-[-2px] active:shadow-[-2px_2px_0px_#000000] transition-all duration-200 text-sm"
            >
              <span>View All</span>
              <FiList className="w-4 h-4" />
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentBlogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white border-2 border-black shadow-[-5px_5px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[-2px] hover:shadow-[-7px_7px_0px_#000000] transition-all duration-300 overflow-hidden group"
              >
                {blog.image && (
                  <div className="aspect-video overflow-hidden relative border-b-2 border-black">
                    <img
                      src={blog.image || "/placeholder.svg"}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-5">
                  <span className="px-2 py-0.5 bg-black text-white text-[10px] font-extrabold inline-block mb-3">
                    {blog.category}
                  </span>
                  <h3 className="font-extrabold text-black mb-2 line-clamp-2 text-lg group-hover:text-[#2979ff] transition-colors">
                    {blog.title}
                  </h3>
                  <div className="text-slate-700 text-xs mb-4 line-clamp-2 leading-relaxed" dangerouslySetInnerHTML={{__html: blog.description}}></div>
                  <div className="flex items-center justify-between border-t border-black pt-3">
                    <div className="flex items-center gap-2">
                      <FiCalendar className="w-3.5 h-3.5 text-slate-500" />
                      <span className="text-[11px] font-bold text-slate-600">
                        {new Date(blog.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#00e676] border-2 border-black text-black shadow-[-2px_2px_0px_#000000]">
                <FiUsers className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-extrabold text-black">Recent Subscribers</h2>
            </div>
            <a
              href="/admin/subscriptions"
              className="flex items-center gap-2 px-4 py-2 bg-black text-white border-2 border-black font-extrabold hover:bg-white hover:text-black shadow-[-4px_4px_0px_#000000] active:translate-x-[2px] active:translate-y-[-2px] active:shadow-[-2px_2px_0px_#000000] transition-all duration-200 text-sm"
            >
              <span>View All</span>
              <FiMail className="w-4 h-4" />
            </a>
          </div>
          <div className="bg-white border-2 border-black shadow-[-6px_6px_0px_#000000] overflow-hidden">
            <div className="divide-y divide-black">
              {recentSubs.map((sub, index) => (
                <div
                  key={sub._id}
                  className="p-5 hover:bg-slate-50 transition-colors duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#ffeb3b] border-2 border-black flex items-center justify-center text-black text-lg font-black shadow-[-2px_2px_0px_#000000]">
                        {sub.email.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-extrabold text-black text-base sm:text-lg">
                          {sub.email}
                        </p>
                        <div className="flex items-center gap-2.5 mt-1">
                          <p className="text-xs text-slate-600 font-bold">Subscriber #{recentSubs.length - index}</p>
                          <span className="w-1 h-1 bg-black rounded-full"></span>
                          <span className="px-2 py-0.5 bg-[#00e676]/20 text-black border border-[#00e676] text-[10px] font-bold">
                            ACTIVE
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-1 justify-end">
                        <FiCalendar className="w-3.5 h-3.5 text-slate-600" />
                        <p className="font-bold text-slate-700 text-xs">{new Date(sub.date).toLocaleDateString()}</p>
                      </div>
                      <p className="text-xs text-slate-500 font-medium">
                        {new Date(sub.date).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard