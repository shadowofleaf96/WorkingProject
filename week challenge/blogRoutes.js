const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();

// Example blog data (replace with your database or data source)
const blogArticles = [
  {
    id: 1,
    title: "Introduction to Artificial Intelligence",
    content:
      "Artificial Intelligence (AI) is a rapidly evolving field that focuses on creating computer systems capable of performing tasks that typically require human intelligence. AI technologies, such as machine learning and deep learning, are being applied across various industries, from healthcare to finance. This blog article provides an overview of AI and its applications.",
  },
  {
    id: 2,
    title: "Web Development Trends in 2023",
    content:
      "As we enter 2023, web development continues to evolve with new trends and technologies. This article explores the latest trends in web development, including Progressive Web Apps (PWAs), serverless architecture, and the adoption of WebAssembly. Stay updated with the latest developments in the web development world.",
  },
  {
    id: 3,
    title: "Getting Started with Python Programming",
    content:
      "Python is a versatile and beginner-friendly programming language that has gained popularity for its simplicity and readability. Whether you're new to programming or an experienced developer, this article serves as a guide to getting started with Python. Learn about basic syntax, data types, and common Python libraries.",
  },
  {
    id: 4,
    title: "The Impact of 5G Technology on IoT",
    content:
      "The rollout of 5G networks is set to revolutionize the Internet of Things (IoT) landscape. With its high-speed, low-latency capabilities, 5G enables IoT devices to communicate faster and more efficiently. Discover how 5G technology is poised to transform industries and drive innovation in IoT applications.",
  },
  {
    id: 5,
    title: "Cybersecurity Best Practices for Small Businesses",
    content:
      "Small businesses are increasingly becoming targets for cyberattacks. Protecting sensitive data and ensuring the security of your business is crucial. This article outlines cybersecurity best practices tailored to small businesses. Learn how to safeguard your digital assets and mitigate cyber risks.",
  },
  {
    id: 6,
    title: "Machine Learning in Healthcare",
    content:
      "Machine learning is making significant advancements in healthcare, from diagnosing diseases to predicting patient outcomes. This blog article explores the applications of machine learning in healthcare settings. Discover how data-driven approaches are improving patient care and revolutionizing the medical field.",
  },
];

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

// Middleware or authentication checks if required for blog routes

// Route to render a form for adding a new blog post
router.get("/new", (req, res) => {
  res.render("new-blog-post"); // Assuming you have an EJS template named "new-blog-post"
});

// Route to handle the submission of a new blog post
router.post("/new", (req, res) => {
  const { title, content } = req.body;
  const newBlogPost = {
    id: blogArticles.length + 1,
    title,
    content,
  };
  blogArticles.push(newBlogPost);
  res.redirect("/"); // Redirect to the homepage after adding the post
});

// Render the "Edit Blog Post" form
router.get("/edit", (req, res) => {
  res.render("edit-blog-post", { blogArticles });
});

// Handle the form submission to edit a blog post
router.post("/edit", (req, res) => {
  const selectedPostId = req.body.selectedPost;
  const editedTitle = req.body.editedTitle;
  const editedContent = req.body.editedContent;

  // Find the selected blog post by its ID
  const selectedPost = blogArticles.find(
    (post) => post.id === parseInt(selectedPostId)
  );

  if (!selectedPost) {
    // Handle the case where the selected post is not found (e.g., display an error message)
    res.render("edit-blog-post", {
      blogArticles,
      errorMessage: "Selected blog post not found.",
    });
  } else {
    // Update the selected blog post with the edited title and content
    selectedPost.title = editedTitle;
    selectedPost.content = editedContent;

    // Redirect to a success page or a list of blog posts
    res.redirect("/");
  }
});

// Render the "Delete Blog Post" form
router.get("/delete", (req, res) => {
  res.render("delete-blog-post", { blogArticles });
});

// Handle the form submission to delete a blog post
router.post("/delete", (req, res) => {
  const selectedPostId = req.body.selectedPost;

  // Find the index of the selected blog post by its ID
  const selectedIndex = blogArticles.findIndex(
    (post) => post.id === parseInt(selectedPostId)
  );

  if (selectedIndex === -1) {
    // Handle the case where the selected post is not found (e.g., display an error message)
    res.render("delete-blog-post", {
      blogArticles,
      errorMessage: "Selected blog post not found.",
    });
  } else {
    // Remove the selected blog post from the array
    blogArticles.splice(selectedIndex, 1);

    // Redirect to a success page or a list of blog posts
    res.redirect("/");
  }
});

module.exports = { router, blogArticles };
