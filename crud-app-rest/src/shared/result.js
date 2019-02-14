function Result (){
    this.message = '';
    this.messageType = '';
    this.data ;
 
    this.setSuccessMessage = function (message){
        this.messageType='success';
        this.message=message;   
    };
    this.setWarningMessage = function (message){
        this.messageType='warning';
        this.message=message;
    };
    this.setErrorMessage = function (message){
        this.messageType='error';
        this.message=message;
    };

    this.setData = function (data) {
        this.data = data;
    };
}

module.exports = Result;