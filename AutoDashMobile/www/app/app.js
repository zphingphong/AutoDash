Ext.application({
    name: 'AutoDashMobile',
                
    views: ['Main'],
    controllers: ['Mileage'],
    
    launch: function() {
        Ext.create('AutoDashMobile.view.Main');
    }
});
