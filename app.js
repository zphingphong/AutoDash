// global final variables
var DB;
var DB_NAME = 'AutoDash'; 
var DB_VERSION = '1.0';  
var DB_DISPLAY_NAME = 'Auto Dash'; 
var DB_SIZE = 65535; 

var DATE_FORMAT = 'Y-m-d H:i';


Ext.application({
    name: 'AutoDashMobile',
                
    views: ['Main'],
    controllers: ['Mileage'],
    
    launch: function() {
        Ext.Viewport.add([{
            xtype: 'mainscreen'
        }]);
    }
});
