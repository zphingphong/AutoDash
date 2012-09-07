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
        indicator: false,
        items: [{
            docked: 'top',
            xtype: 'toolbar',
            items: [{
                xtype: 'segmentedbutton',
                id: 'mileageSegBtn',
                allowDepress: false,
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
                xtype: 'selectfield',
                id: 'carSelectionField',
                name: 'car_id',
                label: 'Car',
                displayField: 'name',
                valueField: 'id',
                usePicker: false
            }, {
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
            listConfig: {
                itemTpl: new Ext.XTemplate(
                    '<span>{car_name}</span> <span class="info-field">{destination}</span> <span>{date}</span>'
                )
            },
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
                    var mileageTpl = new Ext.XTemplate(
                        '<div class="car-name">{car_name}</div>',
                        '<div class="info-field">[Start Mileage] <span class="value-field">{start}</span></div>',
                        '<div class="info-field">[End Mileage] <span class="value-field">{end}</span></div>',
                        '<div class="info-field">[Current Mileage] <span class="value-field">{current_mileage}</span></div>',
                        '<div class="info-field">[Date] <span class="value-field">{date}</span></div>',
                        '<div class="info-field">[Destination] <span class="value-field">{destination}</span></div>',
                        '<div class="info-field">[Purpose] <span class="value-field">{purpose}</span></div>'
                    );
                    detailCard.setHtml(mileageTpl.apply(record.getData()));
                }
            }
        }]
    }
});
