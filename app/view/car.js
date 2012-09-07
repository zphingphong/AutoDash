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
                xtype: 'image',
                name: 'image',
                id: 'carImage',
                width: 150,
                height: 150,
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
