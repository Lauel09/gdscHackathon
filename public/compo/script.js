//import cheerio from 'cheerio';


const cheerio = require('cheerio');
const faceapi = require('@vladmandic/face-api');

const video = document.getElementById('video');
let isVideoStarted = false;

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
]).then(startVideo)

function startVideo() {
    if (!isVideoStarted) {
        navigator.getUserMedia(
            { video: {} },
            stream => {
                video.srcObject = stream;
                isVideoStarted = true;
            },
            err => console.error(err)
        )
    }
}

video.addEventListener('play', () => {
        const canvas = faceapi.createCanvasFromMedia(video)
        document.body.append(canvas)
        const displaySize = {width: video.width, height: video.height}

        setInterval(async () => {
                const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
                console.log(detections)
                const resizedDetections = faceapi.resizeResults(detections, displaySize)
                faceapi.draw.drawDetections(canvas, resizedDetections)
        }, 100)
})