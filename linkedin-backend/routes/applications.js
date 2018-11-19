var express = require('express');
var router = express.Router();
var {Applications} = require('./../models/application');

//apply custom job

router.post('/job/12345', function(req, res, next) {
    console.log("inside custom apply");
    console.log("req sent from custom apply", req.body);
    const customApplyDetail = new Applications({
        HowDidYouHear: req.body.hear,
        Email : req.body.email,
        resume: req.body.resume,
        First_name: req.body.firstname,
        Last_name: req.body.lastname,
        Address : req.body.address,
        Phone : req.body.contact,
        Gender : req.body.gender,
        Race : req.body.race,
        Veteran : req.body.veteran,
        Disability : req.body.disability,
        CompanyName : req.body.company,
        JobTitle : req.body.jobtitle,
        JobLocation : req.body.joblocation,
        Applied : true,
        Saved : false
    });
    customApplyDetail.save().then((result)=> {
        console.log("apply successful : ",result);
                         // res.sendStatus(200).end();
                         res.writeHead(200,{
                             'Content-Type' : 'application/json'
                         });
                         res.end(JSON.stringify("Applied successfully"));
    },(err)=>{
        console.log("Error While applying custom job");
    })
                  
  });

  //applied jobs in dashboard

  router.get('/applied', function(req, res, next) {
    console.log("inside appled jobs");
    console.log("req sent from applied job dashboard", req.body);
    
    Applications.find({Email:"saypatil12345@gmail.com", Applied:true, Saved:false}).then((app)=> { 
        console.log("\nNumber of applied jobs: " + app.length + "\n");
        console.log("Applied jobs : "+ app );
        res.writeHead(200,{
            'Content-Type' : 'application/json'
        })
        res.end(JSON.stringify(app));
    }, (err) => {
        console.log("error : " + err)
        console.log("inside 400");
        res.writeHead(400,{
            'Content-Type' : 'text/plain'
        })
       res.end("Invalid details");
    }
                  
  );
});

//Saved jobs in dashboard

router.get('/saved', function(req, res, next) {
    console.log("inside saved jobs");
    console.log("req sent from saved job dashboard", req.body);
    
    Applications.find({Email:"saypatil12345@gmail.com", Saved:true, Applied:false}).then((app)=> { 
        console.log("\nNumber of saved jobs: " + app.length + "\n");
        console.log("Saved jobs : "+ app );
        res.writeHead(200,{
            'Content-Type' : 'application/json'
        })
        res.end(JSON.stringify(app));
    }, (err) => {
        console.log("error : " + err)
        console.log("inside 400");
        res.writeHead(400,{
            'Content-Type' : 'text/plain'
        })
       res.end("Invalid details");
    }
                  
  );
});

  module.exports = router;