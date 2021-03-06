  $(function() {
                 

                for (var i = 1; i <= return_days_count; i++) {
                    var name = "#weekDaysReturn" + i;
                    $( name ).buttonset();
                }; 
                
                $( '.repeat-trip').hide();
                $( '.add-return-trip').hide();
                $( ".datepickerStart" ).datepicker({ minDate: 0, maxDate: "+2M +10D", dateFormat: "yy-mm-dd", dayNames: dayNames, dayNamesMin: dayNamesMin, monthNames: monthNames, prevText: prevText,  nextText: nextText  } );
                $( ".datepickerEnd" ).datepicker({ minDate: 0 , maxDate: "+3M +10D", dateFormat: "yy-mm-dd", dayNames: dayNames, dayNamesMin: dayNamesMin, monthNames: monthNames, prevText: prevText,  nextText: nextText   });
                $( ".datepickerEndDate" ).datepicker({ minDate: 0 , maxDate: "+3M +10D", dateFormat: "yy-mm-dd", dayNames: dayNames, dayNamesMin: dayNamesMin, monthNames: monthNames, prevText: prevText,  nextText: nextText   });
                $( ".datepickerEndDate" ).on('mouseover',function(){
                        $(this).datepicker("option", "minDate" ,  $(this).data('date')  );
                });
                $( ".datepickerEnd" ).on('mouseover',function(){
                        $(this).datepicker("option", "minDate" ,  $(this).parent().find(".datepickerStart").val()  );
                });
                $( ".glyphicon-repeat, .exit" ).on('click',function(event){
                       event.preventDefault();
                      $(this).parents('.panel-primary').find('.repeat-trip').slideToggle();
                });
                $( ".glyphicon-paperclip, .exit2" ).on('click',function(event){
                      event.preventDefault()
                      $(this).parents('.panel-primary').find('.add-return-trip').slideToggle();
                });
                
                $( ".delete-offer" ).on('click',function(){
                      var offer_id = $(this).data('id');
                      $("#delete-modal").data().id = offer_id;
                });
                
                $( ".glyphicon-plus-sign" ).on('click',function(){
                      var offer_id = $(this).parent().data('id'),
                          seat_count = $(this).closest( ".pull-right" ).find(".seat"); 
                          data = { offer_id: offer_id  },
                          url = 'offer/increaseSeatCount',
                          result = JSON.parse( AjaxSendJson(url,data) );  
                      if     ( strcmp(result.status ,'success') == 0 ){ seat_count.html( result.text   )} // show bottom alert 
                      else if( strcmp(result.status ,'fail'   ) == 0 ){ HataMesaj   (  result.text     )} // show bottom alert
                      else if( strcmp(result.status ,'error'  ) == 0 ){ HataMesaj   (  result.message  )} // show top
                      else                                            { HataMesaj   (  er.error_send   )} // show bottom alert  
                      return false;
                });
                $( ".glyphicon-minus-sign" ).on('click',function(){
                      var offer_id = $(this).parent().data('id'),
                          seat_count = $(this).closest( ".pull-right" ).find(".seat");
                          data = { offer_id: offer_id  },
                          url = 'offer/decreaseSeatCount',
                          result = JSON.parse( AjaxSendJson(url,data) );  
                      if     ( strcmp(result.status ,'success') == 0 ){ seat_count.html( result.text   )} // show bottom alert 
                      else if( strcmp(result.status ,'fail'   ) == 0 ){ HataMesaj   (  result.text     )} // show bottom alert
                      else if( strcmp(result.status ,'error'  ) == 0 ){ HataMesaj   (  result.message  )} // show top
                      else                                            { HataMesaj   (  er.error_send   )} // show bottom alert  
                      return false; 
                });  

                $( "#delete-modal .btn-primary" ).on('click',function(){
                      var offer_id = $( "#delete-modal" ).data('id');
                      if( strcmp( offer_id , "-1" ) != 0  ){
                            var data = { offer_id: offer_id  },
                             url = 'offer/deleteOffer',
                             result = JSON.parse( AjaxSendJson(url,data) );  
                             if     ( strcmp(result.status ,'success') == 0 ){ window.location = base_url + "offer"         } // show bottom alert 
                             else if( strcmp(result.status ,'fail'   ) == 0 ){ HataMesajModal ( $(this), result.text     )} // show bottom alert
                             else if( strcmp(result.status ,'error'  ) == 0 ){ HataMesajModal ( $(this), result.message  )} // show top
                             else                                            { HataMesajModal ( $(this), er.error_send   )} // show bottom alert  
                      }
                      else{  HataMesajModal ( $(this), er.error_occurred) } 
                      return false;   
                });

                $( ".inputSave" ).on('click',function(){
                       var parent = $( this ).parent(),
                           departure_date = parent.find('.datepickerStart'),
                           departure_hr = parent.find('#datepickerStartTimeHour'),
                           departure_min = parent.find('#datepickerStartTimeSecond'),
                           return_date = parent.find('.datepickerEnd'),
                           return_hr = parent.find('#datepickerReturnTimeHr'),
                           return_min = parent.find('#datepickerReturnTimeMin'),
                           offer_id = $(this).data('id'),
                           boolValid = true;
                           boolValid = boolValid && FillKontrol(departure_date , er.blank_date);
                           if(  $(this).data('type') == "1" )
                                 boolValid = boolValid && FillKontrol(return_date , er.blank_date ); 
                           boolValid = boolValid && SameDate(departure_date.val(),departure_hr.val(), return_date.val(), return_hr.val() );
                           if(boolValid){
                                var data = { offer_id: offer_id, 
                                             departure_date: departure_date.val(), 
                                             departure_time: departure_hr.val() +':'+ departure_min.val(),
                                             return_date: return_date.val(), 
                                             return_time: return_hr.val() +':'+ return_min.val()  },
                                    url = 'offer/copyOffer',
                                    result = JSON.parse( AjaxSendJson(url,data) );  
                                    if     ( strcmp(result.status ,'success') == 0 ){ window.location = base_url + result.path  } 
                                    else if( strcmp(result.status ,'fail'   ) == 0 ){ HataMesaj   (  result.text     )} // show bottom alert
                                    else if( strcmp(result.status ,'error'  ) == 0 ){ HataMesaj   (  result.message  )} // show top
                                    else                                            { HataMesaj   (  er.error_send   )} // show bottom alert  
                           }
                           else
                               HataMesaj(er.edit_info);  
                        
                });
                


                $( ".inputAddRetunDate" ).on('click',function(){
                       var parent = $( this ).parent(),
                           date =  parent.find('.datepickerEndDate') ,
                           moveTime = date.data('time'),
                           moveDate = date.data('date'),
                           hour =  parent.find('#datepickerStartTimeHour') ,
                           minute = parent.find('#datepickerStartTimeMinute'),
                           offer_id = encodeURIComponent( $(this).data('id') ); 
                           boolValid = true;
                          
                           boolValid = boolValid && FillKontrol(date ,  er.blank_date  );
                           boolValid = boolValid && SameDate(moveDate,moveTime ,date.val(), hour.val() );
                           if(boolValid){
                                var data = { offer_id: offer_id, return_date: date.val(), return_time: hour.val() +':'+ minute.val()  },
                                    url = 'offer/addReturnDate',
                                    result = JSON.parse( AjaxSendJson(url,data) );  
                                    if( strcmp(result.status      ,'success') == 0 ) { location.reload(true) }
                                    else if( strcmp(result.status ,'fail') == 0 )  { HataMesaj(er.error_occurred) }
                                    else if( strcmp(result.status ,'error') == 0 ) { HataMes( $('#message') , result.message );    }
                                    else{ HataMesaj( er.error_send ) }  
                           }
                           else
                               HataMesaj( er.edit_info );   
                           return false;
                });
                 $( ".inputAddRetunDays" ).on('click',function(){
                       var parent = $( this ).parent(),
                           days =  parent.find('.weekDaysReturn').find('.ui-state-active'),
                           return_hr = parent.find('#datepickerReturnTimeHr'),
                           return_min = parent.find('#datepickerReturnTimeMin'),
                           offer_id = encodeURIComponent( $(this).data('id') ),
                           return_days = ""; 
                            
                           if( days.length > 0 ){
                                  for (var i = 0; i < days.length; i++) {
                                     if(i != days.length-1 ) 
                                         return_days += $(days[i]).data("name") + '?';
                                     else  
                                         return_days += $(days[i]).data("name");
                                  };
                                   var data = { offer_id: offer_id, return_days: return_days, return_time:return_hr.val() + ":" + return_min.val() },
                                   url = 'offer/addReturnDays',
                                   result = JSON.parse( AjaxSendJson(url,data) );  
                                   if(      strcmp(result.status ,'success') == 0 ) { location.reload(true)           }
                                   else if( strcmp(result.status ,'fail'   ) == 0 ) { HataMesaj( er.error_occurred  ) }
                                   else if( strcmp(result.status ,'error'  ) == 0 ) { HataMesaj( result.message     ) }
                                   else                                             { HataMesaj( er.error_send      ) }     
                           }
                           else
                               HataMesaj( er.choose_day );

                           return false;       
                });  
                function SameDate( departureDate, departureTime, returnDate, returnTime  ){
                         if( strcmp(departureDate, returnDate) == 0 ){
                               var array = departureTime.split(':');     
                               if( parseInt(returnTime) >= (parseInt(array[0]) + 3) )
                                   return true;
                               else{
                                   HataMesaj( er.same_date );
                                   return false;
                               }  
                         }
                         else
                            return true;
                }


      });