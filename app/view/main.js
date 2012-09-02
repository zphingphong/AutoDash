Ext.define ('AutoDashMobile.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'mainscreen',
    
    requires: [
        'AutoDashMobile.view.Mileage'
    ],
    
    config: {
        fullscreen: true,
        tabBarPosition: 'bottom',
        items: [{
            xtype: 'mileagescreen',
            id: 'mileageScreen'
        }, {
            title: 'Gas',
            html: '//TODO: Fill this page'
        }]
    }
});
