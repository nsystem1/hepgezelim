      

    (function($){
        
        CapitiliazeFirst(  [ "#inputDescription" ]  ); 

        /*Kullanıcı kayıt işlemi
        ======================================== */
        $( '#inputUpdate' ).on('click',function(){
              
              
              var thisID = this,
                  sex = $( '#inputSex'), 
                  name = $( '#inputName'), 
                  surname = $( '#inputSurname'), 
                  email = $( '#inputEmail'), 
                  tel_no = $( '#inputTel_no'),
                  birth = $( '#inputBirthYear'),
                  tel_vis = $( '#inputTel_visibility'),
                  describe = $( '#inputDescription' ),
                  inputTel_check = 0,
                  inputEmail_check = 0;

                  var boolValid = true;                   
                      boolValid = boolValid && FillKontrol(sex,      er.sel_sex );
                      boolValid = boolValid && FillKontrol(name,     er.blank_name  );
                      boolValid = boolValid && FillKontrol(surname,  er.blank_surname ); 
                      boolValid = boolValid && EmailKontrol(email,   er.invalid_email); 
                      boolValid = boolValid && PhoneKontrol(tel_no,  er.invalid_tel ); 
                      boolValid = boolValid && SelectKontrol(birth,  er.sel_birth);
                  if ( boolValid ) {
                       
                       if(  jQuery.trim( tel_no_own ) != tel_no.val() )
                           inputTel_check = '0';
                       else
                           inputTel_check = tel_check;
                       if( email_own != email.val() )
                           inputEmail_check = '0';
                       else
                           inputEmail_check = email_check;     
                       
                       var dataForm = {   name: name.val(),
                                          surname: surname.val(),
                                          email: email.val(), 
                                          tel_no: tel_no.val(),
                                          tel_visible:  tel_vis.is(':checked'), 
                                          birthyear: birth.val(),
                                          description: describe.val(),
                                          tel_check: inputTel_check,
                                          email_check: inputEmail_check
                                     };          

                       if( email_own == email.val() ){ 
                                $.ajax({         
                                       type: "POST", 
                                       url:  base_url + 'update/updateUser', 
                                       dataType: "text",  
                                       cache:false,
                                       data: dataForm,
                                       success: function(result) { 
                                              if(strcmp(enviroment, 'development') == 0){ alert(result); }
                                              var answer = JSON.parse( result );    
                                              if(  strcmp( answer.status , 'success') == 0 ){  BasariMesaj(er.success_update);  }
                                              else if(strcmp( answer.status  , 'fail') == 0 ){ HataMesaj( answer.text ); }
                                              else if( strcmp(answer.status ,'error') == 0 ) { HataMes( $('#message') , answer.message );    } 
                                              else{    HataMesaj(er.error_update );  }    
                                       },
                                       error : function() {
                                              HataMesaj( er.error_send );
                                       },
                                       complete: function(){
                                       }
                                });// end of the ajax
                       }
                       else{
                                var dataForm1 = { email: email.val() };
                                $.ajax({         
                                     type: "POST", 
                                     url:  base_url + 'signup/checkEmailUsing', 
                                     dataType: "text",  
                                     cache:false,
                                     data: dataForm1,
                                     success: function(result) { 
                                        var answer = JSON.parse( result ); 
                                        if( strcmp( answer.status, 'not') == 0 ){
                                                 $.ajax({         
                                                          type: "POST", 
                                                          url:  base_url + 'update/updateUser', 
                                                          dataType: "text",  
                                                          cache:false,
                                                          data: dataForm,
                                                          success: function(result) {
                                                                    if(strcmp(enviroment, 'development') == 0){
                                                                          alert(result);
                                                                    }
                                                                    var answer = JSON.parse( result );  
                                                                    if( strcmp (answer.status , 'success') == 0 ){
                                                                        BasariMesaj(er.success_update);
                                                                        email_own = email.val();
                                                                    }
                                                                    else if(strcmp( answer.status  , 'fail') == 0 ){ HataMesaj( answer.text ); }
                                                                    else if( strcmp(answer.status ,'error') == 0 ) { HataMes( $('#message') , answer.message );    } 
                                                                    else{  HataMesaj( er.error_update ); }    
                                                          },
                                                          error : function() {
                                                                 HataMesaj( er.error_send );
                                                          },
                                                          complete: function(){
                                                          }
                                                   });// end of the ajax second
                                         }
                                         else{
                                             Hata($( '#inputEmail').parent() , er.email_using );
                                         }
                                     },
                                     error : function() {
                                            boolValid = false;
                                            HataMesaj(  er.error_send );
                                     }
                                  });  // end of the ajax first
                        } // end of the email check                   
                  }
                  else{
                     HataMesaj( er.edit_info );
                  }
                         
              return false; // don't refresh form

          });/***** End Kullanıcı kayıt işlemi  *************/ 
       
         $( '#inputSurname' ).on('change',function(){        
               $(this).val( $(this).val().toUpperCase() );
         });
         $( '#inputName' ).on('change',function(){
                 var string = jQuery.trim( $(this).val() );
                 string = string.charAt(0).toUpperCase() + string.slice(1);
                 $(this).val( string ) ;      
         });
         $( '#inputDescription' ).on('change',function(){
                 var string = jQuery.trim( $(this).val() );
                 string = string.charAt(0).toUpperCase() + string.slice(1);
                 $(this).val( string ) ; 
         });

         $( '#inputTel_no').on('change',function(){
              var val1 = $(this).val();
              var array = val1.split(' ');
              var val =''; 
              for (var i = 0; i < array.length; i++) {
                  val += array[i];
               }; 
              var p0 =  '0',
                         p1 =  jQuery.trim( val.substring(1,4)  ), 
                         p2 =  jQuery.trim( val.substring(4,7)  ), 
                         p3 =  jQuery.trim( val.substring(7,9)  ), 
                         p4 =  jQuery.trim( val.substring(9,11) ); 
              if( IntegerKontrol(p1) && IntegerKontrol(p2) && IntegerKontrol(p3) && IntegerKontrol(p4) ){ 
                  if( p1.length == 3 && p2.length == 3 && p3.length == 2 && p4.length == 2 )
                      $(this).val(p0+p1+" "+p2+" "+p3+" "+p4 );    
                  else{
                      HataMesaj( er.invalid_tel );
                      $(this).val("");
                   }   
              }
              else{
                  HataMesaj( er.invalid_tel );
                  $(this).val("");
              } 
         });
          
          /** Kontrollerin başlangıcı
          ====================================*///
       /*
          function strcmp ( str1, str2 ) {
              str1 = str1.trim();
              str2 = str2.trim();
              return ( ( str1 == str2 ) ? 0 : ( ( str1 > str2 ) ? 1 : -1 ) );
          }
          */
          function SelectKontrol(id,mesaj){
              if ( id.val() == "" || id.val() == "0" ) {
                  Hata(id.parent(),mesaj);
                  return false;
              } 
              else {
                  return true;
              }
          }
          function FillKontrol(id,mesaj){
               if ( id.val() == "" || id.val() == "0" ) {
                   Hata(id.parent(),mesaj);
                   return false;
               } else {
                   return true;
               }
          }          
          function IntegerKontrol(val){

               if( isNaN(val) == true  || val == ""){ 
                   return false;
               } 
               else {
                   return true;
               }
          }
          function EmailKontrol(id, mesaj){
                  if(!id.val().match(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/)){ 
                      Hata(id.parent(),mesaj);
                      return false;
                  }
                  else{
                   return true;
                  }
          }
          function PhoneKontrol(id,mesaj){
               
                var val1 = id.val();
                if(val1 == "" ){
                    return true;
                }
                else{  
                     var array = val1.split(' ');
                     var val =''; 
                     for (var i = 0; i < array.length; i++) {
                         val += array[i];
                      }; 
                     var p0 =  '0',
                         p1 =  jQuery.trim( val.substring(1,4)  ), 
                         p2 =  jQuery.trim( val.substring(4,7)  ), 
                         p3 =  jQuery.trim( val.substring(7,9)  ), 
                         p4 =  jQuery.trim( val.substring(9,11) ); 
                    if( IntegerKontrol(p1) && IntegerKontrol(p2) && IntegerKontrol(p3) && IntegerKontrol(p4) ){ 
                        if( p1.length == 3 && p2.length == 3 && p3.length == 2 && p4.length == 2 ){
                              id.val(p0+p1+" "+p2+" "+p3+" "+p4 );    
                              return true;
                        }   
                        else{
                            Hata( id.parent(), er.invalid_tel);
                            id.val("");
                            return false;
                         }   
                    }
                    else{
                        Hata( id.parent(), er.invalid_tel);
                        id.val("");
                        return false;
                    }
                }    
          }/***** Kontrollerin sonu 
          ==================================****/
                         

    })(jQuery);   