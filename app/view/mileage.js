Ext.define('MileageListItem', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            {name: 'date', type: 'date'},
            {name: 'endMileage', type: 'int'}
        ]
    }
});


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
                dateFormat: DATE_FORMAT,
                value: new Date()
            }]
        }, {
            xtype: 'nestedlist',
            id: 'mileageView',
            title: 'Mileage History',
            displayField: 'date',
            backText: 'Back',
            store: Ext.create('Ext.data.TreeStore', {
                model: 'MileageListItem',
                defaultRootProperty: 'items',
                root: {
                    items: [{
                        date: new Date(),
                        endMileage: 234,
                        leaf: true
                    }]
                }
            }),
            detailCard: {
                html: 'You are viewing the detail card!'
            }
        }]
    }
});
