var express    		=       require("express");
var multer     		=       require('multer');
var app        		=       express();
var upload 			= 		multer({ dest: '../tmp/'});
var fs              =       require("fs");
var exec 			= 		require('child_process').exec;


app.use(multer({ dest: '../tmp',
	rename: function (fieldname, filename) {
		return filename+Date.now();
	},
	onFileUploadStart: function (file) {
		console.log(file.originalname + ' is starting ...');
	},
	onFileUploadComplete: function (file) {
		console.log(file.fieldname + ' uploaded to  ' + file.path)
	}
}));

app.get('/',function(req,res){
      console.log('ok');
});

app.post('/api/text',function(req,res) {
    
    console.log(req.body.txt.toString());
	
	fs.readdir("../tmp",function(err,files){
        
        if(err) {
        	console.log(err);
        }
        else {

            fs.writeFile("../tmp/data", req.body.txt.toString(), function(err) {
                console.log(err);
            });
				
			var child = exec('../DataAnalysisC++/full_text', function(error, stdout, stderr) {
   				if (error != null) {
        			console.log(stderr);
        			// error handling & exit
   				}
		 		else {
   				// normal
		 			fs.readFile("../tmp/links","ascii",function(err,data) {
						if(err){
					 		return console.log(err);
				 		}
				 		else{
					 		res.writeHead(200, {"Content-Type": "text/plain"});
        					res.end(data);
				 		}
			 		})
				}
			});
        }
    })
});

app.listen(3000,function(){
    console.log("Working on port 3000");
});