(function() {

  return {
    events: {
      'app.activated':       'growlIt'
    },

    
  requests: {
    fetchsuspendedtickets: function(page){
	return {
      url: '/api/v2/suspended_tickets.json?per_page=2&page=' + page,
      type: 'GET',
	};
    },
  },
    
    getRequester: function() {
      var currentUser = this.ticket().requester().name();
      return currentUser;
},
    growlIt: function() {
      var msg  = 'The current user is %@ :)';
      services.notify(msg.fmt(this.getRequester()), 'error', 5 * 1000);
      this.ajax('fetchsuspendedtickets',1 ).then(function(data){
		    console.log(data.count);
		    //var pages = data.count / 3;
	            //if (pages <= 1){
			//function that parses data
		    //}
		   // else{
			 //function that grabs the data one page at a time
			//function that parses data
		    //}
    });
  },
     
  
};
}());
