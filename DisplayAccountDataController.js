({
	doInit : function(component, event, helper) {
        var column = [{   label:"Important Account",
                          fieldName : "isActive__c",
                           cellAttributes : {
                               class :{fieldName :"showClass"},
                               iconName:{fieldName : "displayIcon"}               
                           }
                          
                      },
                      { label:"Name",
                        fieldName:"link",
                        type:"url",
                        cellAttributes:{
                            class:{ fieldName :"showClass"}
                        },
                       typeAttributes:{
                           label:{
                               fieldName:"Name"
                           },
                           target:"_blank"
                       }
                      },
                      { label:"Industry",
                        fieldName:"Industry",
                        type:"text",
                        cellAttributes:{
                            class:{fieldName :"showClass"}
                        }
                       },
                       { label:"Type",
                         fieldName:"Type",
                         type:"text",
                         cellAttributes:{
                               class:{fieldName :"showClass"}
                         }
                      }];
        
        component.set("v.columns",column);
        
	    var action = component.get("c.getAccounts");	
        action.setCallback(this,function(response){
             var state = response.getState();
            console.log('state: ',state);
            if(state == 'SUCCESS' || state == 'DRAFT'){
                 var data   = response.getReturnValue();
                data.forEach(function(item){
                    if(item.isActive__c){
                        item.displayIcon = "utility:check";
                        item.showClass = 'redColor';
                    }else{
                        item.displayIcon = "utility:close";
                        item.showClass = 'blackColor';
                    }
                    item.link = '/'+item.Id;
                });
                component.set("v.data",data);
            }
        });
        
        $A.enqueueAction(action);
	}
})