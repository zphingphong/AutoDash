Ext.define ('AutoDashMobile.view.Mileage', {
    extend: 'Ext.Carousel',
    xtype: 'mileagescreen',
    
    requires: [
        'AutoDashMobile.controller.Mileage'
    ],
    
    config: {
        title: 'Mileage',
        iconCls: 'speedometer1',
        ui: 'dark',
        items: [{
            docked: 'top',
            xtype: 'toolbar',
            items: [{
                xtype: 'segmentedbutton',
                id: 'mileageSegBtn',
                ui: 'light',
                items: [{
                    text: 'Enter',
                    id: 'enterMileage',
                    pressed: true,
                    iconMask: true,
                    iconCls: 'compose',
                    ui: 'action'
                }, {
                    text: 'View',
                    id: 'viewMileage',
                    iconMask: true,
                    iconCls: 'look',
                    ui: 'action'
                }]
            }, {
                xtype: 'spacer'
            }, {
                text: 'Sync',
                id: 'syncData',
                ui: 'orange',
                iconMask: true,
                iconCls: 'sync'
            }]
        }, {
            xtype: 'formpanel',
            id: 'mileageInputForm',
            items: [{
                text: 'Clear',
                xtype: 'button',
                id: 'clearMileage',
                ui: 'white',
                iconMask: true,
                iconCls: 'doc_black_landscape',
                margin: '0 0 10 0'
            }, {
//                xtype: 'numberfield', //TODO: Change this to dropdown
//                name: 'car_id',
//                label: 'Car'
//            }, {
                xtype: 'numberfield',
                name: 'start',
                label: 'Start'
            }, {
                xtype: 'numberfield',
                name: 'end',
                label: 'End'
            }, {
                xtype: 'datepickerfield',
                name: 'date',
                label: 'Date',
                dateFormat: 'Y-m-d H:i',
                value: new Date()
            }, {
                xtype: 'textfield',
                name: 'destination',
                label: 'Destination'
            }, {
                xtype: 'textfield',
                name: 'purpose',
                label: 'Purpose'
            }, {
                text: 'Save',
                xtype: 'button',
                id: 'saveMileage',
                ui: 'lightblue',
                iconMask: true,
                iconCls: 'save',
                margin: '10 0 0 0'
            }]
        }, {
            xtype: 'nestedlist',
            id: 'mileageView',
            displayField: 'date',
            title: 'Mileage History',
            backButton: {
                ui: 'back'
            },
            detailCard: {
                html: ''
            },
            listeners: {
                leafitemtap: function(nestedList, list, index, target, record) {
                    var detailCard = nestedList.getDetailCard();
                    detailCard.setHtml('Date/Time: ' + record.get('date') + '<br /> Start Mileage: ' + record.get('start') + '<br /> End Mileage: ' + record.get('end') + '<br /> Destination: ' + record.get('destination') + '<br /> Purpose: ' + record.get('purpose'));
                }
            }
        }]
    }
});
