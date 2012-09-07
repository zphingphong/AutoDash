Ext.define('AutoDashMobile.model.Car', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            {name: 'id', type: 'int'},
            {name: 'license', type: 'string'},
            {name: 'name', type: 'string'},
            {name: 'current_mileage', type: 'int'},
            {name: 'is_default', type: 'bool'}
        ]
    }
});


