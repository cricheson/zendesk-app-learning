(function() {

  return {
    events: {
      'app.activated':       'growlIt'
    },

 //sets tickets displayed per page   
 per_page : 3, 
 max_pages : 1,
    
    
  requests: {
    fetchsuspendedtickets: function(page){
	return {
      url: '/api/v2/suspended_tickets.json?per_page='+this.per_page+'&page=' + page,
      type: 'GET',
	};
    },
  },


  
    getRequester: function() {
      var currentUser = this.ticket().requester().email();
      return currentUser;
},
    growlIt: function() {
      var msg  = 'The current user is %@ :)';
     // services.notify(msg.fmt(this.getRequester()), 'error', 5 * 1000);
      this.ajax('fetchsuspendedtickets',1 ).then(function(data){
		    console.log(data.count);
		    var pages = data.count / this.per_page;
	            if (pages <= 1){
			console.log(this.parsedata(data));
			if (this.parsedata(data)){
				services.notify('The requestor for this ticket has a suspended ticket', 'error', 5000);
			}
			else{
				services.notify('nothing found', 'error', 5000);
			}
		    }
		    else{
			 //function that grabs the data one page at a time
			    this.max_pages = pages;
			    this.fetchpage(1);
			//function that parses data
		    }
    });
  },
  
      fetchpage: function(x){
	 this.ajax('fetchsuspendedtickets',x ).then(function(data){  
		if (this.parsedata(data)){
				services.notify('The requestor for this ticket has a suspended ticket', 'error', 5000);
			}
			else{
				
				if (x < this.max_pages){
					this.fetchpage(x+1);
				}
				else{
					services.notify('nothing found', 'error', 5000);
				}
			}
   });		 
	      
 },
 
     parsedata: function(data){
	     var that = this
	     var tickets = data.suspended_tickets.filter(function(ticket) {
		    console.log(ticket.content)
		     return ticket.content.indexOf(that.getRequester()) != -1;
	     });
	     console.log(tickets)
	     console.log(data.suspended_tickets);
	     return tickets.length != 0;
	     
	     
	//if content contains email address
		//send message
	//else
	     //run parse data again
	     
     }
     
  
};
}());
