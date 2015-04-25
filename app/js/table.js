$(document).ready(function() { 
	$(function() {

      // call the tablesorter plugin
      $("table").tablesorter({
        theme: 'blackice',

        // use save sort widget
        widgets: ["saveSort", "zebra"]

      });

      $('button').click(function(){
        $('table')
          .trigger('saveSortReset') // clear saved sort
          .trigger("sortReset");    // reset current table sort
        return false;
      });

    });
        
    } )
    