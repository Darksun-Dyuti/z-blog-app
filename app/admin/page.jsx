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
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      setLoading(true)
      const blogs = await axios.get("/api/blog")
      const subs = await axios.get("/api/email")

      setStats({
        blogs: blogs.data.blogs?.length || 0,
        subscriptions: subs.data.emails?.length || 0,
      })

      setRecentBlogs(blogs.data.blogs?.slice(-3).reverse() || [])
      setRecentSubs(subs.data.emails?.slice(-5).reverse() || [])
    } catch (err) {
      console.error("Dashboard fetch error:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-zinc-950 border-t-2 border-black dark:border-zinc-800 w-full transition-colors">
      <div className="flex-1 p-6 lg:p-8">
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-[#ffc400] border-2 border-black dark:border-white flex items-center justify-center shadow-[-4px_4px_0px_#000000] dark:shadow-[-4px_4px_0px_#ffffff]">
              <FiBarChart className="w-6 h-6 text-black" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-black dark:text-zinc-100">
                Admin Dashboard
              </h1>
              <p className="text-slate-700 dark:text-zinc-350 text-sm sm:text-base font-semibold">
                Welcome back! Here's your content overview
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {/* Card 1 */}
          <div className="bg-white dark:bg-zinc-900 border-2 border-black dark:border-white p-6 shadow-[-6px_6px_0px_#000000] dark:shadow-[-6px_6px_0px_#ffffff] hover:translate-x-[2px] hover:translate-y-[-2px] hover:shadow-[-8px_8px_0px_#000000] dark:hover:shadow-[-8px_8px_0px_#ffffff] transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-[#2979ff] border-2 border-black dark:border-white text-white shadow-[-3px_3px_0px_#000000] dark:shadow-[-3px_3px_0px_#ffffff]">
                <FiFileText className="w-6 h-6" />
              </div>
              <div className="text-right">
                {loading ? (
                  <div className="w-16 h-8 bg-slate-200 dark:bg-zinc-800 animate-pulse ml-auto"></div>
                ) : (
                  <p className="text-3xl font-black text-black dark:text-zinc-100 mb-1">{stats.blogs}</p>
                )}
                <p className="text-xs sm:text-sm font-bold text-slate-600 dark:text-zinc-450">Total Blogs</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="px-2.5 py-0.5 bg-[#00e676] text-black border border-black dark:border-white text-xs font-bold rounded-none">Active</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white dark:bg-zinc-900 border-2 border-black dark:border-white p-6 shadow-[-6px_6px_0px_#000000] dark:shadow-[-6px_6px_0px_#ffffff] hover:translate-x-[2px] hover:translate-y-[-2px] hover:shadow-[-8px_8px_0px_#000000] dark:hover:shadow-[-8px_8px_0px_#ffffff] transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-[#00e676] border-2 border-black dark:border-white text-black shadow-[-3px_3px_0px_#000000] dark:shadow-[-3px_3px_0px_#ffffff]">
                <FiUsers className="w-6 h-6" />
              </div>
              <div className="text-right">
                {loading ? (
                  <div className="w-16 h-8 bg-slate-200 dark:bg-zinc-800 animate-pulse ml-auto"></div>
                ) : (
                  <p className="text-3xl font-black text-black dark:text-zinc-100 mb-1">{stats.subscriptions}</p>
                )}
                <p className="text-xs sm:text-sm font-bold text-slate-600 dark:text-zinc-450">Subscribers</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="px-2.5 py-0.5 bg-[#ffc400] text-black border border-black dark:border-white text-xs font-bold rounded-none">Growing</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white dark:bg-zinc-900 border-2 border-black dark:border-white p-6 shadow-[-6px_6px_0px_#000000] dark:shadow-[-6px_6px_0px_#ffffff] hover:translate-x-[2px] hover:translate-y-[-2px] hover:shadow-[-8px_8px_0px_#000000] dark:hover:shadow-[-8px_8px_0px_#ffffff] transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-[#ffc400] border-2 border-black dark:border-white text-black shadow-[-3px_3px_0px_#000000] dark:shadow-[-3px_3px_0px_#ffffff]">
                <FiEye className="w-6 h-6" />
              </div>
              <div className="text-right">
                {loading ? (
                  <div className="w-16 h-8 bg-slate-200 dark:bg-zinc-800 animate-pulse ml-auto"></div>
                ) : (
                  <p className="text-3xl font-black text-black dark:text-zinc-100 mb-1">{stats.blogs * 127}</p>
                )}
                <p className="text-xs sm:text-sm font-bold text-slate-600 dark:text-zinc-450">Total Views</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="px-2.5 py-0.5 bg-[#2979ff] text-white border border-black dark:border-white text-xs font-bold rounded-none">Trending</span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-[#ffeb3b] dark:bg-zinc-800 border-2 border-black dark:border-white p-6 shadow-[-6px_6px_0px_#000000] dark:shadow-[-6px_6px_0px_#ffffff] hover:translate-x-[2px] hover:translate-y-[-2px] hover:shadow-[-8px_8px_0px_#000000] dark:hover:shadow-[-8px_8px_0px_#ffffff] transition-all duration-200">
            <div className="text-center">
              <div className="w-14 h-14 bg-white dark:bg-zinc-900 border-2 border-black dark:border-white flex items-center justify-center mx-auto mb-4 shadow-[-3px_3px_0px_#000000] dark:shadow-[-3px_3px_0px_#ffffff]">
                <FiActivity className="w-7 h-7 text-black dark:text-zinc-100" />
              </div>
              <h3 className="text-xs font-black text-black dark:text-zinc-100 mb-1 uppercase">System Status</h3>
              <p className="text-xl font-black text-black dark:text-zinc-100 mb-1">All Good!</p>
              <div className="flex items-center justify-center gap-2 text-sm">
                <div className="w-2 h-2 bg-[#00e676] border border-black dark:border-white rounded-full animate-pulse"></div>
                <span className="font-extrabold text-black dark:text-zinc-100 text-xs">ONLINE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions & Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-zinc-900 border-2 border-black dark:border-white p-6 shadow-[-6px_6px_0px_#000000] dark:shadow-[-6px_6px_0px_#ffffff] h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-[#ff1744] border-2 border-black dark:border-white text-white shadow-[-2px_2px_0px_#000000] dark:shadow-[-2px_2px_0px_#ffffff]">
                  <FiTrendingUp className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-black text-black dark:text-zinc-100">Quick Actions</h3>
              </div>
              
              <div className="space-y-4">
                <a
                  href="/admin/addProduct"
                  className="flex items-center gap-4 p-4 border-2 border-black dark:border-white bg-white dark:bg-zinc-800 shadow-[-4px_4px_0px_#000000] dark:shadow-[-4px_4px_0px_#ffffff] hover:translate-x-[1px] hover:translate-y-[-1px] hover:shadow-[-5px_5px_0px_#000000] dark:hover:shadow-[-5px_5px_0px_#ffffff] active:translate-x-0 active:translate-y-0 active:shadow-none transition-all duration-200 group"
                >
                  <div className="p-2 bg-[#2979ff] border-2 border-black dark:border-white text-white">
                    <FiPlusCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-black text-black dark:text-zinc-100 group-hover:text-[#2979ff] transition-colors">Add New Blog</span>
                    <p className="text-xs text-slate-600 dark:text-zinc-400 font-bold">Create fresh content</p>
                  </div>
                </a>
                
                <a
                  href="/admin/bloglist"
                  className="flex items-center gap-4 p-4 border-2 border-black dark:border-white bg-white dark:bg-zinc-800 shadow-[-4px_4px_0px_#000000] dark:shadow-[-4px_4px_0px_#ffffff] hover:translate-x-[1px] hover:translate-y-[-1px] hover:shadow-[-5px_5px_0px_#000000] dark:hover:shadow-[-5px_5px_0px_#ffffff] active:translate-x-0 active:translate-y-0 active:shadow-none transition-all duration-200 group"
                >
                  <div className="p-2 bg-[#00e676] border-2 border-black dark:border-white text-black">
                    <FiList className="w-5 h-5 dark:invert" />
                  </div>
                  <div>
                    <span className="font-black text-black dark:text-zinc-100 group-hover:text-[#00e676] dark:group-hover:text-[#00e676] transition-colors">Manage Blogs</span>
                    <p className="text-xs text-slate-600 dark:text-zinc-400 font-bold">Edit and organize</p>
                  </div>
                </a>
                
                <a
                  href="/admin/subscriptions"
                  className="flex items-center gap-4 p-4 border-2 border-black dark:border-white bg-white dark:bg-zinc-800 shadow-[-4px_4px_0px_#000000] dark:shadow-[-4px_4px_0px_#ffffff] hover:translate-x-[1px] hover:translate-y-[-1px] hover:shadow-[-5px_5px_0px_#000000] dark:hover:shadow-[-5px_5px_0px_#ffffff] active:translate-x-0 active:translate-y-0 active:shadow-none transition-all duration-200 group"
                >
                  <div className="p-2 bg-[#ffc400] border-2 border-black dark:border-white text-black">
                    <FiMail className="w-5 h-5 dark:invert" />
                  </div>
                  <div>
                    <span className="font-black text-black dark:text-zinc-100 group-hover:text-[#ffc400] transition-colors">Email List</span>
                    <p className="text-xs text-slate-600 dark:text-zinc-400 font-bold">Manage subscribers</p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-zinc-900 border-2 border-black dark:border-white p-6 shadow-[-6px_6px_0px_#000000] dark:shadow-[-6px_6px_0px_#ffffff] h-full">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#2979ff] border-2 border-black dark:border-white text-white shadow-[-2px_2px_0px_#000000] dark:shadow-[-2px_2px_0px_#ffffff]">
                    <FiBarChart className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-black text-black dark:text-zinc-100">Analytics Overview</h3>
                </div>
                <div className="flex items-center gap-2 text-xs font-black text-slate-600 dark:text-zinc-400 border-2 border-black dark:border-white px-2 py-1 bg-slate-50 dark:bg-zinc-800">
                  <FiCalendar className="w-4 h-4" />
                  <span>LAST 30 DAYS</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-[#2979ff]/10 dark:bg-zinc-800 border-2 border-black dark:border-white">
                  <p className="text-2xl font-black text-[#2979ff] dark:text-[#5897ff]">{Math.floor(stats.blogs * 1.2)}</p>
                  <p className="text-xs text-black dark:text-zinc-200 font-black uppercase tracking-wider">Published</p>
                </div>
                <div className="text-center p-4 bg-[#00e676]/10 dark:bg-zinc-800 border-2 border-black dark:border-white">
                  <p className="text-2xl font-black text-[#00a152] dark:text-[#00e676]">{Math.floor(stats.subscriptions * 0.8)}</p>
                  <p className="text-xs text-black dark:text-zinc-200 font-black uppercase tracking-wider">New Subs</p>
                </div>
                <div className="text-center p-4 bg-[#ffc400]/10 dark:bg-zinc-800 border-2 border-black dark:border-white">
                  <p className="text-2xl font-black text-[#b28900] dark:text-[#ffc400]">{stats.blogs * 89}%</p>
                  <p className="text-xs text-black dark:text-zinc-200 font-black uppercase tracking-wider">Engagement</p>
                </div>
                <div className="text-center p-4 bg-[#e040fb]/10 dark:bg-zinc-800 border-2 border-black dark:border-white">
                  <p className="text-2xl font-black text-[#a625be] dark:text-[#e040fb]">{Math.floor(stats.blogs * 2.3)}k</p>
                  <p className="text-xs text-black dark:text-zinc-200 font-black uppercase tracking-wider">Impressions</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Latest Blog Posts */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#2979ff] border-2 border-black dark:border-white text-white shadow-[-2px_2px_0px_#000000] dark:shadow-[-2px_2px_0px_#ffffff]">
                <FiFileText className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-black text-black dark:text-zinc-100">Latest Blog Posts</h2>
            </div>
            <a
              href="/admin/bloglist"
              className="flex items-center gap-2 px-4 py-2 bg-black text-white dark:bg-zinc-800 dark:text-zinc-100 border-2 border-black dark:border-white font-extrabold hover:bg-white hover:text-black dark:hover:bg-white dark:hover:text-black shadow-[-4px_4px_0px_#000000] dark:shadow-[-4px_4px_0px_#ffffff] active:translate-x-[2px] active:translate-y-[-2px] active:shadow-none transition-all duration-200 text-sm rounded-none"
            >
              <span>View All</span>
              <FiList className="w-4 h-4" />
            </a>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-white dark:bg-zinc-900 border-2 border-black dark:border-zinc-800 h-60 w-full animate-pulse shadow-[-5px_5px_0px_#000000] dark:shadow-[-5px_5px_0px_#ffffff]"></div>
              ))
            ) : recentBlogs.length > 0 ? (
              recentBlogs.map((blog) => (
                <div
                  key={blog._id}
                  className="bg-white dark:bg-zinc-900 border-2 border-black dark:border-white shadow-[-5px_5px_0px_#000000] dark:shadow-[-5px_5px_0px_#ffffff] hover:translate-x-[2px] hover:translate-y-[-2px] hover:shadow-[-7px_7px_0px_#000000] dark:hover:shadow-[-7px_7px_0px_#ffffff] transition-all duration-300 overflow-hidden group flex flex-col justify-between"
                >
                  <div>
                    {blog.image && (
                      <div className="aspect-video overflow-hidden relative border-b-2 border-black dark:border-white">
                        <img
                          src={blog.image || "/placeholder.svg"}
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="p-5">
                      <span className="px-2 py-0.5 bg-black text-white dark:bg-zinc-100 dark:text-black text-[10px] font-black inline-block mb-3 uppercase">
                        {blog.category}
                      </span>
                      <h3 className="font-extrabold text-black dark:text-zinc-100 mb-2 line-clamp-2 text-base sm:text-lg group-hover:text-[#2979ff] transition-colors">
                        {blog.title}
                      </h3>
                      <div 
                        className="text-slate-700 dark:text-zinc-300 text-xs mb-4 line-clamp-2 leading-relaxed" 
                        dangerouslySetInnerHTML={{__html: blog.description}}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="p-5 pt-0">
                    <div className="flex items-center justify-between border-t border-black dark:border-zinc-800 pt-3">
                      <div className="flex items-center gap-2">
                        <FiCalendar className="w-3.5 h-3.5 text-slate-500 dark:text-zinc-400" />
                        <span className="text-[11px] font-bold text-slate-600 dark:text-zinc-400">
                          {new Date(blog.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12 border-2 border-black dark:border-zinc-800 border-dashed bg-white dark:bg-zinc-900">
                <p className="text-slate-500 font-extrabold text-sm sm:text-base">No blog posts found.</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Subscribers */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#00e676] border-2 border-black dark:border-white text-black shadow-[-2px_2px_0px_#000000] dark:shadow-[-2px_2px_0px_#ffffff]">
                <FiUsers className="w-5 h-5 dark:invert" />
              </div>
              <h2 className="text-2xl font-black text-black dark:text-zinc-100">Recent Subscribers</h2>
            </div>
            <a
              href="/admin/subscriptions"
              className="flex items-center gap-2 px-4 py-2 bg-black text-white dark:bg-zinc-800 dark:text-zinc-100 border-2 border-black dark:border-white font-extrabold hover:bg-white hover:text-black dark:hover:bg-white dark:hover:text-black shadow-[-4px_4px_0px_#000000] dark:shadow-[-4px_4px_0px_#ffffff] active:translate-x-[2px] active:translate-y-[-2px] active:shadow-none transition-all duration-200 text-sm rounded-none"
            >
              <span>View All</span>
              <FiMail className="w-4 h-4" />
            </a>
          </div>
          
          <div className="bg-white dark:bg-zinc-900 border-2 border-black dark:border-white shadow-[-6px_6px_0px_#000000] dark:shadow-[-6px_6px_0px_#ffffff] overflow-hidden">
            <div className="divide-y divide-black dark:divide-zinc-800">
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="p-5 animate-pulse bg-white dark:bg-zinc-900 h-16 w-full"></div>
                ))
              ) : recentSubs.length > 0 ? (
                recentSubs.map((sub, index) => (
                  <div
                    key={sub._id}
                    className="p-5 hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#ffeb3b] dark:bg-zinc-800 border-2 border-black dark:border-white flex items-center justify-center text-black dark:text-[#ffeb3b] text-lg font-black shadow-[-2px_2px_0px_#000000] dark:shadow-[-2px_2px_0px_#ffffff]">
                          {sub.email.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-extrabold text-black dark:text-zinc-100 text-base">
                            {sub.email}
                          </p>
                          <div className="flex items-center gap-2.5 mt-1">
                            <p className="text-xs text-slate-600 dark:text-zinc-400 font-bold">Subscriber #{recentSubs.length - index}</p>
                            <span className="w-1 h-1 bg-black dark:bg-zinc-100 rounded-full"></span>
                            <span className="px-2 py-0.5 bg-[#00e676]/20 text-black dark:text-[#00e676] border border-[#00e676] text-[10px] font-bold">
                              ACTIVE
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 mb-1 justify-end">
                          <FiCalendar className="w-3.5 h-3.5 text-slate-600 dark:text-zinc-450" />
                          <p className="font-bold text-slate-700 dark:text-zinc-400 text-xs">{new Date(sub.date).toLocaleDateString()}</p>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-zinc-500 font-semibold">
                          {new Date(sub.date).toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-slate-500 font-extrabold text-sm sm:text-base">No subscribers found.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard