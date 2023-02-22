const ErrorHandling = require("../utils/errorHandling");
const catchAsyncError=require("../meddleware/catchAsyncError");
const User=require("../models/userModle");
const Event=require("../models/eventModle");
const ApiFeachers = require("../utils/apiFeachers");

//add newEvent
exports.addEvent=catchAsyncError(async(req,res,next)=>{
    const {title,type,startDate,endDate}=req.body;

    const event=await Event.create({
        title,
        type,
        startDate,
        endDate,
        owner: req.user.id,
    })

    const user = await User.findById(req.user.id);

    user.events.unshift(event._id);
    await user.save();

    res.status(201).json({
        success: true,
        message:"Event Created Successfully...",
        event
      });

})

//get All public events;

exports.getPublicEvents=catchAsyncError(async(req,res,next)=>{
    const events= await Event.find({type:"public"}).populate('owner')

    res.status(200).json({
        success:true,
        events,
    });

})

//get All public and user private events;

exports.getUserEvents=catchAsyncError(async(req,res,next)=>{
    const publicEvents= await Event.find({type:"public"}).populate('owner')

    const userEvent= await Event.find({owner:{
        $in:req.user.id},type:{
        $in:"private"
        }}).populate("owner")
//arry of All public and user private events;
// const apiFeacher=new ApiFeachers([...publicEvents,...userEvent],req.query).search()
    const events=[...publicEvents,...userEvent];
    res.status(200).json({
        success:true,
        events,
    });


})

exports.getSearchedEvents=catchAsyncError(async(req,res,next)=>{

    const publicEvents= await Event.find({type:"public",title:{ $regex: req.query.name, $options: "i" }}).populate('owner')

    const userEvent= await Event.find({owner:{
        $in:req.user.id},type:{
        $in:"private"
        },title: { $regex: req.query.name, $options: "i" }}).populate("owner")
    const events=[...publicEvents,...userEvent];
    
    res.status(200).json({
        success:true,
        events,
    });
      });

exports.getMyEvents=catchAsyncError(async(req,res,next)=>{
    const events= await Event.find({owner:{$in:req.user.id}}).populate("owner")

    res.status(200).json({
        success:true,
        events,
    });
})

//get All public or private events of all users for admin;

exports.getAllEvents=catchAsyncError(async(req,res,next)=>{
    const events= await Event.find({}).populate('owner')

    res.status(200).json({
        success:true,
        events,
    });

})

//delete events
exports.delEvent=catchAsyncError(async(req,res,next)=>{
    const event=await Event.findById(req.params.id);

    if (!event) {
        return next(new ErrorHandling("event not found",404));
    }

    const user=await User.findById(event.owner)
    const userIndex=user.events.indexOf(event.owner);
    user.events.splice(userIndex,1);
    await user.save();
    
    await event.remove();
    res.status(200).json({
        success: true,
        message: "Event deleted",
      });

})

//edit event

exports.updateEvent = catchAsyncError(async (req, res,next) => {
    const {title,type,startDate,endDate}=req.body
    const event = await Event.findById(req.params.id);


    if (!event) {
      return new ErrorHandling("event not found",404);
    }

    event.title = title;
    event.type=type;
    event.startDate=startDate;
    event.endDate=endDate;
    
    await event.save();
    res.status(200).json({
      success: true,
      message: "event updated",
    });
  })
  //singleEvn

  exports.singleEvn = catchAsyncError(async(req,res,next)=>{
    const event= await Event.findById(req.params.id);

    if (!event) {
        return next(new ErrorHandling(`event doest exist id: ${req.params.id}`))
    }

    res.status(200).json({
        success:true,
        event,
    })
});