export function home(req, res, next) {
  res.render("index.ejs", {
    title: `Welcome To Home Page`,
    content: "This is home page",
    user:req.user
  });
}
export function about(req, res, next) {
  res.render("about.ejs", {
    title: "About Page",
    content: "This is about page",
    user:req.user
  });
}
