Ext.define('AutoDashMobile.model.Mileage', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            {name: 'id', type: 'int'},
            {name: 'date', type: 'string'},
            {name: 'end', type: 'int'},
            {name: 'start', type: 'int'},
            {name: 'car_id', type: 'int'},
            {name: 'car_name', type: 'string'},
            {name: 'current_mileage', type: 'int'},
            {name: 'destination', type: 'string'},
            {name: 'purpose', type: 'string'}
        ]
    }
});

