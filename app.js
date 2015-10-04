(function() {

  return {
    events: {
      'app.activated':       'growlIt'
    },

    
  requests: {
    fetchsuspendedtickets: {
      url: '/api/v2/suspended_tickets.json',
      type: 'GET',
    },
  },
    
    getRequester: function() {
      var currentUser = this.ticket().requester().name();
      return currentUser;
},
    growlIt: function() {
      var msg  = 'The current user is %@ :)';
      services.notify(msg.fmt(this.getRequester()), 'error', 5 * 1000);
      this.ajax('fetchsuspendedtickets').then(function(data){
		    console.log(data);
    });
  }
  
};
}());
