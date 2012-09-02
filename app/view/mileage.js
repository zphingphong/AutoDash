Ext.define ('AutoDashMobile.view.Mileage', {
    extend: 'Ext.Carousel',
    xtype: 'mileagescreen',
    
    requires: [
        'AutoDashMobile.controller.Mileage'
    ],
    
    config: {
        title: 'Mileage',
        iconCls: 'home',
        items: [{
            docked: 'top',
            xtype: 'toolbar',
            ui: 'neutral',
            items: [{
                xtype: 'segmentedbutton',
                items: [{
                    text: 'Enter',
                    id: 'enterMileage',
                    pressed: true
                }, {
                    text: 'View',
                    id: 'viewMileage'
                }]
            }, {
                xtype: 'spacer'
            }, {
                xtype: 'segmentedbutton',
                id: 'mySegBtn',
                items: [{
                    text: 'Save',
                    id: 'saveMileage',
                    ui: 'action'
                }, {
                    text: 'Clear',
                    id: 'clearMileage',
                    ui: 'action'
                }]
            }]
        }, {
            xtype: 'formpanel',
            id: 'mileageInputForm',
            items: [{
                xtype: 'numberfield',
                name: 'startMileage',
                label: 'Start'
            }, {
                xtype: 'numberfield',
                name: 'endMileage',
                label: 'End'
            }, {
                xtype: 'datepickerfield',
                name: 'date',
                label: 'Date',
                dateFormat: 'Y-m-d H:i',
                value: new Date()
            }]
        }, {
            xtype: 'nestedlist',
            id: 'mileageView',
            title: 'Mileage History',
            displayField: 'date',
            backText: 'Back',
            detailCard: {
                html: 'You are viewing the detail card!'
            }
        }]
    }
});
