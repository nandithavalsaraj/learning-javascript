var course = course || {};
course.dotnet = course.dotnet || {};



course.dotnet.coursedetails = function(cid,cname,duration){
	this.cid = cid;
	this.cname = cname;
	this.duration = duration;
	this.getCourseDetails = function(){
	document.getElementById("res").innerHTML="For the course "+ this.cname  +" with ID Number " + this.cid + " the course duration is " +this.duration+" minutes."+  "<br>";
	}
}

 course.dotnet.feedetails = function(cid,fees){
	this.cid = cid;
	this.fees = fees;
	this.getFeeDetails = function(){
		document.getElementById("res").innerHTML="For ID Number " + this.cid + " Course Fees is " + this.fees + "<br>"+ "<br>";
	}
}

