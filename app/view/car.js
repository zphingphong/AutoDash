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
        autoDestroy: true,
        indicator: false,
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
                xtype: 'image',
                id: 'carImage',
                width: 200,
                height: 200,
                margin: '10 auto',
                src: 'data:image/png;base64,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'
            }, {
                text: 'Take new photo',
                xtype: 'button',
                id: 'takePhotoCar',
                iconMask: true,
                iconCls: 'photo1',
                margin: '10 0 0 0'
            }, {
                text: 'Select existing photo',
                xtype: 'button',
                id: 'selectPhotoCar',
                iconMask: true,
                iconCls: 'photos2',
                margin: '10 0 0 0'
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
