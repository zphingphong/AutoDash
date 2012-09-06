Ext.define ('AutoDashMobile.view.Mileage', {
    extend: 'Ext.Carousel',
    xtype: 'mileagescreen',
    
    requires: [
        'AutoDashMobile.controller.Mileage'
    ],
    
    config: {
        title: 'Mileage',
        iconCls: 'action',
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
                text: 'Sync',
                id: 'syncData',
                ui: 'action'
            }]
        }, {
            xtype: 'formpanel',
            id: 'mileageInputForm',
            items: [{
                text: 'Clear',
                xtype: 'button',
                id: 'clearMileage',
                ui: 'action'
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
                ui: 'action'
            }]
        }, {
            xtype: 'nestedlist',
            id: 'mileageView',
            title: 'Mileage History',
            displayField: 'date',
            backText: 'Back',
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
