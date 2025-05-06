import http from 'k6/http';

export let options = {
    insecureSkipTLSVerify: true,
    noConnectionReuse: false,
    stages: [
        { duration: '10s', target: 100 },
        { duration: '1m', target: 100 },
        { duration: '10s', target: 1400 },
        // { duration: '3m', target: 1400 },
        // { duration: '10s', target: 100 },
        // { duration: '3m', target: 100 },
        // { duration: '10s', target: 0 },
    ],



    thresholds: {
        http_req_duration: ['p(95)<500'], // 95 percent of response times must be below 500ms
        http_req_failed: ['rate<0.01'], // Max 1% of requests may fail
    },

};

export default () => {

    const url = 'http://middleware:3000/api/devices/id/1';
    http.get(url + "id/1", {
        headers: { 'Content-Type': 'application/json' },
    });
};