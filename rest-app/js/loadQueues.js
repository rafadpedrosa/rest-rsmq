$(document).ready(function(){
	console.log('teste');
	var d = new Date();

//	calling the function
	formatDate(d,4);


	function formatDate(dateObj,format)
	{
		var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
		var curr_date = dateObj.getDate();
		var curr_month = dateObj.getMonth();
		curr_month = curr_month + 1;
		var curr_year = dateObj.getFullYear();
		var curr_min = dateObj.getMinutes();
		var curr_hr= dateObj.getHours();
		var curr_sc= dateObj.getSeconds();
		if(curr_month.toString().length == 1)
			curr_month = '0' + curr_month;
		if(curr_date.toString().length == 1)
			curr_date = '0' + curr_date;
		if(curr_hr.toString().length == 1)
			curr_hr = '0' + curr_hr;
		if(curr_min.toString().length == 1)
			curr_min = '0' + curr_min;

		if(format ==1)//dd-mm-yyyy
		{
			return curr_date + "-"+curr_month+ "-"+curr_year;
		}
		else if(format ==2)//yyyy-mm-dd
		{
			return curr_year + "-"+curr_month+ "-"+curr_date;
		}
		else if(format ==3)//dd/mm/yyyy
		{
			return curr_date + "/"+curr_month+ "/"+curr_year;
		}
		else if(format ==4)// MM/dd/yyyy HH:mm:ss
		{
			return curr_month+"/"+curr_date +"/"+curr_year+ " "+curr_hr+":"+curr_min+":"+curr_sc;
		}
	}

	$(document).ready(function() {
		var table = $('#example').DataTable( {
			"processing": true,
			ajax: '/listAllQueues',
			// ajax: '/data.json',
			columns: [
			          { data: 'qname' },
			          { data: 'vt' },
			          { data: 'delay' },
			          { data: 'maxsize' },
			          { data: 'totalrecv' },
			          { data: 'totalsent' },
			          { data: 'created' },
			          { data: 'modified' },
			          { data: 'msgs' },
			          { data: 'hiddenmsgs' }
			          ],


			          "columnDefs": [
			                         {
			                        	 // The `data` parameter refers to the data for the cell (defined by the
			                        	 // `data` option, which defaults to the column being worked with, in
			                        	 // this case `data: 0`.
			                        	 "render": function ( data, type, row ) {
			                        		 console.log(data);
			                        		 // var unixtime = 1473912895 - 10800;
			                        		 var newDate = new Date();
			                        		 newDate.setTime(data * 1000);
			                        		 return formatDate(newDate,4);
			                        	 },
			                        	 "targets": [6,7]
			                         }
			                         ],

			                         // columnDefs: [
			                         //   {
			                         //     targets: [ 0, 1, 2 ],
			                         //     className: 'mdl-data-table__cell--non-numeric'
			                         //   }
			                         // ],
			                         "oLanguage": {
			                        	 "sSearch": "_INPUT_",
			                        	 "sLengthMenu": '<select>'+
			                        	 '<option value="10">10 rows</option>'+
			                        	 '<option value="20">20 rows</option>'+
			                        	 '<option value="30">30 rows</option>'+
			                        	 '<option value="40">40 rows</option>'+
			                        	 '<option value="50">50 rows</option>'+
			                        	 '<option value="-1">All</option>'+
			                        	 '</select>'
			                         },
			                         "fnPreDrawCallback": function(oSettings, json) {
			                        	 console.log( 'DataTables has finished its initialisation.' );
			                        	 // $(".dataTables_filter label").html("");
			                        	 $(".dataTables_filter label input").addClass("mdl-textfield__input");
			                        	 $('.dataTables_length label select').addClass("mdl-textfield__input");
			                         }
		} );

		setInterval( function () {
			console.log("reload begin");
			table.ajax.reload( null, false );
			console.log("reload done");
		}, 15000 );

	} );
});