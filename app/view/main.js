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
        ui: 'dark',
        items: [{
            xtype: 'carcreen',
            id: 'carScreen'
        }, {
            xtype: 'mileagescreen',
            id: 'mileageScreen'
        }, {
            title: 'Gas',
            iconCls: 'gas',
            html: '//TODO: Fill this page'
        }]
    }
});
