Ext.define ('AutoDashMobile.view.Car', {
    extend: 'Ext.Carousel',
    xtype: 'carcreen',
    
    requires: [
        'AutoDashMobile.controller.Car'
    ],
    
    config: {
        title: 'Car',
        iconCls: 'home',
        items: [{
            docked: 'top',
            xtype: 'toolbar',
            ui: 'neutral',
            items: [{
                text: 'Previous',
                id: 'previousCar',
                ui: 'back'
            }, {
                xtype: 'spacer'
            }, {
                text: 'New',
                id: 'newCar',
                ui: 'action'
            }, {
                text: 'Delete',
                id: 'deleteCar'
            }, {
                xtype: 'spacer'
            }, {
                text: 'Next',
                id: 'nextCar',
                ui: 'forward'
            }]
        }, {
            xtype: 'formpanel',
            id: 'carInputForm', //TODO: add image, and default checkbox
            items: [{
                text: 'Clear',
                xtype: 'button',
                id: 'clearCar',
                ui: 'action'
            }, {
                xtype: 'textfield',
                name: 'license',
                label: 'License'
            }, {
                xtype: 'textfield',
                name: 'name',
                label: 'Name'
            }, {
                xtype: 'numberfield',
                name: 'current_mileage',
                label: 'Mileage'
            }, {
                text: 'Save',
                xtype: 'button',
                id: 'saveCar',
                ui: 'action'
            }]
        }]
    }
});
