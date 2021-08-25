import mqtt from 'mqtt';

const client = mqtt.connect('ws://broker.emqx.io:8083/mqtt', {
    'clientId': 'test_id',
    'username': '',
    'password': ''
});

client.on('connect', () => {
    console.log('CONNECTED');
});

client.on('error', () => {
    console.log('ERROR');
});
