Ext.define ('AutoDashMobile.view.Car', {
    extend: 'Ext.Carousel',
    xtype: 'carcreen',
    
    requires: [
        'AutoDashMobile.controller.Car'
    ],
    
    config: {
        title: 'Car',
        iconCls: 'car',
        ui: 'dark',
        items: [{
            docked: 'top',
            xtype: 'toolbar',
            items: [{
                id: 'previousCar',
                ui: 'back white',
                iconMask: true,
                iconCls: 'arrow_left'
            }, {
                xtype: 'spacer'
            }, {
                text: 'Add',
                id: 'newCar',
                ui: 'green',
                iconMask: true,
                iconCls: 'add'
            }, {
                xtype: 'spacer'
            }, {
                id: 'nextCar',
                ui: 'forward white',
                iconMask: true,
                iconCls: 'arrow_right'
            }]
        }, {
            xtype: 'formpanel',
            id: 'carInputForm', //TODO: add image, and default checkbox
            items: [{
                text: 'Clear',
                xtype: 'button',
                id: 'clearCar',
                ui: 'white',
                iconMask: true,
                iconCls: 'doc_black_landscape',
                margin: '0 0 10 0'
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
                ui: 'lightblue',
                iconMask: true,
                iconCls: 'save',
                margin: '10 0 0 0'
            }]
        }]
    }
});
