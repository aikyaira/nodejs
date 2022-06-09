import worker_threads from 'worker_threads';
const FILE = './access.log';
let IPs = process.argv.slice(2);

if(IPs.length == 0) {
    IPs = ['89.123.1.41', '34.48.240.111'];
}

(async () => {
    const worker = new worker_threads.Worker('./lesson3_workers/log_search.js', {
        workerData: {
            path: FILE,
            IPs: IPs
        }
    });
})();