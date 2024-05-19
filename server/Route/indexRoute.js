const express = require("express");

const router = express.Router();

const { homePage, aboutPage, contactPage, affliatePage, faqPage, termsPage,  registerPage, loginPage, invplanPage, register_post, login_post, logout_get, loginAdmin } = require("../controllers/userController");
const { loginAdmin_post } = require("../controllers/adminController");

router.get("/", homePage);

router.get("/about", aboutPage);

router.get("/inv-plans", invplanPage);

router.get("/contact", contactPage);

router.get("/faqs", faqPage);

router.get("/terms", termsPage)

router.get("/affiliate", affliatePage);


router.get("/register", registerPage);
router.post("/register", register_post);

router.get("/login", loginPage);
router.post("/login", login_post)

router.get('/loginAdmin', loginAdmin);
router.post('/loginAdmin', loginAdmin_post)

router.get("/logout",logout_get)









module.exports = router;