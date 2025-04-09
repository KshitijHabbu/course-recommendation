"use client"

import Link from "next/link"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

function SuggesterPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    interests: [],
    skills: [],
    experience: "",
    goals: "",
    timeframe: "",
    budget: "",
  })
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(false)

  const interestOptions = [
    "Programming",
    "Data Science",
    "Design",
    "Marketing",
    "Business",
    "Finance",
    "Healthcare",
    "Education",
    "Engineering",
    "Arts",
    "Communication",
    "Science",
  ]

  const skillOptions = [
    "JavaScript",
    "Python",
    "SQL",
    "Excel",
    "Photoshop",
    "Writing",
    "Public Speaking",
    "Project Management",
    "Data Analysis",
    "Research",
    "Leadership",
    "Problem Solving",
  ]

  // Mock course data
  const mockCourses = [
    {
      id: 1,
      title: "Full-Stack Web Development Bootcamp",
      provider: "Tech Academy",
      duration: "12 weeks",
      level: "Intermediate",
      rating: 4.8,
      reviews: 1245,
      price: "$1,499",
      image: "/placeholder.svg?height=200&width=300",
      tags: ["Programming", "JavaScript", "React", "Node.js"],
      description:
        "Comprehensive bootcamp covering front-end and back-end development with modern JavaScript frameworks.",
    },
    {
      id: 2,
      title: "Data Science Specialization",
      provider: "DataLearn",
      duration: "6 months",
      level: "Advanced",
      rating: 4.7,
      reviews: 982,
      price: "$899",
      image: "/placeholder.svg?height=200&width=300",
      tags: ["Data Science", "Python", "Machine Learning", "Statistics"],
      description: "Master data analysis, visualization, and machine learning with Python and real-world projects.",
    },
    {
      id: 3,
      title: "UX/UI Design Professional Certificate",
      provider: "Design Institute",
      duration: "4 months",
      level: "Beginner to Intermediate",
      rating: 4.9,
      reviews: 756,
      price: "$1,299",
      image: "/placeholder.svg?height=200&width=300",
      tags: ["Design", "User Experience", "Figma", "Prototyping"],
      description:
        "Learn to create beautiful, functional designs that enhance user experience across digital platforms.",
    },
    {
      id: 4,
      title: "Digital Marketing Masterclass",
      provider: "Marketing Pro",
      duration: "8 weeks",
      level: "All Levels",
      rating: 4.6,
      reviews: 1089,
      price: "$699",
      image: "/placeholder.svg?height=200&width=300",
      tags: ["Marketing", "SEO", "Social Media", "Content Strategy"],
      description: "Comprehensive course covering all aspects of digital marketing from SEO to social media campaigns.",
    },
    {
      id: 5,
      title: "Project Management Professional (PMP) Prep",
      provider: "PM Institute",
      duration: "10 weeks",
      level: "Intermediate to Advanced",
      rating: 4.8,
      reviews: 823,
      price: "$1,199",
      image: "/placeholder.svg?height=200&width=300",
      tags: ["Business", "Project Management", "Leadership", "Certification"],
      description: "Comprehensive preparation for the PMP certification exam with practice tests and case studies.",
    },
  ]

  const handleInterestToggle = (interest) => {
    setFormData((prev) => {
      if (prev.interests.includes(interest)) {
        return { ...prev, interests: prev.interests.filter((i) => i !== interest) }
      } else {
        return { ...prev, interests: [...prev.interests, interest] }
      }
    })
  }

  const handleSkillToggle = (skill) => {
    setFormData((prev) => {
      if (prev.skills.includes(skill)) {
        return { ...prev, skills: prev.skills.filter((s) => s !== skill) }
      } else {
        return { ...prev, skills: [...prev.skills, skill] }
      }
    })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Filter courses based on user interests and skills
      const filteredCourses = mockCourses.filter((course) => {
        const hasMatchingInterest = formData.interests.some((interest) => course.tags.includes(interest))
        const hasMatchingSkill = formData.skills.some((skill) => course.tags.includes(skill))
        return hasMatchingInterest || hasMatchingSkill
      })

      setSuggestions(filteredCourses.length > 0 ? filteredCourses : mockCourses)
      setLoading(false)
      setStep(3)
    }, 1500)
  }

  const nextStep = () => {
    setStep((prev) => prev + 1)
  }

  const prevStep = () => {
    setStep((prev) => prev - 1)
  }

  const resetForm = () => {
    setFormData({
      interests: [],
      skills: [],
      experience: "",
      goals: "",
      timeframe: "",
      budget: "",
    })
    setStep(1)
    setSuggestions([])
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Find Your Perfect Course</h1>
            <p className="text-lg text-neutral-700 dark:text-neutral-300">
              Answer a few questions to get personalized course recommendations
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-12">
            <div className="flex justify-between mb-2">
              {["Your Interests", "Career Goals", "Recommendations"].map((label, index) => (
                <div
                  key={index}
                  className={`text-sm font-medium ${
                    step > index + 1 ? "text-primary" : step === index + 1 ? "text-primary" : "text-neutral-500"
                  }`}
                >
                  {label}
                </div>
              ))}
            </div>
            <div className="h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-500 ease-out"
                style={{ width: `${((step - 1) / 2) * 100}%` }}
              ></div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="card p-8"
              >
                <h2 className="text-2xl font-semibold mb-6">Tell us about your interests and skills</h2>

                <div className="mb-8">
                  <label className="block text-lg font-medium mb-3">What topics are you interested in?</label>
                  <div className="flex flex-wrap gap-3">
                    {interestOptions.map((interest) => (
                      <button
                        key={interest}
                        type="button"
                        onClick={() => handleInterestToggle(interest)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          formData.interests.includes(interest)
                            ? "bg-primary text-white"
                            : "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                        }`}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <label className="block text-lg font-medium mb-3">What skills do you already have?</label>
                  <div className="flex flex-wrap gap-3">
                    {skillOptions.map((skill) => (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => handleSkillToggle(skill)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          formData.skills.includes(skill)
                            ? "bg-primary text-white"
                            : "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                        }`}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <label className="block text-lg font-medium mb-3" htmlFor="experience">
                    What's your experience level?
                  </label>
                  <select
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 focus:ring-2 focus:ring-primary focus:border-primary"
                    required
                  >
                    <option value="" disabled>
                      Select your experience level
                    </option>
                    <option value="beginner">Beginner - New to the field</option>
                    <option value="intermediate">Intermediate - Some experience</option>
                    <option value="advanced">Advanced - Experienced professional</option>
                  </select>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={formData.interests.length === 0 || formData.experience === ""}
                    className="button button-primary"
                  >
                    Continue
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-2"
                    >
                      <path d="m9 18 6-6-6-6"></path>
                    </svg>
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="card p-8"
              >
                <h2 className="text-2xl font-semibold mb-6">Tell us about your career goals</h2>

                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label className="block text-lg font-medium mb-3" htmlFor="goals">
                      What are your career goals?
                    </label>
                    <textarea
                      id="goals"
                      name="goals"
                      value={formData.goals}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full p-3 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="e.g., I want to become a full-stack developer, change careers to data science, etc."
                      required
                    ></textarea>
                  </div>

                  <div className="mb-6">
                    <label className="block text-lg font-medium mb-3" htmlFor="timeframe">
                      What's your learning timeframe?
                    </label>
                    <select
                      id="timeframe"
                      name="timeframe"
                      value={formData.timeframe}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 focus:ring-2 focus:ring-primary focus:border-primary"
                      required
                    >
                      <option value="" disabled>
                        Select your timeframe
                      </option>
                      <option value="short">Short-term (1-3 months)</option>
                      <option value="medium">Medium-term (3-6 months)</option>
                      <option value="long">Long-term (6+ months)</option>
                    </select>
                  </div>

                  <div className="mb-8">
                    <label className="block text-lg font-medium mb-3" htmlFor="budget">
                      What's your budget?
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 focus:ring-2 focus:ring-primary focus:border-primary"
                      required
                    >
                      <option value="" disabled>
                        Select your budget
                      </option>
                      <option value="free">Free courses only</option>
                      <option value="low">Under $500</option>
                      <option value="medium">$500 - $1,000</option>
                      <option value="high">$1,000+</option>
                    </select>
                  </div>

                  <div className="flex justify-between">
                    <button type="button" onClick={prevStep} className="button button-secondary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2"
                      >
                        <path d="m15 18-6-6 6-6"></path>
                      </svg>
                      Back
                    </button>

                    <button
                      type="submit"
                      disabled={!formData.goals || !formData.timeframe || !formData.budget}
                      className="button button-primary"
                    >
                      Get Recommendations
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="ml-2"
                      >
                        <path d="m9 18 6-6-6-6"></path>
                      </svg>
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="card p-8 mb-8">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold">Your Recommended Courses</h2>
                    <button onClick={resetForm} className="text-primary hover:text-primary-dark flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-1"
                      >
                        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                        <path d="M3 3v5h5"></path>
                      </svg>
                      Start Over
                    </button>
                  </div>

                  {loading ? (
                    <div className="flex flex-col items-center justify-center py-12">
                      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                      <p className="text-lg font-medium">Finding the perfect courses for you...</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {suggestions.map((course) => (
                        <motion.div
                          key={course.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex flex-col md:flex-row gap-6 p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:shadow-md transition-shadow"
                        >
                          <div className="w-full md:w-1/4">
                            <img
                              src={course.image || "/placeholder.svg"}
                              alt={course.title}
                              className="w-full h-48 object-cover rounded-lg"
                            />
                          </div>

                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="text-xl font-semibold">{course.title}</h3>
                              <div className="flex items-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="#fbbf24"
                                  stroke="#fbbf24"
                                  strokeWidth="1"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                </svg>
                                <span className="ml-1 font-medium">{course.rating}</span>
                                <span className="ml-1 text-neutral-500 dark:text-neutral-400">
                                  ({course.reviews} reviews)
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                              <span className="mr-4">{course.provider}</span>
                              <span className="mr-4">{course.duration}</span>
                              <span>{course.level}</span>
                            </div>

                            <p className="mb-4 text-neutral-700 dark:text-neutral-300">{course.description}</p>

                            <div className="flex flex-wrap gap-2 mb-4">
                              {course.tags.map((tag) => (
                                <span key={tag} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                                  {tag}
                                </span>
                              ))}
                            </div>

                            <div className="flex justify-between items-center">
                              <span className="text-lg font-bold">{course.price}</span>
                              <div className="flex gap-3">
                                <button className="button button-secondary py-2">Save for Later</button>
                                <button className="button button-primary py-2">View Course</button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Not seeing what you're looking for?</h3>
                  <p className="mb-4">
                    Our AI assistant can help you find more specific courses based on your unique needs.
                  </p>
                  <Link to="/chatbot" className="button button-primary">
                    Chat with AI Assistant
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default SuggesterPage
