"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { FiMessageCircle, FiCompass, FiBookOpen, FiUser, FiBarChart2, FiArrowRight } from "react-icons/fi"
import { useAuth } from "../hooks/useAuth"
import "./Dashboard.css"

const Dashboard = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data for dashboard
  const recentActivity = [
    {
      id: 1,
      type: "chat",
      title: "Career Chat Session",
      date: "2 days ago",
      snippet: "Discussed transitioning from marketing to data science...",
    },
    {
      id: 2,
      type: "suggestion",
      title: "Career Path Suggestions",
      date: "1 week ago",
      snippet: "Received 5 career path suggestions based on your profile...",
    },
    {
      id: 3,
      type: "course",
      title: "Course Recommendations",
      date: "2 weeks ago",
      snippet: 'Found 8 courses matching "Python for Data Science"...',
    },
  ]

  const savedCareers = [
    {
      id: 1,
      title: "Data Scientist",
      match: 92,
      description: "Analyze complex data to help organizations make better decisions.",
    },
    {
      id: 2,
      title: "UX Designer",
      match: 85,
      description: "Create user-friendly interfaces and improve user experience for digital products.",
    },
    {
      id: 3,
      title: "Product Manager",
      match: 78,
      description: "Lead the development of products from conception to launch.",
    },
  ]

  const savedCourses = [
    {
      id: 1,
      title: "Python for Data Science and Machine Learning",
      provider: "Udemy",
      duration: "10 weeks",
      price: "₹3,499",
    },
    { id: 2, title: "UX Design Fundamentals", provider: "Coursera", duration: "6 weeks", price: "₹2,999" },
    { id: 3, title: "Product Management Essentials", provider: "upGrad", duration: "8 weeks", price: "₹15,000" },
  ]

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Welcome, {user?.name || "User"}!</h1>
        <p>Track your career exploration journey and manage your saved resources</p>
      </div>

      <div className="dashboard-tabs">
        <button className={activeTab === "overview" ? "active" : ""} onClick={() => setActiveTab("overview")}>
          Overview
        </button>
        <button className={activeTab === "careers" ? "active" : ""} onClick={() => setActiveTab("careers")}>
          Saved Careers
        </button>
        <button className={activeTab === "courses" ? "active" : ""} onClick={() => setActiveTab("courses")}>
          Saved Courses
        </button>
        <button className={activeTab === "profile" ? "active" : ""} onClick={() => setActiveTab("profile")}>
          My Profile
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === "overview" && (
          <div className="overview-tab">
            <div className="dashboard-grid">
              <div className="quick-actions">
                <h2>Quick Actions</h2>
                <div className="action-cards">
                  <Link to="/chatbot" className="action-card">
                    <div className="action-icon">
                      <FiMessageCircle />
                    </div>
                    <div className="action-content">
                      <h3>Career Chat</h3>
                      <p>Ask questions and get personalized guidance</p>
                    </div>
                    <FiArrowRight className="action-arrow" />
                  </Link>

                  <Link to="/career-suggester" className="action-card">
                    <div className="action-icon">
                      <FiCompass />
                    </div>
                    <div className="action-content">
                      <h3>Career Suggester</h3>
                      <p>Discover career paths that match your profile</p>
                    </div>
                    <FiArrowRight className="action-arrow" />
                  </Link>

                  <Link to="/course-recommender" className="action-card">
                    <div className="action-icon">
                      <FiBookOpen />
                    </div>
                    <div className="action-content">
                      <h3>Course Finder</h3>
                      <p>Find courses to build your skills</p>
                    </div>
                    <FiArrowRight className="action-arrow" />
                  </Link>
                </div>
              </div>

              <div className="recent-activity">
                <h2>Recent Activity</h2>
                {recentActivity.length > 0 ? (
                  <div className="activity-list">
                    {recentActivity.map((activity) => (
                      <div className="activity-item" key={activity.id}>
                        <div className="activity-icon">
                          {activity.type === "chat" && <FiMessageCircle />}
                          {activity.type === "suggestion" && <FiCompass />}
                          {activity.type === "course" && <FiBookOpen />}
                        </div>
                        <div className="activity-content">
                          <div className="activity-header">
                            <h3>{activity.title}</h3>
                            <span className="activity-date">{activity.date}</span>
                          </div>
                          <p>{activity.snippet}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    <p>No recent activity yet. Start exploring to see your activity here!</p>
                  </div>
                )}
              </div>

              <div className="career-progress">
                <h2>Your Career Journey</h2>
                <div className="progress-card">
                  <div className="progress-header">
                    <h3>Profile Completion</h3>
                    <span>65%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: "65%" }}></div>
                  </div>
                  <p>Complete your profile to get better recommendations</p>
                  <button className="complete-profile-btn">
                    Complete Profile <FiArrowRight />
                  </button>
                </div>

                <div className="stats-grid">
                  <div className="stat-card">
                    <div className="stat-icon">
                      <FiMessageCircle />
                    </div>
                    <div className="stat-content">
                      <h3>3</h3>
                      <p>Chat Sessions</p>
                    </div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-icon">
                      <FiCompass />
                    </div>
                    <div className="stat-content">
                      <h3>5</h3>
                      <p>Career Paths</p>
                    </div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-icon">
                      <FiBookOpen />
                    </div>
                    <div className="stat-content">
                      <h3>8</h3>
                      <p>Saved Courses</p>
                    </div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-icon">
                      <FiBarChart2 />
                    </div>
                    <div className="stat-content">
                      <h3>12</h3>
                      <p>Skills Identified</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "careers" && (
          <div className="careers-tab">
            <h2>Your Saved Career Paths</h2>
            {savedCareers.length > 0 ? (
              <div className="saved-careers">
                {savedCareers.map((career) => (
                  <div className="career-card" key={career.id}>
                    <div className="career-header">
                      <h3>{career.title}</h3>
                      <div className="match-badge">{career.match}% Match</div>
                    </div>
                    <p>{career.description}</p>
                    <div className="career-actions">
                      <button className="primary-action">Explore Path</button>
                      <button className="secondary-action">Find Courses</button>
                      <button className="tertiary-action">Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>
                  You haven't saved any career paths yet. Use the Career Suggester to discover and save career paths.
                </p>
                <Link to="/career-suggester" className="cta-button">
                  Try Career Suggester <FiArrowRight />
                </Link>
              </div>
            )}
          </div>
        )}

        {activeTab === "courses" && (
          <div className="courses-tab">
            <h2>Your Saved Courses</h2>
            {savedCourses.length > 0 ? (
              <div className="saved-courses">
                {savedCourses.map((course) => (
                  <div className="course-card" key={course.id}>
                    <h3>{course.title}</h3>
                    <div className="course-details">
                      <div className="detail-item">
                        <span className="detail-label">Provider:</span>
                        <span className="detail-value">{course.provider}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Duration:</span>
                        <span className="detail-value">{course.duration}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Price:</span>
                        <span className="detail-value">{course.price}</span>
                      </div>
                    </div>
                    <div className="course-actions">
                      <button className="primary-action">View Course</button>
                      <button className="tertiary-action">Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>You haven't saved any courses yet. Use the Course Finder to discover and save courses.</p>
                <Link to="/course-recommender" className="cta-button">
                  Find Courses <FiArrowRight />
                </Link>
              </div>
            )}
          </div>
        )}

        {activeTab === "profile" && (
          <div className="profile-tab">
            <div className="profile-header">
              <div className="profile-avatar">
                <FiUser />
              </div>
              <div className="profile-info">
                <h2>{user?.name || "User"}</h2>
                <p>{user?.email || "user@example.com"}</p>
              </div>
              <button className="edit-profile-btn">Edit Profile</button>
            </div>

            <div className="profile-sections">
              <div className="profile-section">
                <h3>Personal Information</h3>
                <div className="profile-fields">
                  <div className="profile-field">
                    <span className="field-label">Full Name</span>
                    <span className="field-value">{user?.name || "User"}</span>
                  </div>
                  <div className="profile-field">
                    <span className="field-label">Email</span>
                    <span className="field-value">{user?.email || "user@example.com"}</span>
                  </div>
                  <div className="profile-field">
                    <span className="field-label">Location</span>
                    <span className="field-value">Mumbai, India</span>
                  </div>
                  <div className="profile-field">
                    <span className="field-label">Phone</span>
                    <span className="field-value">Not provided</span>
                  </div>
                </div>
              </div>

              <div className="profile-section">
                <h3>Career Information</h3>
                <div className="profile-fields">
                  <div className="profile-field">
                    <span className="field-label">Current Role</span>
                    <span className="field-value">Not provided</span>
                  </div>
                  <div className="profile-field">
                    <span className="field-label">Experience</span>
                    <span className="field-value">Not provided</span>
                  </div>
                  <div className="profile-field">
                    <span className="field-label">Education</span>
                    <span className="field-value">Not provided</span>
                  </div>
                  <div className="profile-field">
                    <span className="field-label">Skills</span>
                    <span className="field-value">Not provided</span>
                  </div>
                </div>
              </div>

              <div className="profile-section">
                <h3>Account Settings</h3>
                <div className="profile-actions">
                  <button className="settings-btn">Change Password</button>
                  <button className="settings-btn">Notification Preferences</button>
                  <button className="settings-btn">Privacy Settings</button>
                  <button className="settings-btn danger">Delete Account</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
