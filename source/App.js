enyo.kind({
//Defines important varibels    
	name: "App",
	fit: true,
	classes:"onyx",
	n1: 0,
	n2: 0,
    CorrectResult: 0,
    ProblemType: 0,
    ProblemTypeString: "0", 
    ProblemTypes: new Array("", "+", "-", "x", "/"),
    
	
	
	
//Comonents that are retrived from an other file
	components: SumComponents,
	
//When a key is pressed on the keyboard this is called	
	AnswerKeyDown: function(inSender, inEvent) {
	    //If the enter key is pressed
	    if (inEvent.keyCode == 13){
	    this.SubmitFunc();
	    }
	    },
	 //What happens if the user presses okay on the failpoup
	OkFailPopup: function() {
	    this.NewProblem();
	    this.$.FailPopup.hide()
	    //reset the correct answer to nothing
	    this.$.CorrectAnswer.content = "";
	},
	//fiqures out how many decimal places are in a number
	CalculateDecimalPlaces: function(number) {
	    number += "";
	    var PassedDecimalPoint = false;
	    var DecimalPlaces = 0;
	    for (i=0; i<number.length; i++) {
            if(PassedDecimalPoint)  {
	            DecimalPlaces += 1;
            } else if(number[i] == ".")  {
                PassedDecimalPoint = true;
            }
            
            
           }
           return DecimalPlaces;
          },
                
	        
	//Sets a new problem
	NewProblem: function() {
	    this.n1 = Math.floor(Math.random() * 10+1);
        this.n2 = Math.floor(Math.random() * 10+1);
	    this.ProblemType = Math.floor(Math.random() * 4+1);
	    this.$.Answer.hasNode().value = "";
	    var DecimalPlaces = 0;
	
	// figures out what type the problem is and does special actions according to that 
	    switch(this.ProblemType) {
           //Addition
            case 1:
	            this.CorrectResult = this.n1 + this.n2;
	            this.ProblemTypeString = "+";
	            break;
            //Subtration
            case 2:
                this.CorrectResult = this.n1 - this.n2;
                this.ProblemTypeString = "-";
                break;
             //Multiplication
            case 3: 
                this.CorrectResult = this.n1 * this.n2;
                this.ProblemTypeString = "x";
                break;
            //devision
            case 4:
                this.CorrectResult = this.n1 / this.n2;
                this.ProblemTypeString = "/";
                break;
        
    }; 
    //Sets and renders the new problem
        this.$.Problem.content = this.n1 + " " + this.ProblemTypeString + " " + this.n2 + "=";
        this.$.Problem.render();
    //Returns true to indicate everything went well
	
	    return true;   
	},
	// Is called when the user presse the submit button or the enter key
	SubmitFunc: function(inEvent, inSender) {
	    if (this.$.Answer.hasNode().value == this.CorrectResult) {
	        this.NewProblem();
        } else {
            this.$.CorrectAnswer.content = "The Correct Answer was: " + this.CorrectResult;
            this.$.CorrectAnswer.render();
            this.$.FailPopup.show();
            
        }
	   
	        
     
	},
	
	
	


});
