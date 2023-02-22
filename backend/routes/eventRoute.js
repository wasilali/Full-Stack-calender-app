const express=require("express");
const { addEvent, getPublicEvents, getUserEvents, getAllEvents, delEvent, updateEvent, getMyEvents, singleEvn, getSearchedEvents } = require("../controllers/eventController");
const { isAuthenticatedUser, authorizeRoles } = require("../meddleware/auth");
const router=express.Router()

router.route("/create-event").post(isAuthenticatedUser,addEvent);

router.route("/get-events").get(getPublicEvents)

router.route("/get-user-events").get(isAuthenticatedUser,getUserEvents)

router.route("/get-searched-events").get(isAuthenticatedUser,getSearchedEvents)

router.route("/get-my-events").get(isAuthenticatedUser,getMyEvents)


router.route("/admin/all-events").get(isAuthenticatedUser,authorizeRoles("admin"),getAllEvents)

router.route('/admin/delete/:id').delete(isAuthenticatedUser,authorizeRoles("admin"),delEvent)

router.route('/admin/update/:id').put(isAuthenticatedUser,authorizeRoles("admin"),updateEvent)

router.route('/admin/single/:id').get(isAuthenticatedUser,authorizeRoles("admin"),singleEvn)



module.exports=router