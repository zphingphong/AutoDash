Ext.define ('AutoDashMobile.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'mainscreen',
    
    requires: [
        'AutoDashMobile.view.Mileage',
        'AutoDashMobile.view.Car'
    ],
    
    config: {
        fullscreen: true,
        tabBarPosition: 'bottom',
        items: [{
            xtype: 'carcreen',
            id: 'carScreen'
        }, {
            xtype: 'mileagescreen',
            id: 'mileageScreen'
        }, {
            title: 'Gas',
            html: '//TODO: Fill this page'
        }]
    }
});
